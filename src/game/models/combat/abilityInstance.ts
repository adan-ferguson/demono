import { Ability } from './ability'
import { Choice } from './choice'
import { Result } from './combat'
import { Combatant } from './combatant'

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



export { AbilityInstance }