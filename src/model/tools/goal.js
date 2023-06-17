import { Player } from "../player/player";
//Carregar os objetivos
//Atribuir um objetivo para cada jogador ao inicio da partida

export default class Goal{
    #goals = []; //vetor de objetivos
    #goalCount; //numero de objetivos no vetor
    #goalToReturn //objetivo a ser retornado
    
    get getGoal(){
        return this.#goalToReturn;
    }

    async loadGoals(){
        const json = await fetch("./assets/data/goals.json");
        const goals = await json.json();
        
        this.#goalCount = goals.data.length;
        
        for(let i = 0; i < this.#goalCount; i++) {
            let goal = goals.data[i]
            this.#goals.push(goal);
        }
    }
    
    async sortGoal(player, color) {
        const color_name = this.colorName(color);
        let index = Math.floor(Math.random() * this.#goalCount);
        
        if(this.#goals[index].owner == ""){
            if(
                (this.#goals[index].id == 8  && color_name == 'azul')     ||
                (this.#goals[index].id == 9  && color_name == 'amarelo') ||
                (this.#goals[index].id == 10  && color_name == 'vermelho') ||
                (this.#goals[index].id == 11  && color_name == 'preto')    ||
                (this.#goals[index].id == 12  && color_name == 'verde')
            
            ){
                console.log(this.#goals[index], "Você não pode se matar");
                this.sortGoal(player, color);
            }else{
                this.#goals[index].owner = player;
                console.log(this.#goals[index].owner);
                this.#goalToReturn = this.#goals[index];
            }
        }else{
            this.sortGoal(player, color);
        }
    }

    colorName(color){
        if(`${color}` == '0,0,1,1'){
            return 'azul';
        }else if(`${color}` == '1,1,0,1'){
            return 'amarelo';
        }else if(`${color}` == '1,0,0,1'){
            return 'vermelho';
        }else if(`${color}` == '1,1,1,1'){
            return 'preto';
        }else if(`${color}` == '0,0,0,1'){
            return 'branco';
        }else if(`${color}` == '0,0.4,0,1'){
            return 'verde';
        }
    }

    //se o objetivo do jogador estiver entre 8 e 13 chamar essa função.
    verifyDestroy(playerGoal){
        let color = "";
        
        if(playerGoal.goalId == 8){
            azul
            return false;
        }else if(playerGoal.goalId == 9){
            amarelo
            return false;
        }else if(playerGoal.goalId == 10){
            vermelho
            return false;
        }else if(playerGoal.goalId == 11){
            preto
            return false;
        }else if(playerGoal.goalId == 12){
            branco
            return false;
        }else if(playerGoal.goalId == 13){
            verde
            return false;
        }
        return true
    }

}