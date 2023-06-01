import TurnsManager from "../model/player/turns_manager";

export default class CountryEventsHandler{
    #country = null;

    constructor(game){

        console.log(game);

        //this.#country = territoryController.countries.find(c => c.name==="México");

        game.gl.canvas.addEventListener("click", e=>{
            //if(game.turnsManager.state === TurnsManager.FREEZE) return;

            console.log(game.inGame);

            if(!game.inGame) return;
    
            const point = CountryEventsHandler.mapClickInCanvas(e.clientX, e.clientY, game.gl.canvas);
    
            const country = game.territoryController.clickedCountry(...point, game.gameScene.camera);

            if(country)
                alert(country.name);
            else
                alert("nulo");

            if(country) countryEvents.get(TurnsManager.ATTACK)(game, country);

            this.#country = country;

            this.#country.mesh.pointCollision(...point, game.gameScene.camera);
        });

        let child;

        document.body.addEventListener("keydown", e=>{
            if(e.key==="d" && this.#country) {
                child = this.#country.mesh.drawBorder;
                document.body.appendChild(child);
            }

            if(e.key === "s"){
                document.body.removeChild(child);
            }
        })
        
    }

    static mapClickInCanvas(x, y, canvas){
        const mappedOnCenter = [
            (x - canvas.offsetLeft) - canvas.width/2, 
            (canvas.height/2) - (y - canvas.offsetTop)
        ];
    
        return [mappedOnCenter[0]*2/canvas.width, mappedOnCenter[1]*2/canvas.height];
    }
}

const countryEvents = new Map();

const attack = {}

countryEvents.set(TurnsManager.ATTACK, (game, country)=>{
    const player = game.turnsManager.player;
    const territoryController = game.territoryController;

    if(!attack.base) {
        console.log(country.owner, player);

        if(country.owner === player){
            alert("entrou");
            attack.base = country;
            country.mesh.position[2] = 0.03;
            country.mesh.scale[2] = 2;

            const neighbors = territoryController.countries.filter(c =>{
                if(country.neighbors.indexOf(c.name) !== -1)
                    return c;
            })

            game.gameScene.switchLight();

            game.gameScene.light.createUniforms(country.mesh);

            neighbors.forEach(neighbor => {
                if(neighbor.owner === player) return;

                neighbor.mesh.position[2] = 0.03;
                neighbor.mesh.scale[2] = 2;

                game.gameScene.light.createUniforms(neighbor.mesh);
            });

            console.log(neighbors);
            //country.mesh.scale[2] = 3;

            attack.neighbors = neighbors;
        }
    }else{
        if(attack.neighbors.indexOf(country) === -1) return;

        alert(`from ${attack.base.name} to ${country.name}`);

        player.attack(attack.base, country);

        game.gameScene.switchLight();

        attack.neighbors.forEach(neighbor => {
            if(neighbor.owner === player) return;

            neighbor.mesh.position[2] = 0.0;
            neighbor.mesh.scale[2] = 1;

            game.gameScene.light.createUniforms(neighbor.mesh);
        });
        
        attack.base.mesh.position[2] = 0.0;
        attack.base.mesh.scale[2] = 1;

    }
})

countryEvents.set(TurnsManager.DISTRIBUCTION, (turnsManager, country)=>{

})

countryEvents.set(TurnsManager.REASSIGNMENT, (turnsManager, country)=>{
    
})

