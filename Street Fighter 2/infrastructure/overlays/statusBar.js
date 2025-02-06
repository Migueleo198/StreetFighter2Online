import { HEALTH_COLOR, HEALTH_DAMAGE_COLOR, HEALTH_MAX_HIT_POINTS } from "../../application/battle.js";
import { FPS } from "../../application/constantsGame.js";
import { isKeyPressed } from "../../application/inputHandler.js";
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


                //SCORES
                ['score-0', [17, 101, 10, 10]],
                ['score-1', [29, 101, 10, 10]],
                ['score-2', [41, 101, 10, 10]],
                ['score-3', [53, 101, 10, 10]],
                ['score-4', [65, 101, 11, 10]],
                ['score-5', [77, 101, 10, 10]],
                ['score-6', [89, 101, 10, 10]],
                ['score-7', [101, 101, 10, 10]],
                ['score-8', [113, 101, 10, 10]],
                ['score-9', [125, 101, 10, 10]],



                // ALPHA
                ['score-@', [17, 113, 10, 10]],
                ['score-A', [29, 113, 11, 10]],
                ['score-B', [41, 113, 10, 10]],
                ['score-C', [53, 113, 10, 10]],
                ['score-D', [65, 113, 10, 10]],
                ['score-E', [77, 113, 10, 10]],
                ['score-F', [89, 113, 10, 10]],
                ['score-G', [101, 113, 10, 10]],
                ['score-H', [113, 113, 9, 10]],
                ['score-I', [125, 113, 10, 10]],
                ['score-J', [136, 113, 10, 10]],
                ['score-K', [149, 113, 10, 10]],
                ['score-L', [161, 113, 10, 10]],
                ['score-M', [173, 113, 10, 10]],
                ['score-N', [185, 113, 10, 10]],
                ['score-O', [197, 113, 10, 10]],
                ['score-P', [17, 125, 10, 10]],
                ['score-Q', [29, 125, 11, 10]],
                ['score-R', [41, 125, 10, 10]],
                ['score-S', [53, 125, 10, 10]],
                ['score-T', [65, 125, 10, 10]],
                ['score-U', [77, 125, 10, 10]],
                ['score-V', [89, 125, 10, 10]],
                ['score-W', [101, 125, 10, 10]],
                ['score-X', [113, 125, 10, 10]],
                ['score-Y', [125, 125, 10, 10]],
                ['score-Z', [137, 125, 10, 10]],



                //NAME TAGS
                ['tag-ken', [128, 56, 30, 9]],
                ['tag-ryu', [16, 56, 28, 9]],
            ]
        );

        this.healthBars = [{
            timer: 0,
            hitPoints: HEALTH_MAX_HIT_POINTS,
        }, {
            timer: 0,
            hitPoints: HEALTH_MAX_HIT_POINTS,
        }]

    }

    updateHealthBars(time) {

        for (const index in this.healthBars) {
            if (this.healthBars[index].hitPoints <= gameState.fighters[index].hitPoints) continue;
            this.healthBars[index].hitPoints = Math.max(0, this.healthBars[index].hitPoints - (time.secondsPassed * FPS));

           
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

    updateTime(time) {
        if (time.previous > this.timeTimer + 664) {
            if (this.time > 0) {
                this.time -= 1;
                this.timeTimer = time.previous;
            }
        }
    }

    update(time) {
        this.updateTime(time);
        this.updateHealthBars(time);

       
    }





    drawHealthBars(renderer) {
        this.drawFrame(renderer, 'health-bar', 31, 20);
        this.drawFrame(renderer, 'ko-white', 176, 18);
        this.drawFrame(renderer, 'health-bar', 352, 20, -1);


        renderer.fillStyle = HEALTH_DAMAGE_COLOR;

        renderer.beginPath();

        renderer.fillRect(
            32, 21, HEALTH_MAX_HIT_POINTS - Math.floor(this.healthBars[0].hitPoints), 9,
        );

        renderer.fillRect(
            208 + Math.floor(this.healthBars[1].hitPoints), 21, HEALTH_MAX_HIT_POINTS - Math.floor(this.healthBars[1].hitPoints), 9,
        );
    }

    drawNameTags(renderer) {


        this.drawFrame(renderer, `tag-${gameState.fighters[this.fighters[0].playerId].id.toLowerCase()}`, 32, 33);
        this.drawFrame(renderer, `tag-${gameState.fighters[this.fighters[1].playerId].id.toLowerCase()}`, 322, 33);
    }

    drawTime(renderer) {
        const timeString = String(this.time).padStart(2, '00');

        this.drawFrame(renderer, `time-${timeString.charAt(0)}`, 180, 33);
        this.drawFrame(renderer, `time-${timeString.charAt(1)}`, 192, 33);
    }

    drawScore(renderer, score, x) {
        const strValue = String(score);
        const buffer = ((6 * 12) - strValue.length * 12);

        for (let i = 0; i < strValue.length; i++) {
            this.drawFrame(renderer, `score-${strValue[i]}`, x + buffer + i * 12, 5);
        }
    }

    drawScoreLabel(renderer, label, x, y) {
        for(const index in label) {
            this.drawFrame(renderer, `score-${label.charAt(index)}`, x + index * 12, 5);
        }
    }

    drawLabel(renderer, label, x, y) {
        for(const index in label) {
            this.drawFrame(renderer, `score-${label.charAt(index)}`, x + index * 12, y);
        }
    }

    drawScores(renderer) {
        this.drawScoreLabel(renderer, 'P1', 4);
        this.drawScore(renderer, gameState.fighters[0].score, 45);
       
        this.drawScoreLabel(renderer, 'ANT',133);
        this.drawScore(renderer, 50000, 177);

        this.drawScoreLabel(renderer, 'P2', 269);
        this.drawScore(renderer, gameState.fighters[1].score, 309.5);

        this.drawScore(renderer, 1, 45);
        
        this.drawScore(renderer, 1, 309);


    }

    draw(renderer) {
        this.drawScores(renderer);

        this.drawHealthBars(renderer);

        this.drawTime(renderer);

        this.drawNameTags(renderer);

        if (this.healthBars[1].hitPoints <= 0) {

            //alert('Player ' + this.fighters[index].playerId + ' Wins');
            //window.location.href = '';
            this.drawLabel(renderer, 'PLAYER', 150, 100);
            this.drawLabel(renderer, '1', 225, 100);
            this.drawLabel(renderer, 'WINS', 169, 120);
            /*if(isKeyPressed('KeyEnter')){
                window.location.href = '';
            }*/
          
            

        }
        else if(this.healthBars[0].hitPoints <= 0){
            //alert('Player ' + this.fighters[index].playerId + ' Wins');
            //window.location.href = '';
            this.drawLabel(renderer, 'PLAYER', 150, 100);
            this.drawLabel(renderer, '2', 225, 100);
            this.drawLabel(renderer, 'WINS', 169, 120);
            /*if(isKeyPressed('KeyEnter')){
                window.location.href = '';
            }*/
        }
    }
}