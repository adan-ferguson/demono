import { DemonAbility } from '../../demons/abilities/ability'
import { Choice } from 'game/models/combat/choice'
import { EnemyCombatant } from '../enemy/enemyCombatant'
import { Result } from '../combat'
import { DemonInstance } from './demonInstance'
import { AbilityInstance } from '../abilityInstance'
import { Combatant } from '../combatant'

class DemonAbilityInstance extends AbilityInstance<DemonAbility> {

    constructor(ability: DemonAbility, readonly demon: DemonInstance){
        super(ability)
    }

    get owner(): Combatant {
        return this.demon.player
    }

    get cost(): number {
        return this.ability.cost
    }

    get canBeActivated(): boolean {
        return true
    }

    fulfillsChoiceRequirement(choice: Choice): boolean {
        if(this.ability.choiceRequirement === null){
            return choice === null
        }else if(this.ability.choiceRequirement === 'enemy'){
            return choice instanceof EnemyCombatant
        }
        return false
    }

    canPayCosts(): boolean {
        return this.demon.energy >= this.cost
    }

    payCosts(): Result[] {
        this.demon.energy -= this.cost
        return [{
            type: 'energyChange',
            demon: this.demon,
            amount: this.cost
        }]
    }

}

export { DemonAbilityInstance }