import { EnemyCombatant } from 'game/models/combat/enemyCombatant'

type Choice = false | EnemyCombatant
type ChoiceRequirement = false | 'enemy'

export { Choice, ChoiceRequirement }