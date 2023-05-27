import ImageGL from "./view/image";
import Camera from "./webgl/camera";
import IndexedMeshT from "./webgl/indexed-mesh";
import countryVert from "./shaders/countryVert";
import phongFrag from "./shaders/phongFrag";
import Light from "./webgl/light";
import CanvasImage from "./view/canvasImage";
import texPhongVert from "./shaders/tex-phong-vert";
import texPhongFrag from "./shaders/tex-phong-frag";

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
    await settings_button.init(gl, "./assets/buttons/Group_17settings_button.png");
    
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

    mapa.scale = [2.7, 2.7];

    const brasil = await IndexedMeshT.loadMeshFromObj(
        "./assets/meshes/brasil-rotacionado.obj", 
        gl, countryVert, phongFrag
    );
    brasil.createVAO();
    brasil.scale = [1.2, 1.2, 1];
    brasil.position = [0*-1.2, 0*-0.9, 0.3];
    brasil.rotation[1] = -0.2;

    const camera = new Camera(canvas);
    //camera.projectionType = "orthogonal";
    camera.camPosition[2] = 1.7;
    camera.camPosition[1] = -0.3;

    const light = new Light([1.0, 0.0, 0.3]);

    const cImage = new CanvasImage();
    await cImage.init(gl);

    await cImage.update(ctx =>{
        if (!(ctx instanceof CanvasRenderingContext2D)) return

        ctx.fillStyle = "white";

        ctx.ellipse(500, 500, 400, 500, 0, 0, Math.PI*2);

        ctx.lineWidth = 100;

        ctx.stroke();

        ctx.font = "600px Arial";
        ctx.fillText("1", 320, 600);
    }, gl);

    cImage.scale = [0.1, 0.1];
    cImage.positionY = 0.2;

    //colocar a view e a projection
    brasil.setUniformValue("view", camera.viewMatrix, "Matrix4fv");
    brasil.setUniformValue("projection", camera.projMatrix, "Matrix4fv");
    light.createUniforms(brasil);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);

    mapa.draw(camera);
    brasil.draw(camera);

    gl.disable(gl.DEPTH_TEST);

    cImage.draw(camera);

}

// use essa função para conseguir a posição do mouse no sistema de coordenadas do webgl
function mapClickInCanvas(x, y, canvas){
    const mappedOnCenter = [(x - canvas.offsetLeft) - canvas.width/2, (canvas.height/2) - (y - canvas.offsetTop)];
    return [mappedOnCenter[0]*2/canvas.width, mappedOnCenter[1]*2/canvas.height];
}

async function loadBtn(gl){
    const button = await IndexedMeshT.loadMeshFromObj(
        "./assets/meshes/butau2.obj", 
        gl, texPhongVert, texPhongFrag, "./assets/buttons/Group_17settings_button.png"
    );
    button.createVAO();

    const camera = new Camera(canvas);
    camera.camPosition[2] = 1.5;

    const light = new Light([0.0, 0.0, 2.0]);

    const image = new ImageGL();
    await image.init(gl, "./assets/buttons/Group_17settings_button.png");

    button.setUniformValue("view", camera.viewMatrix, "Matrix4fv");
    button.setUniformValue("projection", camera.projMatrix, "Matrix4fv");
    light.createUniforms(button);

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);

    button.draw(camera);
    //image.draw(camera);

    gl.disable(gl.DEPTH_TEST);
}

drawImage(gl);
//loadBtn(gl);