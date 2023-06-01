import TurnsManager from "../model/player/turns_manager";

export default class CountryEventsHandler{
    #country = null;

    constructor(canvas, turnsManager, territoryController, camera){

        this.#country = territoryController.countries.find(c => c.name==="México");
        console.log(this.#country);

        canvas.addEventListener("click", e=>{
            if(turnsManager.state === TurnsManager.FREEZE) return;
    
            const point = CountryEventsHandler.mapClickInCanvas(e.clientX, e.clientY, canvas);
    
            const country = territoryController.clickedCountry(...point, camera);

            if(country)
                alert(country.name);
            else
                alert("nulo");

            if(country) countryEvents.get(TurnsManager.ATTACK)(turnsManager.player, country);

            //this.#country = country;

            console.log("arg");

            this.#country.mesh.pointCollision(...point, camera);
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

countryEvents.set(TurnsManager.ATTACK, (player, country)=>{
    if(!attack.base) {
        console.log(country.owner === player);

        if(country.owner === player){

            attack.base = country;
            country.mesh.position[2] +=1.0;
        }
    }else{
        const index = attack.base.neighbors.indexOf(country.name);

        if(index === -1) return;

        player.attack()
    }
})

countryEvents.set(TurnsManager.DISTRIBUCTION, (turnsManager, country)=>{

})

countryEvents.set(TurnsManager.REASSIGNMENT, (turnsManager, country)=>{
    
})

