import { Result } from 'game/models/combat/combat'
import { Choice } from './choice'
import { Combatant } from './combatant'

abstract class Action {
    abstract perform(source: Combatant, choice?: Choice): Result[]
}

export {
    Action
}