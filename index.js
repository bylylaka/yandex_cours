
$("#myForm").on('submit', function (e) {
    e.preventDefault();
    MyForm.submit(this);
});

$(function(){
    $("#phone").mask("+7(999)999-99-99");
});

function prov_adress() {
    var adr=document.getElementById("email").value;
    var adr_pattern=/^[0-9a-z_]+@(ya.ru|yandex.ru|yandex.ua|yandex.by|yandex.kz|yandex.com)$/;
    var prov=adr_pattern.test(adr);
    if (prov==true) {
        return true;
    }
    else {
        return false;
    }
}

function prov_fio() {
    var adr=document.getElementById("fio").value;
    var adr_pattern=/[А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]+ [А-ЯЁ][а-яё]/i;
    var prov=adr_pattern.test(adr);
    if (prov==true) {
        return true;
    }
    else {
        return false
    }
}

function prov_phone() {
    var adr=document.getElementById("phone").value;
    if(adr) {
        var sum = parseInt(adr.charAt(1))+parseInt(adr.charAt(3))+parseInt(adr.charAt(4))+parseInt(adr.charAt(5))+parseInt(adr.charAt(7))+parseInt(adr.charAt(8))+parseInt(adr.charAt(9))+parseInt(adr.charAt(11))+parseInt(adr.charAt(12))+parseInt(adr.charAt(14))+parseInt(adr.charAt(5));
        if (sum<=30)
            return true;
    }
    return false;
}

function Json() {
    var action = $('#myForm').attr("action");
    $.getJSON(action, function(data){
        switch (data.status){
            case 'success':
                $("#resultContainer").text("Success");
                $("#resultContainer").addClass("success");
                break;
            case 'error':
                $("#resultContainer").text(data.reason);
                $("#resultContainer").addClass("error");
                break;
            case 'progress':
                $("#resultContainer").addClass("progress");
                setTimeout(Json, data.timeout);
                break;
        }
    });
}

var MyForm = {
    validate: function () {
        var Obj = {
            isValid: true,
            errorFields: []
        };
        var i = 0;
        if (!prov_fio()){
            Obj.isValid = false;
            Obj.errorFields[i]="fio";
            i++;
        }
        if (prov_adress()){
            Obj.isValid = false;
            Obj.errorFields[i]="email";
            i++;
        }
        if (prov_phone()){
            Obj.isValid = false;
            Obj.errorFields[i]="phone";
            i++;
        }
        return Obj;
    },

    submit: function () {
        var flag = true;
        if (prov_fio())
            $("#fio").removeClass("error");
        else {
            $("#fio").addClass("error");
            flag = false;
        }
        if (prov_adress())
            $("#email").removeClass("error");
        else {
            flag = false;
            $("#email").addClass("error");
        }
        if (prov_phone())
            $("#phone").removeClass("error")
        else {
            flag = false;
            $("#phone").addClass("error");
        }
        if (flag) {
            $('#submitButton').attr( "disabled", "disabled" );
            Json();
        }
    },

    getData:function () {
        var Obj = {};
        $("form[id='myForm']").find("input").not('[type="submit"]').each(function() {
            Obj[$(this).attr('name')]=document.getElementById($(this).attr('name')).value;
        });
        return Obj;
    },

    setData:function (Obj) {
        $("form[id='myForm']").find("input").not('[type="submit"]').each(function() {
            if(Obj[this.getAttribute("name")])
                this.value=Obj[this.getAttribute("name")];
        });
    }
};
