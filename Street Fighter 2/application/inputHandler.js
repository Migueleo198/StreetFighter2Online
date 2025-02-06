import { FighterDirection } from "./constantsFighter.js";
import { Control, controls, GamepadThumbstick } from "./control.js";

// --- Existing code for keyboard handling ---
const heldKeys = new Set();
const pressedKeys = new Set();

// Remove the old releasedButtons (if any)
// const releasedButtons = new Set(); // Remove or comment this out

// Define a Map to track debounced control states per player/control.
const releasedControls = new Map();

const gamePads = new Map();

function handleKeyDown(event) {
    if (!mappedKeys.includes(event.code)) { return; }
    event.preventDefault();
    heldKeys.add(event.code);
}

function handleKeyUp(event) {
    if (!mappedKeys.includes(event.code)) { return; }
    event.preventDefault();
    heldKeys.delete(event.code);
    pressedKeys.delete(event.code);
}

export function registerKeyboardEvents() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

const mappedKeys = controls.map(({ keyboard }) => Object.values(keyboard)).flat();

function handleGamepadConnected(event) {
    const { gamepad: { index, axes, buttons } } = event;
    gamePads.set(index, { axes, buttons });
}

function handleGamepadDisconnected(event) {
    const { gamepad: { index } } = event;
    gamePads.delete(index);
}

export function registerGamepadEvents() {
    window.addEventListener('gamepadconnected', handleGamepadConnected);
    window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);
}

export function pollGamepads() {
    for (const gamePad of navigator.getGamepads()) {
        if (!gamePad) continue;
        if (gamePads.has(gamePad.index)) {
            const { index, axes, buttons } = gamePad;
            gamePads.set(index, { axes, buttons });
        }
    }
}

export const isKeyDown = (code) => heldKeys.has(code);
export const isKeyUp = (code) => !heldKeys.has(code);

export function isKeyPressed(code) {
    if (heldKeys.has(code) && !pressedKeys.has(code)) {
        pressedKeys.add(code);
        return true;
    }
    return false;
}

export const isButtonDown = (padId, button) => gamePads.get(padId)?.buttons[button]?.pressed;
export const isButtonUp = (padId, button) => !gamePads.get(padId)?.buttons[button]?.pressed;

export const isAxeGreater = (padId, axeId, value) => gamePads.get(padId)?.axes[axeId] >= value;
export const isAxeLower = (padId, axeId, value) => gamePads.get(padId)?.axes[axeId] <= value;

export const isLeft = (id) => isKeyDown(controls[id].keyboard[Control.LEFT])
    || isButtonDown(id, controls[id].gamePad[Control.LEFT])
    || isAxeLower(id, controls[id].gamePad[GamepadThumbstick.HORIZONTAL_AXE_ID],
        -controls[id].gamePad[GamepadThumbstick.DEAD_ZONE]
    );

export const isRight = (id) => isKeyDown(controls[id].keyboard[Control.RIGHT])
    || isButtonDown(id, controls[id].gamePad[Control.RIGHT])
    || isAxeGreater(id, controls[id].gamePad[GamepadThumbstick.HORIZONTAL_AXE_ID],
        controls[id].gamePad[GamepadThumbstick.DEAD_ZONE]
    );

export const isUp = (id) => isKeyDown(controls[id].keyboard[Control.UP])
    || isButtonDown(id, controls[id].gamePad[Control.UP])
    || isAxeLower(id, controls[id].gamePad[GamepadThumbstick.VERTICAL_AXE_ID],
        -controls[id].gamePad[GamepadThumbstick.DEAD_ZONE]
    );

export const isDown = (id) => isKeyDown(controls[id].keyboard[Control.DOWN])
    || isButtonDown(id, controls[id].gamePad[Control.DOWN])
    || isAxeGreater(id, controls[id].gamePad[GamepadThumbstick.VERTICAL_AXE_ID],
        controls[id].gamePad[GamepadThumbstick.DEAD_ZONE]
    );

export const isForward = (id, direction) => direction === FighterDirection.RIGHT ? isRight(id) : isLeft(id);
export const isBackward = (id, direction) => direction === FighterDirection.LEFT ? isRight(id) : isLeft(id);

export const isControlDown = (id, control) => isKeyDown(controls[id].keyboard[control])
    || isButtonDown(id, controls[id].gamePad[control]);

export const isControlUp = (id, control) => !isKeyDown(controls[id].keyboard[control])
    && !isButtonDown(id, controls[id].gamePad[control]);

export const isIdle = (id) => !(isLeft(id) || isRight(id) || isUp(id) || isDown(id));

/**
 * Checks if the given control for a given player was just pressed.
 * Returns true only once per press.
 *
 * @param {number} id - The player id.
 * @param {string|number} control - The control identifier (from the Control enum).
 * @returns {boolean} - True if the control was just pressed.
 */
export const isControlPressed = (id, control) => {
    const key = `${id}_${control}`;
    const controlKey = controls[id].keyboard[control];
    const controlButton = controls[id].gamePad[control];

    // Determine if the control is currently down.
    const isDownNow = isKeyDown(controlKey) || isButtonDown(id, controlButton);

    // Get the previous state (default to false if not set).
    const wasPressed = releasedControls.get(key) || false;

    // If the control is down now and was not down in the previous check,
    // consider it a new press.
    if (isDownNow && !wasPressed) {
        releasedControls.set(key, true);
        return true;
    }

    // If the control is not pressed now, reset the stored state.
    if (!isDownNow) {
        releasedControls.set(key, false);
    }

    return false;
};

export const isLightPunch = (id) => isControlPressed(id, Control.LIGHT_PUNCH);
