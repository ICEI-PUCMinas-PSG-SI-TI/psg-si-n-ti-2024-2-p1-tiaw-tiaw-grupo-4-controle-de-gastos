document.addEventListener("DOMContentLoaded", function() {
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
       // alert("Sessão invalida, faça o login");
       // location.replace("login.html");
       //NÃO TIRA ESSE COMMENT AAAAAAAAAA RODA O SERVIDOR
    }
    
    let usuarioJson = receberUsuario();
    
    const titulo = document.querySelector('input[placeholder="Título"]').value;
    const categoria = document.querySelector('input[placeholder="Categoria"]').value;
    const valor = document.querySelector('input[placeholder="Valor"]').value;
    const data = document.querySelector('input[type="date"]').value;
    const recorrencia = document.querySelector('input[name="radio"]:checked')?.nextElementSibling.textContent;  

    if (!titulo || !categoria || !valor || !data || !recorrencia) {
        alert("Por favor, preencha todos os campos!");
    }
    else {
        const id = gastos.length ? gastos[gastos.length - 1].id + 1 : 1; // Gera um ID único
        const novoGasto = { id, titulo, categoria, valor, data, recorrencia }; 
        let gastos = usuarioJson.gastos;
        gastos.push(novoGasto);
        atualizarGastos(gastos);    
    }    
    
    limparCampos(); // Limpa os campos após salvar
    alert("Gasto salvo com sucesso");

    // Função para limpar os campos após salvar ou editar
    function limparCampos() {
        document.querySelector('input[placeholder="Título"]').value = "";
        document.querySelector('input[placeholder="Categoria"]').value = "";
        document.querySelector('input[placeholder="Valor"]').value = "";
        document.querySelector('input[type="date"]').value = "";
        document.querySelector('input[name="radio"]:checked').checked = false;
    }

    // Ação do botão Salvar
    document.getElementById("botaoSalvar").addEventListener("click", salvarGasto);
});

async function receberUsuario() {
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
        location.replace("login.html");
    }
}

async function atualizarGastos(gastos) {
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
        const usuarioJson = await response.json();
        alert("Gasto inserido com sucesso");
    }
    catch(err){
        console.log(err);
        alert("Houve um erro");
    }    
}