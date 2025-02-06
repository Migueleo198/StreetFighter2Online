import { Sprite } from "./sprite.js";
import { FighterState, PushBox, FighterDirection, HurtBox } from "../application/constantsFighter.js";
import * as control from '../application/inputHandler.js';
import { STAGE_FLOOR } from "../application/constantsStage.js";

export class Ryu extends Sprite {
    constructor(x, y, imageSrc, velocity, playerId,onAttackHit) {
        super(480, STAGE_FLOOR, "./assets/spriteSheets/Arcade - Street Fighter 2 Super Street Fighter 2 - Ryu.png", FighterDirection.RIGHT, 0,onAttackHit);
        
        this.opponent;
        
        
                this.frames = new Map([
                    // IDLE
                    ['idle-1', [[75, 14, 60, 89], PushBox.IDLE, [[-18,-87,24,16],[-22,-73,40,42],[-22,-32,40,32]]]],
                    ['idle-2', [[7, 14, 59, 90], PushBox.IDLE, [[-17,-88,23,16],[-21,-74,39,42],[-21,-33,39,32]]]],
                    ['idle-3', [[277, 11, 58, 92], PushBox.IDLE, [[-16,-90,22,16],[-20,-76,38,42],[-20,-35,38,32]]]],
                    ['idle-4', [[211, 10, 55, 93], PushBox.IDLE, [[-15,-91,21,16],[-19,-77,37,42],[-19,-36,37,32]]]],
        
                    // MOVE FORWARD
                    ['forwards-1', [[9, 136, 53, 83], PushBox.IDLE, [[-14,-81,20,14],[-18,-67,36,40],[-18,-27,36,30]]]],
                    ['forwards-2', [[78, 131, 60, 89], PushBox.IDLE, [[-17,-87,23,15],[-21,-73,39,41],[-21,-33,39,31]]]],
                    ['forwards-3', [[152, 128, 64, 92], PushBox.IDLE, [[-19,-90,25,16],[-23,-76,45,42],[-23,-35,45,32]]]],
                    ['forwards-4', [[229, 130, 63, 90], PushBox.IDLE, [[-18,-88,24,15],[-22,-74,40,41],[-22,-34,40,31]]]],
                    ['forwards-5', [[307, 128, 54, 91], PushBox.IDLE, [[-15,-89,21,15],[-19,-75,37,41],[-19,-35,37,31]]]],
                    ['forwards-6', [[371, 128, 50, 89], PushBox.IDLE, [[-13,-87,19,14],[-17,-73,35,40],[-17,-33,35,30]]]],
        
                    // MOVE BACKWARD
                    ['backwards-1', [[777, 128, 61, 87], PushBox.IDLE, [[-17,-85,23,14],[-21,-71,39,40],[-21,-31,39,30]]]],
                    ['backwards-2', [[430, 124, 59, 90], PushBox.IDLE, [[-16,-88,22,15],[-20,-74,38,41],[-20,-34,38,31]]]],
                    ['backwards-3', [[559, 124, 57, 90], PushBox.IDLE, [[-15,-88,21,15],[-19,-74,37,41],[-19,-34,37,31]]]],
                    ['backwards-4', [[495, 124, 58, 90], PushBox.IDLE, [[-16,-88,22,15],[-20,-74,38,41],[-20,-34,38,31]]]],
                    ['backwards-5', [[631, 125, 58, 91], PushBox.IDLE, [[-16,-89,22,15],[-20,-75,38,41],[-20,-35,38,31]]]],
                    ['backwards-6', [[707, 126, 67, 89], PushBox.IDLE, [[-19,-87,25,14],[-23,-73,43,40],[-23,-33,43,30]]]],
        
                    // JUMP UP
                    ['jump-up-1', [[67, 244, 56, 104], PushBox.JUMP, [[-16,-102,22,16],[-20,-88,38,42],[-20,-47,38,32]]]],
                    ['jump-up-2', [[138, 233, 50, 89], PushBox.JUMP, [[-14,-87,20,15],[-18,-73,36,41],[-18,-33,36,31]]]],
                    ['jump-up-3', [[197, 233, 54, 77], PushBox.JUMP, [[-15,-75,21,13],[-19,-61,37,39],[-19,-21,37,29]]]],
                    ['jump-up-4', [[259, 240, 48, 70], PushBox.JUMP, [[-13,-68,19,12],[-17,-54,35,38],[-17,-14,35,28]]]],
                    ['jump-up-5', [[319, 234, 48, 89], PushBox.JUMP, [[-13,-87,19,14],[-17,-73,35,40],[-17,-33,35,30]]]],
                    ['jump-up-6', [[375, 244, 55, 109], PushBox.JUMP, [[-16,-107,22,15],[-20,-93,38,41],[-20,-53,38,31]]]],
        
                    // LAND THE JUMP
                    ['jump-land', [[7, 268, 55, 85], PushBox.IDLE, [[-16,-83,22,15],[-20,-69,38,41],[-20,-29,38,31]]]],
        
                    // JUMP ROLL
                    ['jump-roll-1', [[878, 121, 55, 103], PushBox.JUMP, [[-16,-101,22,15],[-20,-87,38,41],[-20,-47,38,31]]]],
                    ['jump-roll-2', [[442, 261, 61, 78], PushBox.JUMP, [[-18,-76,24,14],[-22,-62,42,40],[-22,-22,42,30]]]],
                    ['jump-roll-3', [[507, 259, 104, 42], PushBox.JUMP, [[-32,-40,48,12],[-36,-26,64,38],[-36,14,64,28]]]],
                    ['jump-roll-4', [[617, 240, 53, 82], PushBox.JUMP, [[-15,-80,21,14],[-19,-66,37,40],[-19,-26,37,30]]]],
                    ['jump-roll-5', [[676, 257, 122, 44], PushBox.JUMP, [[-38,-42,42,12],[-42,-28,58,38],[-42,12,58,28]]]],
                    ['jump-roll-6', [[804, 258, 71, 87], PushBox.JUMP, [[-21,-85,29,15],[-25,-71,45,41],[-25,-31,45,31]]]],
                    ['jump-roll-7', [[883, 261, 54, 109], PushBox.JUMP, [[-16,-107,22,15],[-20,-93,38,41],[-20,-53,38,31]]]],
        
                    // CROUCH
                    ['crouch-1', [[551, 21, 53, 83], PushBox.IDLE, [[-16,-81,22,15],[-20,-67,38,41],[-20,-27,38,31]]]],
                    ['crouch-2', [[611, 36, 57, 69], PushBox.BEND, [[-17,-66,23,14],[-21,-52,39,40],[-21,-12,39,30]]]],
                    ['crouch-3', [[679, 44, 61, 61], PushBox.CROUCH, [[-18,-59,24,13],[-22,-45,40,39],[-22,-5,40,29]]]],
        
                    // LIGHT PUNCH
                    ['light-punch-1', [[9, 365, 64, 91], PushBox.IDLE, HurtBox.IDLE]],
                    ['light-punch-2', [[98, 365, 92, 91], PushBox.IDLE, HurtBox.IDLE,[11,-85,35,18]]],
        
                    // MEDIUM PUNCH
                    ['medium-punch-1', [[6, 466, 60, 94], PushBox.IDLE, HurtBox.IDLE]],
                    ['medium-punch-2', [[86, 465, 74, 95], PushBox.IDLE, HurtBox.PUNCH]],
                    ['medium-punch-3', [[175, 465, 108, 94], PushBox.IDLE,HurtBox.PUNCH,[20,-85,55,18]]],
        
                    // HEAVY PUNCH
                    ['heavy-punch-1', [[175, 465, 108, 94], PushBox.IDLE, HurtBox.PUNCH]],
        
                    // LIGHT KICK
                    ['light-kick-1', [[87, 923, 66, 92], PushBox.IDLE, [[-19,-90,25,16],[-23,-76,45,42],[-23,-36,45,32]]]],
                    ['light-kick-2', [[162, 922, 114, 94], PushBox.IDLE, [
                        [-36,-92,30,16],  // Extended leg
                        [-23,-78,30,42],  // Body
                        [-23,-38,30,32]   // Supporting leg
                    ],[20,-85,60,18]]],
        
                    // HEAVY KICK
                    ['heavy-kick-1', [[5, 1196, 61, 90], PushBox.IDLE, [[-18,-88,24,16],[-22,-74,40,42],[-22,-34,40,32]]]],
                    ['heavy-kick-2', [[72, 1192, 94, 94], PushBox.IDLE, [
                        [-30,-92,44,16],  // Wind-up leg
                        [-22,-78,40,42],  // Body
                        [-22,-38,40,32]   // Base leg
                    ]]],
                    ['heavy-kick-3', [[176, 1191, 120, 94], PushBox.IDLE, [
                        [-40,-92,56,16],  // Extended leg
                        [-28,-78,48,42],  // Body
                        [-28,-38,48,32]   // Base leg
                    ]]],
                    ['heavy-kick-4', [[306, 1208, 101, 77], PushBox.IDLE, [
                        [-32,-75,48,14],  // Follow-through leg
                        [-24,-61,40,40],  // Body
                        [-24,-21,40,30]   // Base leg
                    ]]],
                    ['heavy-kick-5', [[418, 1204, 64, 81], PushBox.IDLE, [
                        [-20,-79,28,14],  // Recoiling leg
                        [-22,-65,40,40],  // Body
                        [-22,-25,40,30]   // Base leg
                    ]]],
                ]);
        
            


        this.animations = {
            [FighterState.IDLE]: [
                ['idle-1', 68], ['idle-2', 68],
                ['idle-3', 68], ['idle-4', 68]
            ],
            [FighterState.WALK_FORWARD]: [
                ['forwards-1', 65], ['forwards-2', 65], ['forwards-3', 65],
                ['forwards-4', 65], ['forwards-5', 65], ['forwards-6', 65]
            ],
            [FighterState.WALK_BACKWARD]: [
                ['backwards-1', 65], ['backwards-2', 65], ['backwards-3', 65],
                ['backwards-4', 65], ['backwards-5', 65], ['backwards-6', 65]
            ],
            [FighterState.JUMP_UP]: [
                ['jump-up-1', 180], ['jump-up-2', 100], ['jump-up-3', 100],
                ['jump-up-4', 100], ['jump-up-5', 100], ['jump-up-6', -1]
            ],
            [FighterState.JUMP_FORWARD]: [
                ['jump-roll-1', 20], ['jump-roll-2', 50], ['jump-roll-3', 50],
                ['jump-roll-4', 50], ['jump-roll-5', 50], ['jump-roll-6', 50],
                ['jump-roll-7', 0]
            ],
            [FighterState.JUMP_BACKWARD]: [
                ['jump-roll-7', 260], ['jump-roll-6', 60], ['jump-roll-5', 60],
                ['jump-roll-4', 60], ['jump-roll-3', 60], ['jump-roll-2', 60],
                ['jump-roll-1', 0.1]
            ],
            [FighterState.JUMP_LAND]: [
                ['jump-land', 50], ['jump-land', -2]
            ],
            [FighterState.CROUCH]: [
                ['crouch-1', 30], ['crouch-2', 30],
                ['crouch-3', 30], ['crouch-3', -2]
            ],
            [FighterState.LIGHT_PUNCH]: [
                ['light-punch-1', 33], ['light-punch-2', 66],
                ['light-punch-1', 66], ['light-punch-1', 66]
            ],
            [FighterState.MEDIUM_PUNCH]: [
                ['medium-punch-1', 16],
                ['medium-punch-2', 33],
                ['medium-punch-3', 66],
                ['heavy-punch-1', 50],
                ['heavy-punch-1', 50],
            ],
            [FighterState.HEAVY_PUNCH]: [
                ['heavy-punch-1', 50],
                ['heavy-punch-1', 33],
                ['heavy-punch-1', 100],
                ['heavy-punch-1', 166],
                ['heavy-punch-1', 199],
                ['heavy-punch-1', 33],
                ['heavy-punch-1', 33],
                ['heavy-punch-1', 33]
            ],
            [FighterState.LIGHT_KICK]: [
                ['light-kick-1', 50],
                ['light-kick-2', 133],
                ['light-kick-1', 50],
                ['light-kick-1', -1],
            ]
        };

        this.initialVelocity = {
            x: {
                [FighterState.WALK_FORWARD]: 200,
                [FighterState.WALK_BACKWARD]: -150,
                [FighterState.JUMP_FORWARD]: 170,
                [FighterState.JUMP_BACKWARD]: -200
            },
            jump: {
                y: -420
            }
        };

        this.gravity = 1000;

        // Initialize punch charge time (unused in this approach)
        this.punchChargeTime = 0;
    }

    // Override update method to hold the last frame of MEDIUM_PUNCH while the punch button remains held.
    update(time, renderer, camera) {
        // Call the base update (which updates animation, physics, etc.)
        super.update(time, renderer, camera);

        // For MEDIUM_PUNCH, if we're at the last frame, freeze the animation if the punch key is still held.
        if (this.currentState === FighterState.MEDIUM_PUNCH) {
            const anim = this.animations[FighterState.MEDIUM_PUNCH];
            if (this.animationFrame === anim.length - 1) {
                if (control.isKeyDown(this.playerId, 'KeyJ')) {
                    // Freeze the animation by not advancing the frame
                    return;
                } else {
                    // Once the key is released, transition to idle or another appropriate state.
                    this.changeState(FighterState.IDLE);
                }
            }
        }
    }

    // Override draw method to adjust punch frame positioning
    draw(renderer, camera) {
        const [frameKey] = this.animations[this.currentState][this.animationFrame];
        const frameData = this.frames.get(frameKey);
        if (!frameData) return;

        const [srcParams, pushBox] = frameData;
        const [srcX, srcY, frameWidth, frameHeight] = srcParams;

        // Calculate drawing position relative to the camera
        let drawX = this.position.x - camera.position.x;
        let drawY = this.position.y - camera.position.y;

        // For LIGHT_PUNCH, adjust drawX if needed (example logic)
        if (this.currentState === FighterState.LIGHT_PUNCH) {
            const normalPunchWidth = 64;
            if (frameWidth !== normalPunchWidth) {
                drawX -= ((frameWidth - normalPunchWidth) / 2) * this.direction;
            }
        }

        
        // Similar logic can be applied for medium/heavy punch if needed
      
        renderer.save();
        renderer.scale(this.direction, 1);
        renderer.drawImage(
            this.image,
            srcX, srcY, frameWidth, frameHeight,
            drawX * this.direction, drawY,
            frameWidth, frameHeight
        );
        renderer.restore();
    }
    
}