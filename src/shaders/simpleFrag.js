export default `
    #version 300 es
    precision highp float;
    
    in vec4 fColor;

    out vec4 color;

    void main() {
      color = fColor;
    }
`