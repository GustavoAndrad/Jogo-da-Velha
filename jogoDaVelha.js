/* 
 1 -> O
 2 -> X
*/
let TURNO = 1; 
let cliques = 0;
let onGame = true;

const TABULEIRO = 
[
    [0,0,0],
    [0,0,0],
    [0,0,0],
]


function handleClick(item){
    const elemento = document.getElementById(item);
    if(onGame){ //jogo não acabou
        if(elemento.innerHTML==='') //espaço ainda não foi preenchido
        {
            cliques++;
            if(TURNO===1){
                elemento.innerHTML = 'O'
                alteraTabuleiro(item,1);
            } 
            else if(TURNO===2){
                elemento.innerHTML = 'X'
                alteraTabuleiro(item,2);
            }
            else{
                console.log("Internal error!");
                alert("Internal Error\nPlease try again later")
            }
    
            const ehGanhador = verificaTabuleiro();
            //Verifica se alguém ganhou, depois de realizar as alterações
            if(ehGanhador){
                document.getElementById('titulo').innerHTML = `&#x1F389;&#x1F389; Ganhador: ${TURNO===1 ? 'O':'X'}! &#x1F389;&#x1F389;`;
                document.getElementById('player').innerHTML = ' --- '
                onGame = false;
            }
            mudaTurno();
    
        } else{
            console.log("Invalid move!");
            alert("You cannot overwrite an item!")
        }
    }

}

function verificaTabuleiro() {
    
    // Verifica linhas
    for (let i = 0; i < 3; i++) {
        if(TABULEIRO[i][0]!=0){
            if (TABULEIRO[i][0] === TABULEIRO[i][1] && TABULEIRO[i][1] === TABULEIRO[i][2]) {
                console.log(`1: ${i}`)
                return true;
            }
        }
    }

    // Verifica colunas
    for (let i = 0; i < 3; i++) {
        if(TABULEIRO[0][i]!=0){
            if (TABULEIRO[0][i] === TABULEIRO[1][i] && TABULEIRO[1][i] === TABULEIRO[2][i]) {
                return true;
            }
        }
    }
    
    // Verifica diagonais
    if(TABULEIRO[1][1]!=0){
        if (TABULEIRO[0][0] === TABULEIRO[1][1] && TABULEIRO[1][1] === TABULEIRO[2][2]) {
            return true;
        }
        
        if (TABULEIRO[0][2] === TABULEIRO[1][1] && TABULEIRO[1][1] === TABULEIRO[2][0]) {
            return true;
        }
    }
    
    //Verifica se houve empate
    if(cliques>=9){
        document.getElementById('titulo').innerHTML = `👵🏼👵🏼 DEU VELHA! 👵🏼👵🏼`;
        document.getElementById('player').innerHTML = ' --- '
        onGame = false
    }
    
    return false;
}

function reset(){
    if(confirm('Isso recomeçará a partida.\nTem certeza?')){
        for(let i=0;i<9;i++){
            document.getElementById(i).innerHTML = '';
            TABULEIRO[parseInt(i/3)][parseInt(i%3)] = 0;
        }
            if(TURNO===2){
                mudaTurno();
            }
            cliques = 0;
            onGame = true;
            document.getElementById('titulo').innerHTML = `&#11088; JOGO DA VELHA &#11088;`;
    
    }
}

function mudaTurno(){
    TURNO = (TURNO === 1) ? 2 : 1;
    document.getElementById('player').innerHTML = (TURNO===1 ? 'O':'X')
}

//Altera tabuleiro lógico
function alteraTabuleiro(item, valor){
    TABULEIRO[parseInt(item/3)][parseInt(item%3)] = valor;
}
