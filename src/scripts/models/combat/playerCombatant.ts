import { Demon } from '../demons/demon'
import { Player } from '../player'
import { DemonInstance } from './demonInstance'
import { Combatant } from './combatant'

class PlayerCombatant extends Combatant {

    player: Player
    demonInstances: DemonInstance[]
    private _currentDemonIndex: number

    constructor(player: Player){
        super()
        this.player = player
        this.demonInstances = player.demons.map((demon: Demon) => new DemonInstance(demon))
        this._currentDemonIndex = 0
    }

    get currentDemonInstance(): DemonInstance {
        return this.demonInstances[this._currentDemonIndex]
    }

    get name(): string {
        return this.player.name
    }

    get startingHealth(): number {
        return this.player.startingHealth
    }

    get magicDefense(): number {
        const def =
            this.currentDemonInstance.stats.armor * 2 +
            this.currentDemonInstance.stats.strength
        return Math.floor(def / 3)
    }

    get physDefense(): number {
        const def =
            this.currentDemonInstance.stats.armor * 2 +
            this.currentDemonInstance.stats.magic
        return Math.floor(def / 3)
    }
}

export { PlayerCombatant }