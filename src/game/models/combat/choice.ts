import { EnemyCombatant } from 'game/models/combat/enemyCombatant'

type Choice = null | EnemyCombatant
type ChoiceRequirement = null | 'enemy'

export { Choice, ChoiceRequirement }