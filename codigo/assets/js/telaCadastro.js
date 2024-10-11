let botaoSubmit = document.getElementById("btnCadastrar")
botaoSubmit.addEventListener("click", receberCadastro)

async function receberCadastro() {
  let formValido = true
  let nomeUsuario = document.getElementById("inputUsuario").value
  if (nomeUsuario == "" || nomeUsuario == null) {
    alert("O campo de nome não pode ser vazio!")
    formValido = false
  }
  let emailUsuario = document.getElementById("inputEmail").value
  if (emailUsuario == "" || emailUsuario == null) {
    alert("O campo de email não pode ser vazio!")
    formValido = false
  }
  let senhaUsuario = document.getElementById("inputSenha").value
  if (senhaUsuario == "" || senhaUsuario == null) {
    alert("O campo de senha não pode ser vazio!")
    formValido = false
  }
  let senhaConfirmadaUsuario = document.getElementById(
    "inputSenhaConfirmada",
  ).value
  if (
    senhaConfirmadaUsuario == "" ||
    senhaConfirmadaUsuario == null ||
    senhaConfirmadaUsuario != senhaUsuario
  ) {
    alert("Digite a mesma senha!")
    formValido = false
  }

  if (formValido) {
    let senhaHash = await digestMessage(senhaUsuario)
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // deixar para o servidor criar id's antes de inserir no arquivo json, para garantir que id's não sejam repetidos
        nome: nomeUsuario,
        email: emailUsuario,
        pw_hash: senhaHash,
      }),
    }
    /*
    fazer requisição POST para o servidor usando fetch
     
    fetch("endereçoDoServidor", options)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
    
    */
  }
}

async function digestMessage(message) {
  // função de hashing obtida de developer.mozilla.org
  const msgUint8 = new TextEncoder().encode(message) // codifica a entrada como (utf-8) Uint8Array
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgUint8) // transforma em hash
  const hashArray = Array.from(new Uint8Array(hashBuffer)) // converte buffer para byte array
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("") // converte bytes para string de hexadecimais
  return hashHex
}
