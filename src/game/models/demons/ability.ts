import { ChoiceRequirement } from 'game/models/combat/choice'
import { Action } from '../combat/action'
import { Ability, AbilityClassification } from 'game/models/combat/ability'
import { PlayerAttackAction, PlayerAttackDefinition } from 'game/models/combat/player/playerAttack'
import { PlayerActionDefinition } from 'game/models/combat/player/playerAction'
import { Tiered } from 'game/tiered'
import { DataDefinition } from 'game/data/dataDefinition'
import { DataCollection } from 'game/data/dataCollection'
import { DemonAbilityDefinitions, DemonAbilityID } from 'game/data/abilities/definitionLoader'

interface DemonAbilityDefinition extends DataDefinition {
    id?: DemonAbilityID,
    name: string,
    cost: Tiered<number>,
    choiceRequirement?: ChoiceRequirement,
    classification: AbilityClassification,
    actions: PlayerActionDefinition[]
}

const defCollection = new DataCollection(DemonAbilityDefinitions)

class DemonAbility extends Ability {

    readonly id: DemonAbilityID
    readonly name: string
    readonly cost: number
    readonly description: string
    readonly choiceRequirement: ChoiceRequirement
    readonly _classification: AbilityClassification

    static loadFromId(id: DemonAbilityID, tier = 1): DemonAbility {
        const def = defCollection.definitionList[id]
        if(!def){
            throw 'DemonAbility not found, Id: ' + id
        }
        return new DemonAbility(def, tier)
    }

    constructor(readonly def: DemonAbilityDefinition, readonly tier: number){
        super(getActions(def, tier))
        if(!def.id){
            throw 'Definition not loaded correctly.'
        }
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


export { DemonAbility, DemonAbilityDefinition, ChoiceRequirement }