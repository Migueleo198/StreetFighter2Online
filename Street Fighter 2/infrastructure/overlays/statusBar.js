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
    }

   



    drawHealthBars(renderer){
        this.drawFrame(renderer,'health-bar',31,20);
        this.drawFrame(renderer,'ko-white',176,18);
        this.drawFrame(renderer,'health-bar',352,20,-1);
    }

    drawNameTags(renderer){
        const [{name:name1}, {name:name2}] = this.fighters;

        this.drawFrame(renderer, `tag-${'RYU'.toLowerCase()}`,32,33);
        this.drawFrame(renderer, `tag-${'KEN'.toLowerCase()}`,322,33);
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