import { DemonLoadout } from '../../demons/demonLoadout'
import { Player } from '../../player/player'
import { DemonInstance } from '../demon/demonInstance'
import { Combatant } from '../combatant'
import { Combat } from '../combat'
import { Result } from '../result'
import { FullStats, StatType } from 'game/models/stats'

class PlayerBeginTurnResult extends Result {
    constructor(readonly player: PlayerCombatant){
        super()
    }
}

class PlayerCombatant extends Combatant {

    player: Player
    demonInstances: DemonInstance[]
    readonly currentDemonIndex: number

    constructor(player: Player, readonly combat: Combat){
        super(player.startingHealth, combat)
        this.player = player
        this.demonInstances = player.demonLoadouts.map((demon: DemonLoadout) => new DemonInstance(demon, this))
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

    get stats(): FullStats {
        return this.currentDemonInstance.stats
    }

    get physDef(): number {
        return Math.floor((this.stats.get(StatType.Strength) + this.stats.get(StatType.Armor) * 2) / 3)
    }

    get magicDef(): number {
        return Math.floor((this.stats.get(StatType.Magic) + this.stats.get(StatType.Armor) * 2) / 3)
    }

    beginTurn(): Result[] {
        const results: Result[] = []
        // TODO: tick
        results.push(new PlayerBeginTurnResult(this))
        this.demonInstances.forEach(di => {
            results.push(...di.tick())
        })
        return results
    }
}

export { PlayerCombatant, PlayerBeginTurnResult }