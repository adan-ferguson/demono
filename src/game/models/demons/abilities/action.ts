import { Choice } from 'game/models/combat/choice'
import { Combat } from 'game/models/combat/combat'

abstract class Action {
    abstract perform(tier: number, combat: Combat, choice: Choice): ActionResult
}

interface ActionInfo {}
interface ActionResult {}

export { Action, ActionInfo, ActionResult }