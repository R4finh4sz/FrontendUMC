import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"
'use strict'

const switchers = document.querySelectorAll('.btn, .btn2, .theme-switch__checkbox');


$("#btnLogin").click(async function () {
    var id= $("#txtId").val()
    var user= $("#ddIUser option:selected").val()
    var product= $("#ddIProduct option:selected").val()
    var quantity= $("#txtQuantidade").val()
    var client= $("#ddIClient option:selected").val()  
    if(!id){
        await axios.post(url + 'sale', {
        user:{id:user},
        product:{id:product},
        quantity:quantity,
        client:{id:client}
    }).then(function (response) {
        alert("Venda gravada com sucesso");
        location.reload();
    }).catch(function (error) {
        alert("Erro durante a gravação");
    });
}else{
    await axios.put(url + 'sale/' + id, {
        user:{id:user},
        product:{id:product},
        quantity:quantity,
        client:{id:client}
    }).then(function (response) {
        alert("Venda Atualizada com sucesso");
        location.reload();
    }).catch(function (error) {
        alert("Erro durante a gravação");
    });
}
});


$(document).ready(function () {
    axios.get(url + 'product', {
    }).then(function(response){
        $.each(response.data, function(key, item){
            $('#ddIProduct').append(
                $("<option></option>")
                    .attr("value", item.id)
                    .text(item.name)
            );
        });
    })


    axios.get(url + 'user', {
    }).then(function(response){
        $.each(response.data, function(key, item){
            $('#ddIUser').append(
                $("<option></option>")
                    .attr("value", item.id)
                    .text(item.name)
            );
        });
    })

    
    axios.get(url + 'client', {
    }).then(function(response){
        $.each(response.data, function(key, item){
            $('#ddIClient').append(
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


$("#btnCancelar").click(async function () {
    try {
        $("#txtUser").val('')
        $("#txtProduct").val('')
        $("#txtQuantidade").val('')
        $("#txtClient").val('')
        } catch (errors) {
            alert(errors)
        }
    });
    

function loadTable() {
    axios.get(url + 'sale',{
    }).then(function(response){

        let table= new DataTable('#tbSale',{
            data: response.data,
            columns:[
                {data:'id'},
                {data:'quantity'},
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
                loadSale(data.id);
            } else{
                Excluir(data.id);
            }
        });
    }).catch(function(error){
        alert(error);
    });
}


async function Excluir(id){
    await axios.delete(url +"sale/" + id, {
    }).then(function (response) {
        alert("Registro Excluido com sucesso");
        location.reload();
    }).catch(function(error){
        consolo.log(error);
    });

}


async function loadSale(id){
    await axios.get(url +'sale/' + id, {
    }).then(function (response) {
        $("#txtId").val(response.data.id)
        $("#txtQuantidade").val(response.data.quantity)
    }).catch(function(error){
        console.log(error);
    });
}
