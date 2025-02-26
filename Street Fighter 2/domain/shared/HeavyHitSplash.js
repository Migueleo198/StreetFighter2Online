import { HitSplash } from "./HitSplash.js";
export class HeavyHitSplash extends HitSplash {
    constructor(x, y, playerId,onEnd) {
        super(x, y, playerId,onEnd);

        this.frames = [
            //PLAYER 1
            [[14, 16, 9, 10], [6, 7]],
            [[35, 15, 13, 11], [7, 7]],
            [[55, 15, 13, 11], [7, 7]],
            [[75, 10, 20, 19], [11, 11]],

            //PLAYER 2
            [[160, 16, 9, 10], [6, 7]],
            [[178, 15, 13, 11], [7, 7]],
            [[199, 15, 13, 11], [7, 7]],
            [[219, 10, 20, 19], [11, 11]],
        ];
    }

    update(time) {
        super.update(time);
    }

    draw(renderer,camera) {
        super.draw(renderer,camera);
    }
}
