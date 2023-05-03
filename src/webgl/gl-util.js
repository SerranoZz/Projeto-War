export default class GLUtil{
    static createShader(gl, type, source_code) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source_code);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const info = gl.getShaderInfoLog(shader);
            throw new Error("Shader compilation error: "+info);
        }
    
        return shader;
    }
    
    static createProgram(gl, vertexShader, fragmentShader) {
        const program = gl.createProgram();
    
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            const info = gl.getProgramInfoLog(program);
            throw new Error('Could not compile WebGL program:' + info);
        }
    
        return program;
    }
    
    static createBuffer(gl, type, data) {
        if (data.length == 0)
          return null;
    
        if (!(data && data.buffer instanceof ArrayBuffer && data.byteLength !== undefined)) {
          console.warn('Data is not an instance of ArrayBuffer');
          return null;
        }
    
        const buffer = gl.createBuffer();

        console.log("foi");

        gl.bindBuffer(type, buffer);
        gl.bufferData(type, data, gl.STATIC_DRAW);

        return buffer;
    }
    

      // refazer essa depois
    static createVAO(gl, ...attributes) {
        const vao = gl.createVertexArray();
    
        gl.bindVertexArray(vao);

        let size;
        let type;
    
        for(let attribute of attributes){
          if (attribute.loc != null && attribute.loc != undefined) {
            gl.enableVertexAttribArray(attribute.loc);
            size = attribute.dimension;
            type = gl.FLOAT;
            gl.bindBuffer(gl.ARRAY_BUFFER, attribute.buffer);
            gl.vertexAttribPointer(attribute.loc, size, type, false, 0, 0);
          }
        }
    
        return vao;
    }
}