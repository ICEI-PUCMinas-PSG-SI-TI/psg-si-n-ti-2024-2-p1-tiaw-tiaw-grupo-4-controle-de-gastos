# Documentação do Projeto (TIDocs)

Esta pasta armazena a documentação do projeto para a disciplina de **Trabalho Interdisciplinar 1** dos cursos de Tecnologia da Informação da **[PUC Minas](https://pucminas.br)**. Essa documentação é estruturada na forma de um site que fica disponível por meio do GitHub Pages e pode ser incluído, também, no site da solução hospedada. Um [exemplo publicado do TIDocs](https://webtech-puc-minas.github.io/ti1-template/) está disponível por meio do repositório do **[WebTech PUC Minas](https://github.com/webtech-pucminas)**.

# Contexto

## Introdução

Nos últimos anos, tem se tornado cada vez mais difícil manter um gerenciamento financeiro robusto e à prova de imprevistos. A popularização de comodidades de alta tecnologia, o medo da segregação social por não as possuírem e a existência de esquemas de “dinheiro fácil” tem se impregnado cada vez mais na sociedade brasileira. Fatores como estes estão causando muitos a se comportarem de maneira financeiramente irresponsável, com uma falta de bom julgamento a longo e até curto prazo, preferindo gastar em experiências prazerosas passageiras ao invés de economizar\[1\].
Isso se torna preocupante, dado que muitos jovens admitem preferir fazer apostas online do que usar o dinheiro que possuem em um curso superior, sendo o caso para 35% dos entrevistados no Brasil\[2\]. Esse crescimento da participação dos brasileiros em jogos de azar reflete uma possibilidade de um destino improfícuo para a população geral.

## Problema

Com o crescimento do número de jovens e adultos tendo dificuldades em manter uma vida financeira estável, surge o problema da potencial decadência da classe média, que já se encontrava numa situação precária após a pandemia. Ela teve uma queda de 4% de 2020 para 2021 (que se moveram para a classe baixa, cerca de 4,9 milhões de famílias), resultando na mesma quantidade da população na classe média e baixa: ambos 47%\[3\]. É alarmante essa situação para um país que deveria estar em desenvolvimento, mas que tem sua classe baixa crescendo em vez de diminuindo.

## Objetivo

O objetivo deste projeto é facilitar o manejo e gerenciamento dos gastos pessoais do usuário, através do fornecimento de ferramentas para auxiliar no planejamento econômico e, por fim, melhorar a qualidade de vida. Com a adoção em massa do sistema, seria possível até aprimorar a condição financeira geral da população brasileira.

## Justificativa

Através de várias pesquisas, é evidente que está em falta essa consciência da necessidade do planejamento financeiro na sociedade, dado provavelmente a essa dificuldade de uma visualização palpável dos gastos. É imperativo a difusão desse entendimento da importância do controle pessoal de gastos, e o sistema seria uma boa ferramenta para facilitar este fim, provendo variados instrumentos úteis.

## Público Alvo

Adultos entre 20 e 40 anos, de qualquer classe, economicamente ativos, que residem principalmente em regiões urbanas e utilizam ao menos o celular.

# Especificação do Projeto

A falta de recursos financeiros e o mau planejamento dos gastos são desafios comuns enfrentados por indivíduos e organizações. Em um mundo onde as despesas muitas vezes superam as receitas, torna-se essencial desenvolver um controle financeiro eficaz. Este projeto visa abordar esses problemas de forma prática, oferecendo ferramentas e estratégias que ajudem na gestão consciente do dinheiro. Ao promover um planejamento adequado, buscamos não apenas evitar crises financeiras, mas também garantir que os recursos disponíveis sejam utilizados de maneira eficiente e sustentável. Através de uma análise detalhada dos hábitos de consumo e da implementação de um sistema de controle, esperamos capacitar os participantes a tomar decisões mais informadas e, assim, alcançar uma maior estabilidade financeira.

## Personas

| **Nome** | **Quero**                                   | **Porque/para**                                                       |
| -------- | ------------------------------------------- | --------------------------------------------------------------------- |
| Michele  | Saber o histórico dos meus gastos           | Quero ter um controle mais rígido da minha vida financeira            |
| Roberto  | Saber quanto devo economizar até fim do ano | Tirar meu nome do SERASA                                              |
| Beatriz  | Saber como fazer um planejamento financeiro | Ter independência financeira o mais cedo possível                     |
| André    | Aprender a investir de forma inteligente    | Poder futuramente me sustentar apenas com o retorno dos investimentos |

## Requisitos de projeto

Requisitos funcionais

- O sistema deve apresentar um gráfico que mostre os gastos do mês;
- O sistema deve permitir ao usuário estabelecer metas de economia e objetivos de compras;
- O sistema deve permitir estabelecer gastos recorrentes;
- O sistema deve permitir estabelecer um salário mensal consistente;
- O sistema deve permitir o usuário inserir seu salário cada mês individualmente, caso este não seja consistente;
- O sistema deve sugerir um corte ou uma adaptação de gastos sem necessidades;
- O sistema deve permitir o usuário acessar o histórico de gastos dos meses passados;
- O sistema deve apresentar a flutuação dos investimentos definidos pelo usuário;
- O sistema deve permitir o usuário criar uma conta conjunta com outro usuário;
- O sistema deve permitir o usuário integrar sua conta de banco ao aplicativo para automatizar o registro de transações;
- O sistema deve automaticamente atualizar a quantidade de “folga” monetária após cada transação;
- O sistema deve avisar o usuário caso a quantidade de dinheiro atual seja menor que o valor dos gastos que ainda estão por vir antes do próximo dia de receber salário.

Requisitos não funcionais

- O sistema deverá estar disponível 24/7
- O sistema deverá responder em menos de três segundos;
- O sistema deverá ser robusto para minimizar quedas;
- O sistema deverá funcionar offline, mesmo que de forma reduzida;
- O sistema deverá ter um banco de dados seguro;
- O sistema deverá ser fácil de manter e atualizar;
- O sistema deverá ser fácil de utilizar e entender, podendo ser adaptável a todas as idades;

# Projeto de Interface

## Fluxo do usuário

<div align="center">
  <img style="max-width:1000px" src="https://ibb.co/CMBjgWd">
</div>

## Wireframes

<div align="center">
  <img style="max-width:1000px" src="https://ibb.co/B2FHhCZ">
  <img style="max-width:1000px" src="https://ibb.co/yk8LhXc">
  <img style="max-width:1000px" src="https://ibb.co/wJ2KytH">
  <img style="max-width:1000px" src="https://ibb.co/jg0mwqd">
  <img style="max-width:1000px" src="https://ibb.co/wBgLr75">
  <img style="max-width:1000px" src="https://ibb.co/t3wrNZY">
</div>

## Protótipo

https://www.figma.com/proto/YrScgbu1O6OavsL52CKzjc/Untitled?node-id=30-75&node-type=canvas&t=ol4Oqw99Dkna0XSQ-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=30%3A75

# Metodologia

## Organização da Equipe

- Utilizaremos um quadro Kanban dentro do GitHub para organizar as tarefas entre os membros;
- Utilizaremos o GitHub para armazenar as versões do código;
- Utilizaremos a metodologia Scrum para a organização das entregas;

## Papeis dos integrantes

- Henrique Augusto Freire de Oliveira - Scrum Master e Desenvolvedor FullStack
- Mayssa Luiza Fernandes do Nascimento - Product Owner e Desenvolvedora Front-End
- Letícia Lelis Alves - Desenvolvedora Back-End
- Guilherme Neves Rodrigues - Desenvolvedor FullStack
- Paulo Henrique Araújo Silva - Desenvolvedor Back-End
- Yuri Gabriel Rocha Rabelo - Desenvolvedor Front-End

# Referências Bibliográficas

\[1\] Estudo mostra que Geração Z tem dificuldade de economizar. Terra, 2024. Disponível em:
https://www.terra.com.br/economia/estudo-mostra-que-geracao-z-tem-dificuldade-de-economizar,b4825b893dab62f4561a794d7b79f26a0c74n0eh.html
Acesso em: 21 de setembro de 2024.

\[2\] ALFANO, Bruno. Brasileiros estão abrindo mão da graduação para gastar com bets e jogo do tigrinho, diz pesquisa. O Globo, 2024. Disponível em: https://oglobo.globo.com/brasil/educacao/noticia/2024/09/16/brasileiros-estao-abrindo-mao-da-graduacao-para-gastar-com-bets-e-jogo-do-tigrinho-diz-pesquisa.ghtml Acesso em: 21 de setembro de 2024.

\[3\] ALVARENGA, Darlan. MARTINS, Raphael. Classe média 'encolhe' na pandemia e já tem mesmo 'tamanho' da classe baixa. G1, 2021. Disponível em: https://g1.globo.com/economia/noticia/2021/04/17/classe-media-encolhe-na-pandemia-e-ja-tem-mesmo-tamanho-da-classe-baixa.ghtml
Acesso em: 21 de setembro de 2024.
