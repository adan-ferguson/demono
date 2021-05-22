import { SimpleStats } from '../stats'
import { DemonAffinityDefinitions, DemonAffinityID } from 'game/data/affinities/definitionLoader'

interface DemonAffinityDefinition {
    name: string,
    baseStats: SimpleStats
}

class DemonAffinity {

    id: DemonAffinityID
    name: string
    baseStats: SimpleStats

    static loadFromId(id: DemonAffinityID): DemonAffinity {
        const def = DemonAffinityDefinitions[id as DemonAffinityID]
        return new DemonAffinity(def)
    }

    constructor(def: DemonAffinityDefinition){
        if(!def.id){
            throw 'Definition not loaded correctly.'
        }
        this.id = def.id
        this.name = def.name
        this.baseStats = def.baseStats
    }
}

export { DemonAffinity, DemonAffinityDefinition }