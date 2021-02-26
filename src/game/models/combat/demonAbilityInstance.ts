import { DemonInstance } from './demonInstance'
import { DemonAbility } from '../demons/abilities/ability'
import { Choice } from 'game/models/combat/choice'
import { EnemyCombatant } from './enemyCombatant'

class DemonAbilityInstance {

    constructor(readonly ability: DemonAbility, readonly owner: DemonInstance){
        
    }

    get cost(): number {
        return this.ability.cost
    }

    get canBeActivated(): boolean {
        return true
    }

    fulfillsChoiceRequirement(choice: Choice): boolean {
        if(this.ability.choiceRequirement === false){
            return choice === false
        }else if(this.ability.choiceRequirement === 'enemy'){
            return choice instanceof EnemyCombatant
        }
        return false
    }
}

export { DemonAbilityInstance }