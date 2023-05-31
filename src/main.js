import ImageGL from "./view/image";
import IndexedMeshT from "./webgl/indexed-mesh";
import countryVert from "./shaders/countryVert";
import phongFrag from "./shaders/phongFrag";
import CanvasImage from "./view/canvasImage";
import Scene from "./webgl/scene";
import { Player } from "./model/player/player";
import TerritoryController from "./model/map/territories/territory-controller";
import TurnsManager from "./model/player/turns_manager";

class Game{
    #menuScene;
    #gameScene;
    #guiScene;

    #territoryController;

    #scale = 4.5;

    #inGame = false;

    #players = [];
    #turnsManager;

    static async build(canvas){
        const game = new Game();
        await game.init(canvas);

        return game;
    }

    async init(canvas){
        this.gl = canvas.getContext("webgl2");
        await this.#createMenuScene();
        //Depois talvez carregar o jogo apenas quando for dado o play
        await this.#createGameScreen();

        const names = ["claudio", "et bilu", "dom pedro", "saci", "uantedegemon", "Serrano"];

        //preto(acizentado), branco, amarelo, azul, vermelho e cinza
        const colors = [
            [0.2, 0.2, 0.2, 1.0],
            [0.9, 0.9, 0.9, 1.0],
            [0.0, 0.8, 0.8, 1.0],
            [0.0, 0.0, 0.8, 1.0],
            [0.8, 0.0, 0.0, 1.0],
            [0.5, 0.5, 0.5, 1.0]
        ];


        for(let i = 0; i < 6; i++){
            const index = Math.floor(Math.random()*colors.length);
            const color = colors[index];

            colors.splice(index, 1);

            this.#players[i] = new Player(names[i], color, "mata todo mundo");
        }

        this.#territoryController = new TerritoryController();

        const countries = [...this.#territoryController.countries];

        const countriesPerPlayer = Math.floor(countries.length/this.#players.length); 

        for(let player of this.#players){
            for(let i = 0; i<countriesPerPlayer; i++){
                const index = Math.floor(Math.random()*countries.length);

                countries[i].owner = player;
                countries[i].troops = 1;

                countries.splice(index, 1);
            }
        }

        //tratar o lance de sobrar países

        this.#turnsManager = new TurnsManager(this.#players);
    }

    async #createMenuScene(){
        this.#menuScene = new Scene(this.gl);

        const background = new ImageGL();
        await background.init(this.gl, "./assets/menu/fundo.jpg");

        const logoWar = new ImageGL();
        await logoWar.init(this.gl, "./assets/menu/logo_war.png");

        const playButton = new ImageGL();
        await playButton.init(this.gl, "./assets/menu/play_button.png");

        const settingsButton = new ImageGL();
        await settingsButton.init(this.gl, "./assets/menu/settings_button.png");
        
        const maxButton = new ImageGL();
        await maxButton.init(this.gl, "./assets/menu/max_button.png");

        //scales
        background.scaleY = 1.85
        logoWar.scale = [0.35, 0.56] 
        playButton.scale = [0.15, 0.26]
        settingsButton.scale = [0.046, 0.08]  
        maxButton.scale = [0.046, 0.08]  

        //position
        logoWar.positionY = 0.25
        
        playButton.positionY = -0.55
        
        settingsButton.positionX = 0.9
        settingsButton.positionY = 0.8

        this.#menuScene.appendElement(background, logoWar, playButton, settingsButton);

        this.gl.canvas.addEventListener("click", e=>{
            // e.clientX e e.clientY são a posição do mouse
    
            const point = Game.mapClickInCanvas(e.clientX, e.clientY, this.gl.canvas);
    
            if(playButton.pointCollision(...point)){
                this.#inGame = true;
            }
    
        })
    }

    async #createGameScreen(){
        //init
        //const mapa = new ImageGL();
        //await mapa.init(this.gl, "./assets/mapa.jpg");

        //mapa.scale = [2.7, 2.7];

        const gameScreen = new GameScreen();
        await gameScreen.init(this.gl);

        const show_cards = new ShowCards();
        await show_cards.init(this.gl);

        const fortify = new Fortify();
        await fortify.init(this.gl);
    
        //South America
        const brasil = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/south_america/brasil.obj", 
            this.gl, countryVert, phongFrag
        );
        brasil.scale = [this.#scale, this.#scale, 1];
    
        const argentina = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/south_america/argentina.obj", 
            this.gl, countryVert, phongFrag
        );
        argentina.scale = [this.#scale, this.#scale, 1];

        const chile = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/south_america/chile.obj", 
            this.gl, countryVert, phongFrag
        );
        chile.scale = [this.#scale, this.#scale, 1];

        const venezuela = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/south_america/venezuela.obj", 
            this.gl, countryVert, phongFrag
        );
        venezuela.scale = [this.#scale, this.#scale, 1];

        //North America
        const mexico = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/north_america/mexico.obj", 
            this.gl, countryVert, phongFrag
        );
        mexico.scale = [this.#scale, this.#scale, 1];

        const california = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/north_america/california.obj", 
            this.gl, countryVert, phongFrag
        );
        california.scale = [this.#scale, this.#scale, 1];

        const nova_york = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/north_america/nova_york.obj", 
            this.gl, countryVert, phongFrag
        );
        nova_york.scale = [this.#scale, this.#scale, 1];
    
        const ottawa = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/north_america/ottawa.obj", 
            this.gl, countryVert, phongFrag
        );
        ottawa.scale = [this.#scale, this.#scale, 1];

        const labrador = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/north_america/labrador.obj", 
            this.gl, countryVert, phongFrag
        );
        labrador.scale = [this.#scale, this.#scale, 1];

        const vancouver = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/north_america/vancouver.obj", 
            this.gl, countryVert, phongFrag
        );
        vancouver.scale = [this.#scale, this.#scale, 1];

        const alaska = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/north_america/alaska.obj", 
            this.gl, countryVert, phongFrag
        );
        alaska.scale = [this.#scale, this.#scale, 1];

        const mackenzie = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/north_america/mackenzie.obj", 
            this.gl, countryVert, phongFrag
        );
        mackenzie.scale = [this.#scale, this.#scale, 1];

        const groelandia = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/north_america/groelandia.obj", 
            this.gl, countryVert, phongFrag
        );
        groelandia.scale = [this.#scale, this.#scale, 1];

        //Africa
        const africa_sul = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/africa/africa_sul.obj", 
            this.gl, countryVert, phongFrag
        );
        africa_sul.scale = [this.#scale, this.#scale, 1];

        const argelia = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/africa/argelia.obj", 
            this.gl, countryVert, phongFrag
        );
        argelia.scale = [this.#scale, this.#scale, 1];

        const congo = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/africa/congo.obj", 
            this.gl, countryVert, phongFrag
        );
        congo.scale = [this.#scale, this.#scale, 1];

        const egito = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/africa/egito.obj", 
            this.gl, countryVert, phongFrag
        );
        egito.scale = [this.#scale, this.#scale, 1];

        const madagascar = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/africa/madagascar.obj", 
            this.gl, countryVert, phongFrag
        );
        madagascar.scale = [this.#scale, this.#scale, 1];

        const sudao = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/africa/sudao.obj", 
            this.gl, countryVert, phongFrag
        );
        sudao.scale = [this.#scale, this.#scale, 1];

        //Oceania
        const australia = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/oceania/australia.obj", 
            this.gl, countryVert, phongFrag
        );
        australia.scale = [this.#scale, this.#scale, 1];

        const borneu = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/oceania/borneu.obj", 
            this.gl, countryVert, phongFrag
        );
        borneu.scale = [this.#scale, this.#scale, 1];

        const nova_guine = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/oceania/nova_guine.obj", 
            this.gl, countryVert, phongFrag
        );
        nova_guine.scale = [this.#scale, this.#scale, 1];

        const sumatra = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/oceania/sumatra.obj", 
            this.gl, countryVert, phongFrag
        );
        sumatra.scale = [this.#scale, this.#scale, 1];

        //Asia
        const aral = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/asia/aral.obj", 
            this.gl, countryVert, phongFrag
        );
        aral.scale = [this.#scale, this.#scale, 1];

        const china = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/asia/china.obj", 
            this.gl, countryVert, phongFrag
        );
        china.scale = [this.#scale, this.#scale, 1];

        const dudinka = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/asia/dudinka.obj", 
            this.gl, countryVert, phongFrag
        );
        dudinka.scale = [this.#scale, this.#scale, 1];

        const india = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/asia/india.obj", 
            this.gl, countryVert, phongFrag
        );
        india.scale = [this.#scale, this.#scale, 1];

        const japao = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/asia/japao.obj", 
            this.gl, countryVert, phongFrag
        );
        japao.scale = [this.#scale, this.#scale, 1];

        const mongolia = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/asia/mongolia.obj", 
            this.gl, countryVert, phongFrag
        );
        mongolia.scale = [this.#scale, this.#scale, 1];

        const omek = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/asia/omek.obj", 
            this.gl, countryVert, phongFrag
        );
        omek.scale = [this.#scale, this.#scale, 1];

        const oriente_medio = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/asia/oriente_medio.obj", 
            this.gl, countryVert, phongFrag
        );
        oriente_medio.scale = [this.#scale, this.#scale, 1];

        const siberia = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/asia/siberia.obj", 
            this.gl, countryVert, phongFrag
        );
        siberia.scale = [this.#scale, this.#scale, 1];

        const tchita = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/asia/tchita.obj", 
            this.gl, countryVert, phongFrag
        );
        tchita.scale = [this.#scale, this.#scale, 1];

        const vietna = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/asia/vietna.obj", 
            this.gl, countryVert, phongFrag
        );
        vietna.scale = [this.#scale, this.#scale, 1];

        const vladvostok = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/asia/vladvostok.obj", 
            this.gl, countryVert, phongFrag
        );
        vladvostok.scale = [this.#scale, this.#scale, 1];

        //Europa
        const alemanha = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/europa/alemanha.obj", 
            this.gl, countryVert, phongFrag
        );
        alemanha.scale = [this.#scale, this.#scale, 1];

        const franca = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/europa/franca.obj", 
            this.gl, countryVert, phongFrag
        );
        franca.scale = [this.#scale, this.#scale, 1];

        const inglaterra = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/europa/inglaterra.obj", 
            this.gl, countryVert, phongFrag
        );
        inglaterra.scale = [this.#scale, this.#scale, 1];

        const islandia = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/europa/islandia.obj", 
            this.gl, countryVert, phongFrag
        );
        islandia.scale = [this.#scale, this.#scale, 1];

        const moscou = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/europa/moscou.obj", 
            this.gl, countryVert, phongFrag
        );
        moscou.scale = [this.#scale, this.#scale, 1];

        const polonia = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/europa/polonia.obj", 
            this.gl, countryVert, phongFrag
        );
        polonia.scale = [this.#scale, this.#scale, 1];

        const suecia = await IndexedMeshT.loadMeshFromObj(
            "./assets/meshes/europa/suecia.obj", 
            this.gl, countryVert, phongFrag
        );
        suecia.scale = [this.#scale, this.#scale, 1];

        this.#gameScene = new Scene(this.gl);
        this.#gameScene.createCamera(canvas);
        this.#gameScene.camera.camPosition[2] = 1.8;
        this.#gameScene.camera.camPosition[1] = -0.3;
        this.#gameScene.createLight([1.0, 0.0, 0.3]);

        this.#guiScene = new Scene(this.gl);
    
        const cImage = new CanvasImage();
        await cImage.init(this.gl);
    
        await cImage.update(ctx =>{
            if (!(ctx instanceof CanvasRenderingContext2D)) return
    
            ctx.fillStyle = "white";
    
            ctx.ellipse(500, 500, 400, 500, 0, 0, Math.PI*2);
    
            ctx.lineWidth = 100;
    
            ctx.stroke();
    
            ctx.font = "600px Arial";
            ctx.fillText("1", 320, 600);
        }, this.gl);
    
        cImage.scale = [0.1, 0.1];
        cImage.positionY = 0.2;
    
        this.#gameScene.appendElement(brasil, argentina, chile, venezuela, mexico, california, nova_york, ottawa, labrador, vancouver, alaska, mackenzie, groelandia, africa_sul, argelia, congo, egito, madagascar, sudao, australia, borneu, nova_guine, sumatra, aral, china, dudinka, india, japao, mongolia, omek, oriente_medio, siberia, tchita, vietna, vladvostok, alemanha, franca, inglaterra, islandia, moscou, polonia, suecia);
        this.#guiScene.appendElement(gameScreen, show_cards, fortify);
    
        //colocar a view e a projection
        brasil.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        brasil.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        brasil.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");
    
        argentina.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        argentina.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        argentina.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        chile.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        chile.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        chile.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        venezuela.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        venezuela.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        venezuela.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        mexico.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        mexico.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        mexico.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        california.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        california.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        california.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        nova_york.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        nova_york.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        nova_york.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        ottawa.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        ottawa.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        ottawa.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        labrador.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        labrador.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        labrador.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        vancouver.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        vancouver.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        vancouver.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        alaska.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        alaska.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        alaska.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        mackenzie.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        mackenzie.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        mackenzie.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        groelandia.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        groelandia.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        groelandia.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        africa_sul.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        africa_sul.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        africa_sul.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        argelia.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        argelia.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        argelia.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        congo.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        congo.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        congo.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        egito.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        egito.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        egito.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        madagascar.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        madagascar.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        madagascar.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        sudao.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        sudao.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        sudao.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        australia.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        australia.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        australia.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        borneu.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        borneu.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        borneu.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        nova_guine.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        nova_guine.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        nova_guine.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        sumatra.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        sumatra.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        sumatra.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        aral.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        aral.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        aral.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        china.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        china.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        china.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        dudinka.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        dudinka.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        dudinka.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        india.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        india.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        india.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        japao.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        japao.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        japao.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        mongolia.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        mongolia.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        mongolia.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        omek.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        omek.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        omek.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        oriente_medio.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        oriente_medio.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        oriente_medio.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        siberia.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        siberia.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        siberia.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        tchita.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        tchita.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        tchita.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        vietna.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        vietna.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        vietna.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        vladvostok.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        vladvostok.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        vladvostok.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        alemanha.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        alemanha.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        alemanha.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        franca.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        franca.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        franca.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        inglaterra.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        inglaterra.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        inglaterra.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        islandia.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        islandia.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        islandia.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        moscou.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        moscou.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        moscou.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        polonia.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        polonia.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        polonia.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");

        suecia.setUniformValue("view", this.#gameScene.camera.viewMatrix, "Matrix4fv");
        suecia.setUniformValue("projection", this.#gameScene.camera.projMatrix, "Matrix4fv");
        suecia.setUniformValue("color", [0.0, 0.0, 1.0, 1.0], "4fv");
        this.gl.canvas.addEventListener("click", e=>{
            // e.clientX e e.clientY são a posição do mouse
    
            if(!this.#inGame) return;

            const point = Game.mapClickInCanvas(e.clientX, e.clientY, this.gl.canvas);

            if(argentina.pointCollision(...point)){
                alert("argentina");
            }
    
        })
    }

    draw(){
        if(this.#inGame){
            this.#gameScene.draw();
            this.#guiScene.draw();
        }
        else{
            this.#menuScene.draw();
        }
    }

    run(){
        const run_aux = ()=>{
            this.draw();
            requestAnimationFrame(run_aux);
        }

        run_aux();
    }

    static mapClickInCanvas(x, y, canvas){
        const mappedOnCenter = [
            (x - canvas.offsetLeft) - canvas.width/2, 
            (canvas.height/2) - (y - canvas.offsetTop)
        ];

        return [mappedOnCenter[0]*2/canvas.width, mappedOnCenter[1]*2/canvas.height];
    }


}

class GameScreen{
    async init(gl){
        this.settingsButton = new ImageGL();
        await this.settingsButton.init(gl, "./assets/menu/settings_button.png");
        this.settingsButton.scale = [0.046, 0.08]; 
        GameScreen.setInitialPosition(0.9, 0.8, 0.2, this.settingsButton);

        this.card_button = new ImageGL();
        await this.card_button.init(gl, "./assets/game/card_button.png");
        this.card_button.scale = [0.08, 0.15]; 
        GameScreen.setInitialPosition(0.76, -0.85, 0.2, this.card_button);

        this.objective_button = new ImageGL();
        await this.objective_button.init(gl, "./assets/game/objective_button.png");
        this.objective_button.scale = [0.065, 0.11]; 
        GameScreen.setInitialPosition(0.92, -0.85, 0.2, this.objective_button);

        this.current_player = new ImageGL();
        await this.current_player.init(gl, "./assets/game/current_player.png");
        this.current_player.scale = [0.4, 0.6]; 
        GameScreen.setInitialPosition(0, -0.85, 0.2, this.current_player);

        this.show_players = new ImageGL();
        await this.show_players.init(gl, "./assets/game/show_players.png");
        this.show_players.scale = [0.065, 0.115]; 
        GameScreen.setInitialPosition(-0.92, -0.85, 0.2, this.show_players);
    }

    static setInitialPosition(x, y, depth, widget){
        widget.positionX = x;
        widget.positionY = y;
        widget.depth = depth;
    }

    moveAll(amountY){
        this.card_button.positionY += amountY;
        this.objective_button._tex.positionY += amountY;
        this.current_player.positionY += amountY;
    }

    draw(camera){
        this.settingsButton.draw(camera);
        this.card_button.draw(camera);
        this.objective_button.draw(camera);
        this.current_player.draw(camera);
        this.show_players.draw(camera);
    }


}

class GameScreen{
    async init(gl){
        this.settingsButton = new ImageGL();
        await this.settingsButton.init(gl, "./assets/menu/settings_button.png");
        this.settingsButton.scale = [0.046, 0.08]; 
        GameScreen.setInitialPosition(0.9, 0.8, 0.2, this.settingsButton);

        this.card_button = new ImageGL();
        await this.card_button.init(gl, "./assets/game/card_button.png");
        this.card_button.scale = [0.08, 0.15]; 
        GameScreen.setInitialPosition(0.76, -0.85, 0.2, this.card_button);

        this.objective_button = new ImageGL();
        await this.objective_button.init(gl, "./assets/game/objective_button.png");
        this.objective_button.scale = [0.065, 0.11]; 
        GameScreen.setInitialPosition(0.92, -0.85, 0.2, this.objective_button);

        this.current_player = new ImageGL();
        await this.current_player.init(gl, "./assets/game/current_player.png");
        this.current_player.scale = [0.4, 0.6]; 
        GameScreen.setInitialPosition(0, -0.85, 0.2, this.current_player);

        this.show_players = new ImageGL();
        await this.show_players.init(gl, "./assets/game/show_players.png");
        this.show_players.scale = [0.065, 0.115]; 
        GameScreen.setInitialPosition(-0.92, -0.85, 0.2, this.show_players);
    }

    static setInitialPosition(x, y, depth, widget){
        widget.positionX = x;
        widget.positionY = y;
        widget.depth = depth;
    }

    moveAll(amountY){
        this.card_button.positionY += amountY;
        this.objective_button._tex.positionY += amountY;
        this.current_player.positionY += amountY;
    }

    draw(camera){
        this.settingsButton.draw(camera);
        this.card_button.draw(camera);
        this.objective_button.draw(camera);
        this.current_player.draw(camera);
        this.show_players.draw(camera);
    }


}

class ShowCards{
    async init(gl){
        this.show_cards = new ImageGL();
        await this.show_cards.init(gl, "./assets/game/show_cards.png");
        this.show_cards.scale = [0.4, 0.7];
        ShowCards.setInitialPosition(this.show_cards.positionX, -0.85 - 1, 0.3, this.show_cards);
        
        this.cancel_button = new ImageGL();
        await this.cancel_button.init(gl, "./assets/game/cancel_button.png");
        this.cancel_button.scale = [0.046, 0.083];
        ShowCards.setInitialPosition(-0.34, -0.81 - 1, 0.4, this.cancel_button);

        this.ok_button = new ImageGL();
        await this.ok_button.init(gl, "./assets/game/ok_button.png");
        this.ok_button.scale = [0.046, 0.083];
        ShowCards.setInitialPosition(0.34, -0.81 - 1, 0.4, this.ok_button);

        this.cards_info = new ImageGL();
        await this.cards_info.init(gl, "assets/game/cards_info.png");
        this.cards_info.scale = [0.2, 0.35];
        ShowCards.setInitialPosition(0.832 + 1, this.cards_info.positionY, 0.3, this.cards_info); 
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
    async init(gl){
        this.fortify = new ImageGL();
        await this.fortify.init(gl, "./assets/game/fortify.png");
        this.fortify.scale = [0.4, 0.7];
        Fortify.setInitialPosition(this.fortify.positionX, -0.825 - 1, 0.3, this.fortify);

        this.cancel_button = new ImageGL();
        await this.cancel_button.init(gl, "./assets/game/cancel_button.png");
        this.cancel_button.scale = [0.046, 0.083];
        Fortify.setInitialPosition(-0.34, -0.81 - 1, 0.4, this.cancel_button);

        this.ok_button = new ImageGL();
        await this.ok_button.init(gl, "./assets/game/ok_button.png");
        this.ok_button.scale = [0.046, 0.083];
        Fortify.setInitialPosition(0.34, -0.81 - 1, 0.4, this.ok_button);

        this.plus_button = new ImageGL();
        await this.plus_button.init(gl, "./assets/game/plus_button.png");
        this.plus_button.scale = [0.046, 0.083];
        Fortify.setInitialPosition(0.168, -0.86 - 1, 0.4, this.plus_button);

        this.minus_button = new ImageGL();
        await this.minus_button.init(gl, "./assets/game/minus_button.png");
        this.minus_button.scale = [0.046, 0.083];
        Fortify.setInitialPosition(-0.168, -0.86 - 1, 0.4, this.minus_button);
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
        this.plus_button.positionY += amount;
        this.minus_button.positionY += amount;
    }

    draw(camera){
        this.fortify.draw(camera);
        this.cancel_button.draw(camera);
        this.ok_button.draw(camera);
        this.plus_button.draw(camera);
        this.minus_button.draw(camera);
    }
}

const canvas = document.querySelector("#game-screen");

Game.build(canvas).then(game => {
    game.run();
});
