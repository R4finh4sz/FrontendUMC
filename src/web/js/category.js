import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"
'use strict'

const switchers = document.querySelectorAll('.btn, .btn2, .theme-switch__checkbox');


$("#btnCriar").click(async function () {
        var id= $("#txtId").val()
        var name= $("#txtName").val()
        var description= $("#txtDescription").val()
        if(!id){
            await axios.post(url + 'category', {
                name:name,
                description:description
            }).then(function (response) {
                alert("Categoria Incluído com sucesso");
                location.reload();
            }).catch(function (error) {
                alert("Erro durante a gravação");
            });
        }else{
            await axios.put(url + 'category/' + id, {
                name:name,
                description:description
            }).then(function (response) {
                alert("Categoria Atualizado com sucesso");
                location.reload();
            }).catch(function (error) {
                alert("Erro durante a gravação");
            });
        }
        
});
$(document).ready(function () {
    
    loadTable();
})

function loadTable() {
    axios.get(url + 'category',{
    }).then(function(response){

        let table= new DataTable('#tbCategory',{
            data: response.data,
            columns:[
                {data:'id'},
                {data:'name'},
                {data:'description'},
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
                loadCategory(data.id);
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
        $("#txtDescription").val('')
    } catch (errors) {
        alert(errors)
    }
});

async function Excluir(id){
    await axios.delete(url +"category/" + id, {
    }).then(function (response) {
        alert("Registro Excluido com sucesso");
        location.reload();
    }).catch(function(error){
        consolo.log(error);
    });

}


async function loadCategory(id){
    await axios.get(url +'category/' + id, {
    }).then(function (response) {
        $("#txtName").val(response.data.name)
        $("#txtDescription").val(response.data.description)
    }).catch(function(error){
        console.log(error);
    });

}
