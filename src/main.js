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

    const img = new ImageGL();
    await img.init(gl, "./assets/fundo war.jpg");
    img.scale = [10,5];

    const img1 = new ImageGL();
    await img1.init(gl, "./assets/bowser.png");

    img1.rotation = Math.PI;
    img1.positionX = 2;
    //img1.depth = 0.5;

    const camera = new Camera(canvas);
    camera.typeOfProjection = "orthogonal";

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);

    img1.draw(camera);
    img.draw(camera);
    
    gl.disable(gl.DEPTH_TEST);
}

drawImage(canvas);