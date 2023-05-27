export default 
    `#version 300 es
    precision highp float;

    uniform mat4 model;
    uniform mat4 view;
    uniform mat4 projection;

    in vec4 position;
    in vec4 normal;
    in vec2 texCoord;

    out vec4 fPos;
    out vec2 fTexCoord;
    out vec4 fNormal;

    void main() {
        gl_Position = (projection*view*model) * position;
        gl_Position /= gl_Position.w;
        fTexCoord = texCoord;
        fPos = position;
        fNormal = normal;
    }
`