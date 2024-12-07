let usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
let usuarioCorrente = {};
let idUsuario;
if (usuarioCorrenteJSON) {
    usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
} 
if(usuarioCorrente != null){
    idUsuario = usuarioCorrente.id; 
}
else {
    alert("Sessão invalida, faça o login");
    location.replace("../index.html");
}

let inputNome = document.getElementById("inputNome");
let inputEmail = document.getElementById("inputEmail");

let botaoEditarNome = document.getElementById("botaoNome");
botaoEditarNome.addEventListener("click", editarNome);

let botaoEditarEmail = document.getElementById("botaoEmail");
botaoEditarEmail.addEventListener("click", editarEmail);

let botaoLogout = document.getElementById("btnLogout");
botaoLogout.addEventListener("click", fazerLogout);

let botaoDeletar = document.getElementById("btnDeletar");
botaoDeletar.addEventListener("click", deletarConta);

let botaoSenha = document.getElementById("botaoSenha");
let inputSenha = document.getElementById("inputSenha");
let inputConfSenha = document.getElementById("inputConfSenha");
botaoSenha.addEventListener("click", editarSenha);


receberInformacoes();


function fazerLogout(){
    sessionStorage.setItem('usuarioCorrente', null);
    alert("Logout bem sucedido");
    location.replace("../index.html");
}

async function deletarConta(){
    if(confirm("Tem certeza que deseja deletar a conta? Esta ação não pode ser desfeita")){
        const options = {
            method: "DELETE",
            headers: {
              "Accept": "application/json",
            }
          }
        try {
            sessionStorage.setItem('usuarioCorrente', null);
            const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, options);
            const usuarioJson = await response.json();
            console.log(usuarioJson);
            alert("Conta deletada com sucesso");
            location.replace("../index.html");
        }
        catch(err){
            console.log(err);
            alert("Houve um erro");
            location.replace("../index.html");
        }
    }
}

function editarSenha(){
    if (inputSenha.hasAttribute('readonly')) {
        inputSenha.removeAttribute('readonly');
        inputConfSenha.removeAttribute('readonly');
        inputSenha.style.visibility= 'visible';
        inputConfSenha.style.visibility= 'visible';
        botaoSenha.innerHTML = "Salvar";
        botaoSenha.style.backgroundColor = "#49CB8F";
        inputSenha.style.backgroundColor = "#FFFFFF";
        inputConfSenha.style.backgroundColor = "#FFFFFF";
        botaoSenha.style.transition = "all 0.1s";
    } else {
        inputSenha.setAttribute('readonly', 'readonly');
        inputConfSenha.setAttribute('readonly', 'readonly');
        inputSenha.style.visibility='hidden';
        inputConfSenha.style.visibility='hidden' 
        botaoSenha.innerHTML = "Editar senha";
        botaoSenha.style.backgroundColor = "#7908e2";
        inputSenha.style.backgroundColor = "#D3D3D3";
        inputConfSenha.style.backgroundColor = "#D3D3D3";
        atualizarSenha();
    }
}

function editarNome() {
    if (inputNome.hasAttribute('readonly')) {
        inputNome.removeAttribute('readonly');
        botaoEditarNome.innerHTML = "Salvar";
        botaoEditarNome.style.backgroundColor = "#49CB8F";
        inputNome.style.backgroundColor = "#FFFFFF";
        botaoEditarNome.style.transition = "all 0.1s";
    } else {
        inputNome.setAttribute('readonly', 'readonly');
        botaoEditarNome.innerHTML = "Editar nome";
        botaoEditarNome.style.backgroundColor = "#7908e2";
        inputNome.style.backgroundColor = "#D3D3D3";
        atualizarNome();
    }
}

function editarEmail() {
    if (inputEmail.hasAttribute('readonly')) {
        inputEmail.removeAttribute('readonly');
        botaoEditarEmail.innerHTML = "Salvar";
        botaoEditarEmail.style.backgroundColor = "#49CB8F";
        inputEmail.style.backgroundColor = "#FFFFFF";
        botaoEditarEmail.style.transition = "all 0.1s";
    } else {
        inputEmail.setAttribute('readonly', 'readonly');
        botaoEditarEmail.innerHTML = "Editar email";
        botaoEditarEmail.style.backgroundColor = "#7908e2";
        inputEmail.style.backgroundColor = "#D3D3D3";
        atualizarEmail();
    }
}

async function receberInformacoes() {
    const options = {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
      }
    try {
        const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, options);
        const usuarioJson = await response.json();
        inputNome.value = usuarioJson.nome;
        inputEmail.value = usuarioJson.email;
    }
    catch(err){
        console.log(err);
        alert("Houve um erro no acesso ao servidor");
        location.replace("../index.html");
    }
}

async function atualizarSenha(){
    inputSenha = document.getElementById("inputSenha");
    inputConfSenha = document.getElementById("inputConfSenha");
    if(inputSenha.value !== inputConfSenha.value){
        alert("As senhas não são iguais!");
    }
    else if(inputSenha.value === "" || inputConfSenha.value === "") {
        alert("Os campos não podem estar vazios");
    }
    else {
        let senhaHash = await digestMessage(inputSenha.value);
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: idUsuario,
                pw_hash: senhaHash
            })
        }
        try{
            const response = await fetch("http://localhost:3000/clientes/", options);
            const usuarioJson = await response.json();
            alert("Senha atualizada com sucesso");
        }
        catch(err){
            console.log(err);
            alert("Houve um erro");
        }
    }
}

async function atualizarNome(){
    let nomeUsuario = document.getElementById("inputNome").value
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: idUsuario,
            nome: nomeUsuario
        })
      }
    const response = await fetch("http://localhost:3000/clientes/", options);
    const usuarioJson = await response.json();
    inputNome.value = usuarioJson.nome;
}

async function atualizarEmail(){
    let emailUsuario = document.getElementById("inputEmail").value
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: idUsuario,
            email: emailUsuario
        })
      }
    const response = await fetch("http://localhost:3000/clientes/", options);
    const usuarioJson = await response.json();
    if(emailUsuario != usuarioJson.email) {
        alert("Email já em uso");
    }
    inputEmail.value = usuarioJson.email;
    usuarioCorrente.email = usuarioJson.email;
    sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
}

async function digestMessage(message) {
    // função de hashing obtida de developer.mozilla.org
    const msgUint8 = new TextEncoder().encode(message); // codifica a entrada como (utf-8) Uint8Array
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // transforma em hash
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // converte buffer para byte array
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // converte bytes para string de hexadecimais
    return hashHex;
  }
  