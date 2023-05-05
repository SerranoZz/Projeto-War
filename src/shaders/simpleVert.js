export default `
    #version 300 es
    precision highp float;

    in vec4 position;
    in vec4 color;

    out vec4 fColor;

    void main() {
        gl_Position  = position;
        fColor = color;
    }
`