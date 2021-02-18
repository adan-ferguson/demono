import * as DemonAffinityDefinitions from './definitionLoader'
import { DemonStats } from '../demon'
type DemonAffinityId = keyof typeof DemonAffinityDefinitions

interface DemonAffinityDefinition {
    id: DemonAffinityId,
    name: string,
    baseStats: DemonStats
}

class DemonAffinity {

    id: DemonAffinityId
    name: string
    baseStats: DemonStats

    static loadFromId(id: DemonAffinityId): DemonAffinity {
        const def = DemonAffinityDefinitions[id as DemonAffinityId]
        return new DemonAffinity(def)
    }

    constructor(def: DemonAffinityDefinition){
        this.id = def.id
        this.name = def.name
        this.baseStats = def.baseStats
    }
}

export { DemonAffinity, DemonAffinityId, DemonAffinityDefinition }