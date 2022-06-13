const cadastro = document.getElementById('cadastro');
const login = document.getElementById('login');
var email;

cadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData(cadastro);
    const dados = JSON.stringify(Object.fromEntries(form));

    cadastraUsuario(dados);
})

function cadastraUsuario(dados){
    const options = {
        method: 'POST',
        body: dados,
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }

    fetch('http://localhost:3000/cadastrados', options)
    .then(response => {
        if(response.ok)
            window.alert("Cadastrado com sucesso!");
    })
    .catch(err => console.log(err));
}


login.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData(login);
    const dados = JSON.stringify(Object.fromEntries(form));

    confereUsuario(dados);
});

function confereUsuario(dados){
    const options = {
        method: 'POST',
        body: dados,
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }

    fetch('http://localhost:3000/cadastrados/login', options)
    .then(response => {
        console.log(response.ok)
        if(response.ok){
            window.location.href="dash.html";
            emailUsuario = JSON.parse(dados).email;
            localStorage.setItem(email, emailUsuario);
        }
        else
            window.alert("Usuário e senha não conferem!");
    })
    .catch(err => console.log(err));
}