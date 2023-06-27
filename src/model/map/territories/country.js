import countryVert from "../../../shaders/countryVert";
import phongFrag from "../../../shaders/phongFrag";
import CanvasImage from "../../../view/canvasImage";
import IndexedMeshT from "../../../webgl/indexed-mesh";

export default class Country {
    #name;
    #path;
    #neighbors;
    #owner;
    #continent;
    #soldiers;
    #mesh;
    #meshPoint;

    constructor(name, path, continent, neighbors) {
        this.#name = name;
        this.#path = path;
        this.#neighbors = neighbors;
        this.#owner = null;
        this.#continent = continent;
        this.#soldiers = 1;
    }
    
    get name() {
        return this.#name;
    }
    
    get path() {
        return this.#path;
    }
    
    get neighbors() {
        return this.#neighbors;
    }
    
    get owner() {
        return this.#owner;
    }
    
    get continent() {
        return this.#continent;
    }

    get soldiers() {
        return this.#soldiers;
    }
    
    get mesh(){
        return this.#mesh;
    }

    get pointMesh(){
        return this.#meshPoint;
    }
    
    set continent(continent) {
        this.#continent = continent;
        continent.addCountry(this);
    }

    set owner(newOwner) {
        this.#owner = newOwner;
    }

    set soldiers(soldiers) {
        this.#soldiers = soldiers;
    }

    //Retorna o indíce do vizinho, se tiver e se não tiver retorna -1
    findNeighbor(name) {
        for(let i = 0; i < this.#neighbors.length; i++) {
            if(this.#neighbors[i] == name) {
                return i;
            }
        }
        return -1;
    }

    async loadMesh(path, gl, scale, pointPath){
        this.#mesh = await IndexedMeshT.loadMeshFromObj(path, gl, countryVert, phongFrag);
        this.#mesh.scale = [scale, scale, 1];
        this.#meshPoint = await IndexedMeshT.loadMeshFromObj(pointPath, gl, countryVert, phongFrag);
        this.#meshPoint.scale = [scale, scale, 1];
    }

    loadUniforms(camera){
        this.#mesh.setUniformValue("view", camera.viewMatrix, "Matrix4fv");
        this.#mesh.setUniformValue("projection", camera.projMatrix, "Matrix4fv");
        this.#mesh.setUniformValue("color", this.#owner.color, "4fv");

        this.#meshPoint.setUniformValue("view", camera.viewMatrix, "Matrix4fv");
        this.#meshPoint.setUniformValue("projection", camera.projMatrix, "Matrix4fv");

        if(this.#owner.color.reduce((flag, value) => flag = flag && (value === 1)) && false)
            this.#meshPoint.setUniformValue("color", [0.5, 0.5, 0.5, 0.5], "4fv");
        else
            this.#meshPoint.setUniformValue("color", this.#owner.color, "4fv");
    }

    draw(camera){
        this.#mesh.draw(camera);
        this.#meshPoint.draw(camera);
    }

    changeColor(){
        console.log(this.#owner.color)
        this.#mesh.setUniformValue("color", this.#owner.color, "4fv");
    }
}
