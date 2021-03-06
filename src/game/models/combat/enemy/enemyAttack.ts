import { Choice } from '../choice'
import { Result } from '../combat'
import { DamageResult, DamageType } from '../damage'
import { EnemyAction, EnemyActionDefinition } from './enemyAction'
import { EnemyCombatant } from './enemyCombatant'

interface EnemyAttackDefinition extends EnemyActionDefinition {
    type: 'attack',
    damageType: DamageType,
    damage: number,
}

class EnemyAttackAction extends EnemyAction {

    constructor(readonly def: EnemyAttackDefinition){
        super(def)
    }

    perform(enemy: EnemyCombatant, choice?: Choice): Result[] {

        const result: Result[] = []
        const damageInfo = {
            type: this.def.damageType,
            damage: this.def.damage
        }

        this.getTargets(enemy, choice).forEach(t => {
            result.push({
                type: 'damage',
                source: enemy,
                target: t,
                outcome: enemy.dealDamage(t, damageInfo)
            } as DamageResult)
        })

        return result
    }
}

export { EnemyAttackDefinition, EnemyAttackAction }