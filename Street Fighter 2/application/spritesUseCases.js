import * as control from '../application/inputHandler.js';
import { FighterDirection, FighterState } from "../application/constantsFighter.js";
import { STAGE_FLOOR } from "../application/constantsStage.js";
class SpritesUseCases {
    constructor() {

    }

    handleJumpInit() {
        this.shoryouken = document.body.querySelector('.shoryouken');

        this.shoryouken.load();
        this.shoryouken.play();
        this.velocity.y = this.initialVelocity.jump.y;
        this.handleMoveInit();


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


    //JUMP FUNCTIONS
    handleJumpStartInit() {

    }
}

export { SpritesUseCases };