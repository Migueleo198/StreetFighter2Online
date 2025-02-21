export const FighterDirection = {
    LEFT: -1,
    RIGHT: 1
};

export const FighterAttackType = {
    PUNCH: 'punch',
    KICK: 'kick',
}

export const FighterState = {
    IDLE: 'idle',
    WALK_FORWARD: 'walkForward',
    WALK_BACKWARD: 'walkBackward',
    JUMP_START: 'jumpStart',
    JUMP_UP: 'jump',
    JUMP_FORWARD: 'jumpForward',
    JUMP_BACKWARD: 'jumpBackward',
    JUMP_LAND: 'jumpLand',
    CROUCH: 'crouch',
    LIGHT_PUNCH: 'lightPunch',
    MEDIUM_PUNCH: 'mediumPunch',
    HEAVY_PUNCH:    'heavyPunch',
    LIGHT_KICK:     'lightKick',
    MEDIUM_KICK:    'mediumKick',
    HEAVY_KICK:      'heavyKick',
};

export const PushBox = {
    IDLE: [-16, -80, 32, 78],
    JUMP: [-16, -91, 32, 66],
    BEND: [-16, -58, 32, 58],
    CROUCH: [-16, -50, 32, 50],
};

export const HurtBox = {
    IDLE: [[-8, -88, 24, 16], [-26, -74, 40, 42], [-26, -31, 40, 32]],
    BACKWARD: [[-19, -88, 24, 16], [-26, -74, 40, 42], [-26, -31, 40, 32]],
    FORWARD: [[-3, -88, 24, 16], [-26, -74, 40, 42], [-26, -31, 40, 32]],
    JUMP: [[-13, -106, 28, 18], [-26, -90, 40, 42], [-22, -66, 38, 18]],
    BEND: [[-2, -68, 24, 18], [-16, -53, 44, 24], [-16, -24, 44, 24]],
    CROUCH: [[6, -61, 24, 18], [-16, -46, 44, 24], [-16, -24, 44, 24]],
    PUNCH: [[11, -94, 24, 18], [-7, -77, 40, 43], [-7, -33, 40, 33]]
};


export const HitBox = {
    PUNCH: [-10, -70, 20, 30],
    KICK: [-15, -50, 30, 20],  
    JUMP_ATTACK: [-20, -90, 40, 40], 
};

export const FighterId = {
    RYU: 'Ryu',
    KEN: 'Ken',
}

export const FighterAttackStrength = {
    LIGHT: 'light',
    MEDIUM: 'medium',
    HEAVY: 'heavy',
}

export const FighterAttackBaseData = {
    [FighterAttackStrength.LIGHT]:{
        score:100,
        damage:12,
    },
    [FighterAttackStrength.MEDIUM]:{
        score:300,
        damage:20,
    },
    [FighterAttackStrength.HEAVY]:{
        score:500,
        damage:28,
    },
}