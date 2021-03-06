import { Result } from './combat'
import { Combatant } from './combatant'

enum DamageType {
    Physical,
    Magic,
    True
}

interface DamageInfo {
    type: DamageType,
    damage: number,
    // properties
}

interface DamageOutcome {
    type: DamageType,
    damage: number,
    blocked: number,
    // other things
}

interface DamageResult extends Result {
    readonly type: 'damage'
    readonly outcome: DamageOutcome,
    readonly source: Combatant,
    readonly target: Combatant
}

export { DamageInfo, DamageType, DamageOutcome, DamageResult }