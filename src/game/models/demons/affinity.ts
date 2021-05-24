import { SimpleStats } from '../stats'
import { DemonAffinityDefinitions, DemonAffinityID } from 'game/data/affinities/definitionLoader'

interface DemonAffinityDefinition {
    name: string,
    baseStats: SimpleStats
}

class DemonAffinity {

    name: string
    baseStats: SimpleStats

    static loadFromId(id: DemonAffinityID): DemonAffinity {
        return new DemonAffinity(id, DemonAffinityDefinitions.getDefinition(id))
    }

    constructor(readonly id: DemonAffinityID, def: DemonAffinityDefinition){
        this.name = def.name
        this.baseStats = def.baseStats
    }
}

export { DemonAffinity, DemonAffinityDefinition }