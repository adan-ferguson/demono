import { Demon, DemonStats } from '../demons/demon'
import { Player } from '../player'
import { DemonInstance } from './demonInstance'
import { Combatant } from './combatant'
import { Combat, Result } from './combat'

class PlayerCombatant extends Combatant {

    player: Player
    demonInstances: DemonInstance[]
    readonly currentDemonIndex: number

    constructor(player: Player, readonly combat: Combat){
        super(player.startingHealth, combat)
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

    beginTurn(): Result[] {
        const results: Result[] = []
        // TODO: tick
        // TODO: regenerate energy
        return results
    }
}

export { PlayerCombatant }