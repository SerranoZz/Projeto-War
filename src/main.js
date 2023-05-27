import ImageGL from "./view/image";
import Camera from "./webgl/camera";

const canvas = document.querySelector("#game-screen");

let screen = 0;

const gl = canvas.getContext("webgl2");

gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

gl.clearColor(0.0, 0.0, 0.0, 1.0);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


async function drawImage(gl){
    //initialize
    const background = new ImageGL();
    await background.init(gl, "./assets/menu/fundo.jpg");

    const logoWar = new ImageGL();
    await logoWar.init(gl, "./assets/menu/logo_war.png");

    const playButton = new ImageGL();
    await playButton.init(gl, "./assets/menu/play_button.png");

    const settingsButton = new ImageGL();
    await settingsButton.init(gl, "./assets/menu/settings_button.png");
    
    const maxButton = new ImageGL();
    await maxButton.init(gl, "./assets/menu/max_button.png");

    //scales
    background.scale = [4, 7.3]
    logoWar.scale = [1.35, 2] 
    playButton.scale = [0.65, 1.1]
    settingsButton.scale = [0.15, 0.27]  
    maxButton.scale = [0.15, 0.27]  

    //position
    logoWar.positionY = 0.25
    
    playButton.positionY = -1.9
    
    settingsButton.positionX = 3.7
    settingsButton.positionY = 2.8

    maxButton.positionX = 3.7
    maxButton.positionY = 3.5

    const camera = new Camera(gl.canvas);
    //camera.typeOfProjection = "perspective";
    
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);

    //draw
    logoWar.draw(camera)
    playButton.draw(camera)
    settingsButton.draw(camera)
    maxButton.draw(camera)
    background.draw(camera)

    gl.disable(gl.DEPTH_TEST);

    canvas.addEventListener("click", e=>{
        // e.clientX e e.clientY são a posição do mouse

        const point = mapClickInCanvas(e.clientX, e.clientY, canvas);

        if(playButton.pointCollision(...point, camera)){
            screen = 1;
            drawNewScreen(gl);
        }

        if(maxButton.pointCollision(...point, camera)){
            alert("FullScreen")
         }

    })
}

async function drawNewScreen(gl){
    const mapa = new ImageGL();
    await mapa.init(gl, "./assets/mapa.jpg");

    const settingsButton = new ImageGL();
    await settingsButton.init(gl, "./assets/menu/settings_button.png");

    const maxButton = new ImageGL();
    await maxButton.init(gl, "./assets/menu/max_button.png");

    const card_button = new ImageGL();
    await card_button.init(gl, "./assets/game/card_button.png");

    const objective_button = new ImageGL();
    await objective_button.init(gl, "./assets/game/objective_button.png");

    const current_player = new ImageGL();
    await current_player.init(gl, "./assets/game/current_player.png");

    const show_players = new ImageGL();
    await show_players.init(gl, "./assets/game/show_players.png");

    const show_cards = new ShowCards();
    await show_cards.init();

    const fortify = new Fortify();
    await fortify.init();
    
    settingsButton.scale = [0.15, 0.27] 
    maxButton.scale = [0.15, 0.27]  
    card_button.scale = [0.5, 0.8]
    objective_button.scale = [0.47, 0.8]
    current_player.scale = [1.5, 2.5]
    mapa.scale = [4, 4*1.85];
    show_players.scale = [0.47, 0.8]


    settingsButton.positionX = 3.7
    settingsButton.positionY = 2.8
    settingsButton.depth = 0.2

    maxButton.positionX = 3.7
    maxButton.positionY = 3.5
    maxButton.depth = 0.2

    card_button.positionX = 2.9
    card_button.positionY = -3.2
    card_button.depth = 0.2

    objective_button.positionX = 3.6
    objective_button.positionY = -3.2
    objective_button.depth = 0.2

    show_players.positionX = -3.6
    show_players.positionY = -3.2
    show_players.depth = 0.2

    current_player.positionY = -3.375
    current_player.depth = 0.2
    
    const camera = new Camera(canvas);
    
    let move = false;
    
    
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LESS);

    mapa.draw(camera);
    settingsButton.draw(camera);
    card_button.draw(camera)
    objective_button.draw(camera)
    current_player.draw(camera)
    //fortify.draw(camera)
    //show_cards.draw(camera)
    //cards_info.draw(camera)
    maxButton.draw(camera)
    show_players.draw(camera)
    
    //final result
    show_cards.draw(camera)
    //fortify.draw(camera);
    

    gl.disable(gl.DEPTH_TEST);

    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener("mousedown", e=>{
        lastX = e.clientX;
        lastY = e.clientY;

        move = true;
    })

    canvas.addEventListener("mouseup", e=>{
        move = false;

        console.log(lastX, lastY);
    })

    canvas.addEventListener("mousemove", e=>{
        if(move){
            let distX = e.clientX - lastX;
            let distY = e.clientY - lastY;

            console.log(distX, distY);
        }
    })
}

// use essa função para conseguir a posição do mouse no sistema de coordenadas do webgl
function mapClickInCanvas(x, y, canvas){
    const mappedOnCenter = [(x - canvas.offsetLeft) - canvas.width/2, (canvas.height/2) - (y - canvas.offsetTop)];
    return [mappedOnCenter[0]*2/canvas.width, mappedOnCenter[1]*2/canvas.height];
}

class ShowCards{
    async init(){
        this.show_cards = new ImageGL();
        await this.show_cards.init(gl, "./assets/game/show_cards.png");
        this.show_cards.scale = [1.7 , 3];
        console.log(this.show_cards.positionX);
        ShowCards.setInitialPosition(this.show_cards.positionX, -3.355 - this.show_cards.width, 0.3, this.show_cards);
        
        this.cancel_button = new ImageGL();
        await this.cancel_button.init(gl, "./assets/game/cancel_button.png");
        this.cancel_button.scale = [0.27, 0.48];
        ShowCards.setInitialPosition(-1.42, -3.2 - this.show_cards.width, 0.4, this.cancel_button);

        this.ok_button = new ImageGL();
        await this.ok_button.init(gl, "./assets/game/ok_button.png");
        this.ok_button.scale = [0.27, 0.48];
        ShowCards.setInitialPosition(1.42, -3.2 - this.show_cards.width, 0.4, this.ok_button);

        this.cards_info = new ImageGL();
        await this.cards_info.init(gl, "assets/game/cards_info.png");
        this.cards_info.scale = [0.8, 1.35];
        ShowCards.setInitialPosition(3.35 + this.cards_info.width, this.cards_info.positionY, 0.3, this.cards_info); 
    }

    static setInitialPosition(x, y, depth, widget){
        widget.positionX = x;
        widget.positionY = y;
        widget.depth = depth;
    }

    moveAll(amountX, amountY){
        this.show_cards.positionY += amountY;
        this.cancel_button.positionY += amountY;
        this.ok_button.positionY += amountY;
        this.cards_info.positionX += amountX
    }

    draw(camera){
        this.show_cards.draw(camera);
        this.cancel_button.draw(camera);
        this.ok_button.draw(camera);
        this.cards_info.draw(camera);
    }

}

class Fortify{
    async init(){
        this.fortify = new ImageGL();
        await this.fortify.init(gl, "./assets/game/fortify.png");
        this.fortify.scale = [1.7 , 3];
        Fortify.setInitialPosition(this.fortify.positionX, -3.25, 0.3, this.fortify);

        this.cancel_button = new ImageGL();
        await this.cancel_button.init(gl, "./assets/game/cancel_button.png");
        this.cancel_button.scale = [0.27, 0.48];
        ShowCards.setInitialPosition(1.42, -3.2, 0.4, this.cancel_button);

        this.ok_button = new ImageGL();
        await this.ok_button.init(gl, "./assets/game/ok_button.png");
        this.ok_button.scale = [0.27, 0.48];
        ShowCards.setInitialPosition(1.42, -3.2, 0.4, this.ok_button);
    }

    static setInitialPosition(x, y, depth, widget){
        widget.positionX = x;
        widget.positionY = y;
        widget.depth = depth;
    }

    moveAll(amount){
        this.fortify.positionY += amount;
        this.cancel_button.positionY += amount;
        this.ok_button.positionY += amount;
    }

    draw(camera){
        this.fortify.draw(camera);
        this.cancel_button.draw(camera);
        this.ok_button.draw(camera);
    }
}

drawImage(gl);
