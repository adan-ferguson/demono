import { Combatant } from './combatant'
import { DamageOutcome } from './damage'
import { DemonInstance } from './demonInstance'

interface DamageResult {
    readonly type: 'damage'
    readonly outcome: DamageOutcome,
    readonly source: Combatant,
    readonly target: Combatant
}

interface EnergyChangeResult {
    readonly type: 'energyChange'
    readonly demon: DemonInstance,
    readonly amount: number
}

interface PlayerWinResult {
    readonly type: 'playerwin'
}

interface PlayerLoseResult {
    readonly type: 'playerlose'
}

type Result = DamageResult | EnergyChangeResult | PlayerWinResult | PlayerLoseResult

export { Result }