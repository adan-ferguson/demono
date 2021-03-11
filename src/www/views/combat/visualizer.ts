import { Result } from 'game/models/combat/result'
import { DamageResult } from 'game/models/combat/damage'
import { CombatScene } from './combatScene'
import { ActivateAbilityResult } from 'game/models/combat/demon/demonAbilityInstance'
import { EnergyChangeResult } from '../../../game/models/combat/demon/demonInstance'

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

        if (result instanceof EnergyChangeResult) {
            return await this.visualizeEnergyChange(result)
        }

        console.error('Unsupported result', result)
    }

    private async visualizeEnergyChange(result: EnergyChangeResult): Promise<void> {
        const widget = this.combatScene.widgets.demonEnergyList.getFromDemonInstance(result.demon)
        widget?.visualizeEnergyChange(result.amount)
        await wait(1000)
    }

    private async visualizeDamageResult(result: DamageResult): Promise<void> {
        this.combatScene.getWidgetFromCombatant(result.target)?.visualizeDamage(result.outcome)
        await wait(1000)
    }

    private async visualizeActivateAbility(result: ActivateAbilityResult): Promise<void> {}
}

const wait = (ms: number) => new Promise(r => setTimeout(r, ms))


export { Visualizer }