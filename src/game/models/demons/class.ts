import { SimpleStats } from '../stats'
import * as DemonClassDefinitions from 'game/data/classes/definitionLoader'

type DemonClassType = keyof typeof DemonClassDefinitions

interface DemonClassDefinition {
    id: DemonClassType,
    name: string,
    baseStats: SimpleStats
}

class DemonClass {

    id: DemonClassType
    name: string
    baseStats: SimpleStats

    static loadFromId(id: DemonClassType): DemonClass {
        const def = DemonClassDefinitions[id as DemonClassType]
        return new DemonClass(def)
    }

    constructor(def: DemonClassDefinition){
        this.id = def.id
        this.name = def.name
        this.baseStats = def.baseStats
    }
}

export { DemonClass, DemonClassDefinition, DemonClassType }