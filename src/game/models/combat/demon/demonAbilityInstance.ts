import { DemonAbility } from '../../demons/ability'
import { Choice } from 'game/models/combat/choice'
import { EnemyCombatant } from '../enemy/enemyCombatant'
import { DemonInstance, EnergyChangeResult, EnergyChangeType } from './demonInstance'
import { AbilityInstance } from '../abilityInstance'
import { Combatant } from '../combatant'
import { Result } from '../result'

class DemonAbilityActivateResult extends Result {
    constructor(readonly abilityInstance: DemonAbilityInstance){
        super()
    }
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
        return this.canPayCosts()
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
        results.push(new DemonAbilityActivateResult(this))
        results.push(...this.payCosts())
        results.push(...this.performActions(choice))
        return results
    }

    canPayCosts(): boolean {
        return this.demon.energy >= this.cost
    }

    private payCosts(): Result[] {
        const before = this.demon.energy
        this.demon.energy -= this.cost
        return [
            new EnergyChangeResult({
                demon: this.demon,
                before: before,
                after: this.demon.energy,
                type: EnergyChangeType.Cost
            })
        ]
    }
}

export { DemonAbilityInstance, DemonAbilityActivateResult }