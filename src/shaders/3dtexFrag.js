export default 
    `#version 300 es
    precision highp float;

    uniform sampler2D uTexture;

    in vec2 fTexCoord;

    out vec4 color;

    void main() {
        color = texture(uTexture, fTexCoord);
    }
`