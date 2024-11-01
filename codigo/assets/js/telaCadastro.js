let botaoSubmit = document.getElementById("btnCadastrar");
botaoSubmit.addEventListener("click", receberCadastro);

async function receberCadastro() {
  let formValido = true;
  let nomeUsuario = document.getElementById("inputUsuario").value;
  let emailUsuario = document.getElementById("inputEmail").value;
  let senhaUsuario = document.getElementById("inputSenha").value;
  let senhaConfirmadaUsuario = document.getElementById("inputSenhaConfirmada").value;
  if (nomeUsuario == "" || nomeUsuario == null) {
    alert("O campo de nome não pode ser vazio!");
    formValido = false;
  } else if (emailUsuario == "" || emailUsuario == null) {
    alert("O campo de email não pode ser vazio!");
    formValido = false;
  } else if (senhaUsuario == "" || senhaUsuario == null) {
    alert("O campo de senha não pode ser vazio!");
    formValido = false;
  } else if (senhaConfirmadaUsuario == "" ||
    senhaConfirmadaUsuario == null ||
    senhaConfirmadaUsuario != senhaUsuario
  ) {
    alert("As duas senhas não são iguais");
    formValido = false;
  }
  if (formValido) {
    let senhaHash = await digestMessage(senhaUsuario);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: nomeUsuario,
        email: emailUsuario,
        pw_hash: senhaHash,
      })
    }
    let response = await fetch("http://localhost:3000/clientes/", options);
    let responseText = await response.text();
    try{
      let responseJSON = JSON.parse(responseText);
      if(typeof(responseJSON) === "object" && responseJSON !== null){
        alert("Conta criada com sucesso!");
      }
      location.replace("login.html");
    }
    catch(err){
      alert("Email já em uso");
    }
  }
}

async function digestMessage(message) {
  // função de hashing obtida de developer.mozilla.org
  const msgUint8 = new TextEncoder().encode(message); // codifica a entrada como (utf-8) Uint8Array
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8); // transforma em hash
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // converte buffer para byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(""); // converte bytes para string de hexadecimais
  return hashHex;
}
