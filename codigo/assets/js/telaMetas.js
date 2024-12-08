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
    let metas = await receberMetas(idUsuario);

    let btnsRemover = document.querySelectorAll(".removerMeta");
    btnsRemover.forEach(btn => {
        btn.addEventListener('click', () => {
            removerMeta(btn, metas, idUsuario);
        });
    });

    let btnCriarMeta = document.getElementById("btnCriarMeta");
    btnCriarMeta.addEventListener("click", () => {
        openModal()
    })
    let formMeta = document.getElementById("metaForm");
    formMeta.addEventListener("submit", (event) => {
        event.preventDefault();
        enviarMeta(metas, idUsuario);
    })

});

function openModal() {
    let titulo = document.getElementById("titulo");
    let descricao = document.getElementById("descricao");
    let valor = document.getElementById("valor");
    let tempo = document.getElementById("tempo");
    titulo.value = "";
    descricao.value = "";
    valor.value = "";
    tempo.value = "";
    document.getElementById("modal").style.display = "block"
}

async function receberMetas(idUsuario){
    const options = {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
    }
    try {
        const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, options);
        const usuarioJson = await response.json();
        let divMetas = document.getElementById("divMetas");
        let conteudo = "";
        const optionsData = {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
        if(usuarioJson.metas !== undefined && usuarioJson.metas.length > 0){
            for(let i = 0; i < usuarioJson.metas.length; i++) {
                let data = new Date(usuarioJson.metas[i].tempo);
                conteudo += `
                <div id="${usuarioJson.metas[i].id}" class="card meta-card">
                    <h2>${usuarioJson.metas[i].titulo}</h2>
                    <p>${usuarioJson.metas[i].descricao}.</p><br>
                    <p>Valor: R$ ${usuarioJson.metas[i].valor.toFixed(2)}</p>
                    <p>Objetivo da meta: ${data.toLocaleString('pt-BR', optionsData)}</p>
                    <button class="removerMeta">Remover</button>
                </div>
            `
            }
            divMetas.innerHTML = conteudo;
            return usuarioJson.metas;
        }
        return [];
    }
    catch(err){
        console.log(err);
        alert("Houve um erro no acesso ao servidor");
        location.replace("../index.html");
    }
}

window.onclick = function (event) {
    if (event.target === document.getElementById("modal")) {
        document.getElementById("modal").style.display = "none"
    }
}
async function enviarMeta(metas, idUsuario) {

    console.log(metas);

    let titulo = document.getElementById("titulo");
    let descricao = document.getElementById("descricao");
    let valor = document.getElementById("valor");
    let tempo = document.getElementById("tempo");

    const novaMeta = {
        id: generateUUID(),
        titulo: titulo.value,
		descricao: descricao.value,
		valor: parseFloat(valor.value),
		tempo: tempo.value
    }

    metas.push(novaMeta);
    
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: idUsuario,
            metas: metas
        })
    }
    try{
        const response = await fetch("http://localhost:3000/clientes/", options);
        const usuarioJson = await response.json();
        alert("Meta adicionada com sucesso");
        location.reload();
    }
    catch(err){
        console.log(err);
        alert("Houve um erro");
    }
        
}

async function removerMeta(btn, metas, idUsuario){
    if(confirm("Você tem certeza que quer deletar esta meta? Essa ação não pode ser desfeita")){
        let idMeta = btn.parentElement.id;
        for(let i = 0; i < metas.length; i++){
            if(metas[i].id === idMeta){
                metas.splice(i,1);
            }
        }
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: idUsuario,
                metas: metas
            })
          }
        try {
            const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, options);
            const usuarioJson = await response.json();
            alert("Meta removida com sucesso");
            location.reload();
        }
        catch(err){
            console.log(err);
            alert("Houve um erro");
        }
    }
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}