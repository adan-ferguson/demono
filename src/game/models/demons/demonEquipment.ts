import { DemonAbilityId } from './ability'
import { StatModifiers } from 'game/models/stats'

interface DemonEquipmentDef {
    id: string,
    name: string,
    abilities: DemonAbilityId[],
    stats: StatModifiers
}

class DemonEquipment {

    readonly id: string
    readonly name: string
    readonly abilities: DemonAbilityId[]
    readonly stats: StatModifiers

    constructor(def: DemonEquipmentDef) {
        this.id = def.id
        this.name = def.name
        this.stats = def.stats
        this.abilities = def.abilities
    }

    serialize(): DemonEquipmentDef {
        return {
            id: this.id,
            name: this.name,
            stats: this.stats,
            abilities: this.abilities
        }
    }
}

export { DemonEquipment, DemonEquipmentDef }