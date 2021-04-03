import { Serializable } from '../serializable'
import { DemonAbilityId } from './abilities/ability'
import { DemonStats } from './demon'

interface SerializedEquipment {
    name: string
    abilities: DemonAbilityId[],
    stats?: {
        strength?: number,
        magic?: number,
        armor?: number,
        speed?: number
    }
}

class Equipment extends Serializable<SerializedEquipment> {

    name: string;
    abilities: DemonAbilityId[]
    stats: DemonStats

    deserialize(definition: SerializedEquipment): void {
        this.name = definition.name
        this.abilities = definition.abilities
        this.stats = Object.assign({
            strength: 0,
            magic: 0,
            armor: 0,
            speed: 0
        }, definition.stats || {})
    }

    serialize(): SerializedEquipment {
        return {
            name: this.name,
            abilities: this.abilities
        }
    }
}

export { Equipment, SerializedEquipment }