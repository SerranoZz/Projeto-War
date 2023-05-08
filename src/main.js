import ImageGL from "./view/image";
import Camera from "./webgl/camera";

const canvas = document.querySelector("#game-screen");

async function drawImage(canvas){
    if(!(canvas instanceof HTMLCanvasElement))
        return;

    const gl = canvas.getContext("webgl2",{ premultipliedalpha: false });

    const devicePixelRatio = window.devicePixelRatio || 1;
    gl.canvas.width = 1280 * devicePixelRatio;
    gl.canvas.height = 720 * devicePixelRatio;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


    const bowser = new ImageGL();
    await bowser.init(gl, "./assets/bowser.png");

    bowser.positionX = 1;

    const camera = new Camera(canvas);
    
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);

    button.draw(camera);

    bowser.draw(camera);

    gl.disable(gl.DEPTH_TEST);camera.typeOfProjection = "orthogonal";

    canvas.addEventListener("click", e=>{
        // e.clientX e e.clientY são a posição do mouse

        const point = mapClickInCanvas(e.clientX, e.clientY, canvas);
    
        //o teste de colisão do botão usa as coordenadas no sistema de coordenadas do webgl;
        alert(button.pointCollision(...point, camera));
        bowser.pointCollision(...point, camera);
        console.log(point);
    })
}

// use essa função para conseguir a posição do mouse no sistema de coordenadas do webgl
function mapClickInCanvas(x, y, canvas){
    const mappedOnCenter = [(x - canvas.offsetLeft) - canvas.width/2, (canvas.height/2) - (y - canvas.offsetTop)];
    return [mappedOnCenter[0]*2/canvas.width, mappedOnCenter[1]*2/canvas.height];
}

drawImage(canvas);
