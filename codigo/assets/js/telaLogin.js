let botaoLogin = document.getElementById("botaoLogin");
botaoLogin.addEventListener("click", tentarLogar);

let usuarioCorrente = {};

async function tentarLogar(){
    let inputEmail = document.getElementById("inputEmail").value;
    let inputSenha = document.getElementById("inputSenha").value;
    const options = {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
    }
    const response = await fetch("http://localhost:3000/clientes/", options);
    const vetorClientes = await response.json();
    let senhaHash = await digestMessage(inputSenha);
    let userValido = false;
    
    for(let i = 0; i < vetorClientes.length; i++){
        if(inputEmail === vetorClientes[i].email && senhaHash === vetorClientes[i].pw_hash){
            userValido = true;
            usuarioCorrente.id = vetorClientes[i].id;
            usuarioCorrente.email = vetorClientes[i].email;
            usuarioCorrente.nome = vetorClientes[i].nome;
            if(vetorClientes[i].admin !== null){
                usuarioCorrente.admin = vetorClientes[i].admin;
            }
            sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
            if(vetorClientes[i].admin == true){
                location.replace("telaAdmin.html");
            }
            else location.replace("gastosMensais.html");
        }
    }
    if(userValido == false) {
        alert("Email ou senha inválidos");
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
  