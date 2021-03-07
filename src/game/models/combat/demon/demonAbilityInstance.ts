import { DemonAbility } from '../../demons/abilities/ability'
import { Choice } from 'game/models/combat/choice'
import { EnemyCombatant } from '../enemy/enemyCombatant'
import { Result } from '../combat'
import { DemonInstance } from './demonInstance'
import { AbilityInstance } from '../abilityInstance'
import { Combatant } from '../combatant'
import {Ability} from "../ability";

interface EnergyChangeResult extends Result {
    readonly type: 'energyChange'
    readonly demon: DemonInstance,
    readonly amount: number
}

interface ActivateAbilityResult extends Result {
    readonly type: 'activateAbility',
    readonly ability: Ability
}

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

    activate(choice: Choice): Result[] {
        const results: Result[] = []
        results.push({
            type: 'activateAbility',
            ability: this.ability
        } as ActivateAbilityResult)
        results.push(...this.payCosts())
        results.push(...this.performActions(choice))
        return results
    }

    canPayCosts(): boolean {
        return this.demon.energy >= this.cost
    }

    private payCosts(): Result[] {
        this.demon.energy -= this.cost
        return [{
            type: 'energyChange',
            demon: this.demon,
            amount: this.cost
        } as EnergyChangeResult]
    }
}

export { DemonAbilityInstance }