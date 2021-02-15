import { DemonStats } from '../demon'
import * as DemonClassDefinitions from './definitionLoader'

interface DemonClassDefinition {
    id: string,
    name: string,
    baseStats: DemonStats
}

class DemonClass {

    id: string
    name: string
    baseStats: DemonStats

    static loadFromId(id: string): DemonClass {
        const def = DemonClassDefinitions[id as keyof typeof DemonClassDefinitions]
        return new DemonClass(def)
    }

    constructor(def: DemonClassDefinition){
        this.id = def.id
        this.name = def.name
        this.baseStats = def.baseStats
    }
}

export { DemonClass, DemonClassDefinition }