import { StatModifiers } from 'game/models/stats'
import { DemonAbilityID } from 'game/data/abilities/definitionLoader'
import { DemonAffinityID } from 'game/data/affinities/definitionLoader'
import { DemonClassID } from 'game/data/classes/definitionLoader'

interface DemonAugmentDef {
    id: string,
    name: string,
    abilities: DemonAbilityID[],
    stats?: StatModifiers,
    class?: {
        type: DemonClassID,
        requires: number
    },
    affinity?: {
        type: DemonAffinityID,
        requires: number
    }
}

class DemonAugment {

    readonly id: string
    readonly name: string
    readonly abilities: DemonAbilityID[]
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