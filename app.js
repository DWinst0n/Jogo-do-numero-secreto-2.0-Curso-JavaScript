let listadeNumerosSorteados = [];

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    if (campo) {
        campo.innerHTML = texto;
    }
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate: 1.2});
}
let nivel = 2;
let tentativas = 1;
function mensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto 2.0.');
    exibirTextoNaTela('h2', 'Escolha um número até ' + 10**nivel);
}
mensagemInicial();
//let nivel = Number(prompt("Qual o nível de dificuldade que você deseja? Escolha de 1 a 4"))
//while (nivel <= 0 || isNaN(nivel) || nivel > 4){
//    nivel = Number(prompt("Escolha corretamente(1 a 4)"))
//} *esse é para se usado junto com a tela de alerta, mas vou querer tentar de outra maneira:

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * (10**nivel) + 1);
    if (listadeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else{
        listadeNumerosSorteados.push(numeroEscolhido);
        let quantidadedeNumerosSorteados = listadeNumerosSorteados.length
        if (quantidadedeNumerosSorteados == (10**nivel)){
            listadeNumerosSorteados = []
        } 
        console.log(listadeNumerosSorteados);
        return numeroEscolhido;
    }
}
let numeroSecreto = gerarNumeroAleatorio();

console.log(`Tá se achando o hacker, né.... Usando cheat até aqui... que coisa.. Tá bom, O numero secreto é ${numeroSecreto}.`);
function limparCampo(tag) {
    chute = document.querySelector(tag);
    chute.value = "";
    }
function verificarChute() {
    let chute = document.querySelector("input").value;
    console.log(chute == numeroSecreto);
    if (chute == numeroSecreto) {
        exibirTextoNaTela(`h1`, `Parábens!!!`);
        let palavraTentativas = tentativas > 1 ? 'tentativas' :  'só tentativa! Incrível';
        let mensagemTentativa = `Você acertou o número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativas}!`;
        exibirTextoNaTela(`h2`, mensagemTentativa);
        document.getElementById("reiniciar").removeAttribute('disabled');
    } else{
        if (chute > numeroSecreto) {
            exibirTextoNaTela(`h2`, `O número secreto é menor que ${chute}.`);
        } else{
            exibirTextoNaTela(`h2`, `O número secreto é maior que ${chute}.`);
        }
        if(isNaN(chute)){
            exibirTextoNaTela(`h2`,`Digite um número válido`);
        }
        tentativas++;
        limparCampo("input");
    }
}
function reiniciarJogo(){
    nivel = 1;
    tentativas = 1;
    numeroSecreto = gerarNumeroAleatorio();
    mensagemInicial();
    limparCampo("input");
    document.getElementById("reiniciar").setAttribute("disabled", true);
}