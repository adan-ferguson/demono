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

    readonly source: Combatant
    readonly target: Combatant
    readonly outcome: DamageOutcome

    constructor(args: DamageResultDef){
        super()
        this.source = args.source
        this.target = args.target
        this.outcome = args.outcome
    }
}

export { DamageInfo, DamageType, DamageOutcome, DamageResult }