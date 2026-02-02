function soloNumeros(input) {
    let inicio = "";
    
    for (let i = 0; i < input.value.length; i++) {
        let code = input.value.charCodeAt(i); 
        
        if ((code >= 48 && code <= 57) || code === 46 || code < 32) {
            inicio += input.value[i];
        }
    }
    
    input.value = inicio; 
}

function ConsultarNombre()
{
    let cedula = document.getElementById("cedula").value;
    document.getElementById("nombreCompleto").value = "";

    if(cedula.length >= 9)
    {
        $.ajax({
            type: 'GET',
            url: 'https://apis.gometa.org/cedulas/' + cedula,
            dataType: 'json',
            success: function(data){
                if(data.resultcount > 0)
                {
                    document.getElementById("nombreCompleto").value = data.nombre;
                }
            }
        });
    }    
}

$(function () {

    $("#loginForm").validate({
        rules: {
            cedula: {
                required: true
            },
            nombreCompleto: {
                required: true
            },
            email: {
                required: true
            },
            pass: {
                required: true
            },
            confirmarPass: {
                required: true,
                equalTo: pass
            },
            role:{
                required: true,
            }
        },
        messages: {
            cedula: {
                required: "*Campo Obligatorio"
            },
            nombreCompleto: {
                required: "*Campo Obligatorio"
            },
            email: {
                required: "*Campo Obligatorio"
            },
            pass: {
                required: "*Campo Obligatorio"
            },
            confirmarPass: {
                required: "*Contraseña no Coincide"
            },
            role:{
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