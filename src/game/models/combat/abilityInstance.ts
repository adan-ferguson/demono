import { Ability } from './ability'
import { Choice } from './choice'
import { Combatant } from './combatant'
import { Result } from './result'

interface ActivateAbilityResultArgs {
    ability: AbilityInstance<Ability>
}

class ActivateAbilityResult extends Result {
    readonly ability: AbilityInstance<Ability>
    constructor(def: ActivateAbilityResultArgs){
        super()
        this.ability = def.ability
    }
}

abstract class AbilityInstance<T extends Ability> {

    constructor(readonly ability: T){}

    abstract get owner(): Combatant

    performActions(choice?: Choice): Result[] {
        const results: Result[] = []
        this.ability.actions.forEach(action => {
            results.push(...action.perform(this.owner, choice))
        })
        return results
    }
}

export { AbilityInstance, ActivateAbilityResult }