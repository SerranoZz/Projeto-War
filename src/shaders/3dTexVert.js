export default 
    `#version 300 es
    precision highp float;

    uniform mat4 mvp;

    in vec4 position;
    in vec4 normal;
    in vec2 texCoord;

    out vec2 fTexCoord;

    void main() {
        gl_Position = mvp * position;
        gl_Position /= gl_Position.w;
        fTexCoord = texCoord;
    }
`