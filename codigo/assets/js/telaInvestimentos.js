window.addEventListener("load", async () => {
    setInputFilter(document.getElementById("qtd"), function(value) { // garante que será um número não decimal
        return /^-?\d*$/.test(value); }, "Deve ser um numero inteiro");
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
        location.replace("login.html");
    }
    
    let btnAdicionar = document.getElementById("btnAdicionar");
    let btnVoltar = document.getElementById("btnVoltar");
    let btnConfirmar = document.getElementById("btnConfirmar")

    btnAdicionar.addEventListener("click", async ()=> {
        await adicionarInvestimento();
    });

    btnVoltar.addEventListener("click", ()=> {
        window.location.reload();
    })

    btnConfirmar.addEventListener("click", ()=>{
        confirmarInvestimento(idUsuario);
    })

    await preencherTabela(idUsuario);

    let btnsDeletar = document.querySelectorAll(".btnDeletar");
    btnsDeletar.forEach(btn => {
        btn.addEventListener('click', () => {
            deletarInvestimento(idUsuario, btn);
        });
    });

    let btnsPagina = document.querySelectorAll(".btnPagina");
        btnsPagina.forEach(btn => {
            btn.addEventListener('click', () => {
                trocarPagina(btn, idUsuario);
        })
    });
})

async function preencherTabela(idUsuario) {
    const options = {
        method: "GET",
        headers: {
            "Accept": "application/json",
        }
    }

    let tabela = document.getElementById("tabelaUsuarios");
    
    try {
        const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, options);
        const usuarioJson = await response.json();
        
        let conteudoHTML = `<tr>
                    <th>Simbolo</th>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Quantidade</th>
                    <th>Valor total</th>
                </tr>`;
        
        if(usuarioJson.investimentos != null && usuarioJson.investimentos.length > 0){
            for(let i = 0; i < usuarioJson.investimentos.length && i < 6; i++) {
                const responseBrapi = await fetch(`https://brapi.dev/api/quote/${usuarioJson.investimentos[i].simbolo}?token=`, options); // COLOQUE UM TOKEN VALIDO PARA BRAPI
                const results = await responseBrapi.json();
                conteudoHTML += `
                <tr id="${results.results[0].symbol}">
                    <td>${results.results[0].symbol}</td>
                    <td>${results.results[0].longName}</td>
                    <td>R$ ${results.results[0].regularMarketPrice.toFixed(2)}</td>
                    <td>${usuarioJson.investimentos[i].quantidade}</td>
                    <td>R$ ${(results.results[0].regularMarketPrice * usuarioJson.investimentos[i].quantidade).toFixed(2)}</td>
                    <td class="tdBotao"><button class="btnDeletar">Deletar</button></td>
                </tr>
                `
            }
            for(let i = 0; i < Math.ceil(usuarioJson.investimentos.length / 6); i++){
                conteudoHTML +=
                `
                    <button id="${i}" class="btnPagina">${i+1}</button>
                `
            }
        }
        
        else {
            conteudoHTML = "Não há investimentos registrados ainda."
            usuarioJson.investimentos = [];
            const optionsPut = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: idUsuario,
                    investimentos: usuarioJson.investimentos
                })
            }
            const responsePut = await fetch("http://localhost:3000/clientes/", optionsPut);
        }

        tabela.innerHTML = conteudoHTML;
    }
    catch(err){
        console.log(err);
        alert("Sessão invalida, faça o login");
        location.replace("login.html");
    }
    
    
}

async function deletarInvestimento(idUsuario, btn) {
    let simboloInvestimento = btn.parentElement.parentElement.id;
    try {
        const optionsGet = {
            method: "GET",
            headers: {
                "Accept": "application/json",
            }
        }
        const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, optionsGet);
        const usuarioJson = await response.json();
        for(let i = 0; i < usuarioJson.investimentos.length; i++) {
            if(usuarioJson.investimentos[i].simbolo == simboloInvestimento){
                usuarioJson.investimentos.splice(i,1);
            }
        }
        const optionsPut = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: idUsuario,
                investimentos: usuarioJson.investimentos
            })
        }
        const responsePut = await fetch("http://localhost:3000/clientes/", optionsPut);
        alert("Investimento deletado com sucesso");
        window.location.reload();
    }
    catch(err){
        console.log(err);
    }
}

async function adicionarInvestimento(){
    let telaPadrao = document.getElementById("telaPadrao");
    let telaModal = document.getElementById("modalUsuario");
    let input = document.getElementById("qtd");

    input.value = "";

    telaPadrao.style.display = "none";
    telaModal.style.display = "block";

    let select = document.getElementById("listaInvestimentos");

    const options = {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
    }

    const response = await fetch(`https://brapi.dev/api/quote/list`, options);
    const results = await response.json();

    select.innerHTML = "";

    let buffer = "";

    for(let i = 0; i < results.stocks.length; i++){
        buffer += `
            <option>${results.stocks[i].stock}</option>
        `;
    }

    select.innerHTML = buffer;
}

async function confirmarInvestimento(idUsuario){
    let simbolo = document.getElementById("listaInvestimentos").value;
    let qtd = document.getElementById("qtd").value;

    if(qtd == "") {
        alert("O campo não deve estar vazio!");
    }

    else if(qtd <= 0) {
        alert("A quantidade deve ser positiva!");
    }

    else { 
        let novoInvestimento = {
            "simbolo": `${simbolo}`,
            "quantidade": qtd
        }
    
        try {
            const optionsGet = {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                }
            }
            const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, optionsGet);
            const usuarioJson = await response.json();
        
            let jaExiste = false;

            for(let i = 0; i < usuarioJson.investimentos.length; i++) {
                if(usuarioJson.investimentos[i].simbolo == novoInvestimento.simbolo) {
                    usuarioJson.investimentos[i] = novoInvestimento;
                    jaExiste = true;
                }
            }

            if(!jaExiste) {
                usuarioJson.investimentos.push(novoInvestimento);
            }

            const optionsPut = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: idUsuario,
                    investimentos: usuarioJson.investimentos
                })
            }
            const responsePut = await fetch("http://localhost:3000/clientes/", optionsPut);
            alert("Investimento adicionado com sucesso");

        }
        catch(err) {
            console.log(err);
            alert("Erro ao tentar resgatar informações do cliente");
        }
    
        window.location.reload();
    }
}

async function trocarPagina(btn,idUsuario) {
    const options = {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
    }
    const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, options);
    const usuarioJson = await response.json();

    let tabela = document.getElementById("tabelaUsuarios");
    let conteudoHTML = "";
    tabelaUsuarios.innerHTML = `<tr>
                    <th>Simbolo</th>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Quantidade</th>
                    <th>Valor total</th>
                </tr>`;

    for(let i = btn.id*6; i < btn.id*6+6 && i < usuarioJson.investimentos.length; i++){
        const responseBrapi = await fetch(`https://brapi.dev/api/quote/${usuarioJson.investimentos[i].simbolo}?token=t9qRZf2NE8H9a4mudhXuty`, options);
        const results = await responseBrapi.json();
        conteudoHTML += `
            <tr id="${results.results[0].symbol}">
            <td>${results.results[0].symbol}</td>
            <td>${results.results[0].longName}</td>
            <td>R$ ${results.results[0].regularMarketPrice.toFixed(2)}</td>
            <td>${usuarioJson.investimentos[i].quantidade}</td>
            <td>R$ ${(results.results[0].regularMarketPrice * usuarioJson.investimentos[i].quantidade).toFixed(2)}</td>
            <td class="tdBotao"><button class="btnDeletar">Deletar</button></td>
            </tr>
            `
    }
    tabelaUsuarios.innerHTML += conteudoHTML;
    for(let i = 0; i < Math.ceil(usuarioJson.investimentos.length / 6); i++){
        tabelaUsuarios.innerHTML +=
        `
        <button id="${i}" class="btnPagina">${i+1}</button>
        `
    }

    let btnsDeletar = document.querySelectorAll(".btnDeletar");
    btnsDeletar.forEach(btn => {
        btn.addEventListener('click', () => {
            deletarInvestimento(idUsuario, btn);
        });
    });


    let btnsPagina = document.querySelectorAll(".btnPagina");
    btnsPagina.forEach(btn => {
        btn.addEventListener('click', () => {
            trocarPagina(btn, idUsuario);
        })
    });
    
}

function setInputFilter(textbox, inputFilter) { // função que garante que o campo VALOR só aceite números inteiros
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
      textbox.addEventListener(event, function() {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  }