const canvas = document.querySelector("#game-screen");

function drawSquare(canvas){
    if(!(canvas instanceof HTMLCanvasElement))
        return;

    const context = canvas.getContext("2d");
    context.fillStyle = "black";
    context.fillRect(0, 0, 300, 300);
}

drawSquare(canvas);