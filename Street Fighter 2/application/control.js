export const GamepadThumbstick = {
    DEAD_ZONE: 'deadZone',
    HORIZONTAL_AXE_ID: 'horizontalAxeId',
    VERTICAL_AXE_ID: 'verticalAxeId',
};

export const Control = {
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
    DOWN: 'down',
    LIGHT_PUNCH: 'lightPunch',
    MEDIUM_PUNCH: 'mediumPunch',
    HEAVY_PUNCH: 'heavyPunch',
    LIGHT_KICK: 'lightKick',
    MEDIUM_KICK: 'mediumKick',
    HEAVY_KICK: 'heavyKick',
};


export const controls = [
    { // Player 1
        keyboard: {
            [Control.LEFT]: 'KeyA',
            [Control.RIGHT]: 'KeyD',
            [Control.UP]: 'Space',
            [Control.DOWN]: 'KeyS',
            [Control.LIGHT_PUNCH]: 'KeyE',
            [Control.MEDIUM_PUNCH]: 'KeyR',
            [Control.HEAVY_PUNCH]: 'KeyT',
            [Control.LIGHT_KICK]: 'KeyF',
            [Control.MEDIUM_KICK]: 'KeyG',
            [Control.HEAVY_KICK]: 'KeyH'
        },
        gamePad: {
            [GamepadThumbstick.DEAD_ZONE]: 0.15,  // More common deadzone value
            [GamepadThumbstick.HORIZONTAL_AXE_ID]: 0,
            [GamepadThumbstick.VERTICAL_AXE_ID]: 1,
            [Control.LEFT]: 14,
            [Control.RIGHT]: 15,
            [Control.UP]: 12,
            [Control.DOWN]: 13,
            [Control.LIGHT_PUNCH]: 0,  // Cross/X
            [Control.MEDIUM_PUNCH]: 1, // Circle/B
            [Control.HEAVY_PUNCH]: 1,  // Square/A
            [Control.LIGHT_KICK]: 3,   // Triangle/Y
            [Control.MEDIUM_KICK]: 4,  // L1
            [Control.HEAVY_KICK]: 5    // R1
        }
    },
    { // Player 2
        keyboard: {
            [Control.LEFT]: 'ArrowLeft',
            [Control.RIGHT]: 'ArrowRight',
            [Control.UP]: 'ArrowUp',
            [Control.DOWN]: 'ArrowDown',
            [Control.LIGHT_PUNCH]: 'Numpad1',
            [Control.MEDIUM_PUNCH]: 'Numpad2',
            [Control.HEAVY_PUNCH]: 'Numpad3',
            [Control.LIGHT_KICK]: 'Numpad4',
            [Control.MEDIUM_KICK]: 'Numpad5',
            [Control.HEAVY_KICK]: 'Numpad6'
        },
        gamePad: {
            [GamepadThumbstick.DEAD_ZONE]: 0.5,
            [GamepadThumbstick.HORIZONTAL_AXE_ID]: 0, // Left thumbstick horizontal
            [GamepadThumbstick.VERTICAL_AXE_ID]: 1,   // Left thumbstick vertical
            [Control.LEFT]: 14,                       // D-pad left
            [Control.RIGHT]: 15,                      // D-pad right
            [Control.UP]: 12,                         // D-pad up
            [Control.DOWN]: 13,                       // D-pad down
            [Control.LIGHT_PUNCH]: 0,                 // Cross button
            [Control.MEDIUM_PUNCH]: 1,                // Circle button
            [Control.HEAVY_PUNCH]: 1,                 // Square button
            [Control.LIGHT_KICK]: 3,                  // Triangle button
            [Control.MEDIUM_KICK]: 4,                 // L1 button
            [Control.HEAVY_KICK]: 5,                  // R1 button
        }
    }
];