import { SCROLL_BOUNDARY,STAGE_FLOOR,STAGE_PADDING,STAGE_WIDTH } from "../../application/constantsStage.js";

export class Camera {
    constructor(x,y, fighters){
     this.position = { x,y};
     this.fighters = fighters;  
     
    }

    update(time,renderer){
      this.position.y = -6 + Math.floor(Math.min(this.fighters[1].position.y,this.fighters[0].position.y)/10);
      
      const lowX = Math.min(this.fighters[1].position.x,this.fighters[0].position.x);
      const highX = Math.max(this.fighters[1].position.x,this.fighters[0].position.x);

      if(highX - lowX > renderer.canvas.width - SCROLL_BOUNDARY / 2){
        const midPoint = (highX - lowX) /2;
        console.log(midPoint);
        this.position.x = lowX + midPoint  - (renderer.canvas.width/2);
      }else{
        for(const fighter of this.fighters){
            if(fighter.position.x < this.position.x + SCROLL_BOUNDARY
                && fighter.velocity.x * fighter.direction < 0 || fighter.position.x >this.position.x + renderer.canvas.width - SCROLL_BOUNDARY
            && fighter.velocity.x * fighter.direction > 0 ){
                
                this.position.x += fighter.velocity.x * fighter.direction * time.secondsPassed;
                
            }
        }
      }

      if(this.position.x < STAGE_PADDING){
        this.position.x = STAGE_PADDING;
      }

      if(this.position.x > STAGE_WIDTH-63 ){
        this.position.x = STAGE_WIDTH-63;
      }

      if(this.position.y<0){
        this.position.y =0;
      }
    }
}