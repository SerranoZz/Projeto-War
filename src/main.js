import Mesh from "./webgl/mesh";

const canvas = document.querySelector("#game-screen");

function drawTriangle(canvas){
    if(!(canvas instanceof HTMLCanvasElement))
        return;

    const gl = canvas.getContext("webgl2");

    const devicePixelRatio = window.devicePixelRatio || 1;
    gl.canvas.width = 1024 * devicePixelRatio;
    gl.canvas.height = 768 * devicePixelRatio;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const info = [
        0.0, 0.5, 0.0, 1.0,
        0.0, 0.0, 0.0, 1.0,
        0.5, 0.0, 0.0, 1.0
    ]

    const colors = [
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0
    ]


    const vert = `#version 300 es
    precision highp float;

    in vec4 position;
    in vec4 color;

    out vec4 fColor;
    
    void main() {
      gl_Position  = position;
      fColor = color;
    }`

    const frag = `#version 300 es
    precision highp float;
    
    in vec4 fColor;

    out vec4 color;

    void main() {
      color = fColor;
    }`

    const mesh = new Mesh(gl, vert, frag, gl.TRIANGLES);
    mesh.addAttribute(gl, "position", info);
    mesh.addAttribute(gl, "color", colors);
    mesh.createVAO(gl);

    mesh.draw(gl);
}

drawTriangle(canvas);