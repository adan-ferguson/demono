import { Combatant } from './combatant'
import { Result } from './result'

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
    targetRemainingHealth: number
    // other things
}

interface DamageResultDef {
    source: Combatant,
    target: Combatant,
    outcome: DamageOutcome
}

class DamageResult extends Result {
    constructor(readonly args: DamageResultDef){super()}
}

export { DamageInfo, DamageType, DamageOutcome, DamageResult }