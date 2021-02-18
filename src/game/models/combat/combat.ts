import { Encounter } from '../encounters/encounter'
import { PlayerCombatant } from './playerCombatant'
import { EnemyCombatant } from './enemyCombatant'
import { Enemy } from '../enemies/enemy'
import { Player } from '../player'
import { LiteEvent } from '../liteEvent'

interface CombatUpdate {
    id?: string
}

class Combat {

    enemyCombatants: EnemyCombatant[]
    playerCombatant: PlayerCombatant
    onUpdate = new LiteEvent<CombatUpdate>()

    constructor(encounter: Encounter, player: Player){
        this.enemyCombatants = encounter.createEnemyCombatants()
        this.playerCombatant = new PlayerCombatant(player)
    }

    init(): void{
        this.enemyCombatants.forEach(ec => ec.init())
        this.playerCombatant.init()
    }
}

export { Combat }