//Carregar os objetivos
//Atribuir um objetivo para cada jogador ao inicio da partida

export default class Goal{
    #goals = []; //vetor de objetivos
    #goalCount; //numero de objetivos no vetor
    #goalToReturn //objetivo a ser retornado
    
    async loadGoals(){
        const json = await fetch("./assets/data/goals.json");
        const goals = await json.json();
        
        this.#goalCount = goals.data.length;
        
        for(let i = 0; i < this.#goalCount; i++) {
            let goal = goals.data[i]
            this.#goals.push(goal);
        }
    }
    
    async sortGoal(player) {
        let index = Math.floor(Math.random() * this.#goalCount);
        if(this.#goals[index].owner == ""){
            this.#goals[index].owner = player;
            this.#goalToReturn = this.#goals[index];
        }else{
            this.sortGoal(player);
        }
    }

    get getGoal(){
        return this.#goalToReturn;
    }
}