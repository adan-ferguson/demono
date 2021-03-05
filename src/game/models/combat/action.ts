import { Combat, Result } from 'game/models/combat/combat'
import { Combatant } from './combatant'

abstract class Action {
    abstract perform(combat: Combat, source: Combatant, targets: Combatant[]): Result[]
}

enum ActionTarget {
    Self,
    Enemy,
    Enemies,
    Ally,
    Allies,
    Everyone
}

interface ActionDefinition {
    type: string,
    target: ActionTarget
}

export { Action, ActionTarget, ActionDefinition }