import { Result } from 'game/models/combat/result'
import { DamageResult } from 'game/models/combat/damage'
import { CombatScene } from './combatScene'
import { EnergyChangeResult } from 'game/models/combat/demon/demonInstance'
import { EnemyAbilityTickResult } from 'game/models/combat/enemy/enemyAbilityInstance'
import { FlyingTextDirection, FlyingTextEffect } from '../visualEffects/flyingTextEffect'
import { ActivateAbilityResult } from 'game/models/combat/abilityInstance'
import { DefeatedResult } from 'game/models/combat/combatant'

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

        if(result instanceof DefeatedResult){
            return await this.visualizeDefeatedResult(result)
        }

        console.error('Unsupported result', result)
    }

    private async visualizeEnergyChange(result: EnergyChangeResult): Promise<void> {
        const widget = this.combatScene.widgets.demonEnergyList.getFromDemonInstance(result.demon)
        widget?.visualizeEnergyChange(result.delta)
    }

    private async visualizeDamageResult(result: DamageResult): Promise<void> {
        this.combatScene.getWidgetFromCombatant(result.target)?.visualizeDamage(result.outcome)
        await wait(1000)
    }

    private async visualizeActivateAbility(result: ActivateAbilityResult): Promise<void> {
        this.combatScene.widgets.messaging.displayMessage(result.abilityInstance.owner.name + ' used ' + result.abilityInstance.ability.name)
    }

    private async visualizeEnemyAbilityTickResult(result: EnemyAbilityTickResult): Promise<void> {
        const widget = this.combatScene.widgets.enemyList.getFromEnemy(result.ability.owner)
        const abilityWidget = widget?.upcomingAbilities.getByAbility(result.ability)

        if(!abilityWidget){
            return
        }

        abilityWidget.setTimeLeft(result.timeLeft)
        new FlyingTextEffect({
            message: '-1',
            direction: FlyingTextDirection.Up,
            origin: abilityWidget.element.getBoundingClientRect(),
            duration: 1500
        }).run()
        await wait(200)
    }

    private async visualizeDefeatedResult(result: DefeatedResult): Promise<void> {
        this.combatScene.getWidgetFromCombatant(result.combatant)?.visualizeDefeat()
    }
}

const wait = (ms: number) => new Promise(r => setTimeout(r, ms))


export { Visualizer }