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
    for(let i = 0; i < vetorClientes.length; i++){
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
                <button class="btnEditar">Editar</button>
                <button class="btnDeletar">Deletar</button>
            </td>
        </tr>`;
    }
    let btnsEditar = document.querySelectorAll(".btnEditar");
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
})
async function editarUsuario(btn){
    let idUsuario = btn.parentElement.parentElement.id;
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