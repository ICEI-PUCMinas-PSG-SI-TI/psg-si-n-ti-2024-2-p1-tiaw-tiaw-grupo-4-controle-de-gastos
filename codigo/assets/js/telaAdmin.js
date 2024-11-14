window.addEventListener("load", async () => {
    let usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    let usuarioCorrente = {};
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
    } 
    if(usuarioCorrente.admin !== true){
        alert("Sessão invalida, faça o login");
        location.replace("login.html");
    }
    let tabelaUsuarios = document.getElementById("tabelaUsuarios");
    const options = {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
    }
    const response = await fetch("http://localhost:3000/clientes/", options);
    const vetorClientes = await response.json();
    for(let i = 0; i < vetorClientes.length && i < 9; i++){
        let isAdmin = "Não";
        if(vetorClientes[i].admin == true) {
            isAdmin = "Sim";
        }
        tabelaUsuarios.innerHTML += 
        `<tr id="${vetorClientes[i].id}">
            <td>${vetorClientes[i].nome}</td>
            <td>${vetorClientes[i].email}</td>
            <td>${isAdmin}</td>
            <td>
                <button class="btnEditarUsuario">Editar</button>
                <button class="btnDeletar">Deletar</button>
            </td>
        </tr>`;
    }
    if(vetorClientes.length >= 9){
        for(let i = 0; i < vetorClientes.length / 10; i++){
            tabelaUsuarios.innerHTML +=
            `
            <button id="${i}" class="btnPagina">${i+1}</button>
            `
        }
    }
    let btnsEditar = document.querySelectorAll(".btnEditarUsuario");
    btnsEditar.forEach(btn => {
        btn.addEventListener('click', () => {
            editarUsuario(btn);
        });
    });
    let btnsDeletar = document.querySelectorAll(".btnDeletar");
    btnsDeletar.forEach(btn => {
        btn.addEventListener('click', () => {
            deletarUsuario(btn);
        });
    });
    let btnsPagina = document.querySelectorAll(".btnPagina");
    btnsPagina.forEach(btn => {
        btn.addEventListener('click', () => {
            trocarPagina(btn);
        })
    })
})

async function trocarPagina(btn) {
    console.log(btn.id);
    const options = {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
    }
    const response = await fetch("http://localhost:3000/clientes/", options);
    const vetorClientes = await response.json();

    let tabelaUsuarios = document.getElementById("tabelaUsuarios");
    tabelaUsuarios.innerHTML = `<tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Opções</th>
                </tr>`;

    for(let i = btn.id*9, j = 0; j < 9 && i < vetorClientes.length; i++, j++){
        let isAdmin = "Não";
        if(vetorClientes[i].admin == true) {
            isAdmin = "Sim";
        }
        tabelaUsuarios.innerHTML += 
        `<tr id="${vetorClientes[i].id}">
            <td>${vetorClientes[i].nome}</td>
            <td>${vetorClientes[i].email}</td>
            <td>${isAdmin}</td>
            <td>
                <button class="btnEditarUsuario">Editar</button>
                <button class="btnDeletar">Deletar</button>
            </td>
        </tr>`;
    }
    for(let i = 0; i < vetorClientes.length / 10; i++){
        tabelaUsuarios.innerHTML +=
        `
        <button id="${i}" class="btnPagina">${i+1}</button>
        `
    }
    let btnsPagina = document.querySelectorAll(".btnPagina");
    btnsPagina.forEach(btn => {
        btn.addEventListener('click', () => {
            trocarPagina(btn);
        })
    });
    let btnsEditar = document.querySelectorAll(".btnEditarUsuario");
    btnsEditar.forEach(btn => {
        btn.addEventListener('click', () => {
            editarUsuario(btn);
        });
    });
    let btnsDeletar = document.querySelectorAll(".btnDeletar");
    btnsDeletar.forEach(btn => {
        btn.addEventListener('click', () => {
            deletarUsuario(btn);
        });
    });
}

async function editarUsuario(btn){
    let idUsuario = btn.parentElement.parentElement.id;
    let telaPadrao = document.getElementById("telaPadrao");
    let modalUsuario = document.getElementById("modalUsuario");
    let btnVoltar = document.getElementById("btnVoltar");
    telaPadrao.style.display = "none";
    modalUsuario.style.display = "block";
    let inputNome = document.getElementById("inputNome");
    let inputEmail = document.getElementById("inputEmail");
    let inputSenha = document.getElementById("inputSenha");
    let inputConfSenha = document.getElementById("inputConfSenha");

    let botaoEditarNome = document.getElementById("botaoNome");
    botaoEditarNome.addEventListener("click", ()=>{
        editarNome(inputNome, botaoEditarNome, idUsuario)
    });
    let botaoEditarEmail = document.getElementById("botaoEmail");
    botaoEditarEmail.addEventListener("click", ()=>{
        editarEmail(inputEmail, botaoEditarEmail, idUsuario)
    });
    let botaoSenha = document.getElementById("botaoSenha");
    botaoSenha.addEventListener("click", ()=>{
        editarSenha(inputSenha, inputConfSenha, botaoSenha, idUsuario)
    });

    receberInformacoes(idUsuario);

    btnVoltar.addEventListener("click",()=>{
        modalUsuario.style.display = "none";
        telaPadrao.style.display = "block";
        location.reload();
    })
}

async function deletarUsuario(btn){
    if(confirm("Você tem certeza que quer deletar este usuário? Essa ação não pode ser desfeita")){
        let idUsuario = btn.parentElement.parentElement.id;
        const options = {
            method: "DELETE",
            headers: {
              "Accept": "application/json",
            }
          }
        try {
            const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, options);
            const usuarioJson = await response.json();
            console.log(usuarioJson);
            alert("Conta deletada com sucesso");
            location.reload();
        }
        catch(err){
            console.log(err);
            alert("Houve um erro");
        }
    }
}
async function editarNome(inputNome, botaoEditarNome, idUsuario) {
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
        await atualizarNome(idUsuario);
    }
}
async function editarEmail(inputEmail, botaoEditarEmail, idUsuario) {
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
        await atualizarEmail(idUsuario);
    }
}
async function editarSenha(inputSenha, inputConfSenha, botaoSenha, idUsuario){
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
        await atualizarSenha(idUsuario);
    }
}
async function atualizarSenha(idUsuario){
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

async function atualizarNome(idUsuario){
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

async function atualizarEmail(idUsuario){
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
}
async function receberInformacoes(idUsuario) {
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
        alert("Houve um erro");
    }
}