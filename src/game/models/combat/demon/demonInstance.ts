import { Demon, DemonStats } from '../../demons/demon'
import { DemonAbilityInstance } from './demonAbilityInstance'
import { PlayerCombatant } from '../player/playerCombatant'
import { Result } from '../result'

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

    demon: Demon
    stats: DemonStats
    maxEnergy: number
    abilityInstances: DemonAbilityInstance[]

    private _energy: number

    constructor(demon: Demon, readonly player: PlayerCombatant){
        this.demon = demon
        this.stats = demon.getStats()
        this.maxEnergy = 100
        this._energy = 50
        this.abilityInstances = demon.loadout.getAbilities().map(ability => {
            return new DemonAbilityInstance(ability, this)
        })
    }

    get energy(): number {
        return this._energy
    }

    set energy(val: number){
        this._energy = Math.round(Math.min(this.maxEnergy, Math.max(0, val)))
    }

    get isActive(): boolean {
        return this.player.currentDemonInstance === this
    }

    getAbility(abilityId: string): DemonAbilityInstance | false {
        return this.abilityInstances.find(ai => ai.ability.id === abilityId) || false
    }

    tick(): Result[] {
        const averageSpeed = 10 + 1 * this.player.combat.encounter.level
        const before = this.energy
        this.energy += 12 * this.stats.speed / averageSpeed
        return [new EnergyChangeResult({
            demon: this,
            before: before,
            after: this.energy,
            type: EnergyChangeType.Regeneration
        })]
    }
}

export { DemonInstance, EnergyChangeResult, EnergyChangeType }