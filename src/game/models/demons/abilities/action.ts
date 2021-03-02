import { Choice } from 'game/models/combat/choice'
import { Combat } from 'game/models/combat/combat'
import { Combatant } from 'game/models/combat/combatant'

abstract class Action {
    constructor(protected tier: number){

    }
    abstract perform(combat: Combat, choice: Choice): ActionResult[]
}

interface ActionDefinition {
    type: string,
    target: 'self' | 'enemy' | 'allEnemies',
}

interface ActionResult {
    source: Combatant,
    target?: Combatant
}

export { Action, ActionDefinition, ActionResult }