import Mesh from "../webgl/mesh";
import imgVert from "../shaders/imageVert";
import imgFrag from "../shaders/imageFrag";
import { mat4, vec3 } from "gl-matrix";

export default class ImageGL{
    #mesh;
    #inverseModel = mat4.create();

    #width;
    #height;

    set scaleX(x){
        if(x<=0)
            throw new Error("the scale of a image need to be greater than 0");
    
        this.#mesh.scale[0] = x; 
        mat4.invert(this.#inverseModel, this.#mesh.modelMatrix);
    }

    set scaleY(y){
        if(y<=0)
            throw new Error("the scale of a image need to be greater than 0");
    
        this.#mesh.scale[1] = y;  
        mat4.invert(this.#inverseModel, this.#mesh.modelMatrix);
    }

    set positionX(x){
        this.#mesh.position[0] = x; 
        mat4.invert(this.#inverseModel, this.#mesh.modelMatrix);
    }

    set positionY(y){
        this.#mesh.position[1] = y;   
        mat4.invert(this.#inverseModel, this.#mesh.modelMatrix);  
    }

    set depth(z){
        this.#mesh.position[2] = z;
        mat4.invert(this.#inverseModel, this.#mesh.modelMatrix);
    }

    set rotation(theta){
        this.#mesh.rotation[2] = theta;
        mat4.invert(this.#inverseModel, this.#mesh.modelMatrix);    
    }

    set scale(vec){
        if(!(vec instanceof Array) || vec.length !== 2)
            throw new Error("scale need to be a vector with two positions.");

        this.#mesh.scale = vec3.fromValues(vec[0], vec[1], 1);
        mat4.invert(this.#inverseModel, this.#mesh.modelMatrix);
    }

    set opacity(alpha){
        this.#mesh.setUniformValue("alpha", alpha, "1f");
    }

    async init(gl, src){
        this.#mesh = new Mesh(gl, imgVert, imgFrag, gl.TRIANGLES);

        const size = await this.#loadImage(src);

        const data = this.#createRect(...size);

        this.#mesh.addAttribute("position", data.coords);
        this.#mesh.addAttribute("texCoord", data.texCoords, 2);
        this.#mesh.createVAO();

        this.opacity = 1.0;
    }

    async #loadImage(imgSrc){
        const img = document.createElement("img");
        img.src = imgSrc;
        await img.decode();
        const imageBitmap = await createImageBitmap(img);

        this.#mesh.createTex(img, "uTexture");

        return [imageBitmap.width, imageBitmap.height];
    }

    #createRect(width, height){
        const proportion = width/height;

        let newWidth = 1.0;
        let newHeight = 1.0;

        (proportion<1)? newWidth*=proportion: newHeight/=proportion;

        this.#width = newWidth;
        this.#height = newHeight;

        const v1 = [-newWidth, -newHeight, 0.0, 1.0];
        const v2 = [newWidth, -newHeight, 0.0, 1.0];
        const v3 = [newWidth, newHeight, 0.0, 1.0];
        const v4 = [-newWidth, newHeight, 0.0, 1.0];

        const coords = [
            ...v1, ...v2, ...v3,
            ...v1, ...v3, ...v4
        ]

        const texCoords = [
            0, 1, 1, 1, 1, 0,
            0, 1, 1, 0, 0, 0
        ]

        return {
            coords,
            texCoords
        }
    }

    pointCollision(x, y, camera){
        const point = [x, y, 0, 1];

        const vpmInverse = mat4.create();
        mat4.copy(vpmInverse, this.#inverseModel);

        if(camera){
            const viewProj = camera.viewProjProjection;
            const vpInverse = mat4.create();
            mat4.invert(vpInverse, viewProj);
            mat4.multiply(vpmInverse, vpmInverse, vpInverse);
        }

        const pointT = multiplyMatWithVec(vpmInverse, point);

        return (Math.abs(pointT[0])<this.#width && Math.abs(pointT[1])<this.#height);
    }

    draw(camera){
        if(this.#mesh) this.#mesh.draw(camera);
    }
}

function multiplyMatWithVec(mat, vec){
    const out = new Array(vec.length).fill(0);

    if(Math.round(vec.length**2) !== mat.length)
        return;

    for(let i = 0; i<vec.length; i++)
        for(let j = 0; j<mat.length; j+=4)
            out[i]+=mat[j+i]*vec[j/4];

    return out;
}