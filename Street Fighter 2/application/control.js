export const GamepadThumbstick = {
    DEAD_ZONE : 'deadZone',
    HORIZONTAL_AXE_ID: 'horizontalAxeId',
    VERTICAL_AXE_ID: 'verticalAxeId',

}

export const Control = {
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down',
};

export const controls = [
    {
        keyboard: {
        [Control.LEFT]: 'KeyA',
        [Control.RIGHT]: 'KeyD',
        [Control.UP]: 'Space',
        [Control.DOWN]: 'KeyS',
        },
        gamePad: {
        [GamepadThumbstick.DEAD_ZONE]:0.5,
        [GamepadThumbstick.HORIZONTAL_AXE_ID]:0,
        [GamepadThumbstick.VERTICAL_AXE_ID]:1,
        
        }
    
    },
    {
        keyboard: {
            [Control.LEFT]: 'ArrowLeft',
            [Control.RIGHT]: 'ArrowRight',
            [Control.UP]: 'ArrowUp',
            [Control.DOWN]: 'ArrowDown',
            },
            gamePad: {
            [GamepadThumbstick.DEAD_ZONE]:0.5,
            [GamepadThumbstick.HORIZONTAL_AXE_ID]:0,
            [GamepadThumbstick.VERTICAL_AXE_ID]:1,
            }
    }
]