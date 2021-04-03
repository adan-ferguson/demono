import { Result } from 'game/models/combat/result'
import { DamageResult } from 'game/models/combat/damage'
import { CombatScene } from './combatScene'
import { EnergyChangeResult } from 'game/models/combat/demon/demonInstance'
import { EnemyAbilityActivateResult, EnemyAbilityTickResult } from 'game/models/combat/enemy/enemyAbilityInstance'
import { FlyingTextDirection, FlyingTextEffect } from '../visualEffects/flyingTextEffect'
import { DefeatedResult } from 'game/models/combat/combatant'
import { DemonAbilityActivateResult } from 'game/models/combat/demon/demonAbilityInstance'
import { EnemyBeginTurnResult } from 'game/models/combat/enemy/enemyCombatant'
import { PlayerBeginTurnResult } from 'game/models/combat/player/playerCombatant'

class Visualizer {

    constructor(private combatScene: CombatScene){

    }

    public async visualizeResult(result: Result): Promise<void> {

        if(result instanceof DamageResult){
            return await this.visualizeDamageResult(result)
        }

        if(result instanceof DemonAbilityActivateResult){
            return await this.visualizeDemonAbilityActivate(result)
        }

        if(result instanceof EnemyAbilityActivateResult){
            return await this.visualizeEnemyAbilityActivate(result)
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

        if(result instanceof EnemyBeginTurnResult){
            return await this.visualizeEnemyBeginTurnResult(result)
        }

        if(result instanceof PlayerBeginTurnResult){
            return await this.visualizePlayerBeginTurnResult(result)
        }

        console.error('Unsupported result', result)
    }

    private async visualizeEnemyBeginTurnResult(result: EnemyBeginTurnResult): Promise<void> {
        await this.endEnemyTurn()
        this.combatScene.widgets.enemyList.getFromEnemy(result.enemy)?.addClass('highlight')
    }

    private async visualizePlayerBeginTurnResult(result: PlayerBeginTurnResult): Promise<void> {
        await this.endEnemyTurn()
    }

    private async endEnemyTurn(): Promise<void> {
        await wait(250)
        this.combatScene.widgets.enemyList.removeClassAll('highlight')
        this.combatScene.widgets.messaging.clear()
    }

    private async visualizeEnergyChange(result: EnergyChangeResult): Promise<void> {
        const widget = this.combatScene.widgets.demonEnergyList.getFromDemonInstance(result.demon)
        widget?.visualizeEnergyChange(result.delta)
    }

    private async visualizeDamageResult(result: DamageResult): Promise<void> {
        this.combatScene.getWidgetFromCombatant(result.target)?.visualizeDamage(result.outcome)
        await wait(300)
    }

    private async visualizeDemonAbilityActivate(result: DemonAbilityActivateResult): Promise<void> {
        this.combatScene.widgets.messaging.displayMessage(result.abilityInstance.owner.name + ' used ' + result.abilityInstance.ability.name)
        await wait(500)
    }

    private async visualizeEnemyAbilityActivate(result: EnemyAbilityActivateResult): Promise<void> {
        this.combatScene.widgets.messaging.displayMessage(result.abilityInstance.owner.name + ' used ' + result.abilityInstance.ability.name)
        await wait(500)

        this.combatScene
            .widgets
            .enemyList
            .getFromEnemy(result.abilityInstance.owner)
            ?.upcomingAbilities
            .getByAbility(result.abilityInstance)
            ?.setTimeLeft(result.timeLeftAfter)
    }

    private async visualizeEnemyAbilityTickResult(result: EnemyAbilityTickResult): Promise<void> {
        const widget = this.combatScene.widgets.enemyList.getFromEnemy(result.abilityInstance.owner)
        const abilityWidget = widget?.upcomingAbilities.getByAbility(result.abilityInstance)

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
        await wait(250)
    }

    private async visualizeDefeatedResult(result: DefeatedResult): Promise<void> {
        this.combatScene.getWidgetFromCombatant(result.combatant)?.visualizeDefeat()
        await wait(500)
    }
}

const wait = (ms: number) => new Promise(r => setTimeout(r, ms))


export { Visualizer }