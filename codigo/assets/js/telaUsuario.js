document.addEventListener("DOMContentLoaded", async () => {
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
    const botaoAdicionar = document.getElementById("botaoAdicionar");
    const botaoRemover = document.getElementById("botaoRemover");

    const options = {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
      }
    try {
        const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, options);
        const usuarioJson = await response.json();
        botaoAdicionar.addEventListener("click", () => {
            adicionarContaConjunta(idUsuario);
        });
        botaoRemover.addEventListener("click", () => {
            removerContaConjunta(idUsuario);
        });
        if(usuarioJson.contaConjunta !== null && Object.keys(usuarioJson.contaConjunta) != 0){
            let email = document.querySelector(".infousuario[placeholder='Email']");
            let relacao = document.querySelector(".infousuario[placeholder='Relacao']");
            email.value = usuarioJson.contaConjunta.email
            email.readOnly = true;
            relacao.value = usuarioJson.contaConjunta.relacao
            relacao.readOnly = true;
            botaoAdicionar.style.display = "none";
        }
        else {
            let email = document.querySelector(".infousuario[placeholder='Email']");
            let relacao = document.querySelector(".infousuario[placeholder='Relacao']");
            email.value = "";
            relacao.value = "";
            botaoRemover.style.display = "none";
        }
        return usuarioJson;
    }
    catch(err){
        console.log(err);
        alert("Sessão invalida, faça o login");
        location.replace("../index.html");
    }
});

async function adicionarContaConjunta(idUsuario){
    let email = document.querySelector(".infousuario[placeholder='Email']").value;
    let relacao = document.querySelector(".infousuario[placeholder='Relacao']").value;

    if (!email || email === "" || !relacao || relacao === "") {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    const optionsGet = {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
    }
    try {
        const response = await fetch("http://localhost:3000/clientes/", optionsGet);
        const vetorClientes = await response.json();
        let existe = false
        let novaContaConjunta;
        for(let i = 0; i < vetorClientes.length; i++){
            if(vetorClientes[i].email === email){
                existe = true;
                novaContaConjunta = {
                    id: vetorClientes[i].id,
                    email: vetorClientes[i].email,
                    relacao: relacao
                }
            }
        }
        if(existe){
            const optionsPut = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: idUsuario,
                    contaConjunta: novaContaConjunta
                })
            }
            const responsePut = await fetch("http://localhost:3000/clientes/", optionsPut);
            alert("Conta conjunta adicionada com sucesso");
            location.reload();
        }
        else {
            alert("Conta não encontrada");
        }
    }
    catch(err){
        console.log(err);
        alert("Problema de comunicação com o servidor");
        location.replace("../index.html");
    }
}

async function removerContaConjunta(idUsuario) {
    const optionsPut = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: idUsuario,
            contaConjunta: {}
        })
    }
    try {
        const responsePut = await fetch("http://localhost:3000/clientes/", optionsPut);
        alert("Conta conjunta removida com sucesso");
        location.reload();
    }
    catch(err){
        console.log(err);
        alert("Problema de comunicação com o servidor");
        location.replace("../index.html");
    }
}