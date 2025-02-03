import { Background } from "../Background.js";
import { BackgroundAnimation } from "../entites/stage/BackgroundAnimation.js";
import { StatusBar } from "../../infrastructure/overlays/statusBar.js";

import { Ryu } from "../Ryu.js";
import { Ken } from "../Ken.js";
import { Camera } from "../../infrastructure/utils/camera.js";
import { FighterDirection } from "../../application/constantsFighter.js";
import { Control, controls, GamepadThumbstick } from "../../application/control.js";
import { Sprite } from "../sprite.js";
import { GameService } from "../services/GameService.js";


import { STAGE_FLOOR } from "../../application/constantsStage.js";
import { pollGamepads, registerGamepadEvents, registerKeyboardEvents } from "../../application/inputHandler.js";
import { gameState } from "../../infrastructure/state/gameState.js";





export class BattleScene {
    fighters = [];
    camera = undefined;
    shadows = [];

    constructor() {
        this.stage = new Background();

       

        this.overlays = [
            new StatusBar(this.fighters),
        ];

        this.camera = new Camera(448, 16, this.fighters);

        this.fighters = this.getFighterEntities();
    }

    getFighterEntityClass(id){
        switch(id){
            
        }
    }

    getFighterEntity(fighterState,index){

    }

    getFighterEntities() {
        const fighterEntities = gameState.fighters.map(this.getFighterEntity.bind(this));

        fighterEntities[0].opponent = this.fighters[1];
        fighterEntities[1].opponent = this.fighters[0];

        return fighterEntities;
    }

    updateFighters(time, renderer) {
        for (const fighter of this.fighters) {
            fighter.update(time, renderer, this.camera);
        }
    }

    updateOverlays(time, renderer) {
        for (const overlay of this.overlays) {
            overlay.update(time, renderer, this.camera);
        }
    }

    updateShadows(time, renderer) {
        // Implement shadow updates if needed
    }

    drawFighters(renderer) {
        for (const fighter of this.fighters) {
            fighter.draw(renderer, this.camera);
        }
    }

    drawOverlays(renderer) {
        for (const overlay of this.overlays) {
            overlay.draw(renderer, this.camera);
        }
    }

    update(time, renderer) {
        
        this.updateShadows(time, renderer);
        this.updateOverlays(time, renderer);
        this.stage.update(time);
        this.updateFighters(time, renderer);
    }

    draw(renderer) {
        this.stage.drawBackground(renderer, this.camera);
        this.drawFighters(renderer);
        this.stage.drawForeground(renderer, this.camera);
        this.drawOverlays(renderer);
    }
}