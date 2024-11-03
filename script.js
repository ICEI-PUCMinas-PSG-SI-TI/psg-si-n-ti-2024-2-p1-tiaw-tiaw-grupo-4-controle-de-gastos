document.getElementById("btnSalvar").addEventListener("click", () => {
    // Coletando os dados dos inputs
    const titulo = document.getElementById("titulo").value;
    const valor = document.getElementById("valor").value;
    const data = document.getElementById("data").value;
    const recorrencia = document.querySelector("input[name='recorrencia']:checked").value;

    // Criando o objeto JSON
    const salarioData = {
        titulo: titulo,
        valor: parseFloat(valor),
        data: data,
        recorrencia: recorrencia
    };

    // Convertendo o objeto para JSON
    const salarioJSON = JSON.stringify(salarioData, null, 2);

    // Exibindo o JSON na div "resultados"
    const resultadoDiv = document.getElementById("resultados");
    resultadoDiv.innerHTML = `<pre>${salarioJSON}</pre>`;
});
