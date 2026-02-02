$(function () {

    $("#loginForm").validate({
        rules: {
            email: {
                required: true
            },
            pass: {
                required: true
            }
        },
        messages: {
            email: {
                required: "*Campo Obligatorio"
            },
            pass: {
                required: "*Campo Obligatorio"
            }
        },
        errorClass: "is-invalid",
        validClass: "is-valid",
        errorElement: "div",
        errorPlacement: function (error, element) {
            error.addClass("invalid-feedback");
            error.insertAfter(element);
        }
    });

});