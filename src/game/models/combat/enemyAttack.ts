import { ActionDefinition } from './action'
import { AttackAction } from './attack'
import { DamageType } from './damage'
import { EnemyCombatant } from './enemyCombatant'

interface EnemyAttackDefinition extends ActionDefinition {
    type: 'enemyattack',
    damageType: DamageType,
    damage: number,
}

class EnemyAttackAction extends AttackAction<EnemyCombatant> {

    constructor(readonly def: EnemyAttackDefinition){
        super()
    }

    get damageType(): DamageType {
        return this.def.damageType
    }

    getDamage(): number {
        return this.def.damage
    }

}

export { EnemyAttackDefinition, EnemyAttackAction }