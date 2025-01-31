import { Sprite } from "./sprite.js";
import { FighterState, PushBox } from "../application/constantsFighter.js";

export class Ryu extends Sprite {
    constructor(x, y, imageSrc, velocity, playerId) {
        super(x, y, imageSrc, velocity, playerId);

        this.frames = new Map(
            [
                //IDLE FIRST PARAM X SECOND Y FIRST WIDTH SECOND HEIGHT
                ['idle-1', [[75, 14, 60, 89],PushBox.IDLE]],
                ['idle-2', [[7, 14, 59, 90],PushBox.IDLE]],
                ['idle-3', [[277, 11, 58, 92],PushBox.IDLE]],
                ['idle-4', [[211, 10, 55, 93],PushBox.IDLE]],

                //MOVE FORWARD
                ['forwards-1', [[9, 136, 53, 83],PushBox.IDLE]],
                ['forwards-2', [[78, 131, 60, 89],PushBox.IDLE]],
                ['forwards-3', [[152, 128, 64, 92],PushBox.IDLE]],
                ['forwards-4', [[229, 130, 63, 90],PushBox.IDLE]],
                ['forwards-5', [[307, 128, 54, 91],PushBox.IDLE]],
                ['forwards-6', [[371, 128, 50, 89],PushBox.IDLE]],


                //MOVE BACKWARD
                ['backwards-1', [[777, 128, 61, 87],PushBox.IDLE]],
                ['backwards-2', [[430, 124, 59, 90],PushBox.IDLE]],
                ['backwards-3', [[559, 124, 57, 90],PushBox.IDLE]],
                ['backwards-4', [[495, 124, 58, 90],PushBox.IDLE]],
                ['backwards-5', [[631, 125, 58, 91],PushBox.IDLE]],
                ['backwards-6', [[707, 126, 67, 89],PushBox.IDLE]],

                //JUMP UP

                ['jump-up-1', [[67, 244, 56, 104],PushBox.JUMP]],
                ['jump-up-2', [[138, 233, 50, 89],PushBox.JUMP]],
                ['jump-up-3', [[197, 233, 54, 77],PushBox.JUMP]],
                ['jump-up-4', [[259, 240, 48, 70],PushBox.JUMP]],
                ['jump-up-5', [[319, 234, 48, 89],PushBox.JUMP]],
                ['jump-up-6', [[375, 244, 55, 109],PushBox.JUMP]],

                //LAND THE JUMP

                ['jump-land', [7, 268, 55, 85]],


                ['jump-roll-1', [[878, 121, 55, 103],PushBox.JUMP]],
                ['jump-roll-2', [[442, 261, 61, 78],PushBox.JUMP]],
                ['jump-roll-3', [[507, 259, 104, 42],PushBox.JUMP]],
                ['jump-roll-4', [[617, 240, 53, 82],PushBox.JUMP]],
                ['jump-roll-5', [[676, 257, 122, 44],PushBox.JUMP]],
                ['jump-roll-6', [[804, 258, 71, 87],PushBox.JUMP]],
                ['jump-roll-7', [[883, 261, 54, 109],PushBox.JUMP]],


                //CROUCH
                ['crouch-1', [[551, 21, 53, 83],PushBox.IDLE]],
                ['crouch-2', [[611, 36, 57, 69],PushBox.BEND]],
                ['crouch-3', [[679, 44, 61, 61],PushBox.CROUCH]],


            ]
        );

        this.animations = {
            [FighterState.IDLE]:
                [
                    ['idle-1', 68], ['idle-2', 68],
                    ['idle-3', 68], ['idle-4', 68],
                ],
            [FighterState.WALK_FORWARD]:
                [
                    ['forwards-1', 65], ['forwards-2', 65], ['forwards-3', 65],
                    ['forwards-4', 65], ['forwards-5', 65], ['forwards-6', 65]
                ],
            [FighterState.WALK_BACKWARD]:
                [
                    ['backwards-1', 65], ['backwards-2', 65], ['backwards-3', 65],
                    ['backwards-4', 65], ['backwards-5', 65], ['backwards-6', 65]
                ],
            [FighterState.JUMP_UP]:
                [
                    ['jump-up-1', 180], ['jump-up-2', 100], ['jump-up-3', 100],
                    ['jump-up-4', 100], ['jump-up-5', 100], ['jump-up-6', -1]
                ],
            [FighterState.JUMP_FORWARD]:
                [
                    ['jump-roll-1', 50], ['jump-roll-2', 50], ['jump-roll-3', 50],
                    ['jump-roll-4', 50], ['jump-roll-5', 50], ['jump-roll-6', 50],
                    ['jump-roll-7', 0]
                ],
            [FighterState.JUMP_BACKWARD]:
                [
                    ['jump-roll-7', 260], ['jump-roll-6', 60], ['jump-roll-5', 60],
                    ['jump-roll-4', 60], ['jump-roll-3', 60], ['jump-roll-2', 60],
                    ['jump-roll-1', 0.1]
                ],
            [FighterState.JUMP_LAND]:
                [
                    ['jump-land', 50], ['jump-land', -2]
                ],
            [FighterState.CROUCH]:
                [
                    ['crouch-1', 30], ['crouch-2', 30],
                    ['crouch-3', 30], ['crouch-3', -2]
                ],
        };

        this.initialVelocity = {
            x: {
                [FighterState.WALK_FORWARD]: 200,
                [FighterState.WALK_BACKWARD]: -150,
                [FighterState.JUMP_FORWARD]: 170,
                [FighterState.JUMP_BACKWARD]: -200,

            },
            jump: {
                y: -420,
            }
        }

        this.gravity = 1000;

        

    }

}