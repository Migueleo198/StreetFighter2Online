import { FighterDirection, FighterState } from "../application/constantsFighter.js";
import { STAGE_FLOOR } from "../application/constantsStage.js";
import { isKeyDown, isKeyUp } from "../application/inputHandler.js";
import * as control from '../application/inputHandler.js';
import { SpritesUseCases } from "../application/spritesUseCases.js";
import { rectsOverlap } from "../infrastructure/utils/collisions.js";
import { GameService } from "./services/GameService.js";
import { Camera } from "../infrastructure/utils/camera.js";
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
        };

        this.changeState(FighterState.IDLE);
        this.opponent;

        this.functions = new SpritesUseCases();

        this.pushBox = { x: 0, y: 0, width: 0, height: 0 };

        this.pushBoxAlignX = 0;
        this.pushBoxAlignY = 0;
    }

    getDirection = () => {
        if (!this.opponent) {
            return this.direction;
        }

        return this.position.x < this.opponent.position.x ? FighterDirection.RIGHT : FighterDirection.LEFT;
    };

    getPushBox(frameKey) {
        const [, [x, y, width, height] = [0, 0, 0, 0]] = this.frames.get(frameKey);

        return { x, y, width, height };
    }



    //JUMP FUNCTIONS
    handleJumpStartInit() {

    }


    updateAnimation(time) {
        const animation = this.animations[this.currentState];
        const [frameKey, frameDelay] = animation[this.animationFrame];

        if (time.previous > this.animationTimer + frameDelay * 1.3) {

            this.animationTimer = time.previous;

            if (frameDelay > 0) {
                this.animationFrame++;
                this.pushBox = this.getPushBox(frameKey);
            }

            if (this.animationFrame >= animation.length) {
                this.animationFrame = 0;
            }
        }
    }

    hasCollidedWithOpponent() {
        return rectsOverlap(
            this.position.x + this.pushBox.x,
            this.position.y + this.pushBox.y,
            this.pushBox.width,
            this.pushBox.height,

            this.opponent.position.x + this.opponent.pushBox.x,
            this.opponent.position.y + this.opponent.pushBox.y,
            this.opponent.pushBox.width,
            this.opponent.pushBox.height
        );
    }


    drawDebug(renderer, camera) {
       

        const [frameKey] = this.animations[this.currentState][this.animationFrame];
        const pushBox = this.getPushBox(frameKey);

        renderer.lineWidth = 1;

        // Push Box
        renderer.beginPath();
        renderer.strokeStyle = '#55FF55';
        renderer.fillStyle = '#55FF5555';

        // Adjust color when facing right or left
        if (this.direction === FighterDirection.RIGHT) {
            renderer.fillStyle = '#55FF5535';
        } else {
            renderer.fillStyle = '#55FF5555'; // Default for the left direction
        }

        // Correct the drawing position and width depending on the direction
        const adjustedX = this.position.x + 12 - camera.position.x + (this.direction === FighterDirection.RIGHT ? 0 : pushBox.x * 3 - 12);
        const adjustedWidth = this.direction === FighterDirection.RIGHT ? pushBox.width : pushBox.width;

        // Ensure correct drawing based on direction
        renderer.fillRect(
            Math.floor(adjustedX) + 0.5,
            Math.floor(this.position.y - camera.position.y) + 0.5,
            Math.abs(adjustedWidth), // Always positive width value
            pushBox.height
        );

        renderer.rect(
            Math.floor(adjustedX) + 0.5,
            Math.floor(this.position.y - camera.position.y) + 0.5,
            Math.abs(adjustedWidth), // Always positive width value
            pushBox.height
        );
        renderer.stroke();
    }


    changeState(newState) {
        //this.velocity * this.direction < 0 ? FighterState.WALK_BACKWARD : FighterState.WALK_FORWARD; 

        this.currentState = newState;


        this.animationFrame = 0;


        this.states[this.currentState].init();


    }

    handleJumpInit() {
        this.shoryouken = document.body.querySelector('.shoryouken');



        this.playAudio(this.shoryouken);

        this.velocity.y = this.initialVelocity.jump.y;
        this.handleMoveInit();


    }

    // makes playing audio return a promise
    playAudio(audio) {
        return new Promise(res => {
            audio.play()
            audio.onended = res
        })
    }

    // how to call
    async test() {
        const audio = new Audio('<url>')
        await playAudio(audio)
        // code that will run after audio finishes...
    }

    handleWalkForwardState() {
        if (!control.isForward(this.playerId, this.direction)) {
            this.changeState(FighterState.IDLE);

        }

        if (control.isUp(this.playerId)) {
            this.changeState(FighterState.JUMP_FORWARD);
        }

    }

    handleWalkBackwardState() {


        if (!control.isBackward(this.playerId, this.direction)) {
            this.changeState(FighterState.IDLE);

        }

        if (control.isUp(this.playerId)) {
            this.changeState(FighterState.JUMP_BACKWARD);
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
        if (!control.isDown(this.playerId)) {
            this.changeState(FighterState.IDLE);
            this.position.y = STAGE_FLOOR;
        }
    }


    handleIdleInit() {
        this.velocity.y = 0;
        this.velocity.x = 0;

    }

    handleIdleState(time) {
        if (control.isUp(this.playerId)) {
            this.changeState(FighterState.JUMP_UP);
        }

        if (control.isBackward(this.playerId, this.direction)) {
            this.changeState(FighterState.WALK_BACKWARD);
            console.log('move');
        }

        if (control.isForward(this.playerId, this.direction)) {
            this.changeState(FighterState.WALK_FORWARD);
            console.log('move');
        }

        if (control.isDown(this.playerId)) {
            this.changeState(FighterState.CROUCH);
        }
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
                console.log('stop');
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
                

            }
            else{
                      // Prevent player from going out of bounds on the left
            if (this.position.x < camera.position.x + paddingRight*6) {
                this.position.x = camera.position.x + paddingRight*6;
            }
            }

        } else {
           
            if (this.position.x < camera.position.x + paddingRight ) {
                this.position.x = camera.position.x + paddingRight ;
            }
        }

        // Prevent player from going out of bounds on the right
        if (this.position.x > camera.position.x + renderer.canvas.width - this.pushBox.width + paddingLeft) {
            this.position.x = camera.position.x + renderer.canvas.width - this.pushBox.width + paddingLeft;

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