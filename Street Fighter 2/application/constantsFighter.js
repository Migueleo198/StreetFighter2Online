export const FighterDirection = {
    LEFT: -1,
    RIGHT: 1
};

export const FighterState = {
    IDLE:'idle',
    WALK_FORWARD: 'walkForward',
    WALK_BACKWARD: 'walkBackward',
    JUMP_START: 'jumpStart',
    JUMP_UP: 'jump',
    JUMP_FORWARD : 'jumpForward',
    JUMP_BACKWARD: 'jumpBackward',
    JUMP_LAND: 'jumpLand',
    CROUCH: 'crouch',
    
};

export const PushBox = {
    IDLE: [-16,-80,32,78],
    JUMP: [-16,-91,32,66],
    BEND: [-16,-58,32,58],
    CROUCH: [-16,-50,32,50],    
};