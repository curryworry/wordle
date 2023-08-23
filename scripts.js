let collectedKey;
let currentWord="";

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
    if(e.code.includes("Key")){
        collectedKey = e.key; 
        console.log('is key ' + collectedKey);
        drawKey(e.key);
    }
    else if(e.code=="Enter"){
        checkWord(currentWord);
    }
    else{
        console.log('is not key ' + e.code);
    }
    if(currentWord.length<5){
    addToCurrentWord(collectedKey);
    }
}

function checkWord(word){
    if(word.length<5){
        console.log("Not enough letters");
        //TODO: Log this as an alert.
    }
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

