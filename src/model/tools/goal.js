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
        const colorName = this.colorName(color);
        let index = Math.floor(Math.random() * this.#goalCount);
        
        if(this.#goals[index].owner == ""){
            if(
                (this.#goals[index].id == 8  && colorName == 'azul')     ||
                (this.#goals[index].id == 9  && colorName == 'amarelo')  ||
                (this.#goals[index].id == 10  && colorName == 'vermelho')||
                (this.#goals[index].id == 11  && colorName == 'preto')   ||
                (this.#goals[index].id == 12  && colorName == 'branco')  ||
                (this.#goals[index].id == 13  && colorName == 'verde') 
            
            ){
                this.sortGoal(player, color);
            }else{
                this.#goals[index].owner = player;
                this.#goalToReturn = this.#goals[index];
            }
        }else{
            this.sortGoal(player, color);
        }
    }

    
    //se o objetivo do jogador estiver entre 8 e 13 chamar essa função.
    verifyDestroy(player, vetPlayer){
        let colorName;
        switch(player.goalId) {
            case 8:
                colorName = "azul";
                break;
            case 9:
                colorName = "amarelo";
                break;
            case 10:
                colorName = "vermelho";
                break;
            case 11:
                colorName = "preto";
                break;
            case 12:
                colorName = "branco";
                break;
            case 13:
                colorName = "verde";
                break;
            default:
                colorName = "";
                break;
        }

        if(colorName == "") return false;

        for(let i = 0; i < vetPlayer.length; i++){
            let playerColor = this.colorName(vetPlayer[i].color);
            if(playerColor == colorName){
                if(vetPlayer[i].territoriesOwned != 0){
                    return false
                }
            }
        }
        return true
    }

    //se o objetivo do jogador estiver entre 0 e 5 chamar essa função
    verifyContinent(player){
        let continentCount;
        let continents = [];
        let verify = false;

        switch(player.goalId){
            case 0:
                continentCount = 3;
                continents = ["Europa", "Oceania"];
                break;
            case 1:
                continentCount = 2;
                continents = ["Ásia", "América do Sul"];
                break;
            case 2:
                continentCount = 3;
                continents = ["Europa", "América do Sul"];
                break;
            case 3:
                continentCount = 2;
                continents = ["Ásia", "África"];
                break;
            case 4:
                continentCount = 2;
                continents = ["América do Norte", "África"];
                break;
            case 5:
                continentCount = 2;
                continents = ["América do Norte", "Oceania"];
                break;
        }

        if(player.continentsOwned >= continentCount){
            verify = continents.every(continent => player.vetContinentsOwned.includes(continent));
        }
       
        return verify
        
    }

    //se o objetivo do jogador for o 6 ou 7;
    verifyTerritory(player){
        let territoryCount;
        let territoryTroops;
        let verify;

        switch(player.goalId){
            case 6:
                territoryCount = 18;
                territoryTroops = 2;
                break;
            case 7:
                territoryCount = 24;
                territoryTroops = 1;
                break;
        }

        if(player.territoriesOwned >= territoryCount){
            for(let i = 0; i < player.territoriesOwned; i++){
                if(player.vetTerritoriesOwned[i].soldiers >= territoryTroops){
                    verify = true;
                }else{
                    return false;
                }
            }
        }

        return verify;
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
}