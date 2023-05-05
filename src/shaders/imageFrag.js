export default `#version 300 es
    precision highp float;
    
    in vec2 fTexCoord;

    uniform sampler2D uTexture;
    uniform float alpha;

    out vec4 color;



    void main() {
        color = texture(uTexture, fTexCoord);

        if(color.a < 0.5) discard;

        color.a = alpha;
    }
`