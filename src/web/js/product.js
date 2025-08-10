import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"
'use strict'

const switchers = document.querySelectorAll('.btn, .btn2, .theme-switch__checkbox');


$("#btnLogin").click(async function () {
        var id= $("#txtId").val()
        var name= $("#txtName").val()
        var description= $("#txtDescription").val()
        var price= $("#txtPrice").val()
        var category= $("#ddICategory option:selected").val()
        if(!id){
            await axios.post(url + 'product', {
                name:name,
                description:description,
                price:price,
                category:{
                    id:category
                }
            }).then(function (response) {
                alert("Produto gravado com sucesso");
                location.reload();
            }).catch(function (error) {
                alert("Erro durante a gravação");
            });
        }else{
            await axios.put(url + 'users/' + id, {
                name:name,
                description:description,
                price:price,
                category:{
                    id:category
                }
            }).then(function (response) {
                alert("Produto Atualizado com sucesso");
                location.reload();
            }).catch(function (error) {
                alert("Erro durante a gravação");
            });
        }
    });



$("#btnCancelar").click(async function () {
    try {
        $("#txtName").val('')
        $("#txtDescription").val('')
        $("#txtPrice").val('')
    } catch (errors) {
        alert(errors)
    }
});

$(document).ready(function () {
    axios.get(url + 'category', {
    }).then(function(response){
        $.each(response.data, function(key, item){
            $('#ddICategory').append(
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
    axios.get(url + 'product',{
    }).then(function(response){

        let table= new DataTable('#tbProduct',{
            data: response.data,
            columns:[
                {data:'id'},
                {data:'name'},
                {data:'description'},
                {data:'price'},
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
                loadProduct(data.id);
            } else{
                Excluir(data.id);
            }
        });
    }).catch(function(error){
        alert(error);
    });
}



async function Excluir(id){
    await axios.delete(url +"product/" + id, {
    }).then(function (response) {
        alert("Registro Excluido com sucesso");
        location.reload();
    }).catch(function(error){
        console.log(error);
    });

}


async function loadProduct(id){
    await axios.get(url +'product/' + id, {
    }).then(function (response) {
        $("#txtId").val(response.data.id)
        $("#txtName").val(response.data.name)
        $("#txtDescription").val(response.data.description)
        $("#txtPrice").val(response.data.price)
    }).catch(function(error){
        console.log(error);
    });

}
