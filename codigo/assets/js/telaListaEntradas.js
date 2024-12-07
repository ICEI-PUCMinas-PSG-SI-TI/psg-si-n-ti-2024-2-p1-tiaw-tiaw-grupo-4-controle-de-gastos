window.addEventListener("load", async () => {
    let usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
    let usuarioCorrente = {};
    let idUsuario;
    if (usuarioCorrenteJSON) {
        usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
    } 
    if(usuarioCorrente != null) {
        idUsuario = usuarioCorrente.id; 
    }
    else {
       alert("Sessão invalida, faça o login");
       location.replace("../index.html");
    }
    let tabelaUsuarios = document.getElementById("tabelaUsuarios");
    const options = {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
    }
    try{
        const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, options);
        const cliente = await response.json();
        for(let i = 0; i < cliente.entradas.length && i < 9; i++){
            tabelaUsuarios.innerHTML += 
            `<tr id="${cliente.entradas[i].id}">
                <td>${cliente.entradas[i].titulo}</td>
                <td>${cliente.entradas[i].data}</td>
                <td>${cliente.entradas[i].valor}</td>
                <td>${cliente.entradas[i].recorrencia}</td>
                <td><button class="btnDeletar">Deletar</button></td>
            </tr>`;
        }
    }
    catch(err){
        console.log(err);
        alert("Problema de comunicação com o servidor");
        location.replace("../index.html");
    }
    if(cliente.entradas.length >= 9){
        for(let i = 0; i < Math.ceil(cliente.entradas.length / 9); i++){
            tabelaUsuarios.innerHTML +=
            `
            <button id="${i}" class="btnPagina">${i+1}</button>
            `
        }
    }
    let btnsDeletar = document.querySelectorAll(".btnDeletar");
    btnsDeletar.forEach(btn => {
        btn.addEventListener('click', () => {
            deletarGasto(idUsuario, cliente.entradas, btn);
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
    let tabelaUsuarios = document.getElementById("tabelaUsuarios");
    const options = {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
    }
    const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, options);
    const cliente = await response.json();
    for(let i = 0; i < cliente.entradas.length && i < 9; i++){
        tabelaUsuarios.innerHTML += 
        `<tr id="${cliente.entradas[i].id}">
            <td>${cliente.entradas[i].titulo}</td>
            <td>${cliente.entradas[i].data}</td>
            <td>${cliente.entradas[i].valor}</td>
            <td>${cliente.entradas[i].recorrencia}</td>
            <td><button class="btnDeletar">Deletar</button></td>
        </tr>`;
    }
    if(cliente.entradas.length >= 9){
        for(let i = 0; i < Math.ceil(cliente.entradas.length / 9); i++){
            tabelaUsuarios.innerHTML +=
            `
            <button id="${i}" class="btnPagina">${i+1}</button>
            `
        }
    }
    let btnsPagina = document.querySelectorAll(".btnPagina");
    btnsPagina.forEach(btn => {
        btn.addEventListener('click', () => {
            trocarPagina(btn);
        })
    });
    let btnsDeletar = document.querySelectorAll(".btnDeletar");
    btnsDeletar.forEach(btn => {
        btn.addEventListener('click', () => {
            deletarGasto(idUsuario, cliente.entradas, btn);
        });
    });
}

async function deletarGasto(idUsuario, entradas, btn){
    if(confirm("Você tem certeza que quer deletar este gasto? Essa ação não pode ser desfeita")){
        let idGasto = btn.parentElement.parentElement.id;
        for(let i = 0; i < entradas.length; i++){
            if(entradas[i].id == idGasto){
                entradas.splice(i,1);
            }
        }
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: idUsuario,
                entradas: entradas
            })
        }
        try {
            const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, options);
            const usuarioJson = await response.json();
            alert("Gasto deletado com sucesso");
            location.reload();
        }
        catch(err){
            console.log(err);
            alert("Houve um erro");
        }
    }
}