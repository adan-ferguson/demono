import { Demon, DemonStats } from '../demons/demon'
import { DemonAbilityInstance } from './demonAbilityInstance'

class DemonInstance {

    demon: Demon
    stats: DemonStats
    maxEnergy: number
    abilityInstances: DemonAbilityInstance[]

    private _energy: number

    constructor(demon: Demon){
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
}

export { DemonInstance }