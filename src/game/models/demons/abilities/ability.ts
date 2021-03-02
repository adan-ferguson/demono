import { ChoiceRequirement } from 'game/models/combat/choice'
import { Action, ActionDefinition } from './action'
import * as DemonAbilityDefinitions from './definitionLoader'
import { Tiered } from './tiered'
import { AttackAction, AttackDefinition } from './attack'

type DemonAbilityId = keyof typeof DemonAbilityDefinitions

interface DemonAbilityDefinition {
    id: DemonAbilityId,
    name: string,
    cost: Tiered<number>,
    choiceRequirement?: ChoiceRequirement,
    actions: ActionDefinition[]
}

class DemonAbility {

    readonly id: DemonAbilityId
    readonly name: string
    readonly cost: number
    choiceRequirement: ChoiceRequirement
    actions: Action[]

    static loadFromId(id: DemonAbilityId, tier = 1): DemonAbility {
        const def = DemonAbilityDefinitions[id as DemonAbilityId]
        return new DemonAbility(def, tier)
    }

    constructor(def: DemonAbilityDefinition, readonly tier: number){
        this.id = def.id
        this.name = def.name
        this.cost = def.cost(this.tier)
        this.choiceRequirement = def.choiceRequirement || false
        this.actions = []

        def.actions.forEach(actionDef => {
            if(actionDef as AttackDefinition){
                this.actions.push(new AttackAction(actionDef as AttackDefinition, tier))
            }
        })
    }
}

export { DemonAbility, DemonAbilityId, DemonAbilityDefinition, ChoiceRequirement }