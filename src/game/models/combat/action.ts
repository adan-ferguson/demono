import { Choice } from './choice'
import { Combatant } from './combatant'
import { Result } from './result'

abstract class Action {
    abstract perform(source: Combatant, choice?: Choice): Result[]
}

export { Action }