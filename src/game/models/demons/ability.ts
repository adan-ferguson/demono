import { ChoiceRequirement } from 'game/models/combat/choice'
import { Action } from '../combat/action'
import { ID, Defs } from 'game/data/abilities/definitionLoader'
import { Ability, AbilityClassification } from 'game/models/combat/ability'
import { PlayerAttackAction, PlayerAttackDefinition } from 'game/models/combat/player/playerAttack'
import { PlayerActionDefinition } from 'game/models/combat/player/playerAction'
import { Tiered } from 'game/tiered'
import { DataDefinition } from 'game/data/dataDefinition'
import { DataCollection } from 'game/data/dataCollection'

interface DemonAbilityDefinition extends DataDefinition {
    name: string,
    cost: Tiered<number>,
    choiceRequirement?: ChoiceRequirement,
    classification: AbilityClassification,
    actions: PlayerActionDefinition[]
}

const defCollection = new DataCollection(Defs)

class DemonAbility extends Ability {

    readonly id: ID
    readonly name: string
    readonly cost: number
    readonly description: string
    readonly choiceRequirement: ChoiceRequirement
    readonly _classification: AbilityClassification

    static loadFromId(id: ID, tier = 1): DemonAbility {
        const def = defCollection.getByID(id)
        if(!def){
            throw 'DemonAbility not found, Id: ' + id
        }
        return new DemonAbility(def, tier)
    }

    constructor(readonly def: DemonAbilityDefinition, readonly tier: number){
        super(getActions(def, tier))
        this.id = def.id
        this.name = def.name
        this.cost = def.cost(this.tier)
        this.choiceRequirement = def.choiceRequirement || null
        this._classification = def.classification
    }

    get classification(): AbilityClassification {
        return this._classification
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