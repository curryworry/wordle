const drawGrid = () => {
    let containerElement = document.querySelector('#container');
    console.log(containerElement);
    for(let i=0;i<30;i++){
        let box = document.createElement('div');
        box.className = "grid-box";
        containerElement.appendChild(box);
    }
}

drawGrid();
