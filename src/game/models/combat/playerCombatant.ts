import { Demon, DemonStats } from '../demons/demon'
import { Player } from '../player'
import { DemonInstance } from './demonInstance'
import { Combatant } from './combatant'

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

    get physDef(): number {
        return Math.floor((this.stats.strength + this.stats.armor * 2) / 3)
    }

    get magicDef(): number {
        return Math.floor((this.stats.magic + this.stats.armor * 2) / 3)
    }
}

export { PlayerCombatant }