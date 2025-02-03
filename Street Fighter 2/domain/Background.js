import { FRAME_TIME } from "../application/constantsGame.js";
import { BackgroundAnimation } from "./entites/stage/BackgroundAnimation.js";

class Background {
    constructor() {
        this.image = new Image();
        this.imageSrc = "./assets/stages/Ken Stage.png";
        this.image.src = this.imageSrc;
        this.frames = new Map([
            ['stage-background', [72, 208, 768, 176]],
            ['stage-boat', [8, 16, 521, 180]],
            ['stage-floor', [8, 392, 896, 72]],
        ]);

        this.baldMan = new BackgroundAnimation(
            this.image,
            [
                ['bald-man-1', [552, 8, 40, 64]],
                ['bald-man-2', [552, 72, 40, 64]],
                ['bald-man-3', [552, 136, 40, 64]],
            ],

            [
                ['bald-man-1', 100],
                ['bald-man-2', 133],
                ['bald-man-3', 664],
                ['bald-man-2', 133],
            ]
        );

        this.cheeringWoman = new BackgroundAnimation(
            this.image,
            [
                ['woman-1', [624, 16, 32, 56]],
                ['woman-2', [624, 80, 32, 56]],
                ['woman-3', [624, 144, 32, 56]],
            ],

            [
                ['woman-1', 216],
                ['woman-2', 216],
                ['woman-3', 216],
                ['woman-2', 216],
            ]
        );

        this.greenJumperGuy = new BackgroundAnimation(
            this.image,
            [
                ['green-jumper-1', [664, 16, 32, 56]],
                ['green-jumper-2', [664, 80, 32, 56]],
               
            ],

            [
                ['green-jumper-1', 216],
                ['green-jumper-2', 216],
                ['green-jumper-1', 216],
                ['green-jumper-2', 216],
            ]
        );

        this.blueCoatGuy = new BackgroundAnimation(
            this.image,
            [
                ['blue-coat-1', [704, 16, 48, 56]],
                ['blue-coat-2', [704, 80, 48, 56]],
                ['blue-coat-3', [704, 144, 48, 56]],
            ],

            [
                ['blue-coat-1', 996],
                ['blue-coat-2', 133],
                ['blue-coat-3', 100],
                ['blue-coat-2', 133],
                ['blue-coat-1', 249],
                ['blue-coat-2', 133],
                ['blue-coat-3', 100],
                ['blue-coat-2', 133],
            ]
        );

        this.brownSuitGuy = new BackgroundAnimation(
            this.image,
            [
                ['brownSuitGuy-1', [760, 16, 40, 40]],
                ['brownSuitGuy-2', [760, 64, 40, 40]],
                ['brownSuitGuy-3', [760, 112, 40, 40]],
            ],

            [
                ['brownSuitGuy-1', 133],
                ['brownSuitGuy-2', 133],
                ['brownSuitGuy-3', 133],
                ['brownSuitGuy-2', 133],
                
            ]
        );


        this.flag = new BackgroundAnimation(
            this.image,
            [
                ['flag-1', [848, 312, 40, 32]],
                ['flag-2', [848, 264, 40, 32]],
                ['flag-3', [848, 216, 40, 32]],
            ],

            [
                ['flag-1', 133],
                ['flag-2', 133],
                ['flag-3', 133],
                
            ]
        );


        this.boat = {
            position: { x: 0, y: 0 },
            animationFrame: 0,
            animationTimer: 0,
            animationDelay: 18,
            animation: [0, -1, -2, -3, -4, -3, -2, -1],

        };
    }

    updateBoat(time) {
        if (time.previous > this.boat.animationTimer + this.boat.animationDelay * FRAME_TIME) {
            this.boat.animationTimer = time.previous;
            this.boat.animationFrame += 1;
            this.boat.animationDelay = 22 + (Math.random() * 16 - 8);
        }

        if (this.boat.animationFrame >= this.boat.animation.length) {
            this.boat.animationFrame = 0;
        }
    }

    update(frameTime, renderer, camera) {
        this.flag.update(frameTime);

        this.updateBoat(frameTime);
        this.baldMan.update(frameTime);
        this.cheeringWoman.update(frameTime);
        this.greenJumperGuy.update(frameTime);
        this.blueCoatGuy.update(frameTime);
        this.brownSuitGuy.update(frameTime);
    }

    drawFrame(renderer, frameKey, x, y) {
        const [SourceX, SourceY, SourceWidth, SourceHeight] = this.frames.get(frameKey);


        renderer.drawImage(
            this.image, SourceX,
            SourceY, SourceWidth, SourceHeight,
            x, y, SourceWidth, SourceHeight);




    }

    drawDebug() {

    }

    drawSkyOcean(renderer,camera){
        const backgroundX = Math.floor(16 - (camera.position.x/2.157303));
        this.drawFrame(renderer, 'stage-background',backgroundX, -camera.position.y);
        this.flag.draw(renderer,backgroundX + 560, 16 - camera.position.y);
    }

    drawBoat(renderer, camera) {
        this.boat.position = {
            x: Math.floor(150 - (camera.position.x / 1.613445)),
            y: -camera.position.y + this.boat.animation[this.boat.animationFrame],
        }
        this.drawFrame(renderer, 'stage-boat', this.boat.position.x, this.boat.position.y);

        this.baldMan.draw(renderer,this.boat.position.x + 128, this.boat.position.y + 96);
        this.cheeringWoman.draw(renderer,this.boat.position.x +192,this.boat.position.y +104);
        this.greenJumperGuy.draw(renderer,this.boat.position.x +224,this.boat.position.y +104);
        this.blueCoatGuy.draw(renderer,this.boat.position.x +288,this.boat.position.y +96);
        this.brownSuitGuy.draw(renderer,this.boat.position.x + 88,this.boat.position.y + 24)
        

        //FLAG

       
    }

    draw(renderer, camera) {
        this.drawSkyOcean(renderer,camera);
        this.drawBoat(renderer, camera);
        this.drawFrame(renderer, 'stage-floor', Math.floor(192 - camera.position.x), 176 - camera.position.y);

    }


}

export { Background };