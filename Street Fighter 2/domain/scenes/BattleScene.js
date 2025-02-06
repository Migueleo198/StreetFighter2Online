import { Background } from "../Background.js";
import { BackgroundAnimation } from "../entites/stage/BackgroundAnimation.js";
import { StatusBar } from "../../infrastructure/overlays/statusBar.js";

import { Ryu } from "../Ryu.js";
import { Ken } from "../Ken.js";
import { Camera } from "../../infrastructure/utils/camera.js";
import { FighterAttackBaseData, FighterAttackStrength, FighterDirection, FighterId } from "../../application/constantsFighter.js";
import { Control, controls, GamepadThumbstick } from "../../application/control.js";
import { Sprite } from "../sprite.js";
import { GameService } from "../services/GameService.js";


import { STAGE_FLOOR } from "../../application/constantsStage.js";
import { pollGamepads, registerGamepadEvents, registerKeyboardEvents } from "../../application/inputHandler.js";
import { gameState } from "../../infrastructure/state/gameState.js";
import { LightHitSplash } from "../shared/LightHitSplash.js";
import { MediumHitSplash } from "../shared/MediumHitSplash.js";
import { HeavyHitSplash } from "../shared/HeavyHitSplash.js";





export class BattleScene {
    fighters = [];
    camera = undefined;
    shadows = [];
    entities = [];

    constructor() {
        this.stage = new Background();






        this.fighters = this.getFighterEntities();

        this.camera = new Camera(448, 16, this.fighters);

        this.overlays = [
            new StatusBar(this.fighters),
        ];
    }

    getFighterEntityClass(id) {
        switch (id) {
            case FighterId.RYU:
                return Ryu;
            case FighterId.KEN:
                return Ken;
            default: throw new Error('Unimplemented fighter entity request');

        }
    }

    getFighterEntity(fighterState, index) {
        const FighterEntityClass = this.getFighterEntityClass(fighterState.id);
        
        return new FighterEntityClass(0,0,0,0,index,this.handleAttackhit.bind(this));
    }

    getFighterEntities() {
        const fighterEntities = gameState.fighters.map(this.getFighterEntity.bind(this));
        

        fighterEntities[0].opponent = fighterEntities[1];
        fighterEntities[1].opponent = fighterEntities[0];

        return fighterEntities;
    }

    getHitSplashClass(strength){
        switch(strength){
            case FighterAttackStrength.LIGHT:
                return LightHitSplash;
            case FighterAttackStrength.MEDIUM:
                return MediumHitSplash;
            case FighterAttackStrength.HEAVY:
                return HeavyHitSplash; 
            default:
                throw new Error('Unknown strength requested!');
        }
    }

    addEntity(EntityClass, ...args){
        this.entities.push(new EntityClass(...args,this.removeEntity.bind(this)));
    }

    removeEntity(entity){
        this.entities = this.entities.filter((thisEntity) => thisEntity !== entity);
    }

    handleAttackhit(playerId,opponentId, position,strength){
        gameState.fighters[playerId].score += FighterAttackBaseData[strength].score;
        gameState.fighters[opponentId].hitPoints -= FighterAttackBaseData[strength].damage;

        

        this.addEntity(this.getHitSplashClass(strength),position.x,position.y,playerId);
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

    updateEntities(time,renderer) {
        for (const entity of this.entities) {
            entity.update(time, renderer, this.camera);
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

    drawEntities(renderer) {
        for (const entity of this.entities) {
            entity.draw(renderer, this.camera);
        }
    }

    update(time, renderer) {

        this.updateShadows(time, renderer);
        this.updateOverlays(time, renderer);
        this.stage.update(time);
        this.updateFighters(time, renderer);
        this.updateEntities(time, renderer);
        this.camera.update(time, renderer);
    }

    draw(renderer) {
        this.stage.draw(renderer, this.camera);
        this.drawFighters(renderer);
        this.drawOverlays(renderer);
        this.drawEntities(renderer);
        
    }
}