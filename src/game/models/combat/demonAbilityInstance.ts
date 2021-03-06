import { DemonAbility } from '../demons/abilities/ability'
import { Choice } from 'game/models/combat/choice'
import { EnemyCombatant } from './enemyCombatant'
import { ActionResult } from '../demons/abilities/action'
import { Combat } from './combat'

class DemonAbilityInstance {

    constructor(readonly ability: DemonAbility){
        
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

    performActions(combat: Combat, choice: Choice): ActionResult[] {
        const results: ActionResult[] = []
        this.ability.actions.forEach(action => {
            results.push(...action.perform(combat, choice))
        })
        return results
    }
}

export { DemonAbilityInstance }