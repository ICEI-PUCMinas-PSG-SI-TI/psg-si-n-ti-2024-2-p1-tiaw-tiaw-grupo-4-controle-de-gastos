const ctx = document.getElementById('gastosChart').getContext('2d');

const gastosMensais = {};

let usuarioCorrenteJSON = sessionStorage.getItem('usuarioCorrente');
let usuarioCorrente = {};
let idUsuario;
if (usuarioCorrenteJSON) {
    usuarioCorrente = JSON.parse(usuarioCorrenteJSON);
} 
if(usuarioCorrente  != null){
    idUsuario = usuarioCorrente.id; 
}
else {
    alert("Sessão invalida, faça o login");
    location.replace("../index.html");
}

if(idUsuario !== undefined){
    // Faz a requisição ao Server
    fetch('http://localhost:3000/clientes/?id='+idUsuario)
        .then(response => response.json())
        .then(clienteJson => {
            const cores = {
                'Comida': 'rgba(255, 99, 132, 0.8)',
                'Lazer': 'rgba(54, 162, 235, 0.8)',
                'Saúde': 'rgba(153, 102, 255, 0.8)',
                'Transporte': 'rgba(255, 206, 86, 0.8)',
                'Educação': 'rgba(75, 192, 192, 0.8)',
                'Moradia': 'rgba(255, 159, 64, 0.8)',
                'Tecnologia': 'rgba(201, 203, 207, 0.8)',
                'Doações': 'rgba(99, 255, 132, 0.8)',
                'Outros' : 'rgba(0, 0, 0, 0.8)'
            };
            // Preenchendo os dados a partir do JSON
            clienteJson.gastos.forEach(gasto => {
                    // Supondo que a data está no formato 'DD-MM-YYYY'
                    const [dia, mes, ano] = gasto.data.split('-'); // Divide a data em dia, mês e ano
                    const mesNome = new Date(ano, mes - 1).toLocaleString('default', { month: 'long' }); // Obtém o mês por extenso
                    // Verifica se o mês já existe no objeto gastosMensais
                    if (!gastosMensais[mesNome]) {
                        gastosMensais[mesNome] = []; // Se não existir, inicializa como um array vazio
                    }

                    let categoriaExiste = false;
                    let categoriaASerEnviada = gasto.categoria;
                    for (let title in cores) {
                        if(title === gasto.categoria){
                            categoriaExiste = true;
                        }
                    }
                    if(!categoriaExiste) {
                        categoriaASerEnviada = 'Outros'
                    }
                    // Adiciona o gasto ao mês correspondente
                    gastosMensais[mesNome].push({
                        titulo: gasto.titulo,
                        categoria: categoriaASerEnviada,
                        valor: gasto.valor
                    });
                });
    
            // Exibe os dados coletados no console para verificar
            console.log(gastosMensais);
    
            const meses = Object.keys(gastosMensais);
            const datasets = Object.keys(cores).map(categoria => {
                
                return {
                    label: categoria,
                    data: meses.map(mes => {
                        // Filtra os gastos da categoria atual para o mês atual
                        const gastos = gastosMensais[mes].filter(g => g.categoria === categoria);
                        // Soma os valores dos gastos filtrados
                        return gastos.reduce((total, gasto) => total + gasto.valor, 0);
                    }),
                    
                    backgroundColor: cores[categoria],
                    borderColor: cores[categoria].replace('0.8', '1'),
                    borderWidth: 1
                };
            });
    
            // Cria o gráfico com os dados processados
            const gastosChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: meses,
                    datasets: datasets
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    const mes = meses[tooltipItem.dataIndex];
                                    const categoria = tooltipItem.dataset.label;
                                    const gastos = gastosMensais[mes].filter(g => g.categoria === categoria);
                                    const totalValor = gastos.reduce((total, gasto) => total + gasto.valor, 0);
                                    const titulos = gastos.map(gasto => gasto.titulo).join(', ') || 'N/A';
                                    return [
                                        `Categoria: ${categoria}`,
                                        `Título(s): ${titulos}`,
                                        `Valor: R$${totalValor},00`
                                    ];
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            stacked: true,
                            grid: {
                                display: false 
                            }
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true,
                            max: 1400,
                            grid: {
                                display: true, 
                                color: 'rgba(0, 0, 0, 0.1)' 
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
}
else {
    alert("Não foi possível obter as informações do usuário. Faça login novamente.");
    location.replace("../index.html");
}

