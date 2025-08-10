import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"
'use strict'

const switchers = document.querySelectorAll('.btn, .btn2, .theme-switch__checkbox');


$("#btnLogin").click(async function () {
        var id= $("#txtId").val()
        var name= $("#txtName").val()
        var email= $("#txtEmail").val()
        var admin= $("#chkAdmin").prop('checked')
        var password= $("#txtSenha").val()  
        var profile= $("#ddIProfile option:selected").val()
        if(!id){
            await axios.post(url + 'user', {
                name:name,
                email:email,
                admin:admin,
                password:password,
                profile:{
                    id:profile
                }
            }).then(function (response) {
                alert("Usuario Incluído com sucesso");
                location.reload();
            }).catch(function (error) {
                alert("Erro durante a gravação");
            });
        }else{
            await axios.put(url + 'user/' + id, {
                name:name,
                email:email,
                admin:admin,
                password:password,
                profile:{
                    id:profile
                }
            }).then(function (response) {
                alert("Usuario Atualizado com sucesso");
                location.reload();
            }).catch(function (error) {
                alert("Erro durante a gravação");
            });
        }
        
});


$("#btnCancelar").click(async function () {
    try {
        $("#txtName").val('')
        $("#txtEmail").val('')
        $("#chkAdmin").val('')
        $("#txtSenha").val('')
    } catch (errors) {
        alert(errors)
    }
});

$(document).ready(function () {
    axios.get(url + 'profiles', {
    }).then(function(response){
        $.each(response.data, function(key, item){
            $('#ddIProfile').append(
                $("<option></option>")
                    .attr("value", item.id)
                    .text(item.name)
            );
        });
    }).catch(function(error) {
        alert(error);
    });



    loadTable();
})



function loadTable() {
    axios.get(url + 'user',{
    }).then(function(response){

        let table= new DataTable('#tbUsers',{
            data: response.data,
            columns:[
                {data:'id'},
                {data:'name'},
                {data:'email'},
                {
                    data: null,
                    defaultContent: '<button id="edit"  class="btn-gravar">Editar</button>&nbsp;<button id="exluir"  class="btn-limpar">Excluir</button>',
                    targets: -1
                }
            ] 
        });

        table.on('click', 'button', function(e){
            var data = table.row($(this).parents('tr')).data();
            if(this.id==='edit'){
                loadUser(data.id);
            } else{
                Excluir(data.id);
            }
        });
    }).catch(function(error){
        alert(error);
    });
}



async function Excluir(id){
    await axios.delete(url +"user/" + id, {
    }).then(function (response) {
        alert("Registro Excluido com sucesso");
        location.reload();
    }).catch(function(error){
        consolo.log(error);
    });

}


async function loadUser(id){
    await axios.get(url +'user/' + id, {
    }).then(function (response) {
        $("#txtId").val(response.data.id)
        $("#txtName").val(response.data.name)
        $("#txtEmail").val(response.data.email)
        if(response.data.admin){
            admin= $("#chkAdmin").prop('checked:true')
        }
    }).catch(function(error){
        console.log(error);
    });

}
