import { DemonLoadout } from '../../demons/demonLoadout'
import { DemonAbilityInstance } from './demonAbilityInstance'
import { PlayerCombatant } from '../player/playerCombatant'
import { Result } from '../result'
import {FullStats, StatType} from 'game/models/stats'

enum EnergyChangeType {
    Cost,
    Regeneration,
    FromAbility
}

interface EnergyChangeResultArgs {
    demon: DemonInstance,
    before: number,
    after: number,
    type: EnergyChangeType
}

class EnergyChangeResult extends Result {

    readonly demon: DemonInstance
    readonly before: number
    readonly after: number
    readonly type: EnergyChangeType

    constructor(def: EnergyChangeResultArgs){
        super()
        this.demon = def.demon
        this.before = def.before
        this.after = def.after
        this.type = def.type
    }

    get delta(): number {
        return this.after - this.before
    }
}

class DemonInstance {

    demon: DemonLoadout
    maxEnergy: number
    abilityInstances: DemonAbilityInstance[]

    private _energy = 50

    constructor(demon: DemonLoadout, readonly player: PlayerCombatant){
        this.demon = demon
        this.maxEnergy = 100
        this.abilityInstances = demon.abilities.map(ability => {
            return new DemonAbilityInstance(ability, this)
        })
    }

    get energy(): number {
        return this._energy
    }

    set energy(val: number){
        this._energy = Math.min(this.maxEnergy, Math.max(0, val))
    }

    get isActive(): boolean {
        return this.player.currentDemonInstance === this
    }

    get stats(): FullStats {
        return this.demon.stats
    }

    getAbility(abilityId: string): DemonAbilityInstance | false {
        return this.abilityInstances.find(ai => ai.ability.id === abilityId) || false
    }

    tick(): Result[] {
        const averageSpeed = 5 + 1.5 * this.player.combat.encounter.level
        const before = this.energy
        this.energy += 10 * this.stats.get(StatType.Speed) / averageSpeed
        return [new EnergyChangeResult({
            demon: this,
            before: Math.floor(before),
            after: Math.floor(this.energy),
            type: EnergyChangeType.Regeneration
        })]
    }
}

export { DemonInstance, EnergyChangeResult, EnergyChangeType }