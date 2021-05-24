import { SimpleStats } from '../stats'
import { DemonClassDefinitions, DemonClassID } from 'game/data/classes/definitionLoader'

interface DemonClassDefinition {
    name: string,
    baseStats: SimpleStats
}

class DemonClass {

    name: string
    baseStats: SimpleStats

    static loadFromId(id: DemonClassID): DemonClass {
        return new DemonClass(id, DemonClassDefinitions.getDefinition(id))
    }

    constructor(readonly id: DemonClassID, def: DemonClassDefinition){
        this.name = def.name
        this.baseStats = def.baseStats
    }
}

export { DemonClass, DemonClassDefinition }