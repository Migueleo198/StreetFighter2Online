import { STAGE_FLOOR, STAGE_PADDING, STAGE_WIDTH } from "../../../../application/constantsStage";

export class SkewedFloor {
    constructor(image,dimensions){
        this.image = image;
        this.dimensions = dimensions;
    }

    draw(renderer,camera,y){
        const [sourceX,sourceY,sourceWidth,sourceHeight] = this.dimensions;
        renderer.save();
        renderer.setTransform(1,0,-5.15 -((camera.position.x -(STAGE_WIDTH +STAGE_PADDING)) /112),1,32-camera.position.x /1.55,y - camera.position.y,);
        renderer.drawImage(this.image,
            sourceX,sourceY,sourceWidth,sourceHeight,
            0,0,sourceWidth,sourceHeight,
        );
        renderer.restore();
    }

}