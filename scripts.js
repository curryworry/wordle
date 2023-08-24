let collectedKey;
let currentWord="";
let currentCellNumber=1;
let rowNumber = 0;
let alertBox = document.querySelector("#alert-box");

const drawGrid = () => {
    let containerElement = document.querySelector('#container');
    console.log(containerElement);
    for(let i=0;i<30;i++){
        let box = document.createElement('div');
        box.className = "grid-box";
        containerElement.appendChild(box);
    }
}

document.addEventListener('keydown',collectKey);

function collectKey(e){
    if(e.code.includes("Key") && currentWord.length<5){
        alertBox.textContent = "";
        collectedKey = e.key; 
        console.log('is key ' + collectedKey);
        drawKey(e.key,'draw');
        addToCurrentWord(collectedKey);
    }
    else if(e.code=="Enter"){
        checkWord(currentWord);
    }
    else if(e.code=="Backspace"){
        drawKey(e.key,'delete');
        currentWord = currentWord.slice(0,-1);
    }
    else{
        console.log('is not key ' + e.code);
    }
}

function drawKey(key,action){
    if(action == "draw"){
        let currentCell = document.querySelector(`#container > div:nth-child(${currentCellNumber})`);
        currentCell.textContent = key.toUpperCase();
        currentCell.classList.add('unvalidated')    ;
        currentCellNumber++;
    }
    if(action == "delete" && currentCellNumber>0){
        currentCellNumber--;
        let currentCell = document.querySelector(`#container > div:nth-child(${currentCellNumber})`);
        currentCell.textContent = '';
    }
}


async function checkWord(word){
    if(word.length<5){
        alertBox.textContent = "Not enough letters!";
    }
    else{
        let isWord = await isWordCheck(word);
        if (isWord) {
            let correctAnswer = await getWord();
            if(correctAnswer == word){
                displayWinGame();
            }
            else{
                revealClues(correctAnswer,word);
            }
        }
        else{
            alertBox.textContent = "Not a word";
        }
    }
}


async function isWordCheck(userWord){
    let url = "https://words.dev-apis.com/validate-word";
    let message = {
        word: userWord
    };
    let response = await fetch(url,{
        method: "POST",
        body: JSON.stringify(message),
    });
    let processedResponse = await response.json();
    return processedResponse.validWord;
}

function displayWinGame(){
    console.log("Game won!");
    for (let i = 0; i < 5; i++) {
        let cellIndex = (rowNumber * 5) + i + 1;
        let currentCell = document.querySelector(`#container > div:nth-child(${cellIndex})`);
        currentCell.classList.add('green-guess');
    }
    alertBox.textContent = "You won!";
}

function revealClues(correctAnswer,word){
    console.log("Wrong guess");
    console.log("correct answer is " + correctAnswer);
    console.log("your choice was " + word);
    let userWord = Array.from(word);
    let correctWord = Array.from(correctAnswer);
    console.log(userWord);
    console.log(correctWord);
    for(let i=0;i<5;i++){
        let cellIndex = (rowNumber * 5) + i + 1;
        let currentCell = document.querySelector(`#container > div:nth-child(${cellIndex})`);
        if(userWord[i]==correctWord[i]){
            currentCell.classList.add('green-guess');
        }
        else if(correctAnswer.includes(userWord[i])){
            currentCell.classList.add('yellow-guess');
        }
        else{
            currentCell.classList.add('grey-guess');
        }
    }
    currentWord = "";
    rowNumber++;
}

function addToCurrentWord(key){
    currentWord = currentWord + key;
    console.log(currentWord);
}

async function getWord(){
    let response = await fetch('https://words.dev-apis.com/word-of-the-day');
    let processedResponse = await response.json();
    return processedResponse.word;
}

async function main(){
    drawGrid();
    let correctAnswer = await getWord();
    // TODO: Lose condition
}

main();

