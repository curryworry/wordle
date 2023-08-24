let collectedKey;
let currentWord="";
let currentCellNumber=1;

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
        currentCellNumber++;
    }
    if(action == "delete" && currentCellNumber>0){
        currentCellNumber--;
        let currentCell = document.querySelector(`#container > div:nth-child(${currentCellNumber})`);
        currentCell.textContent = '';
    }
}


//TODO: Finish checkWord function
async function checkWord(word){
    if(word.length<5){
        console.log("Not enough letters");
        //TODO: Log this as an alert.
    }
    else{
        let correctAnswer = await getWord();
        if(correctAnswer == currentWord){
            displayWinGame();
        }
        else{
            revealColours(correctAnswer);
        }
    }
}

function displayWinGame(){
    console.log("Game won!");
    //TODO: Display this as alert
    //TODO: Finish function
}

function revealColours(correctAnswer){
    console.log("Wrong guess");
    //TODO: Write function
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
    // TODO: Validate keypress to ignore special characters
    // TODO: Collect keypresses into word
    // TODO: Display keypresses on screen
    // TODO: Compare user's word with correct answer and perform appropriate colouring
    // TODO: Win condition
    // TODO: Lose condition
}

main();

