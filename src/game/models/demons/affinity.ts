import { Stats } from './stats'
import * as DemonAffinityDefinitions from './affinities/definitionLoader'
type DemonAffinityType = keyof typeof DemonAffinityDefinitions

interface DemonAffinityDefinition {
    id: DemonAffinityType,
    name: string,
    baseStats: Stats
}

class DemonAffinity {

    id: DemonAffinityType
    name: string
    baseStats: Stats

    static loadFromId(id: DemonAffinityType): DemonAffinity {
        const def = DemonAffinityDefinitions[id as DemonAffinityType]
        return new DemonAffinity(def)
    }

    constructor(def: DemonAffinityDefinition){
        this.id = def.id
        this.name = def.name
        this.baseStats = def.baseStats
    }
}

export { DemonAffinity, DemonAffinityType, DemonAffinityDefinition }