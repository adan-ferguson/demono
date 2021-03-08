import { Result } from 'game/models/combat/result'
import { DamageResult } from 'game/models/combat/damage'
import { CombatScene } from './combatScene'
import { ActivateAbilityResult } from 'game/models/combat/demon/demonAbilityInstance'

class Visualizer {

    constructor(private combatScene: CombatScene){

    }

    public async visualizeResult(result: Result): Promise<void> {

        if (result instanceof DamageResult) {
            return await this.visualizeDamageResult(result)
        }

        if (result instanceof ActivateAbilityResult) {
            return await this.visualizeActivateAbility(result)
        }

        throw 'Could not visualize result.'
    }

    private async visualizeDamageResult(damageResult: DamageResult): Promise<void> {
        this.combatScene.getWidgetFromCombatant(damageResult.args.target)?.visualizeDamage(damageResult.args.outcome)
    }

    private async visualizeActivateAbility(activateAbilityResult: ActivateAbilityResult): Promise<void> {

    }
}

export { Visualizer }