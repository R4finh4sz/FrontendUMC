import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"
'use strict'

const switchers = document.querySelectorAll('.btn, .btn2, .theme-switch__checkbox');


switchers.forEach(switcher => {
    switcher.addEventListener("click", function() {
        document.body.classList.toggle('dark-theme');
        var className = document.body.className;
        if (className == "light-theme") {
            this.textContent = "Dark";
        } else {
            this.textContent = "Light";
        }
        console.log('current class name: ' + className);
    });
});

$("#btnLogin").click(async function () {
        var email= $("#txtEmail").val()
        var password= $("#txtSenha").val()

        await axios.post(url + 'login', {
            email:email,
            password:password
        }).then(function(response){
            alert("Usuário Logado com Sucesso")
        }).catch (function(error){
            alert(error);
        });
});

$("#btnCancelar").click(async function () {
    try {
        email= $("#txtEmail").val('')
        senha= $("#txtSenha").val('')
    } catch (errors) {
        alert(errors) 
    }
});
