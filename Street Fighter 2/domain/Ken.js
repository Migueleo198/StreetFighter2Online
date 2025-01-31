import { Sprite } from "./sprite.js";
import { FighterState, PushBox } from "../application/constantsFighter.js";

export class Ken extends Sprite {
    constructor(x, y, imageSrc, velocity, playerId) {
        super(x, y, imageSrc, velocity, playerId);

        this.frames = new Map(
            [
                //IDLE FIRST PARAM X SECOND Y FIRST WIDTH SECOND HEIGHT
                ['idle-1', [[3, 528, 61, 90],PushBox.IDLE]],
                ['idle-2', [[69, 529, 61, 90],PushBox.IDLE]],
                ['idle-3', [[133, 526, 61, 90],PushBox.IDLE]],
                ['idle-4', [[200, 523, 61, 90],PushBox.IDLE]],

                //MOVE FORWARD
                ['forwards-1', [[0, 902, 64, 88],PushBox.IDLE]],
                ['forwards-2', [[81, 901, 64, 90],PushBox.IDLE]],
                ['forwards-3', [[154, 900, 63, 89],PushBox.IDLE]],
                ['forwards-4', [[243, 901, 54, 89],PushBox.IDLE]],
                ['forwards-5', [[312, 902, 50, 89],PushBox.IDLE]],



                //MOVE BACKWARD
                ['backwards-1', [[3, 1000, 61, 87],PushBox.IDLE]],
                ['backwards-2', [[71, 998, 59, 90],PushBox.IDLE]],
                ['backwards-3', [[138, 997, 57, 90],PushBox.IDLE]],
                ['backwards-4', [[204, 996, 58, 90],PushBox.IDLE]],
                ['backwards-5', [[283, 997, 58, 91],PushBox.IDLE]],
                ['backwards-6', [[349, 998, 57, 89],PushBox.IDLE]],

                //JUMP UP

                ['jump-up-1', [[5, 1208, 56, 104],PushBox.JUMP]],
                ['jump-up-2', [[69, 1212, 50, 89],PushBox.JUMP]],
                ['jump-up-3', [[136, 1214, 54, 77],PushBox.JUMP]],
                ['jump-up-4', [[208, 1216, 48, 70],PushBox.JUMP]],
                ['jump-up-5', [[266, 1212, 48, 86],PushBox.JUMP]],
                ['jump-up-6', [[331, 1208, 55, 103],PushBox.JUMP]],

                //LAND THE JUMP

                ['jump-land', [7, 268, 55, 85]],


                ['jump-roll-1', [[8, 1095, 55, 103],PushBox.JUMP]],
                ['jump-roll-2', [[68, 1089, 61, 78],PushBox.JUMP]],
                ['jump-roll-3', [[134, 1102, 104, 42],PushBox.JUMP]],
                ['jump-roll-4', [[249, 1090, 53, 82],PushBox.JUMP]],
                ['jump-roll-5', [[312, 1092, 122, 44],PushBox.JUMP]],
                ['jump-roll-6', [[447, 1103, 71, 87],PushBox.JUMP]],
                ['jump-roll-7', [[8, 1095, 55, 103],PushBox.JUMP]],



                //CROUCH
                ['crouch-1', [[13, 4115, 55, 61],PushBox.IDLE]],
                ['crouch-2', [[13, 4115, 55, 61],PushBox.BEND]],
                ['crouch-3', [[13, 4115, 55, 61],PushBox.CROUCH]],


            ]
        );

        this.animations = {
            [FighterState.IDLE]:
                [
                    ['idle-1', 68], ['idle-2', 68],
                    ['idle-3', 68], ['idle-4', 68]
                ],
            [FighterState.WALK_FORWARD]:
                [
                    ['backwards-1', 65], ['backwards-2', 65], ['backwards-3', 65],
                    ['backwards-4', 65], ['backwards-5', 65], ['backwards-6', 65]
                ],
            [FighterState.WALK_BACKWARD]:
                [
                    ['forwards-1', 65], ['forwards-2', 65], ['forwards-3', 65],
                    ['forwards-4', 65], ['forwards-5', 65]
                ],
            [FighterState.JUMP_UP]:
                [
                    ['jump-up-1', 180], ['jump-up-2', 100], ['jump-up-3', 100],
                    ['jump-up-4', 100], ['jump-up-5', 100], ['jump-up-6', -1],
                ],
            [FighterState.JUMP_FORWARD]:
                [
                    ['jump-roll-1', 60], ['jump-roll-2', 60], ['jump-roll-3', 60],
                    ['jump-roll-4', 60], ['jump-roll-5', 60], ['jump-roll-6', 60], ['jump-roll-7', 0]

                ],
            [FighterState.JUMP_BACKWARD]:
                [
                    ['jump-roll-7', 60], ['jump-roll-6', 60], ['jump-roll-5', 60],
                    ['jump-roll-4', 60], ['jump-roll-3', 60], ['jump-roll-2', 60],
                    ['jump-roll-1', 0]
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