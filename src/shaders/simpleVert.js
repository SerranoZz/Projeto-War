export default 
    `#version 300 es
    precision highp float;

    uniform mat4 mvp;

    in vec4 position;
    in vec4 color;

    out vec4 fColor;

    void main() {
        gl_Position = mvp * position;
        fColor = color;
    }
`