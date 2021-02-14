import { Demon } from './demon'
import { Player } from './player'
import { DemonInstance } from './combat/demonInstance'
import { Combatant } from './combat/combatant'

class PlayerCombatant extends Combatant {

    player: Player
    demonInstances: DemonInstance[]

    constructor(player: Player){
        super()
        this.player = player
        this.demonInstances = player.demons.map((demon: Demon) => new DemonInstance(demon))
    }
}

export { PlayerCombatant }