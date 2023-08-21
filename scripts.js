const drawGrid = () => {
    let containerElement = document.querySelector('#container');
    console.log(containerElement);
    for(let i=0;i<30;i++){
        let box = document.createElement('div');
        box.className = "grid-box";
        containerElement.appendChild(box);
    }
}



async function getWord(){
    let response = await fetch('https://words.dev-apis.com/word-of-the-day');
    let processedResponse = await response.json();
    return processedResponse.word;
}



async function main(){
    drawGrid();
    let correctAnswer = await getWord();
    document.addEventListener('keydown',collectKey);
    // TODO: Validate keypress to ignore special characters
    // TODO: Collect keypresses into word
    // TODO: Display keypresses on screen
    // TODO: Compare user's word with correct answer and perform appropriate colouring
    // TODO: Win condition
    // TODO: Lose condition
}

main();
