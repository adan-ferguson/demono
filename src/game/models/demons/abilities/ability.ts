import * as DemonAbilityDefinitions from './definitionLoader'
import { DemonStats } from '../demon'
type DemonAbilityId = keyof typeof DemonAbilityDefinitions

interface DemonAbilityDefinition {
    id: DemonAbilityId,
    name: string
}

class DemonAbility {

    id: DemonAbilityId
    name: string
    baseStats: DemonStats

    static loadFromId(id: DemonAbilityId, tier: number = 1): DemonAbility {
        const def = DemonAbilityDefinitions[id as DemonAbilityId]
        return new DemonAbility(def, tier)
    }

    constructor(def: DemonAbilityDefinition, readonly tier: number){
        this.id = def.id
        this.name = def.name
    }
}

export { DemonAbility, DemonAbilityId, DemonAbilityDefinition }