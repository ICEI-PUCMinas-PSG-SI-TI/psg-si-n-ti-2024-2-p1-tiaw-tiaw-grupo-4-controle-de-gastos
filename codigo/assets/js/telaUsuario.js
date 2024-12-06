document.addEventListener("DOMContentLoaded", () => {
    const listaSalario = document.querySelector(".lista-salario");
    const botaoAdicionar = document.getElementById("botaoAdicionar");
    const botaoRemover = document.getElementById("botaoRemover");

    // Dados iniciais em JSON
    const usuarios = [
        {
            nome: "João",
            parentesco: "Filho",
            valor: 500,
            tipo: "Depósito"
        },
        {
            nome: "Maria",
            parentesco: "Esposa",
            valor: 300,
            tipo: "Gasto"
        }
    ];

    // Função para renderizar a lista de usuários
    const renderizarLista = () => {
        listaSalario.innerHTML = ""; // Limpa a lista
        usuarios.forEach((usuario, index) => {
            const li = document.createElement("li");
            li.className = "item-usuario";
            li.textContent = `${usuario.nome} (${usuario.parentesco}) - ${usuario.tipo}: R$${usuario.valor}`;
            li.dataset.index = index; // Armazena o índice
            listaSalario.appendChild(li);
        });
    };

    // Adicionar novo usuário
    botaoAdicionar.addEventListener("click", () => {
        const nome = document.querySelector(".infousuario[placeholder='Nome']").value;
        const parentesco = document.querySelector(".infousuario[placeholder='Nivel Parentesco']").value;
        const valor = parseFloat(document.querySelector(".infousuario[placeholder='Valor Depósito/Gasto']").value);
        const tipo = document.querySelector("input[name='radio']:checked + label")?.textContent;

        if (!nome || !parentesco || isNaN(valor) || !tipo) {
            alert("Preencha todos os campos corretamente.");
            return;
        }

        usuarios.push({ nome, parentesco, valor, tipo });
        renderizarLista();
        alert("Usuário adicionado com sucesso!");
    });

    // Remover último usuário
    botaoRemover.addEventListener("click", () => {
        if (usuarios.length === 0) {
            alert("Não há usuários para remover.");
            return;
        }
        usuarios.pop();
        renderizarLista();
        alert("Último usuário removido.");
    });

    // Inicializa a lista ao carregar a página
    renderizarLista();
});
