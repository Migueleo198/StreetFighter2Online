import { STAGE_FLOOR } from "../../application/constantsStage.js";
import { FighterDirection } from "../../application/constantsFighter.js";

class GameService {
    constructor(){

    }

    collisionHandlerBoundaries(xPos,yPos,width,height,velocity){
       
        //HANDLER FOR BOUNDARIES
        if(xPos > width ||  xPos < 0){
            velocity = -velocity;
            console.log("collision");
        }

        return velocity;
    }

    handleFlipping(current){
        if (current.opponent) {
            if(current.playerId==0 ){
            const distanceBetween = current.position.x - current.opponent.position.x;
    
            // If the distance is less than a threshold, decide who needs to flip
            if (Math.abs(distanceBetween) <= 8 ) { // You can adjust this threshold
                // The player who goes behind (has a smaller x) should flip
                if (current.position.x <= current.opponent.position.x && current.position.y==STAGE_FLOOR && current.opponent.position.y==STAGE_FLOOR) {
                    
                    current.direction = FighterDirection.LEFT;
                    current.opponent.direction = FighterDirection.LEFT;
                   
                    current.opponent.position.x=current.position.x+60;
                    current.position.x=current.opponent.position.x+15;
                    
                    
                }

                else if(current.position.y==STAGE_FLOOR && current.opponent.position.y==STAGE_FLOOR) {
                    current.direction = FighterDirection.RIGHT;
                    current.opponent.direction = FighterDirection.RIGHT;
                    
                    current.opponent.position.x=current.position.x-60;
                    current.position.x=current.opponent.position.x-15;
                }
                else if(current.position.x <= current.opponent.position.x){
                    current.direction = FighterDirection.LEFT;
                    current.opponent.direction = FighterDirection.LEFT;

                   
                    current.position.x+=60;
                    current.opponent.position.x+=45;
                    current.velocity.x*=current.direction;
                    current.opponent.velocity.x*=current.direction;

                }
                else if(current.position.x >= current.opponent.position.x){
                    current.direction = FighterDirection.RIGHT;
                    current.opponent.direction = FighterDirection.RIGHT;

                    current.position.x-=60;
                    current.opponent.position.x-=45;
                    current.velocity.x*=-current.direction;
                    current.opponent.velocity.x*=-current.direction;
                }
                
            }
        }
        }
    }
}

export {GameService};