import { Sprite } from "./sprite.js";
import { FighterState, PushBox, FighterDirection, HurtBox } from "../application/constantsFighter.js";

export class Ken extends Sprite {
    constructor(x, y, imageSrc, velocity, playerId) {
        super(x, y, imageSrc, velocity, playerId);
        
        this.opponent;
        this.frames = new Map([
            // IDLE
            ['idle-1', [[3, 528, 61, 90], PushBox.IDLE, [[-23,-88,24,16],[-26,-74,40,42],[-26,-31,40,32]]]],
            ['idle-2', [[69, 529, 61, 90], PushBox.IDLE, [[-23,-88,24,16],[-26,-74,40,42],[-26,-31,40,32]]]],
            ['idle-3', [[133, 526, 61, 90], PushBox.IDLE, [[-23,-88,24,16],[-26,-74,40,42],[-26,-31,40,32]]]],
            ['idle-4', [[200, 523, 61, 90], PushBox.IDLE, [[-23,-88,24,16],[-26,-74,40,42],[-26,-31,40,32]]]],

            // MOVE FORWARD
            ['forwards-1', [[0, 902, 64, 88], PushBox.IDLE, [[-20,-86,28,18],[-24,-72,44,44],[-24,-32,44,34]]]],
            ['forwards-2', [[81, 901, 64, 90], PushBox.IDLE, [[-20,-88,28,18],[-24,-74,44,44],[-24,-34,44,34]]]],
            ['forwards-3', [[154, 900, 63, 89], PushBox.IDLE, [[-19,-87,27,17],[-23,-73,43,43],[-23,-33,43,33]]]],
            ['forwards-4', [[243, 901, 54, 89], PushBox.IDLE, [[-16,-86,24,16],[-20,-72,40,42],[-20,-32,40,32]]]],
            ['forwards-5', [[312, 902, 50, 89], PushBox.IDLE, [[-14,-85,22,15],[-18,-71,38,41],[-18,-31,38,31]]]],

            // MOVE BACKWARD
            ['backwards-1', [[3, 1000, 61, 87], PushBox.IDLE, [[-20,-85,28,17],[-24,-71,44,43],[-24,-31,44,33]]]],
            ['backwards-2', [[71, 998, 59, 90], PushBox.IDLE, [[-20,-88,28,18],[-24,-74,44,44],[-24,-34,44,34]]]],
            ['backwards-3', [[138, 997, 57, 90], PushBox.IDLE, [[-19,-87,27,17],[-23,-73,43,43],[-23,-33,43,33]]]],
            ['backwards-4', [[204, 996, 58, 90], PushBox.IDLE, [[-18,-86,26,16],[-22,-72,42,42],[-22,-32,42,32]]]],
            ['backwards-5', [[283, 997, 58, 91], PushBox.IDLE, [[-18,-87,26,17],[-22,-73,42,43],[-22,-33,42,33]]]],
            ['backwards-6', [[349, 998, 57, 89], PushBox.IDLE, [[-17,-85,25,15],[-21,-71,41,41],[-21,-31,41,31]]]],

            // JUMP UP
            ['jump-up-1', [[5, 1208, 56, 104], PushBox.JUMP, [[-18,-102,24,16],[-22,-88,40,42],[-22,-45,40,32]]]],
            ['jump-up-2', [[69, 1212, 50, 89], PushBox.JUMP, [[-16,-87,22,15],[-20,-73,38,41],[-20,-33,38,31]]]],
            ['jump-up-3', [[136, 1214, 54, 77], PushBox.JUMP, [[-17,-75,23,13],[-21,-61,39,39],[-21,-21,39,29]]]],
            ['jump-up-4', [[208, 1216, 48, 70], PushBox.JUMP, [[-15,-68,21,12],[-19,-54,37,38],[-19,-14,37,28]]]],
            ['jump-up-5', [[266, 1212, 48, 86], PushBox.JUMP, [[-15,-84,21,14],[-19,-70,37,40],[-19,-30,37,30]]]],
            ['jump-up-6', [[331, 1208, 55, 103], PushBox.JUMP, [[-18,-101,24,15],[-22,-87,40,41],[-22,-47,40,31]]]],

            // LAND THE JUMP
            ['jump-land', [[7, 268, 55, 85], PushBox.IDLE, [[-18,-83,24,15],[-22,-69,40,41],[-22,-29,40,31]]]],

            // JUMP ROLL
            ['jump-roll-1', [[8, 1095, 55, 103], PushBox.JUMP, [[-18,-101,24,15],[-22,-87,40,41],[-22,-47,40,31]]]],
            ['jump-roll-2', [[68, 1089, 61, 78], PushBox.JUMP, [[-20,-76,28,14],[-24,-62,44,40],[-24,-22,44,30]]]],
            ['jump-roll-3', [[134, 1102, 104, 42], PushBox.JUMP, [[-34,-40,52,12],[-38,-26,68,38],[-38,14,68,28]]]],
            ['jump-roll-4', [[249, 1090, 53, 82], PushBox.JUMP, [[-17,-80,23,14],[-21,-66,39,40],[-21,-26,39,30]]]],
            ['jump-roll-5', [[312, 1092, 122, 44], PushBox.JUMP, [[-40,-42,44,12],[-44,-28,60,38],[-44,12,60,28]]]],
            ['jump-roll-6', [[447, 1103, 71, 87], PushBox.JUMP, [[-23,-85,31,15],[-27,-71,47,41],[-27,-31,47,31]]]],
            ['jump-roll-7', [[8, 1095, 55, 103], PushBox.JUMP, [[-18,-101,24,15],[-22,-87,40,41],[-22,-47,40,31]]]],

            // CROUCH
            ['crouch-1', [[13, 4115, 55, 61], PushBox.IDLE, [[-18,-59,24,15],[-22,-45,40,41],[-22,-5,40,31]]]],
            ['crouch-2', [[13, 4115, 55, 61], PushBox.BEND, [[-18,-59,24,15],[-22,-45,40,41],[-22,-5,40,31]]]],
            ['crouch-3', [[13, 4115, 55, 61], PushBox.CROUCH, [[-18,-59,24,15],[-22,-45,40,41],[-22,-5,40,31]]]],

            // LIGHT PUNCH
            ['light-punch-1', [[8, 1416, 64, 91], PushBox.IDLE, HurtBox.IDLE]],
            ['light-punch-2', [[97, 1416, 92, 91], [-16, -80, 32, 78], HurtBox.IDLE,[-65,-85,35,18]]],
            
            // MEDIUM PUNCH
            ['medium-punch-1', [[13, 1510, 60, 94], PushBox.IDLE, HurtBox.IDLE]],
            ['medium-punch-2', [[82, 1509, 74, 95], PushBox.IDLE, HurtBox.PUNCH]],
            ['medium-punch-3', [[173, 1509, 108, 94], PushBox.IDLE,HurtBox.PUNCH,[-90,-85,55,18]]],

            // HEAVY PUNCH
            ['heavy-punch-1', [[173, 1509, 108, 94], PushBox.IDLE, [
                [-36,-92,52,18],  // Extended arm
                [-28,-78,48,44],  // Body
                [-28,-38,48,34] ]  // Legs
                ,[-40,-85,55,18]]],

            // LIGHT KICK
            ['light-kick-1', [[9, 2384, 66, 92], PushBox.IDLE, [[-40,-90,25,16],[-23,-76,45,42],[-23,-36,45,32]]]],
            ['light-kick-2', [[95, 2384, 114, 92], PushBox.IDLE, [
                [-36,-92,30,16],  // Extended leg
                [-23,-78,30,42],  // Body
                [-23,-38,30,32]   // Supporting leg
            ],[-95,-85,60,18]]],
        ]);

        this.animations = {
            [FighterState.IDLE]: [
                ['idle-1', 68], ['idle-2', 68],
                ['idle-3', 68], ['idle-4', 68]
            ],
            [FighterState.WALK_FORWARD]: [
                ['backwards-1', 65], ['backwards-2', 65], ['backwards-3', 65],
                ['backwards-4', 65], ['backwards-5', 65], ['backwards-6', 65]
            ],
            [FighterState.WALK_BACKWARD]: [
                ['forwards-1', 65], ['forwards-2', 65], ['forwards-3', 65],
                ['forwards-4', 65], ['forwards-5', 65]
            ],
            [FighterState.JUMP_UP]: [
                ['jump-up-1', 180], ['jump-up-2', 100], ['jump-up-3', 100],
                ['jump-up-4', 100], ['jump-up-5', 100], ['jump-up-6', -1],
            ],
            [FighterState.JUMP_FORWARD]: [
                ['jump-roll-1', 60], ['jump-roll-2', 60], ['jump-roll-3', 60],
                ['jump-roll-4', 60], ['jump-roll-5', 60], ['jump-roll-6', 60],
                ['jump-roll-7', 0]
            ],
            [FighterState.JUMP_BACKWARD]: [
                ['jump-roll-7', 60], ['jump-roll-6', 60], ['jump-roll-5', 60],
                ['jump-roll-4', 60], ['jump-roll-3', 60], ['jump-roll-2', 60],
                ['jump-roll-1', 0]
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
                [FighterState.JUMP_BACKWARD]: -200,
            },
            jump: {
                y: -420,
            }
        };

        this.gravity = 1000;
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
            if ( this.currentState === FighterState.LIGHT_KICK  || this.currentState === FighterState.MEDIUM_PUNCH) {
                const normalPunchWidth = -10;
                if (frameWidth !== normalPunchWidth) {
                    drawX -= ((frameWidth - normalPunchWidth) / 2) * this.direction;
                }
            }
             if(this.currentState==FighterState.LIGHT_PUNCH){
               
                    const normalPunchWidth = 30;
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