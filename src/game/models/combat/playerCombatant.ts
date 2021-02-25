import { Demon, DemonStats } from '../demons/demon'
import { Player } from '../player'
import { DemonInstance } from './demonInstance'
import { Combatant } from './combatant'

class PlayerCombatant extends Combatant {

    player: Player
    demonInstances: DemonInstance[]
    readonly currentDemonIndex: number

    constructor(player: Player){
        super()
        this.player = player
        this.demonInstances = player.demons.map((demon: Demon) => new DemonInstance(demon))
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