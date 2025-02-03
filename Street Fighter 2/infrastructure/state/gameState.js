import { FighterId } from "../../application/constantsFighter.js"
import { createDefaultFighterState } from "./FighterState.js"

export const gameState = {
    fighters: [
        createDefaultFighterState(FighterId.RYU),
        createDefaultFighterState(FighterId.KEN),

    ]
}
