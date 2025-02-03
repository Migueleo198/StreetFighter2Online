import { FighterDirection, FighterState,FighterAttackType } from "../application/constantsFighter.js";
import { STAGE_FLOOR } from "../application/constantsStage.js";
import { isKeyDown, isKeyUp, isControlDown, isForward, isBackward, isUp, isDown } from "../application/inputHandler.js";
import * as control from '../application/inputHandler.js';
import { SpritesUseCases } from "../application/spritesUseCases.js";
import { boxOverlap, getActualBoxDimensions, rectsOverlap } from "../infrastructure/utils/collisions.js";
import { GameService } from "./services/GameService.js";
import { Camera } from "../infrastructure/utils/camera.js";
import { controls } from "../application/control.js";
import { Control } from "../application/control.js";
import { isControlPressed } from "../application/inputHandler.js";  // Add this import
import { isButtonDown } from "../application/inputHandler.js";  // Add this import
import { gameState } from "../infrastructure/state/gameState.js";

class Sprite {
    constructor(x, y, imageSrc, direction, playerId) {
        this.service = new GameService();
        this.initialVelocity = {};
        this.gravity = 0;
        this.direction = direction;
        this.playerId = playerId;
        this.velocity = {
            x: 0,
            y: 0
        };

        this.position = {
            x: x,
            y: y
        };

        this.health = 100;
        this.image = new Image();
        this.imageSrc = imageSrc;

        this.frames = new Map();

        this.animationTimer = 0;
        this.animationFrame = 0;
        this.isMoving = false;

        this.animations = {};

        this.image.src = this.imageSrc;

        this.states = {
            [FighterState.IDLE]: {
                init: this.handleIdleInit.bind(this),
                update: this.handleIdleState.bind(this)
            },
            [FighterState.WALK_FORWARD]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkForwardState.bind(this)
            },
            [FighterState.WALK_BACKWARD]: {
                init: this.handleMoveInit.bind(this),
                update: this.handleWalkBackwardState.bind(this)
            },
            [FighterState.JUMP_UP]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this)
            },
            [FighterState.JUMP_FORWARD]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
            },
            [FighterState.JUMP_BACKWARD]: {
                init: this.handleJumpInit.bind(this),
                update: this.handleJumpState.bind(this),
            },
            [FighterState.CROUCH]: {
                init: this.handleCrouchInit.bind(this),
                update: this.handleCrouchState.bind(this)
            },
            [FighterState.LIGHT_PUNCH]: {
                attackType:FighterAttackType.PUNCH,
                init: this.handleStandardLightAttackInit.bind(this),
                update: this.handleStandardLightPunchState.bind(this)
            },
            [FighterState.MEDIUM_PUNCH]: {
                attackType:FighterAttackType.PUNCH,
                init: this.handleStandardMediumAttackInit.bind(this),
                update: this.handleStandardMediumPunchState.bind(this)
            },
            [FighterState.HEAVY_PUNCH]: {
                attackType:FighterAttackType.PUNCH,
                init: this.handleStandardHeavyAttackInit.bind(this),
                update: this.handleStandardMediumPunchState.bind(this)
            },
            [FighterState.LIGHT_KICK]: {
                attackType:FighterAttackType.KICK,
                init: this.handleStandardLightKickInit.bind(this),
                update: this.handleStandardLightKickState.bind(this)
            },
        };

        this.changeState(FighterState.IDLE);
        this.opponent;

        this.functions = new SpritesUseCases();

        this.boxes = {push: { x: 0, y: 0, width: 0, height: 0 },
                      hurt: [[0,0,0,0], [0,0,0,0], [0,0,0,0]],
                      hit: { x: 0, y: 0, width: 0, height: 0 },
        
    };

        this.pushBoxAlignX = 0;
        this.pushBoxAlignY = 0;

        this.shoryouken = document.body.querySelector('.shoryouken');
        this.punch = document.body.querySelector('.punch');
        this.hit = document.body.querySelector('.hitSE');
    }

    updateAttackBoxCollided(time) {
        if (!this.states[this.currentState].attackType) return;
    
        const actualHitBox = getActualBoxDimensions(this.position, this.direction, this.boxes.hit);
        
        // Check all hurt boxes
        for (const hurt of this.opponent.boxes.hurt) {
            const [x, y, width, height] = hurt;
            const actualOpponentHurtBox = getActualBoxDimensions(
                this.opponent.position,
                this.opponent.direction,
                { x, y, width, height }
            );
    
            if (boxOverlap(actualHitBox, actualOpponentHurtBox)) {
                console.log(`${gameState.fighters[this.playerId].id} hit ${gameState.fighters[this.opponent.playerId].id}`);
                this.hit.volume = Math.min(this.hit.volume + 20, 1); // Increase by 10%, max 1.0
                
                this.hit.load();
                this.hit.play();
                // Handle damage here
                return; // Stop after first successful hit

            }
        }
    }

    handleStandardLightKickInit(){
        this.velocity.x = 0; // Stop horizontal movement during punch
        this.velocity.y = 0; // Stop vertical movement during punch
        this.handleIdleInit();
    }

    handleStandardLightKickState(){
        if (this.animationFrame >= this.animations[FighterState.LIGHT_KICK].length - 1 ) {
            this.changeState(FighterState.IDLE); // Return to idle state after the punch
        }
    }


    handleStandardHeavyAttackInit() {
        this.velocity.x = 0; // Stop horizontal movement during punch
        this.velocity.y = 0; // Stop vertical movement during punch
        this.handleIdleInit();
    }

    handleStandardMediumAttackInit() {
        this.velocity.x = 0; // Stop horizontal movement during punch
        this.velocity.y = 0; // Stop vertical movement during punch
        this.handleIdleInit();
    }

    handleStandardMediumPunchState(time) {
        if(this.animationFrame<2){
            return;
        }

        
            

        // Check if the punch animation is complete
        if (this.animationFrame >= this.animations[FighterState.MEDIUM_PUNCH].length - 1 ) {
            this.changeState(FighterState.IDLE); // Return to idle state after the punch
        }

        if (this.animationFrame >= this.animations[FighterState.HEAVY_PUNCH].length - 1 ) {
            this.changeState(FighterState.IDLE); // Return to idle state after the punch
        }

       
    }

    

    handleStandardLightAttackInit() {
        this.velocity.x = 0; // Stop horizontal movement during punch
        this.velocity.y = 0; // Stop vertical movement during punch
        this.handleIdleInit();
    }

    handleStandardLightPunchState(time) {
        if(this.animationFrame<2){
            return;
        }

        if(control.isLightPunch(this.playerId)){
            this.animationFrame=0;
        }
            

        // Check if the punch animation is complete
        if (this.animationFrame >= this.animations[FighterState.LIGHT_PUNCH].length - 1) {
            this.changeState(FighterState.IDLE); // Return to idle state after the punch
        }
    }

    getDirection = () => {
        if (!this.opponent) {
            return this.direction;
        }

        return this.position.x < this.opponent.position.x ? FighterDirection.RIGHT : FighterDirection.LEFT;
    };

    getBoxes(frameKey) {
        const [, 
            [pushX=0, pushY=0, pushWidth=0, pushHeight=0] = [],
            [head = [0,0,0,0],body = [0,0,0,0], feet = [0,0,0,0]] = [],
            [hitX=0, hitY=0, hitWidth=0, hitHeight=0] = [],
        ]  = this.frames.get(frameKey);

        return {
         push:{ x:pushX, y:pushY, width:pushWidth, height:pushHeight },
         hurt: [head,body,feet],
         hit:{ x:hitX, y:hitY, width:hitWidth, height:hitHeight },
        }
    }

    updateAnimation(time) {
        const animation = this.animations[this.currentState];
       

        const [, frameDelay] = animation[this.animationFrame];

        if (time.previous <= this.animationTimer + frameDelay * 1.3) return;
        if(frameDelay<=0){return;}
        this.animationTimer = time.previous;
        this.animationFrame++;

        if (this.animationFrame >= animation.length) {
            this.animationFrame = 0;
        }

        const [newFrameKey] = animation[this.animationFrame];
        this.boxes = this.getBoxes(newFrameKey);
    }

    hasCollidedWithOpponent() {
        return rectsOverlap(
            this.position.x + this.boxes.push.x,
            this.position.y + this.boxes.push.y,
            this.boxes.push.width,
            this.boxes.push.height,

            this.opponent.position.x + this.opponent.boxes.push.x,
            this.opponent.position.y + this.opponent.boxes.push.y,
            this.opponent.boxes.push.width,
            this.opponent.boxes.push.height
        );
    }

    drawDebugBox(renderer, camera, dimensions, baseColor) {
        if (!Array.isArray(dimensions)) return;
        // dimensions: [offsetX, offsetY, boxWidth, boxHeight]
        let [offsetX = 0, offsetY = 0, boxWidth = 0, boxHeight = 0] = dimensions;
        
        // Get the current frame data (same as in draw())
        const [frameKey] = this.animations[this.currentState][this.animationFrame];
        const [[x, y, width, height]] = this.frames.get(frameKey);
        
        // Calculate the sprite's on-screen position as in draw():
        // Note: In your draw() you do:
        //   renderer.drawImage(this.image, x, y, width, height, (this.position.x - camera.position.x) * this.direction, (this.position.y - camera.position.y), width, height);
        // so we use the same:
        const spriteDrawX = (this.position.x - camera.position.x) * this.direction;
        const spriteDrawY = (this.position.y - camera.position.y);
        
        // Now draw the debug box relative to the sprite's drawn top–left corner.
        // (Assume that the hurt box offsets are defined relative to that same top–left.)
        renderer.save();
        // Apply the same horizontal scale:
        renderer.scale(this.direction, 1);

        if(this.currentState==FighterState.CROUCH){
            offsetY-=30;
        }
        
        // Draw the rectangle at the offset from the sprite's position.
        renderer.beginPath();
        renderer.strokeStyle = baseColor + "AA";
        renderer.fillStyle = baseColor + "44";
        renderer.fillRect(spriteDrawX+35+0.5 + offsetX,  this.position.y+ offsetY+85+0.5, boxWidth, boxHeight);
        renderer.rect(spriteDrawX + offsetX+35-0.5 ,  this.position.y +offsetY+85-0.5, boxWidth, boxHeight);
        renderer.stroke();
        renderer.restore();
      }
      
    
      
    
    

    drawDebug(renderer, camera) {
        const [frameKey] = this.animations[this.currentState][this.animationFrame];
        const boxes = this.getBoxes(frameKey);

        renderer.lineWidth = 1;

        //PUSH BOX
        this.drawDebugBox(renderer,camera,Object.values(boxes.push), '#55FF55');

        //HURT BOX
        for(const hurtBox of boxes.hurt){
        this.drawDebugBox(renderer,camera,hurtBox, '#7777FF');
        }

         //HIT BOX
         this.drawDebugBox(renderer,camera,Object.values(boxes.hit),'#FF3131');

        
    }

    changeState(newState) {
       
        this.currentState = newState;
        this.animationFrame = 0;
        this.states[this.currentState].init();
    }

    handleJumpInit() {
        this.playAudio(this.shoryouken);
        this.velocity.y = this.initialVelocity.jump.y;
        this.handleMoveInit();
    }

    playAudio(audio) {
        return new Promise(res => {
            audio.play();
            audio.onended = res;
        });
    }

    handleWalkForwardState() {
        // Use isControlPressed for a single press detection
        if (isControlPressed(this.playerId, Control.LIGHT_PUNCH) ) {
            this.changeState(FighterState.LIGHT_PUNCH);
            this.playAudio(this.punch);
            return;
        }else if( isControlPressed(this.playerId, Control.MEDIUM_PUNCH) ){
            this.changeState(FighterState.MEDIUM_PUNCH);
            this.playAudio(this.punch);
            return;
        }else if( isControlPressed(this.playerId, Control.LIGHT_KICK)){
            this.changeState(FighterState.LIGHT_KICK);
            this.playAudio(this.punch);
            return;
        }
        if (!isForward(this.playerId, this.direction)) {
            this.changeState(FighterState.IDLE);
        }
        if (isUp(this.playerId)) {
            this.changeState(FighterState.JUMP_FORWARD);
        }
    }
    
    handleWalkBackwardState() {
        // Use isControlPressed for a single press detection
        if (isControlPressed(this.playerId, Control.LIGHT_PUNCH) ) {
            this.changeState(FighterState.LIGHT_PUNCH);
            this.playAudio(this.punch);
            return;
        }else if( isControlPressed(this.playerId, Control.MEDIUM_PUNCH) ){
            this.changeState(FighterState.MEDIUM_PUNCH);
            this.playAudio(this.punch);
            return;
        }else if( isControlPressed(this.playerId, Control.LIGHT_KICK)){
            
            this.changeState(FighterState.LIGHT_KICK);
           
            this.playAudio(this.punch);
            return;
        }
        
        if (!isBackward(this.playerId, this.direction)) {
            this.changeState(FighterState.IDLE);
        }
        if (isUp(this.playerId)) {
            this.changeState(FighterState.JUMP_BACKWARD);
        }
    }
    
    handleIdleState(time) {
        if (isUp(this.playerId)) {
            this.changeState(FighterState.JUMP_UP);
        }
    
        if (isBackward(this.playerId, this.direction)) {
            this.changeState(FighterState.WALK_BACKWARD);
        }
    
        if (isForward(this.playerId, this.direction)) {
            this.changeState(FighterState.WALK_FORWARD);
        }
    
        if (isDown(this.playerId)) {
            this.changeState(FighterState.CROUCH);
        }
    
        // Use the debounced control check for attacks
        if (isControlPressed(this.playerId, Control.LIGHT_PUNCH) && this.currentState !== FighterState.LIGHT_PUNCH) {
            this.changeState(FighterState.LIGHT_PUNCH);
            this.playAudio(this.punch);
        } else if (isControlPressed(this.playerId, Control.MEDIUM_PUNCH) && this.currentState !== FighterState.MEDIUM_PUNCH) {
            this.changeState(FighterState.MEDIUM_PUNCH);
            this.playAudio(this.punch);
        } else if (isControlPressed(this.playerId, Control.HEAVY_PUNCH) && this.currentState !== FighterState.HEAVY_PUNCH) {
            this.changeState(FighterState.HEAVY_PUNCH);
            this.playAudio(this.punch);
        }

        if(isControlPressed(this.playerId, Control.LIGHT_KICK) && this.currentState !== FighterState.LIGHT_KICK){
            this.changeState(FighterState.LIGHT_KICK);
            this.playAudio(this.punch);

        }
    }
    
    handleJumpState(time) {
        this.velocity.y += this.gravity * time.secondsPassed;

        if (this.position.y > STAGE_FLOOR) {
            this.position.y = STAGE_FLOOR;

            // If the player was moving before the jump, continue moving
            if (this.isMoving) {
                if (this.currentState == 'jumpForward') {
                    this.changeState(FighterState.WALK_FORWARD);
                } else {
                    this.changeState(FighterState.WALK_BACKWARD);
                }
            } else {
                this.changeState(FighterState.IDLE);
            }
        }
       
    }

    handleCrouchInit() {
        this.velocity.y = 0;
        this.velocity.x = 0;
        this.position.y += 30;
        this.handleIdleInit();
    }

    handleCrouchState(time) {
        if (!isDown(this.playerId)) {
            this.changeState(FighterState.IDLE);
            this.position.y = STAGE_FLOOR;
        }
    }

    handleIdleInit() {
        this.velocity.y = 0;
        this.velocity.x = 0;
    }

    

    handleMoveInit() {
        this.velocity.x = this.initialVelocity.x[this.currentState] ?? 0;
    }

    handleMoveState(time) {
        if (this.position.y < STAGE_FLOOR) {
            this.velocity.y += this.gravity * time.secondsPassed;
        }

        if (this.position.y > STAGE_FLOOR) {
            this.position.y = STAGE_FLOOR;
            if (!this.isMoving) {
                this.changeState(FighterState.IDLE);
            }
        }
    }

    updateStageCollisions(renderer, camera) {
        let paddingLeft = -35;
        let paddingRight = 0;

        if (this.playerId == 0) {
            paddingLeft = 31;
        }

        if (this.playerId == 1) {
            paddingRight = 10;
            if (this.direction != FighterDirection.LEFT) {
                // Prevent player from going out of bounds on the left
                if (this.position.x < camera.position.x + paddingRight) {
                    this.position.x = camera.position.x + paddingRight;
                }
            } else {
                // Prevent player from going out of bounds on the left
                if (this.position.x < camera.position.x + paddingRight * 6) {
                    this.position.x = camera.position.x + paddingRight * 6;
                }
            }
        } else {
            if (this.position.x < camera.position.x + paddingRight) {
                this.position.x = camera.position.x + paddingRight;
            }
        }

        // Prevent player from going out of bounds on the right
        if (this.position.x > camera.position.x + renderer.canvas.width - this.boxes.push.width + paddingLeft) {
            this.position.x = camera.position.x + renderer.canvas.width - this.boxes.push.width + paddingLeft;
        }

        // Handle opponent collision
        if (this.opponent && this.hasCollidedWithOpponent()) {
            if (this.position.x < this.opponent.position.x) {
                this.position.x -= 2; // Push back to the left
                this.opponent.position.x += 2; // Push opponent to the right
            } else {
                this.position.x += 2; // Push back to the right
                this.opponent.position.x -= 2; // Push opponent to the left
            }
        }
    }

    update(time, renderer, camera) {
       
        this.updateAttackBoxCollided(time) ;
        
        this.updateAnimation(time);

        // Check if the players are behind each other's backs
        this.service.handleFlipping(this, this.opponent);

        this.updateStageCollisions(renderer, camera);

        this.position.x += (this.velocity.x * this.direction) * time.secondsPassed;
        this.position.y += this.velocity.y * time.secondsPassed;

        this.states[this.currentState].update(time, renderer);
    }

    draw(renderer, camera) {
        const [frameKey] = this.animations[this.currentState][this.animationFrame];
        const [[x, y, width, height]] = this.frames.get(frameKey);

        renderer.scale(this.direction, 1);
        renderer.drawImage(this.image, x, y, width, height, (this.position.x - camera.position.x) * this.direction, (this.position.y - camera.position.y), width, height);

        renderer.setTransform(1, 0, 0, 1, 0, 0);
    }
}

export { Sprite };