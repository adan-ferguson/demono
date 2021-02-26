import { Demon, DemonStats } from '../demons/demon'
import { DemonAbilityInstance } from './demonAbilityInstance'
import { PlayerCombatant } from './playerCombatant'

class DemonInstance {

    demon: Demon
    stats: DemonStats
    maxEnergy: number
    abilityInstances: DemonAbilityInstance[]

    private _energy: number

    constructor(demon: Demon, private player: PlayerCombatant){
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
        this._energy = Math.min(this.maxEnergy, Math.max(0, val))
    }

    get isActive(): boolean {
        return this.player.currentDemonInstance === this
    }

    getAbility(abilityId: string): DemonAbilityInstance | false {
        return this.abilityInstances.find(ai => ai.ability.id === abilityId) || false
    }
}

export { DemonInstance }