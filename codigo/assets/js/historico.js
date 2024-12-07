const ctx = document.getElementById('gastosChart').getContext('2d');

const gastosMensais = {
    'Janeiro': [
        { valor: 500, categoria: 'Alimentação', titulo: 'Supermercado' },
        { valor: 300, categoria: 'Lazer', titulo: 'Cinema' },
        { valor: 200, categoria: 'Saúde', titulo: 'Consulta médica' },
        { valor: 150, categoria: 'Transporte', titulo: 'Combustível' },
        { valor: 100, categoria: 'Educação', titulo: 'Cursos Inglês' }
    ],
    'Fevereiro': [
        { valor: 600, categoria: 'Transporte', titulo: 'Combustível' },
        { valor: 200, categoria: 'Educação', titulo: 'Cursos' },
        { valor: 300, categoria: 'Saúde', titulo: 'Exames laboratoriais' },
        { valor: 100, categoria: 'Lazer', titulo: 'Academia' },
        { valor: 200, categoria: 'Tecnologia', titulo: 'Celular' }
    ],
    'Março': [
        { valor: 150, categoria: 'Lazer', titulo: 'Viagem' },
        { valor: 200, categoria: 'Saúde', titulo: 'Consulta médica' },
        { valor: 300, categoria: 'Alimentação', titulo: 'Restaurante' },
        { valor: 250, categoria: 'Moradia', titulo: 'Condomínio' },
        { valor: 200, categoria: 'Transporte', titulo: 'Manutenção' }
    ],
    'Abril': [
        { valor: 500, categoria: 'Alimentação', titulo: 'Restaurante' },
        { valor: 300, categoria: 'Transporte', titulo: 'Manutenção' },
        { valor: 150, categoria: 'Lazer', titulo: 'Cinema' },
        { valor: 200, categoria: 'Outros', titulo: 'Doações' },
        { valor: 200, categoria: 'Educação', titulo: 'Faculdade' }
    ],
    'Maio': [
        { valor: 100, categoria: 'Educação', titulo: 'Faculdade' },
        { valor: 200, categoria: 'Lazer', titulo: 'Academia' },
        { valor: 150, categoria: 'Saúde', titulo: 'Medicamentos' },
        { valor: 500, categoria: 'Moradia', titulo: 'Aluguel' },
        { valor: 100, categoria: 'Transporte', titulo: 'Ônibus' }
    ],
    'Junho': [
        { valor: 500, categoria: 'Saúde', titulo: 'Farmácia' },
        { valor: 350, categoria: 'Lazer', titulo: 'Viagem' },
        { valor: 250, categoria: 'Alimentação', titulo: 'Supermercado' },
        { valor: 200, categoria: 'Moradia', titulo: 'Condomínio' },
        { valor: 100, categoria: 'Transporte', titulo: 'Uber' }
    ],
    'Julho': [
        { valor: 100, categoria: 'Transporte', titulo: 'Ônibus' },
        { valor: 500, categoria: 'Lazer', titulo: 'Parque' },
        { valor: 350, categoria: 'Educação', titulo: 'Curso de verão' },
        { valor: 150, categoria: 'Saúde', titulo: 'Consulta médica' },
        { valor: 200, categoria: 'Tecnologia', titulo: 'Manutenção de laptop' }
    ],
    'Agosto': [
        { valor: 450, categoria: 'Alimentação', titulo: 'Mercado' },
        { valor: 400, categoria: 'Educação', titulo: 'Curso online' },
        { valor: 300, categoria: 'Moradia', titulo: 'Aluguel' },
        { valor: 50, categoria: 'Transporte', titulo: 'Combustível' },
        { valor: 100, categoria: 'Saúde', titulo: 'Exames médicos' }
    ],
    'Setembro': [
        { valor: 150, categoria: 'Lazer', titulo: 'Cinema' },
        { valor: 200, categoria: 'Saúde', titulo: 'Exames médicos' },
        { valor: 245, categoria: 'Alimentação', titulo: 'Restaurante' },
        { valor: 300, categoria: 'Moradia', titulo: 'Condomínio' },
        { valor: 100, categoria: 'Transporte', titulo: 'Uber' }
    ],
    'Outubro': [
        { valor: 540, categoria: 'Alimentação', titulo: 'Supermercado' },
        { valor: 250, categoria: 'Transporte', titulo: 'Combustível' },
        { valor: 200, categoria: 'Educação', titulo: 'Cursos' },
        { valor: 150, categoria: 'Doações', titulo: 'Igreja' },
        { valor: 280, categoria: 'Saúde', titulo: 'Medicamentos' }
    ],
    'Novembro': [
        { valor: 200, categoria: 'Lazer', titulo: 'Show' },
        { valor: 650, categoria: 'Educação', titulo: 'Material Faculdade' },
        { valor: 200, categoria: 'Alimentação', titulo: 'Restaurante' },
        { valor: 300, categoria: 'Moradia', titulo: 'Condomínio' },
        { valor: 100, categoria: 'Transporte', titulo: 'Combustível' }
    ],
    'Dezembro': [
        { valor: 80, categoria: 'Lazer', titulo: 'Festas de fim de ano' },
        { valor: 300, categoria: 'Transporte', titulo: 'Viagem' },
        { valor: 300, categoria: 'Saúde', titulo: 'Medicamentos' },
        { valor: 200, categoria: 'Educação', titulo: 'Cursos de Programação' },
        { valor: 400, categoria: 'Moradia', titulo: 'Aluguel' }
    ]
};

const meses = Object.keys(gastosMensais);

const cores = {
    'Alimentação': 'rgba(255, 99, 132, 0.8)',
    'Lazer': 'rgba(54, 162, 235, 0.8)',
    'Saúde': 'rgba(153, 102, 255, 0.8)',
    'Transporte': 'rgba(255, 206, 86, 0.8)',
    'Educação': 'rgba(75, 192, 192, 0.8)',
    'Moradia': 'rgba(255, 159, 64, 0.8)',
    'Tecnologia': 'rgba(201, 203, 207, 0.8)',
    'Doações': 'rgba(99, 255, 132, 0.8)'
};

const datasets = Object.keys(cores).map(categoria => {
    return {
        label: categoria,
        data: meses.map(mes => {
            const gastos = gastosMensais[mes].filter(g => g.categoria === categoria);
            return gastos.reduce((total, gasto) => total + gasto.valor, 0);
        }),
        backgroundColor: cores[categoria],
        borderColor: cores[categoria].replace('0.8', '1'),
        borderWidth: 1
    };
});

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
