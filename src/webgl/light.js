export default class Light{
    ambColor = [0.0, 0.0, 0.0];
    ambK = 0.5;

    difColor = [0.3, 0.3, 0.3];
    difK = 0.4;

    espColor = [1.0, 1.0, 1.0];
    espK = 0.1;
    espExp = 20.0;

    pos;

    constructor(pos){
        this.pos = pos;
    }

    createUniforms(mesh){
        mesh.setUniformValue("amb_c", this.ambColor, "3fv");
        mesh.setUniformValue("amb_k", this.ambK, "1f");
        mesh.setUniformValue("dif_c", this.difColor, "3fv");
        mesh.setUniformValue("dif_k", this.difK, "1f");
        mesh.setUniformValue("esp_c", this.espColor, "3fv");
        mesh.setUniformValue("esp_k", this.espK, "1f");
        mesh.setUniformValue("esp_p", this.espExp, "1f");
    }

}