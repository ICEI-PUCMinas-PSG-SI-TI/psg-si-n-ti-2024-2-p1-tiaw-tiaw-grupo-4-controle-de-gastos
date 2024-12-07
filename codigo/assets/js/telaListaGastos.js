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
        for(let i = 0; i < cliente.gastos.length && i < 9; i++){
            tabelaUsuarios.innerHTML += 
            `<tr id="${cliente.gastos[i].id}">
                <td>${cliente.gastos[i].titulo}</td>
                <td>${cliente.gastos[i].categoria}</td>
                <td>${cliente.gastos[i].data}</td>
                <td>${cliente.gastos[i].valor}</td>
                <td>${cliente.gastos[i].recorrencia}</td>
                <td><button class="btnDeletar">Deletar</button></td>
            </tr>`;
        }
    }
    catch(err){
        console.log(err);
        alert("Problema de comunicação com o servidor");
        location.replace("../index.html");
    }
    if(cliente.gastos.length >= 9){
        for(let i = 0; i < Math.ceil(cliente.gastos.length / 9); i++){
            tabelaUsuarios.innerHTML +=
            `
            <button id="${i}" class="btnPagina">${i+1}</button>
            `
        }
    }
    let btnsDeletar = document.querySelectorAll(".btnDeletar");
    btnsDeletar.forEach(btn => {
        btn.addEventListener('click', () => {
            deletarGasto(idUsuario, cliente.gastos, btn);
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
    for(let i = 0; i < cliente.gastos.length && i < 9; i++){
        tabelaUsuarios.innerHTML += 
        `<tr id="${cliente.gastos[i].id}">
            <td>${cliente.gastos[i].titulo}</td>
            <td>${cliente.gastos[i].categoria}</td>
            <td>${cliente.gastos[i].data}</td>
            <td>${cliente.gastos[i].valor}</td>
            <td>${cliente.gastos[i].recorrencia}</td>
            <td><button class="btnDeletar">Deletar</button></td>
        </tr>`;
    }
    if(cliente.gastos.length >= 9){
        for(let i = 0; i < Math.ceil(cliente.gastos.length / 9); i++){
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
            deletarGasto(idUsuario, cliente.gastos, btn);
        });
    });
}

async function deletarGasto(idUsuario, gastos, btn){
    if(confirm("Você tem certeza que quer deletar este gasto? Essa ação não pode ser desfeita")){
        let idGasto = btn.parentElement.parentElement.id;
        for(let i = 0; i < gastos.length; i++){
            if(gastos[i].id == idGasto){
                gastos.splice(i,1);
            }
        }
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: idUsuario,
                gastos: gastos
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