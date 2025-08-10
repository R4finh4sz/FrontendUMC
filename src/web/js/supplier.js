import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"
'use strict'

const switchers = document.querySelectorAll('.btn, .btn2, .theme-switch__checkbox');


$("#btnCadastro").click(async function () {
        var id= $("#txtId").val()
        var name= $("#txtName").val()
        var representative= $("#txtRepresentative").val()
        var email= $("#txtEmail").val()
        var address= $("#txtAddress").val()  
        var telephone= $("#txtTelephone").val()  
        var website= $("#txtWebsite").val()  
        if(!id){
            await axios.post(url + 'supplier', {
                name:name, 
                representative:representative, 
                email:email, 
                address:address, 
                telephone:telephone, 
                website:website
            }).then(function (response) {
                alert("Fornecedor Incluído com sucesso");
                location.reload();
            }).catch(function (error) {
                alert("Erro durante a gravação");
            });
        }else{
            await axios.put(url + 'supplier/' + id, {
                name:name, 
                representative:representative, 
                email:email, 
                address:address, 
                telephone:telephone, 
                website:website
            }).then(function (response) {
                alert("Fornecedor Atualizado com sucesso");
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
    axios.get(url + 'supplier',{
    }).then(function(response){

        let table= new DataTable('#tbSupplier',{
            data: response.data,
            columns:[
                {data:'id'},
                {data:'name'},
                {data:'representative'},
                {data:'email'},
                {data:'address'},
                {data:'telephone'},
                {data:'website'},
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
                loadSupplier(data.id);
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
        $("#txtRepresentative").val('')
        $("#txtEmail").val('')
        $("#txtAddress").val('')
        $("#txtTelephone").val('')
        $("#txtWebsite").val('')
    } catch (errors) {
        alert(errors)
    }
});




async function Excluir(id){
    await axios.delete(url +"supplier/" + id, {
    }).then(function (response) {
        alert("Registro Excluido com sucesso");
        location.reload();
    }).catch(function(error){
        consolo.log(error);
    });

}


async function loadSupplier(id){
    await axios.get(url +'supplier/' + id, {
    }).then(function (response) {
        $("#txtName").val(response.data.name)
        $("#txtRepresentative").val(response.data.representative)
        $("#txtEmail").val(response.data.email)
        $("#txtAddress").val(response.data.address)
        $("#txtTelephone").val(response.data.telephone)
        $("#txtWebsite").val(response.data.website)
    }).catch(function(error){
        console.log(error);
    });
}
