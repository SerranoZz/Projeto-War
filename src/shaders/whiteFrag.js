export default 
  `#version 300 es
    precision highp float;
    
    in vec4 fColor;
    in vec4 normal;

    out vec4 color;

    void main() {
      color = vec4(1.0, 0.0, 0.0, 1.0);
    }
`