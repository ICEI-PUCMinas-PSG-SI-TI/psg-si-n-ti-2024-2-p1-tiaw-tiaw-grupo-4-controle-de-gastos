function sugerirCortes() {
    fetch('../assets/json/clientes.json')
        .then(response => response.json())
        .then(data => {
            console.log('Dados carregados:', data);
            gerarSugestoes(data.cliente);
        })
        .catch(error => console.error('Erro ao carregar o JSON:', error));
}


function gerarSugestoes(clientes) {
    const container = document.getElementById('cards-sugestoes');
    container.innerHTML = '';

    clientes.forEach(cliente => {
        cliente.gastos.forEach(gasto => {
            if (gasto.valor > 100 || gasto.categoria == 'lazer' && gasto.recorrencia == 'individual') { 
                const card = document.createElement('div');
                card.classList.add('card', 'sugestao-card');

                const title = document.createElement('h2');
                title.textContent = `Corte sugerido: ${gasto.titulo}`;

                const valor = document.createElement('p');
                valor.textContent = `Valor gasto: R$${gasto.valor.toFixed(2)}`;

                const categoria = document.createElement('p');
                categoria.textContent = `Categoria: ${gasto.categoria}`;

                const sugestao = document.createElement('p');
                sugestao.textContent = 'Sugestão: Reduzir frequência ou optar por alternativas mais econômicas.';

                card.appendChild(title);
                card.appendChild(valor);
                card.appendChild(categoria);
                card.appendChild(sugestao);

                container.appendChild(card);
            }
        });
    });
}
