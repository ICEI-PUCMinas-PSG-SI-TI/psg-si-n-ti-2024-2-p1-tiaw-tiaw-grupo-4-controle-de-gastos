window.addEventListener("load", async () => {
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
        location.replace("../index.html");
    }
    await setBalance(idUsuario);
    let btnDefinir = document.getElementById("btnDefinir");
    btnDefinir.addEventListener("click", async ()=> {
        await updateBalance(idUsuario);
    })
});

// Função para atualizar o saldo
async function updateBalance(idUsuario) {
    // Obter valor digitado
    let balance = 0;
    const amountInput = document.getElementById('amount');
    const amount = parseFloat(amountInput.value);

    // Verificar se o valor é válido
    if (isNaN(amount) || amount <= 0) {
        alert('Por favor, insira um valor válido!');
        return;
    }

    // Adicionar ou subtrair do saldo
    balance = amount;

    // Atualizar exibição do saldo
    document.getElementById('balance').textContent = balance.toFixed(2);

    // Limpar o campo de entrada
    amountInput.value = '';

    // Atualizar o json
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: idUsuario,
            saldo: balance
        })
    }
    try{
        const response = await fetch("http://localhost:3000/clientes/", options);
        const usuarioJson = await response.json();
    }
    catch(err){
        console.log(err);
        alert("Houve um erro na comunicação com o servidor");
    }
}

async function setBalance(idUsuario){
    const options = {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
      }
    try {
        const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, options);
        const usuarioJson = await response.json();
        if(usuarioJson.saldo != null){
            document.getElementById('balance').textContent = usuarioJson.saldo.toFixed(2);
        }
        else document.getElementById('balance').textContent = "0.00"
        
    }
    catch(err){
        console.log(err);
        alert("Houve um problema ao receber as informaçoes do servidor");
        location.replace("../index.html");
    }
}