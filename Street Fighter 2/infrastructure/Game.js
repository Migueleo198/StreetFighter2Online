import { Sprite } from "../domain/sprite.js";
import { GameService } from "../domain/services/GameService.js";
import { Background } from "../domain/Background.js";
import { Ryu } from "../domain/Ryu.js";
import { FighterDirection } from "../application/constantsFighter.js";
import { STAGE_FLOOR } from "../application/constantsStage.js";
import { pollGamepads, registerGamepadEvents, registerKeyboardEvents } from "../application/inputHandler.js";
import { Ken } from "../domain/Ken.js";
import { StatusBar } from "./overlays/statusBar.js";
import { Camera } from "./utils/camera.js";
const GAME_VIEWPORT = {
    WIDTH: 384,
    HEIGHT: 224
}

export class StreetFighterGame {


    constructor() {
      
        this.renderer = this.getRenderer();
        this.fighters = [
            //LAST VALUE IS PLAYER ID (0 or 1)
            new Ryu(200, STAGE_FLOOR, "./assets/spriteSheets/Arcade - Street Fighter 2 Super Street Fighter 2 - Ryu-copy.png", FighterDirection.RIGHT,0),
            new Ken(728, STAGE_FLOOR, "./assets/spriteSheets/Arcade - Street Fighter 2 Super Street Fighter 2 - Ken.png", FighterDirection.RIGHT,1),
        ]

        this.fighters[0].opponent = this.fighters[1];
        this.fighters[1].opponent = this.fighters[0];

        this.camera = new Camera(448,16,this.fighters);


        

        this.entities = [
            new Background(),
            ...this.fighters,
            new StatusBar(this.fighters),
        ]

        this.frameTime = {
            previous: 0,
            secondsPassed: 0,
        }

        this.SERVICE = new GameService();

       

    }

    getRenderer() {
        const CANVAS = document.querySelector('canvas');
        const RENDERER = CANVAS.getContext('2d');

        RENDERER.imageSmoothingEnabled = false;

        CANVAS.width = GAME_VIEWPORT.WIDTH;
        CANVAS.height = GAME_VIEWPORT.HEIGHT;

        CANVAS.style.width = `${GAME_VIEWPORT.WIDTH * GAME_VIEWPORT.SCALE}px`;
        CANVAS.style.height = `${GAME_VIEWPORT.HEIGHT * GAME_VIEWPORT.SCALE}px`;

        return RENDERER;
    }

    

    update() {
       
       this.camera.update(this.frameTime, this.renderer);

       for(const entity of this.entities){
       
        entity.update(this.frameTime,this.renderer,this.camera);
       }
      
    }

    draw(){
        this.renderer.imageSmoothingEnabled = false; // or false
  this.renderer.imageSmoothingQuality = 'high'; // options: 'low', 'medium', 'high'
        for(const entity of this.entities){
           
            entity.draw(this.renderer,this.camera);
           
        }
        //this.fighters[0].drawDebug(this.renderer,this.camera);
        //this.fighters[1].drawDebug(this.renderer,this.camera);
        
       
    }

    

    frame(time){
        window.requestAnimationFrame(this.frame.bind(this));

        this.frameTime = {
                secondsPassed: (time - this.frameTime.previous) / 1000,  
                previous: time,
            
        }
        window.onload = function() {
            audio.play();
        }
        window.addEventListener('DOMContentLoaded', () => {
            audio.load();
            audio.play();
            audio.loop = true;
        });
       
        pollGamepads();
        this.update();
        this.draw();
    }

    startGame() {
        registerKeyboardEvents();
        registerGamepadEvents();
        window.requestAnimationFrame(this.frame.bind(this));
    }
}
























