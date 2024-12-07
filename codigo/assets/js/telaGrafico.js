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
    const options = {
        method: "GET",
        headers: {
          "Accept": "application/json",
        }
      }
    try {
        const response = await fetch("http://localhost:3000/clientes/?id="+idUsuario, options);
        const usuarioJson = await response.json();
        if(usuarioJson != null) {
            exibirGrafico(usuarioJson);
        }
    }
    catch(err){
        console.log(err);
        alert("Erro na comunicação com o servidor");
        location.replace("../index.html");
    }
})


const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
               'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

async function carregarGastosMensais(usuarioJson) {
    const ano = 2024;
    const gastosPorMes = Array(12).fill(0); 

    usuarioJson.gastos.forEach(gasto => {
        const [anoData, mesData] = gasto.data.split("-").map(Number);
        if (anoData === ano) {
            gastosPorMes[mesData - 1] += gasto.valor; 
        }
    });

    return gastosPorMes;
}

async function exibirGrafico(usuarioJson) {
    const gastosMensais = await carregarGastosMensais(usuarioJson); 

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: meses,
            datasets: [{
                label: 'Gastos Mensais',
                data: gastosMensais,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const valor = context.raw.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            });
                            return `Gastos: ${valor}`;
                        }
                    }
                }
            }
        }
    });
}
