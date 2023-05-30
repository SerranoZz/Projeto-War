export default 
    `#version 300 es
    precision highp float;

    uniform mat4 model;
    uniform mat4 view;
    uniform mat4 projection;
    uniform vec4 color;

    in vec4 position;
    in vec4 normal;

    out vec4 fPos;
    out vec4 fColor;
    out vec4 fNormal;

    void main() {
        gl_Position = (projection*view*model) * position;
        gl_Position /= gl_Position.w;
        fColor = color;
        fPos = position;
        fNormal = normal;
    }
`