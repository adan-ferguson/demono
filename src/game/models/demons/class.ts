import { SimpleStats } from '../stats'
import { DemonClassDefinitions, DemonClassID } from 'game/data/classes/definitionLoader'

interface DemonClassDefinition {
    name: string,
    baseStats: SimpleStats
}

class DemonClass {

    id: DemonClassID
    name: string
    baseStats: SimpleStats

    static loadFromId(id: DemonClassID): DemonClass {
        const def = DemonClassDefinitions[id as DemonClassID]
        return new DemonClass(def)
    }

    constructor(def: DemonClassDefinition){
        if(!def.id){
            throw 'Definition not loaded correctly.'
        }
        this.id = def.id
        this.name = def.name
        this.baseStats = def.baseStats
    }
}

export { DemonClass, DemonClassDefinition }