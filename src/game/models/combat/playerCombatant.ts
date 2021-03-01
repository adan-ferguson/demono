import { Demon, DemonStats } from '../demons/demon'
import { Player } from '../player'
import { DemonInstance } from './demonInstance'
import { Combatant } from './combatant'
import { EnemyCombatant } from './enemyCombatant'

class PlayerCombatant extends Combatant {

    player: Player
    demonInstances: DemonInstance[]
    readonly currentDemonIndex: number

    constructor(player: Player){
        super(player.startingHealth)
        this.player = player
        this.demonInstances = player.demons.map((demon: Demon) => new DemonInstance(demon, this))
        this.currentDemonIndex = 0
    }

    get currentDemonInstance(): DemonInstance {
        return this.demonInstances[this.currentDemonIndex]
    }

    get name(): string {
        return this.player.name
    }

    get startingHealth(): number {
        return this.player.startingHealth
    }

    get stats(): DemonStats {
        return this.currentDemonInstance.stats
    }
}

export { PlayerCombatant }