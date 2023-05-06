import ImageGL from "./view/image";
import Camera from "./webgl/camera";

const canvas = document.querySelector("#game-screen");

async function drawImage(canvas){
    if(!(canvas instanceof HTMLCanvasElement))
        return;

    const gl = canvas.getContext("webgl2",{ premultipliedalpha: false });

    const devicePixelRatio = window.devicePixelRatio || 1;
    gl.canvas.width = 1024 * devicePixelRatio;
    gl.canvas.height = 768 * devicePixelRatio;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const button = new ImageGL();
    await button.init(gl, "./assets/button.png");

    button.positionX = 1;
    button.rotation = Math.PI/2;

    const camera = new Camera(canvas);
    camera.typeOfProjection = "orthogonal";

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);

    button.draw(camera);
    
    gl.disable(gl.DEPTH_TEST);
}

drawImage(canvas);

canvas.addEventListener("click", e=>{
    console.log(e.clientX, e.clientY);
})