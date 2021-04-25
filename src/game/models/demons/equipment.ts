import { Serializable } from '../serializable'
import { DemonAbilityId } from './ability'
import { DemonStats } from './demon'

interface DemonEquipmentDef {
    name: string
    abilities: DemonAbilityId[],
    stats?: ExtendedStats
}

class Equipment {

    name: string;
    abilities: DemonAbilityId[]
    stats: DemonStats

    constructor(def: DemonEquipmentDef) {
        this.name = definition.name
        this.abilities = definition.abilities
        this.stats = Object.assign({
            strength: 0,
            magic: 0,
            armor: 0,
            speed: 0
        }, definition.stats || {})
    }

    serialize(): DemonEquipmentDef {
        return {
            name: this.name,
            abilities: this.abilities
        }
    }
}

export { Equipment, SerializedEquipment }