import { DemonAbility } from '../demons/abilities/ability'
import { Choice } from 'game/models/combat/choice'
import { EnemyCombatant } from './enemyCombatant'
import { Combat, Result } from './combat'
import { DemonInstance } from './demonInstance'
import { AbilityInstance } from './abilityInstance'

class DemonAbilityInstance extends AbilityInstance<DemonAbility> {

    constructor(ability: DemonAbility, readonly owner: DemonInstance){
        super(ability)
    }

    get combat(): Combat {
        return this.owner.player.combat
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

    canPayCosts(): boolean {
        return this.owner.energy >= this.cost
    }

    payCosts(): Result[] {
        this.owner.energy -= this.cost
        return [{
            type: 'energyChange',
            demon: this.owner,
            amount: this.cost
        }]
    }

}

export { DemonAbilityInstance }