import { DemonAbilityId } from './ability'
import { StatModifiers } from 'game/models/stats'
import { v4 as uuid } from 'uuid'
import { DemonAffinityType } from 'game/models/demons/affinity'
import { DemonClassType } from './class'

interface DemonAugmentDef {
    id: string,
    name: string,
    abilities: DemonAbilityId[],
    stats?: StatModifiers,
    class?: {
        type: DemonClassType,
        requires: number
    },
    affinity?: {
        type: DemonAffinityType,
        requires: number
    }
}

class DemonAugment {

    readonly id: string
    readonly name: string
    readonly abilities: DemonAbilityId[]
    readonly stats: StatModifiers

    constructor(def: DemonAugmentDef) {
        this.id = def.id
        this.name = def.name
        this.stats = def.stats || {}
        this.abilities = def.abilities
    }

    serialize(): DemonAugmentDef {
        return {
            id: this.id,
            name: this.name,
            stats: this.stats,
            abilities: this.abilities
        }
    }
}

export { DemonAugment, DemonAugmentDef }