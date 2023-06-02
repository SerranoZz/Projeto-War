export default 
    `#version 300 es
    precision highp float;
    
    uniform mat4 model;
    uniform mat4 view;
    uniform mat4 projection;

    uniform vec3 amb_c;
    uniform vec3 dif_c;
    uniform vec3 esp_c;
    uniform vec3 pos;
    uniform float amb_k;
    uniform float dif_k;
    uniform float esp_k;
    uniform float esp_p;

    in vec4 fColor;
    in vec4 normal;
    in vec4 fPos;
    in vec4 fNormal;

    out vec4 color;

    void main() {
        mat4 modelView = view*model;

        vec3 lightPos = (view * vec4(pos, 1.0)).xyz;
        vec3 pos = -(modelView * fPos).xyz;

        vec3 vNormal = normalize(inverse(transpose(modelView)) * fNormal).xyz;
        vec3 vDistance = normalize(pos - lightPos);

        vec3 normalPos = normalize(pos);

        vec3 halfVector= normalize(vDistance + normalPos);

        vec3 amb = amb_k * amb_c;

        vec3 diff = max(dot(vNormal, vDistance), 0.0) * dif_k * dif_c;

        vec3 spec = max(pow(dot(vNormal, halfVector), esp_p), 0.0) * esp_c * esp_k;

        vec3 color3 = vec3(fColor);
        
        color3 = 0.5*color3 + 0.5*(diff + amb + spec);

        color = vec4(color3, 1.0);
    }
`