import { HEALTH_COLOR, HEALTH_DAMAGE_COLOR, HEALTH_MAX_HIT_POINTS } from "../../application/battle.js";
import { FPS } from "../../application/constantsGame.js";
import { gameState } from "../state/gameState.js";

export class StatusBar {
    constructor(fighters) {
        this.image = document.body.querySelector('img[alt=misc');

        this.time = 99;
        this.timeTimer = 0;
        this.fighters = fighters
        this.frames = new Map(
            [
                ['health-bar', [16, 18, 145, 11]],

                ['ko-white', [161, 16, 32, 14]],

                ['time-0', [16, 32, 14, 16]],
                ['time-1', [32, 32, 14, 16]],
                ['time-2', [48, 32, 14, 16]],
                ['time-3', [64, 32, 14, 16]],
                ['time-4', [80, 32, 14, 16]],
                ['time-5', [96, 32, 14, 16]],
                ['time-6', [112, 32, 14, 16]],
                ['time-7', [128, 32, 14, 16]],
                ['time-8', [144, 32, 14, 16]],
                ['time-9', [160, 32, 14, 16]],

                //NAME TAGS
                ['tag-ken', [128, 56, 30, 9]],
                ['tag-ryu', [16, 56, 28, 9]],
            ]
        );

        this.healthBars  = [{
            timer: 0,
            hitPoints: HEALTH_MAX_HIT_POINTS,
        },{
            timer:0,
            hitPoints: HEALTH_MAX_HIT_POINTS,
        }]

    }

    updateHealthBars(time){
        
        for(const index in this.healthBars){
            if(this.healthBars[index].hitPoints<=gameState.fighters[index].hitPoints) continue;
            this.healthBars[index].hitPoints = Math.max(0,this.healthBars[index].hitPoints - (time.secondsPassed * FPS));

            if(this.healthBars[index].hitPoints<=0){
               
                alert('Player ' + this.fighters[index].playerId+' Wins');
                window.location.href='';
                break;
                
            }
        }
      
        
    }

    drawFrame(renderer, frameKey, x, y, direction = 1) {
        const [SourceX, SourceY, SourceWidth, SourceHeight] = this.frames.get(frameKey);

        renderer.scale(direction, 1);
        renderer.drawImage(
            this.image, SourceX,
            SourceY, SourceWidth, SourceHeight,
            x * direction,
            y, SourceWidth, SourceHeight);



        renderer.setTransform(1, 0, 0, 1, 0, 0);
    }

    updateTime(time){
        if(time.previous > this.timeTimer +664){
            if(this.time > 0 ){
                this.time-=1;
                this.timeTimer=time.previous;
            }
        }
    }

    update(time) {
        this.updateTime(time);
        this.updateHealthBars(time);
    }

   



    drawHealthBars(renderer){
        this.drawFrame(renderer,'health-bar',31,20);
        this.drawFrame(renderer,'ko-white',176,18);
        this.drawFrame(renderer,'health-bar',352,20,-1);


        renderer.fillStyle = HEALTH_DAMAGE_COLOR;

        renderer.beginPath();

        renderer.fillRect(
            32,21,HEALTH_MAX_HIT_POINTS - Math.floor(this.healthBars[0].hitPoints),9,
        );

        renderer.fillRect(
            208+Math.floor(this.healthBars[1].hitPoints),21,HEALTH_MAX_HIT_POINTS - Math.floor(this.healthBars[1].hitPoints),9,
        );
    }

    drawNameTags(renderer){
       

        this.drawFrame(renderer, `tag-${gameState.fighters[this.fighters[0].playerId].id.toLowerCase()}`,32,33);
        this.drawFrame(renderer, `tag-${gameState.fighters[this.fighters[1].playerId].id.toLowerCase()}`,322,33);
    }

    drawTime(renderer){
        const timeString = String(this.time).padStart(2,'00');

        this.drawFrame(renderer, `time-${timeString.charAt(0)}`,180,33);
        this.drawFrame(renderer, `time-${timeString.charAt(1)}`,192,33);
    }

    draw(renderer) {
       this.drawHealthBars(renderer);

       this.drawTime(renderer);

       this.drawNameTags(renderer);
    }
}