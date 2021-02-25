import {Serializable} from "../serializable";
import {DemonAbilityId} from "./abilities/ability";

interface SerializedEquipment {
    name: string
    abilities: DemonAbilityId[]
}

class Equipment extends Serializable<SerializedEquipment> {

    name: string;
    abilities: DemonAbilityId[];

    deserialize(definition: SerializedEquipment): void {
        this.name = definition.name
        this.abilities = definition.abilities
    }

    serialize(): SerializedEquipment {
        return {
            name: this.name,
            abilities: this.abilities
        }
    }
}

export { Equipment, SerializedEquipment }