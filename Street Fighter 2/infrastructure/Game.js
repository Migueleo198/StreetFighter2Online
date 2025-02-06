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
import { BattleScene } from "../domain/scenes/BattleScene.js";
const GAME_VIEWPORT = {
    WIDTH: 384,
    HEIGHT: 224
}

export class StreetFighterGame {

    frameTime = {
        previous: 0,
        secondsPassed: 0,
    }

    animationFrameId = null;  // Store the animation frame ID

    constructor() {
        this.renderer = this.getRenderer();
        this.scene = new BattleScene();
        this.SERVICE = new GameService();
        this.renderer.imageSmoothingEnabled = false;
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

    frame(time) {
        this.animationFrameId = window.requestAnimationFrame(this.frame.bind(this));

        this.frameTime = {
            secondsPassed: (time - this.frameTime.previous) / 1000,  
            previous: time,
        };

        pollGamepads();
        this.scene.update(this.frameTime, this.renderer);
        this.scene.draw(this.renderer);

        if (this.scene.overlays[0].healthBars[0].hitPoints <= 0 || 
            this.scene.overlays[0].healthBars[1].hitPoints <= 0) {
            cancelAnimationFrame(this.animationFrameId);  // Stop the animation
        }
    }

    startGame() {
        registerKeyboardEvents();
        registerGamepadEvents();
        this.animationFrameId = window.requestAnimationFrame(this.frame.bind(this));
    }
}

























