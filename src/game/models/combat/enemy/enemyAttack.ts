import { Choice } from '../choice'
import { EnemyAction, EnemyActionDefinition, EnemyActionSubject } from './enemyAction'
import { EnemyCombatant } from './enemyCombatant'
import { DamageResult, DamageType } from '../damage'
import { Result } from '../result'

interface EnemyAttackDefinitionArgs {
    readonly damageType: DamageType
    readonly damage: number
}

class EnemyAttackDefinition extends EnemyActionDefinition {
    constructor(subject: EnemyActionSubject, readonly args: EnemyAttackDefinitionArgs){
        super(subject)
    }
}

class EnemyAttackAction extends EnemyAction {

    constructor(readonly def: EnemyAttackDefinition){
        super(def)
    }

    perform(enemy: EnemyCombatant, choice?: Choice): Result[] {

        const result: Result[] = []
        const damageInfo = {
            type: this.def.args.damageType,
            damage: this.def.args.damage
        }

        this.getTargets(enemy, choice).forEach(t => {
            result.push(new DamageResult({
                source: enemy,
                target: t,
                outcome: enemy.dealDamage(t, damageInfo)
            }))
        })

        return result
    }
}

export { EnemyAttackAction, EnemyAttackDefinition }