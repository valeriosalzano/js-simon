// Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.

const numbersList = createNumbersList(1,10,5);

const numbersContainerDom = document.getElementById('numbers-container');

for (i=0; i<numbersList.length; i++){
    const myNumber = document.createElement('div');
    myNumber.classList.add('myNumber');
    myNumber.innerHTML = `<div> ${numbersList[i]} </div>`;
    numbersContainerDom.append(myNumber);
}

const myNumbers = document.querySelectorAll('.myNumber');
// Dopo 30 secondi i numeri scompaiono e l’utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
let timerSeconds = 3;
// creo un timer che dopo "timerSeconds" secondi cancella i numeri 
setTimeout( hideNumbers, timerSeconds*1000);

let userNumbers = [];
setTimeout ( takeUserPrompts, (timerSeconds+1)*1000);

// Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.
setTimeout ( checkUserPrompts, (timerSeconds+2)*1000);

// LISTA FUNZIONI

// funzione che restituisce un numero randomico in un range che va da min a max
function randomNumber (min, max){
    return Math.floor(Math.random()*(max - min + 1) + min)
}

// funzione che crea una lista di "listLength" numeri casuali non ripetuti tra un "min" e "max"
function createNumbersList(min, max, listLength){
    // creo una lista "numbers" di numeri disponibili
    let numbers = [];
    for (i=min; i<=max; i++){
        numbers.push(i);
    }
    // pesco "listLength" volte da "numbers"
    let numbersList = [];
    for (i=0; i<listLength; i++){
        // punto a una posizione a caso della lista
        let randomIndex = randomNumber(0, numbers.length - 1);
        // pesco l'elemento in quella posizione
        let randomPick = numbers[randomIndex];
        // lo aggiungo alla lista dei numeri delle mine
        numbersList.push(randomPick);
        // elimino l'elemento dalle possibili prossime pescate
        numbers.splice(randomIndex,1);
    }

    return numbersList;
}

// funzione che nasconde i numeri
function hideNumbers (){
    for (i=0; i<myNumbers.length; i++){
        myNumbers[i].innerHTML = "";
    }
}

// funzione che chiede all'utente di inserire 5 numeri
function takeUserPrompts(){
    do{
        const userNumber = parseInt(prompt(`Inserisci il ${userNumbers.length+1}° numero`));
        if (!isNaN(userNumber) && !userNumbers.includes(userNumber)){
            userNumbers.push(userNumber);
            myNumbers[userNumbers.length-1].innerHTML = userNumber;
        }
    }while(userNumbers.length<5)
}

// funzione che controlla i numeri inseriti dall'utente e verifica quali sono corretti
function checkUserPrompts(){
    let correctNumbers = 0;
    for (i=0; i<numbersList.length; i++){
        if (numbersList.includes(parseInt(myNumbers[i].innerHTML))){
            myNumbers[i].classList.add('rightGuess');
            correctNumbers ++;
        } else {
            myNumbers[i].classList.add('wrongGuess')
        } 
    }
}