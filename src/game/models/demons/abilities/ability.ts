import { ChoiceRequirement } from 'game/models/combat/choice'
import { Action } from '../../combat/action'
import * as DemonAbilityDefinitions from './definitionLoader'
import { Tiered } from './tiered'
import { Ability } from 'game/models/combat/ability'
import { PlayerAttackAction, PlayerAttackDefinition } from 'game/models/combat/player/playerAttack'
import { PlayerActionDefinition } from 'game/models/combat/player/playerAction'

type DemonAbilityId = keyof typeof DemonAbilityDefinitions

interface DemonAbilityDefinition {
    id: DemonAbilityId,
    name: string,
    cost: Tiered<number>,
    choiceRequirement?: ChoiceRequirement,
    actions: PlayerActionDefinition[]
}

class DemonAbility extends Ability {

    readonly id: DemonAbilityId
    readonly name: string
    readonly cost: number
    readonly description: string
    readonly choiceRequirement: ChoiceRequirement

    static loadFromId(id: DemonAbilityId, tier = 1): DemonAbility {
        const def = DemonAbilityDefinitions[id as DemonAbilityId]
        return new DemonAbility(def, tier)
    }

    constructor(readonly def: DemonAbilityDefinition, readonly tier: number){
        super(getActions(def, tier))
        this.id = def.id
        this.name = def.name
        this.cost = def.cost(this.tier)
        this.choiceRequirement = def.choiceRequirement || null
    }
}

function getActions(def: DemonAbilityDefinition, tier: number): Action[]{
    return def.actions.map(def => {
        if(def as PlayerAttackDefinition){
            return new PlayerAttackAction(def as PlayerAttackDefinition, tier)
        }
        throw 'Action problem'
    })
}


export { DemonAbility, DemonAbilityId, DemonAbilityDefinition, ChoiceRequirement }