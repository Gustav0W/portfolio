const dadosCardControleMedicamento = {
    titulo: 'Controle de Medicamentos',
    imagem: './assets/ControleMedicamentos.png',
    gif: 'https://i.imgur.com/pKHsY4i.gif',
    urlRepositorio: 'https://github.com/Gustav0W/Controle-de-Medicamentos2.ConsoleApp',
    stack: [
        'https://skillicons.dev/icons?i=html&theme=light',
        'https://skillicons.dev/icons?i=css&theme=light',
        'https://skillicons.dev/icons?i=cs&theme=light',
        'https://skillicons.dev/icons?i=net&theme=light',
    ],
    descricao: 'O sistema de Controle de Medicamentos apresenta o conceito de gerenciamento de um posto de saúde, com o controle de fornecimento, estoque, funcionários, pacientes e retirada de prescrições - com foco na rastreabilidade das movimentações de estoque.'
};

const dadosCardGerenciadorPersonagem = {
    titulo: 'Gerenciador de Personagem',
    imagem: './assets/GerenciadorPersonagens.png',
    gif: 'https://i.imgur.com/Kkei5Br.gif',
    urlRepositorio: 'https://github.com/Gustav0W/Gerenciador-De-Personagens-2025',
    stack: [
        'https://skillicons.dev/icons?i=html&theme=light',
        'https://skillicons.dev/icons?i=css&theme=light',
        'https://skillicons.dev/icons?i=cs&theme=light',
        'https://skillicons.dev/icons?i=net&theme=light',
    ],
    descricao: 'O sistema de Gerenciador de Personagens está sendo feito com o intuito de auxiliar na criação de personagens para RPG de mesa. Ele ainda está simples e em desenvolvimento, porém os planos são deixá-lo cada vez melhor, e em algum momento liberá-lo na internet para auxiliar qualquer um. Creio que seja meu projeto principal e o que mais tenho vontade de desenvolver cada vez mais, no resto do curso, e nos meses seguintes.'
}

let cardSelecionado;

function carregarDadosCardAtual() {
    if (!cardSelecionado)
        throw new Error('Card não selecionado.');

    const imgCard = document.getElementById('imgCard');
    const stackCard = document.getElementById('stackCard');
    const tituloCard = document.getElementById('tituloCard');
    const descricaoCard = document.getElementById('descricaoCard');
    const urlRepositorio = document.getElementById('urlRepositorio')

    imgCard.src = cardSelecionado.imagem;
    tituloCard.textContent = cardSelecionado.titulo;
    descricaoCard.textContent = cardSelecionado.descricao;
    urlRepositorio.href = cardSelecionado.urlRepositorio;

    stackCard.innerHTML = '';

    for (let item of cardSelecionado.stack) {
        const iconeStack = document.createElement('img');
        iconeStack.width = 35;
        iconeStack.src = item;

        stackCard.appendChild(iconeStack);
    }
}

function selecionarPrimeiroCard() {
    if (cardSelecionado == dadosCardControleMedicamento)
        return;

    cardSelecionado = dadosCardControleMedicamento;
    carregarDadosCardAtual();
}

function selecionarSegundoCard() {
    if (cardSelecionado == dadosCardGerenciadorPersonagem)
        return;

    cardSelecionado = dadosCardGerenciadorPersonagem;
    carregarDadosCardAtual();
}

function abrirModalProjeto() {
    document.getElementById('portfolioModalLabel').textContent = cardSelecionado.titulo;
    document.getElementById('portfolioModalImage').src = cardSelecionado.gif;
}

function main() {
    const btnSelecionarPrimeiroCard = document.getElementById("selecionarPrimeiroCard");
    const btnSelecionarSegundoCard = document.getElementById("selecionarSegundoCard");
    const btnVerProjeto = document.getElementById("btnVerProjeto");

    btnSelecionarPrimeiroCard.addEventListener('click', selecionarPrimeiroCard);
    btnSelecionarSegundoCard.addEventListener('click', selecionarSegundoCard);
    btnVerProjeto.addEventListener('click', abrirModalProjeto);

    selecionarPrimeiroCard();


};

document.addEventListener('DOMContentLoaded', main);