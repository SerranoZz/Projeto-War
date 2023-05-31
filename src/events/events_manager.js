import TurnsManager from "../model/player/turns_manager";

export function createCountryEvents(canvas, turnsManager, territoryController, camera){

    canvas.addEventListener("click", e=>{
        if(turnsManager.state === TurnsManager.FREEZE) return;

        const point = mapClickInCanvas(e.clientX, e.clientY, canvas);

        const country = selectCountry(territoryController.countries, ...point);

        countryEvents.get(turnsManager.state)(turnsManager.player, country);
    });

}

function selectCountry(countries, x, y){
    for(let country of countries){
        if(country.mesh.pointCollision(x, y, camera))
            return country;
    }

    return null;
}

function mapClickInCanvas(x, y, canvas){
    const mappedOnCenter = [
        (x - canvas.offsetLeft) - canvas.width/2, 
        (canvas.height/2) - (y - canvas.offsetTop)
    ];

    return [mappedOnCenter[0]*2/canvas.width, mappedOnCenter[1]*2/canvas.height];
}

const countryEvents = new Map();

const attack = {}

countryEvents.set(TurnsManager.ATTACK, (turnsManager, territoryControler, country)=>{
    if(!attack.base) attack.base = country;
    else{
        const index = attack.base.neighbors.indexOf(country.name);

        if(index === -1) return;

        turnsManager.player.attack()
    }
})

countryEvents.set(TurnsManager.WAITING_ATTACKED_COUNTRY, (turnsManager, country)=>{

})

countryEvents.set(TurnsManager.DISTRIBUCTION, (turnsManager, country)=>{

})

countryEvents.set(TurnsManager.REMELATION, (turnsManager, country)=>{
    
})

