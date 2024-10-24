let inputNome = document.getElementById("inputNome");
let inputEmail = document.getElementById("inputEmail");

let botaoEditarNome = document.getElementById("botaoNome");
botaoEditarNome.addEventListener("click", editarNome);

let botaoEditarEmail = document.getElementById("botaoEmail");
botaoEditarEmail.addEventListener("click", editarEmail);

let idUsuario = 0; // deveremos receber o id do usuário através do sistema de login

receberInformacoes();


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
        botaoEditarNome.style.backgroundColor = "#3f225f";
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
        botaoEditarEmail.style.backgroundColor = "#3f225f";
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
    const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, options);
    const usuarioJson = await response.json();
    inputNome.value = usuarioJson.nome;
    inputEmail.value = usuarioJson.email;
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
    inputEmail.value = usuarioJson.email;
}