import { DamageOutcome } from 'game/models/combat/damage'

interface CombatantWidget {
    visualizeDamage(damage: DamageOutcome):  void
}

export { CombatantWidget }