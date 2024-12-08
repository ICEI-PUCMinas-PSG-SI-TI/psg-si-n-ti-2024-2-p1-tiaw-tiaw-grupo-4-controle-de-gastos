
document.addEventListener("DOMContentLoaded", async function() {
    setInputFilter(document.querySelector('input[placeholder="Valor"]'), function(value) {
        return /^-?\d*[.,]?\d{0,2}$/.test(value); }); // garante que o campo VALOR só aceite números com 2 casas decimais
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
    let usuarioJson = await receberUsuario(idUsuario);
    let botaoSalvar = document.getElementById("botaoSalvar");
    botaoSalvar.addEventListener("click", () => {
        salvarGasto(usuarioJson);
    });
});

async function receberUsuario(idUsuario) {
    const options = {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
      }
    try {
        const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, options);
        const usuarioJson = await response.json();
        return usuarioJson;
    }
    catch(err){
        console.log(err);
        alert("Sessão invalida, faça o login");
        location.replace("../index.html");
    }
}

async function atualizarGastos(gastos, idUsuario) {
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
    try{
        const response = await fetch("http://localhost:3000/clientes/", options);
        alert("Gasto inserido com sucesso");
    }
    catch(err){
        console.log(err);
        alert("Houve um erro");
    }    
}

async function salvarGasto(usuarioJson) {
    let titulo = document.querySelector('input[placeholder="Título"]').value;
    let categoria = document.querySelector('input[placeholder="Categoria"]').value;
    let valor = document.querySelector('input[placeholder="Valor"]').value;
    let data = document.querySelector('input[type="date"]').value;
    let recorrencia = document.querySelector('input[name="radio"]:checked')?.nextElementSibling.textContent;  

    if (!titulo || !categoria || !valor || !data || !recorrencia) {
        alert("Por favor, preencha todos os campos!");
    }
    else {
        let id = generateUUID();
        valor = parseFloat(valor);
        const novoGasto = { id, titulo, categoria, valor, data, recorrencia}; 
        let gastos = usuarioJson.gastos;
        if(gastos === undefined){
            gastos = [];
        }
        gastos.push(novoGasto);
        await atualizarGastos(gastos, usuarioJson.id);    
    }    
    limparCampos(); // Limpa os campos após salvar
}

function limparCampos() {
    document.querySelector('input[placeholder="Título"]').value = "";
    document.querySelector('input[placeholder="Categoria"]').value = "";
    document.querySelector('input[placeholder="Valor"]').value = "";
    document.querySelector('input[type="date"]').value = "";
    document.querySelector('input[name="radio"]:checked').checked = false;
}

// Fonte: https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
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


function setInputFilter(textbox, inputFilter) { // função que garante que o campo VALOR só aceite números com 2 casas decimais
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
  