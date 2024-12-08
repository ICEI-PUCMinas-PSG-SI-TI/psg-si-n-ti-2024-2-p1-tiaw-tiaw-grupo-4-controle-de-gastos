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
    let btnSugerir = document.getElementById("btnSugerir");
    btnSugerir.addEventListener("click", () => {
        sugerirCortes(idUsuario);
    })
});

function sugerirCortes(idUsuario) {
    fetch("http://localhost:3000/clientes/?id="+idUsuario)
        .then(response => response.json())
        .then(cliente => {
            gerarSugestoes(cliente.gastos);
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
}


function gerarSugestoes(gastos) {
    const container = document.getElementById('cards-sugestoes');
    container.innerHTML = '';
    const card = document.createElement('div');
    const title = document.createElement('h2');
    const valor = document.createElement('p');
    const categoria = document.createElement('p');
    const sugestao = document.createElement('p');
    card.classList.add('card', 'sugestao-card');

    if(gastos !== undefined && gastos.length > 0){
        gastos.forEach(gasto => {
            if (gasto.valor > 100 || gasto.categoria == 'lazer' && gasto.recorrencia == 'individual') { 
                title.textContent = `Corte sugerido: ${gasto.titulo}`;
                valor.textContent = `Valor gasto: R$ ${gasto.valor}`;
                categoria.textContent = `Categoria: ${gasto.categoria}`;
                sugestao.textContent = 'Sugestão: Reduzir frequência ou optar por alternativas mais econômicas.';

            }
        });
    }
    else {
        title.textContent = "Não foram encontradas sugestões para cortes"
    }

    card.appendChild(title);
    card.appendChild(valor);
    card.appendChild(categoria);
    card.appendChild(sugestao);

    container.appendChild(card);
    
}
