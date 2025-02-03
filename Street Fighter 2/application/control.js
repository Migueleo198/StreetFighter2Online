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
    {
        keyboard: {
            [Control.LEFT]: 'KeyA',       // A key for left
            [Control.RIGHT]: 'KeyD',      // D key for right
            [Control.UP]: 'Space',        // Space key for jump
            [Control.DOWN]: 'KeyS',       // S key for crouch
            [Control.LIGHT_PUNCH]: 'KeyE', // E key for light punch (player 1)
            [Control.MEDIUM_PUNCH]: 'KeyQ', 
            [Control.HEAVY_PUNCH]: 'KeyQ', 
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
    },
    {
        keyboard: {
            [Control.LEFT]: 'ArrowLeft',   // Arrow keys for player 2
            [Control.RIGHT]: 'ArrowRight',
            [Control.UP]: 'ArrowUp',
            [Control.DOWN]: 'ArrowDown',
            [Control.LIGHT_PUNCH]: 'Numpad1', // Numpad 1 for light punch (player 2)
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