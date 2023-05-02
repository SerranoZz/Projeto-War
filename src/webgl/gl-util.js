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
    
        if (!(value && value.buffer instanceof ArrayBuffer && value.byteLength !== undefined)) {
          console.warn('Data is not an instance of ArrayBuffer');
          return null;
        }
    
        const buffer = gl.createBuffer();
        gl.bindBuffer(type, buffer);
        gl.bufferData(type, data, gl.STATIC_DRAW);
    
        return buffer;
      }
    

      // refazer essa depois
      static createVAO(gl, posAttribLoc, posBuffer, colorAttribLoc = null, colorBuffer = null, normAttribLoc = null, normBuffer = null) {
        const vao = gl.createVertexArray();
    
        gl.bindVertexArray(vao);

        let size;
        let type;
    
        if (posAttribLoc != null && posAttribLoc != undefined) {
          gl.enableVertexAttribArray(posAttribLoc);
          size = 4;
          type = gl.FLOAT;
          gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
          gl.vertexAttribPointer(posAttribLoc, size, type, false, 0, 0);
        }
    
        if (colorAttribLoc != null && colorAttribLoc != undefined) {
          gl.enableVertexAttribArray(colorAttribLoc);
          size = 1;
          type = gl.FLOAT;
          gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
          gl.vertexAttribPointer(colorAttribLoc, size, type, false, 0, 0);
        }
    
        if (normAttribLoc != null && normAttribLoc != undefined) {
          gl.enableVertexAttribArray(normAttribLoc);
          size = 4;
          type = gl.FLOAT;
          gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
          gl.vertexAttribPointer(normAttribLoc, size, type, false, 0, 0);
        }
    
        return vao;
      }
}