const nome = document.getElementById('nome');
const sobrenome = document.getElementById('sobrenome');
const nasc = document.getElementById('nasc');
const emailHTML = document.getElementById('email');
const editar = document.getElementById('editar');
const enviar = document.getElementById('enviar');
const deleteUser = document.getElementById('delete');
const perfil = document.getElementById('perfil');

var email = localStorage.getItem(email);

window.addEventListener('load', (e) => {
    dadosUsuario(email);
});

editar.addEventListener('click', (e) => {
    editarUsuario();
})

function dadosUsuario(email) {
    fetch('http://localhost:3000/cadastrados/' + email, { method: 'GET' })
    .then(response => {
        return response.json();
    }).then(obj => {
        nome.value = obj.nome;
        sobrenome.value = obj.sobrenome;
        nasc.value = obj.nasc;
        emailHTML.value = obj.email;
    }).catch(err => console.log(err));
}

function editarUsuario() {
    nome.removeAttribute('disabled');
    sobrenome.removeAttribute('disabled');
    nasc.removeAttribute('disabled');
    editar.setAttribute('disabled', true);
    enviar.removeAttribute('disabled');
    deleteUser.removeAttribute('disabled');
}

enviar.addEventListener('click', (e) => {
    e.preventDefault();

    const form = new FormData(perfil);
    const dados = JSON.stringify(Object.fromEntries(form));

    updateUsuario(dados);
});

function updateUsuario(dados) {
    const options = {
        method: 'PUT',
        body: dados,
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }

    fetch('http://localhost:3000/cadastrados/' + email, options)
    .then(response => {
        if(response.ok)
            window.location.reload();
    }).catch(err => console.log(err));
}

deleteUser.addEventListener('click', (e) => {
    e.preventDefault();

    deleteUsuario()
});

function deleteUsuario() {
    fetch('http://localhost:3000/cadastrados/' + email, { method: 'DELETE' })
    .then(response => {
        if(response.ok)
            window.alert('Usuário deletado!');
            window.location.href="index.html";
    }).catch(err => console.log(err));
}