import { Demon, DemonStats } from '../demons/demon'

class DemonInstance {

    demon: Demon
    stats: DemonStats

    constructor(demon: Demon){
        this.demon = demon
        this.stats = demon.getStats()
    }
}

export { DemonInstance }