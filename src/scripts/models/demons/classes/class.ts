import { DemonStats } from '../demon'
import * as DemonClassDefinitions from './definitionLoader'

type DemonClassId = keyof typeof DemonClassDefinitions

interface DemonClassDefinition {
    id: DemonClassId,
    name: string,
    baseStats: DemonStats
}

class DemonClass {

    id: DemonClassId
    name: string
    baseStats: DemonStats

    static loadFromId(id: DemonClassId): DemonClass {
        const def = DemonClassDefinitions[id as DemonClassId]
        return new DemonClass(def)
    }

    constructor(def: DemonClassDefinition){
        this.id = def.id
        this.name = def.name
        this.baseStats = def.baseStats
    }
}

export { DemonClass, DemonClassDefinition, DemonClassId }