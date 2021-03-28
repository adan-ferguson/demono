import { Result } from 'game/models/combat/result'
import { DamageResult } from 'game/models/combat/damage'
import { CombatScene } from './combatScene'
import { ActivateAbilityResult } from 'game/models/combat/demon/demonAbilityInstance'
import { EnergyChangeResult } from 'game/models/combat/demon/demonInstance'
import { EnemyAbilityTickResult } from 'game/models/combat/enemy/enemyAbilityInstance'

class Visualizer {

    constructor(private combatScene: CombatScene){

    }

    public async visualizeResult(result: Result): Promise<void> {

        if(result instanceof DamageResult){
            return await this.visualizeDamageResult(result)
        }

        if(result instanceof ActivateAbilityResult){
            return await this.visualizeActivateAbility(result)
        }

        if(result instanceof EnergyChangeResult){
            return await this.visualizeEnergyChange(result)
        }

        if(result instanceof EnemyAbilityTickResult){
            return await this.visualizeEnemyAbilityTickResult(result)
        }

        console.error('Unsupported result', result)
    }

    private async visualizeEnergyChange(result: EnergyChangeResult): Promise<void> {
        const widget = this.combatScene.widgets.demonEnergyList.getFromDemonInstance(result.demon)
        widget?.visualizeEnergyChange(result.amount)
    }

    private async visualizeDamageResult(result: DamageResult): Promise<void> {
        this.combatScene.getWidgetFromCombatant(result.target)?.visualizeDamage(result.outcome)
        await wait(1000)
    }

    private async visualizeActivateAbility(result: ActivateAbilityResult): Promise<void> {
        this.combatScene.widgets.messaging.displayMessage(result.ability.owner.name + ' used ' + result.ability.ability.name)
    }

    private async visualizeEnemyAbilityTickResult(result: EnemyAbilityTickResult): Promise<void> {
        const widget = this.combatScene.widgets.enemyList.getFromEnemy(result.ability.owner)
        widget?.upcomingAbilities.getByAbility(result.ability)?.setTimeLeft(result.timeLeft)
        await wait(200)
    }
}

const wait = (ms: number) => new Promise(r => setTimeout(r, ms))


export { Visualizer }