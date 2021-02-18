import { Demon, DemonStats } from '../demons/demon'

class DemonInstance {

    demon: Demon
    stats: DemonStats
    maxEnergy: number

    private _energy: number

    constructor(demon: Demon){
        this.demon = demon
        this.stats = demon.getStats()
        this.maxEnergy = 100
        this._energy = 50
    }

    get energy(): number {
        return this._energy
    }

    set energy(val: number){
        this._energy = Math.min(this.maxEnergy, Math.max(0, val))
    }
}

export { DemonInstance }