let listadeNumerosSorteados = [];
let numeroSecreto;
let nivel;
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    if (campo) {
        campo.innerHTML = texto;
    }
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.0});
}

function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto 2.0.');
    exibirTextoNaTela('h2', 'Escolha o nível:');
}
mensagemInicial();

function gerarNumeroAleatorio() {

    if (listadeNumerosSorteados.length >= 10 ** nivel) {
        listadeNumerosSorteados = [];
    }

    let numeroEscolhido;
    do {
        numeroEscolhido = parseInt(Math.random() * (10 ** nivel) + 1);
    } while (listadeNumerosSorteados.includes(numeroEscolhido));

    listadeNumerosSorteados.push(numeroEscolhido);
    console.log(`Números sorteados: ${listadeNumerosSorteados}`);
    return numeroEscolhido;
}

function escolherNivel(nivelEscolhido) {
    nivel = nivelEscolhido;
    exibirTextoNaTela('h2', 'Escolha um número até ' + 10 ** nivel);
    numeroSecreto = gerarNumeroAleatorio();
    let botaoContainer = document.querySelector('.botoes__nivel__container');
    botaoContainer.style.display = "none";
    document.getElementById("jogar").removeAttribute("disabled");
}

function limparCampo(tag) {
    let chute = document.querySelector(tag);
    chute.value = "";
}

function verificarChute() {
    let chute = parseInt(document.querySelector("input").value);
    if (isNaN(chute)) {
        exibirTextoNaTela(`h2`, `Digite um número válido`);
        return;
    }

    console.log(chute === numeroSecreto);
    if (chute === numeroSecreto) {
        exibirTextoNaTela(`h1`, `Parabéns!!!`);
        let palavraTentativas = tentativas > 1 ? 'tentativas' : 'só tentativa! Incrível';
        let mensagemTentativa = `Você acertou o número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela(`h2`, mensagemTentativa);
        document.getElementById("reiniciar").removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela(`h2`, `O número secreto é menor que ${chute}.`);
        } else {
            exibirTextoNaTela(`h2`, `O número secreto é maior que ${chute}.`);
        }
        tentativas++;
        limparCampo("input");
    }
}

function reiniciarJogo() {
    tentativas = 1;
    mensagemInicial();
    limparCampo("input");
    document.getElementById("reiniciar").setAttribute("disabled", true);
    document.getElementById("jogar").setAttribute("disabled", true)
    let botaoContainer = document.querySelector('.botoes__nivel__container');
    botaoContainer.style.display = "block";
}
