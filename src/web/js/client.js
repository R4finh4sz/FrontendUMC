import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"
'use strict'

const switchers = document.querySelectorAll('.btn, .btn2, .theme-switch__checkbox');


$("#btnCadastro").click(async function () {
        var id= $("#txtId").val()
        var name= $("#txtName").val()
        var description= $("#txtDescription").val()
        var cpf= $("#txtCpf").val()
        var address= $("#txtAddress").val()  
        var fone= $("#txtFone").val()  
        if(!id){
            await axios.post(url + 'client', {
                name:name,
                description:description,
                cpf:cpf,
                address:address,
                fone:fone
            }).then(function (response) {
                alert("Cliente Incluído com sucesso");
                location.reload();
            }).catch(function (error) {
                alert("Erro durante a gravação");
            });
        }else{
            await axios.put(url + 'client/' + id, {
                name:name,
                description:description,
                cpf:cpf,
                address:address,
                fone:fone
            }).then(function (response) {
                alert("Cliente Atualizado com sucesso");
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
    axios.get(url + 'client',{
    }).then(function(response){

        let table= new DataTable('#tbClient',{
            data: response.data,
            columns:[
                {data:'id'},
                {data:'name'},
                {data:'description'},
                {data:'cpf'},
                {data:'address'},
                {data:'fone'},
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
                loadClient(data.id);
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
        $("#txtCpf").val('')
        $("#txtAddress").val('')
        $("#txtFone").val('')
    } catch (errors) {
        alert(errors)
    }
});




async function Excluir(id){
    await axios.delete(url +"client/" + id, {
    }).then(function (response) {
        alert("Registro Excluido com sucesso");
        location.reload();
    }).catch(function(error){
        consolo.log(error);
    });

}


async function loadClient(id){
    await axios.get(url +'client/' + id, {
    }).then(function (response) {
        $("#txtName").val(response.data.name)
        $("#txtDescription").val(response.data.description)
        $("#txtCpf").val(response.data.cpf)
        $("#txtAddress").val(response.data.address)
        $("#txtFone").val(response.data.fone)
    }).catch(function(error){
        console.log(error);
    });
}
