import { Encounter } from './encounter'
import { PlayerCombatant } from './playerCombatant'
import { EnemyCombatant } from './combat/enemyCombatant'
import { Enemy } from './enemy'
import { Player } from './player'
import { LiteEvent } from './liteEvent'

interface CombatUpdate {
    id?: string
}

class Combat {

    enemyCombatants: EnemyCombatant[]
    playerCombatant: PlayerCombatant
    onUpdate = new LiteEvent<CombatUpdate>()

    constructor(encounter: Encounter, player: Player){
        this.enemyCombatants = encounter.enemies.map((enemy: Enemy) => new EnemyCombatant(enemy))
        this.playerCombatant = new PlayerCombatant(player)
    }

    init(): void{
        this.enemyCombatants.forEach(ec => ec.init())
        this.playerCombatant.init()
    }
}

export { Combat }