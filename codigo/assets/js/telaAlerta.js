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
  await atualizarDados(idUsuario);
})

async function atualizarDados(idUsuario) {
  const saldo = document.getElementById("saldo");
  const gastos = document.getElementById("gastos");
  const mensagem = document.getElementById("mensagem");

  const options = {
    method: "GET",
    headers: {
      "Accept": "application/json",
    }
  }
  try {
      const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, options);
      const usuarioJson = await response.json();

      const dataAtual = new Date();

      const ano = 2024;
      let gastosDoMes = 0; 
  
      usuarioJson.gastos.forEach(gasto => {
          const [anoData, mesData] = gasto.data.split("-").map(Number);
          if (anoData === ano && mesData === dataAtual.getMonth()+1) {
            gastosDoMes += parseFloat(gasto.valor); 
          }
      });
      let saldoExibido = 0;
      let gastoExibido = 0;
      if(usuarioJson.saldo !== undefined){
        saldoExibido = usuarioJson.saldo;
      }
      if(gastosDoMes !== undefined){
        gastoExibido = gastosDoMes;
      }
      saldo.textContent = `Seu saldo atual é de: R$ ${saldoExibido.toFixed(2)}`;
      gastos.textContent = `Você tem gastos futuros previstos de R$ ${gastoExibido.toFixed(2)}`;
    
      if (usuarioJson.saldo < gastosDoMes) {
        mensagem.textContent = "Por favor, revise seus gastos ou adicione mais fundos para evitar saldo negativo.";
        mensagem.style.color = "red";
      } else {
        mensagem.textContent = "Tudo está em ordem com seu saldo.";
        mensagem.style.color = "green";
      }
      
  }
  catch(err){
      console.log(err);
      alert("Houve um problema ao receber as informaçoes do servidor");
      location.replace("../index.html");
  }
}


  