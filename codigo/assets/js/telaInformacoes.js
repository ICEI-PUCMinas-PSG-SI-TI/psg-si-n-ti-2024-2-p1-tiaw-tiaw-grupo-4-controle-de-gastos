let inputNome = document.getElementById("inputNome");
let inputEmail = document.getElementById("inputEmail");

let botaoEditarNome = document.getElementById("botaoNome");
botaoEditarNome.addEventListener("click", editarNome);

let botaoEditarEmail = document.getElementById("botaoEmail");
botaoEditarEmail.addEventListener("click", editarEmail);

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
    }
}