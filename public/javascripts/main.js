




window.onload = function(){

    document.getElementById('name').onfocus = function(){
        document.getElementsByClassName('nameLabel')[0].classList.add('nameFocused');
        document.getElementsByClassName('nameoverlay')[0].style.width = '150px';
    }
    document.getElementById('pass').onfocus = function(){
        document.getElementsByClassName('passLabel')[0].classList.add('passFocused');
        document.getElementsByClassName('passoverlay')[0].style.width = '150px';
    }
    document.getElementById('errorMessage').onclick = function(){
        document.getElementById('errorMessage').style.top = '-125px';
    }

}

window.onkeypress = function(){
    if(event.keyCode === 13){
        event.preventDefault();
        document.getElementById('loginBtn').click();
    }
}

function unfocus(element){
    if(document.getElementById(element).value == '' || document.getElementById(element).value == undefined){
        document.getElementsByClassName(element + 'Label')[0].classList.remove(element+'Focused');
        document.getElementsByClassName(element + 'overlay')[0].style.width = '0px';
    }
}



async function login(){
    var name = document.getElementById('name').value.toLowerCase();
    var password = document.getElementById('pass').value;


    if(name == '' || name == undefined || password == '' || password == undefined){
        document.getElementById('errorMessage').style.top = '0%';
    }else{

        await $.ajax({
            url: "/user/"+name+"/"+password,
            type: 'GET',
            success: function(res) {
                var body = document.getElementsByTagName('body')[0];
                body.innerHTML = '';
                if(res.role == 'admin'){
                    body.innerHTML += '<input type="button" id="addClass" value="Adicionar aula" onclick="addClass()">';
                    body.innerHTML += '<input type="button" id="removeClass" value="Remover aula" onclick="removeClass()">';
                    body.innerHTML += '<input type="button" id="updateClass" value="Atualizar aula" onclick="updateClass()">';
                    body.innerHTML += "<section id='modal' style='display:none'><section id='modalContainer'></section></section>";
                }
                body.innerHTML += "<section id='modal' style='display:none'><section id='modalContainer'></section></section>";
                body.innerHTML +="<section id='classes'></section>";
                carregarAulas();
            },
            error: function(err){
                document.getElementById('errorMessage').style.top = '0%';
            }
        });
    }

}

function addClass(){

    var modal = document.getElementById('modalContainer');

    modal.innerHTML = "<h1>Adicionar aula à coleção</h1>";
    modal.innerHTML += "<form><label for='nomeAula'>Nome do ficheiro</label>";
    modal.innerHTML += "<input type='date' id='nomeAula' required></input>";
    modal.innerHTML += "<label for='linkAula'>Link do ficheiro</label>";
    modal.innerHTML += "<input type='text' id='linkAula' required></input>";
    modal.innerHTML += "<section><input type='button' id='add' onclick='newClass()' value='Adicionar'></input><input type='button' id='cancel' value='Cancelar'></input></section></form>";

    


    document.getElementById('modal').onclick = function(){
        if(event.target.id === 'modal'){
            document.getElementById('modal').style.display = 'none';
            document.getElementById('add').value = 'Adicionar';
            document.getElementById('add').style.pointerEvents = 'all';
            document.getElementById('cancel').style.backgroundColor = '#de4463';
            document.getElementById('cancel').style.pointerEvents = 'all';
        }
    }

    document.getElementById('cancel').onclick = function(){
        document.getElementById('modal').style.display = 'none';
        document.getElementById('add').value = 'Adicionar';
        document.getElementById('add').style.pointerEvents = 'all';
        document.getElementById('cancel').style.backgroundColor = '#de4463';
        document.getElementById('cancel').style.pointerEvents = 'all';
    }
    document.getElementById('addClass').onclick = function(){
        document.getElementById('modal').style.display = 'block';
    }
}

function removeClass(){
    var modal = document.getElementById('modalContainer');

    modal.innerHTML = "<h1>Remover aula da coleção</h1>";
    modal.innerHTML += "<form><label for='nomeAula'>Nome do ficheiro</label>";
    modal.innerHTML += "<input type='date' id='nomeAula' required></input>";
    modal.innerHTML += "<section><input type='button' id='add' onclick='deleteClass()' value='Apagar'></input><input type='button' id='cancel' value='Cancelar'></input></section></form>";

    document.getElementById('modal').onclick = function(){
        if(event.target.id === 'modal'){
            document.getElementById('modal').style.display = 'none';
            document.getElementById('add').value = 'Adicionar';
            document.getElementById('add').style.pointerEvents = 'all';
            document.getElementById('cancel').style.backgroundColor = '#de4463';
            document.getElementById('cancel').style.pointerEvents = 'all';
        }
    }

    document.getElementById('cancel').onclick = function(){
        document.getElementById('modal').style.display = 'none';
        document.getElementById('add').value = 'Adicionar';
            document.getElementById('add').style.pointerEvents = 'all';
            document.getElementById('cancel').style.backgroundColor = '#de4463';
            document.getElementById('cancel').style.pointerEvents = 'all';
    }
    document.getElementById('removeClass').onclick = function(){
        document.getElementById('modal').style.display = 'block';
    }
}

function updateClass(){

    var modal = document.getElementById('modalContainer');

    modal.innerHTML = "<h1>Atualizar link da aula</h1>";
    modal.innerHTML += "<form><label for='nomeAula'>Nome do ficheiro</label>";
    modal.innerHTML += "<input type='date' id='nomeAula' required></input>";
    modal.innerHTML += "<label for='linkAula'>Novo link do ficheiro</label>";
    modal.innerHTML += "<input type='text' id='linkAula' required></input>";
    modal.innerHTML += "<section><input type='button' id='add' onclick='classUpdate()' value='Atualizar'></input><input type='button' id='cancel' value='Cancelar'></input></section></form>";

    document.getElementById('modal').onclick = function(){
        if(event.target.id === 'modal'){
            document.getElementById('modal').style.display = 'none';
            document.getElementById('add').value = 'Adicionar';
            document.getElementById('add').style.pointerEvents = 'all';
            document.getElementById('cancel').style.backgroundColor = '#de4463';
            document.getElementById('cancel').style.pointerEvents = 'all';
        }
    }

    document.getElementById('cancel').onclick = function(){
        document.getElementById('modal').style.display = 'none';
        document.getElementById('add').value = 'Adicionar';
            document.getElementById('add').style.pointerEvents = 'all';
            document.getElementById('cancel').style.backgroundColor = '#de4463';
            document.getElementById('cancel').style.pointerEvents = 'all';
    }
    document.getElementById('updateClass').onclick = function(){
        document.getElementById('modal').style.display = 'block';
    }
}

async function newClass(){
    var nomeFicheiro = document.getElementById('nomeAula').value.split("-").reverse().join("-");
    var linkFicheiro = document.getElementById('linkAula').value;


    if(nomeFicheiro === "" || linkFicheiro === ""){
        document.getElementById('add').value = 'Erro';
    }else{
        await $.ajax({
            url: "/aula/criar/"+nomeFicheiro+"/"+linkFicheiro,
            type: 'POST',
            success: function(res) {
                if(res === '200'){
                    document.getElementById('add').value = 'Concluido';
                    document.getElementById('add').style.pointerEvents = 'none';
                    document.getElementById('cancel').style.backgroundColor = 'darkgray';
                    document.getElementById('cancel').style.pointerEvents = 'none';
                }else{
                    document.getElementById('add').value = 'Erro';
                }
            },
            error: function(err){
                console.log(err.message);
            }
        });
    }
    
    
}

async function deleteClass(){
    var nomeFicheiro = document.getElementById('nomeAula').value.split("-").reverse().join("-");


    if(nomeFicheiro === ""){
        document.getElementById('add').value = 'Erro';
    }else{
        await $.ajax({
            url: "/aula/apagar/"+nomeFicheiro,
            type: 'POST',
            success: function(res) {
                if(res === '200'){
                    document.getElementById('add').value = 'Concluido';
                    document.getElementById('add').style.pointerEvents = 'none';
                    document.getElementById('cancel').style.backgroundColor = 'darkgray';
                    document.getElementById('cancel').style.pointerEvents = 'none';
                }else{
                    document.getElementById('add').value = 'Erro';
                }
            },
            error: function(err){
                console.log(err.message);
            }
        });
    }
}

async function classUpdate(){
    var nomeFicheiro = document.getElementById('nomeAula').value.split("-").reverse().join("-");
    var linkFicheiro = document.getElementById('linkAula').value;


    if(nomeFicheiro === ""){
        document.getElementById('add').value = 'Erro';
    }else{
        await $.ajax({
            url: "/aula/atualizar/"+nomeFicheiro+"/"+linkFicheiro,
            type: 'POST',
            success: function(res) {
                if(res === '200'){
                    document.getElementById('add').value = 'Concluido';
                    document.getElementById('add').style.pointerEvents = 'none';
                    document.getElementById('cancel').style.backgroundColor = 'darkgray';
                    document.getElementById('cancel').style.pointerEvents = 'none';
                }else{
                    document.getElementById('add').value = 'Erro';
                }
            },
            error: function(err){
                console.log(err.message);
            }
        });
    }
}


async function carregarAulas(){

    var classes = document.getElementById('classes');
    classes.innerHTML = "";

    await $.ajax({
        url: "/aula/",
        type: 'GET',
        success: function(aulas) {
            for(aula in aulas){
                classes.innerHTML += "<section id='class' onclick='abrirAula("+aula+")'><h1>"+aulas[aula].nome+"</h1><img src='./images/arrow.svg'></img></section>"
            }
        },
        error: function(err){
            console.log(err.message);
        }
    });
}

async function abrirAula(aula){
    var nome;
    var link;
    await $.ajax({
        url: "/aula/",
        type: 'GET',
        success: function(aulas) {
            nome = aulas[aula].nome;
            link = aulas[aula].link;
        },
        error: function(err){
            console.log(err.message);
        }
    });




    var modal = document.getElementById('modalContainer');

    modal.innerHTML = "<h1>Aula "+nome+"</h1>";
    modal.innerHTML += "<iframe src='https://drive.google.com/file/d/"+link+"/preview' allowfullscreen></iframe>";


    document.getElementById('modal').style.display = 'block';


    document.getElementById('modal').onclick = function(){
        if(event.target.id === 'modal'){
            document.getElementById('modal').style.display = 'none';
            modal.getElementsByTagName('iframe')[0].src = '"+link+"';
        }
    }
}

