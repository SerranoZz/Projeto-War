import ImageGL from "./view/image";
import Camera from "./webgl/camera";

const canvas = document.querySelector("#game-screen");

let screen = 0;

const gl = canvas.getContext("webgl2");

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


async function drawImage(gl){
    //initialize
    const background = new ImageGL();
    await background.init(gl, "./assets/menu/fundo.jpg");

    const logo_war = new ImageGL();
    await logo_war.init(gl, "./assets/menu/logo_war.png");

    const play_button = new ImageGL();
    await play_button.init(gl, "./assets/menu/play_button.png");

    const settings_button = new ImageGL();
    await settings_button.init(gl, "./assets/menu/settings_button.png");
    
    const max_button = new ImageGL();
    await max_button.init(gl, "./assets/menu/max_button.png");

    //scales
    background.scaleY = 1.85
    logo_war.scale = [0.35, 0.56] 
    play_button.scale = [0.15, 0.26]
    settings_button.scale = [0.05, 0.08]  
    max_button.scale = [0.05, 0.08]  

    //position
    logo_war.positionY = 0.25
    
    play_button.positionY = -0.55
    
    settings_button.positionX = 0.9
    settings_button.positionY = 0.8

    max_button.positionX = 0.9
    max_button.positionY = 0.57


    const camera = new Camera(gl.canvas);
    //camera.typeOfProjection = "perspective";
    
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);

    //draw
    logo_war.draw()
    play_button.draw()
    settings_button.draw()
    max_button.draw()
    background.draw()

    gl.disable(gl.DEPTH_TEST);

    canvas.addEventListener("click", e=>{
        // e.clientX e e.clientY são a posição do mouse

        const point = mapClickInCanvas(e.clientX, e.clientY, canvas);

        if(play_button.pointCollision(...point)){
            screen = 1;
            drawNewScreen(gl);
        }

    })
}

async function drawNewScreen(gl){
    const mapa = new ImageGL();
    await mapa.init(gl, "./assets/mapa.jpg");

    mapa.scale = [4, 4*1.85];

    let move = false;

    const camera = new Camera(canvas);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);

    mapa.draw(camera);

    gl.disable(gl.DEPTH_TEST);

    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener("mousedown", e=>{
        lastX = e.clientX;
        lastY = e.clientY;

        move = true;
    })

    canvas.addEventListener("mouseup", e=>{
        move = false;

        console.log(lastX, lastY);
    })

    canvas.addEventListener("mousemove", e=>{
        if(move){
            let distX = e.clientX - lastX;
            let distY = e.clientY - lastY;

            console.log(distX, distY);
        }
    })
}

// use essa função para conseguir a posição do mouse no sistema de coordenadas do webgl
function mapClickInCanvas(x, y, canvas){
    const mappedOnCenter = [(x - canvas.offsetLeft) - canvas.width/2, (canvas.height/2) - (y - canvas.offsetTop)];
    return [mappedOnCenter[0]*2/canvas.width, mappedOnCenter[1]*2/canvas.height];
}

drawImage(gl);
