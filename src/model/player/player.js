class PlayerWar {
    constructor(name, color, goal) {
      this.#name = name;
      this.#color = color; // pode ser usado como ID 
      this.#territoriesOwned = [];
      this.#goal=goal;
      this.#freeTroops = 0;

    }
  
    conquestTerritory(territorio) {
      this.#territoriesOwned.push(territorio);
    }
    

    receiveTroop(){

        //calcula a quantidade de tropas a ser recebida devio a quantidade de territorios        
        qtdreceivedTroops=0;
        qtdreceivedTroops+=Math.floor(this.#territoriesOwned.length / 2);

        //calcula a quantidade de tropas a ser recebida devio aos bonus de continente
        
        //a fazer

        this.#freeTroops = qtdreceivedTroops;
    }

    addTroops(country,qtdTroops){
        if (qtdTroops > this.#freeTroops){
            return this.#freeTroops // retorna a quantidade maxima de tropa q pode ser posicionada
        }
        else{
            country.soldiers(country.soldiers+qtdTroops);
            this.#freeTroops -= qtdTroops;
            if(this.#freeTroops  = 0 ){
                return -1 // flag para passar pra proxima etapa
            }
            else {
                return 0 // flag para chamar seleção novamente
            }
        }
    }


    set name(name){
        this.#name=name;
    }

    set color(color){
        this.#color=color;
    }

    get color(){
        return this.#color;
    }

}