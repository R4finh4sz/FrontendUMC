import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"
'use strict'

const switchers = document.querySelectorAll('.btn, .btn2, .theme-switch__checkbox');


$("#btnCriar").click(async function () {
        var id= $("#txtId").val()
        var name= $("#txtName").val()
        if(!id){
            await axios.post(url + 'profiles', {
                name:name
            }).then(function (response) {
                alert("Perfil Incluído com sucesso");
                location.reload();
            }).catch(function (error) {
                alert("Erro durante a gravação");
            });
        }else{
            await axios.put(url + 'profiles/' + id, {
                name:name
            }).then(function (response) {
                alert("Perfil Atualizado com sucesso");
                location.reload();
            }).catch(function (error) {
                alert("Erro durante a gravação");
            });
        }
        
});
$(document).ready(function () {
    
    loadTable();
})




async function loadProfile(id){
    await axios.get(url +'profiles/' + id, {
    }).then(function (response) {
        $("#txtName").val(response.data.name)
    }).catch(function(error){
        console.log(error);
    });
}


function loadTable() {
    axios.get(url + 'profiles',{
    }).then(function(response){

        let table= new DataTable('#tbProfiles',{
            data: response.data,
            columns:[
                {data:'id'},
                {data:'name'},
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
                loadProfile(data.id);
            } else{
                Excluir(data.id);
            }
        });
    }).catch(function(error){
        alert(error);
    });
}



$("#btnCancelar").click(async function () {
    try {
        $("#txtName").val('')
    } catch (errors) {
        alert(errors)
    }
});

async function Excluir(id){
    await axios.delete(url +"profiles/" + id, {
    }).then(function (response) {
        alert("Perfil Excluido com sucesso");
        location.reload();
    }).catch(function(error){
        consolo.log(error);
    });

}

