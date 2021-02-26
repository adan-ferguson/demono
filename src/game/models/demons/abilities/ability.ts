import { Choice, ChoiceRequirement } from 'game/models/combat/choice'
import * as DemonAbilityDefinitions from './definitionLoader'
type DemonAbilityId = keyof typeof DemonAbilityDefinitions

interface DemonAbilityDefinition {
    id: DemonAbilityId,
    name: string,
    cost: Tiered<number>,
    choiceRequirement?: ChoiceRequirement
}

type Tiered<type> = [type, type, type] | type

class DemonAbility {

    readonly id: DemonAbilityId
    readonly name: string
    readonly cost: number
    choiceRequirement: ChoiceRequirement

    static loadFromId(id: DemonAbilityId, tier = 1): DemonAbility {
        const def = DemonAbilityDefinitions[id as DemonAbilityId]
        return new DemonAbility(def, tier)
    }

    constructor(def: DemonAbilityDefinition, readonly tier: number){
        this.id = def.id
        this.name = def.name
        this.cost = tieredValue(def.cost)
        this.choiceRequirement = def.choiceRequirement || false
    }
}

function tieredValue<T>(val: Tiered<T>): T{
    return val instanceof Array ? val[this.tier - 1] : val
}

export { DemonAbility, DemonAbilityId, DemonAbilityDefinition, ChoiceRequirement }