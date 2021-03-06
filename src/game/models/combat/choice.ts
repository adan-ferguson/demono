import { EnemyCombatant } from 'game/models/combat/enemy/enemyCombatant'
import { PlayerCombatant } from './player/playerCombatant'
import { DemonInstance } from './demon/demonInstance'

type Choice = null | EnemyCombatant | PlayerCombatant | DemonInstance
type ChoiceRequirement = null | 'enemy' | 'anyone' | 'demon'

export { Choice, ChoiceRequirement }