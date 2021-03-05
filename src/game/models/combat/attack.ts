import { Action } from './action'
import { Combat, Result } from './combat'
import { DamageType } from './damage'
import { Combatant } from 'game/models/combat/combatant'

abstract class AttackAction<T extends Combatant> extends Action {

    abstract get damageType(): DamageType
    abstract getDamage(source: Combatant): number

    perform(combat: Combat, source: T, targets: Combatant[]): Result[] {

        const result: Result[] = []
        const damageInfo = {
            type: this.damageType,
            damage: this.getDamage(source)
        }

        targets.forEach(t => {
            result.push({
                type: 'damage',
                source: source,
                target: t,
                outcome: source.dealDamage(t, damageInfo)
            })
        })

        return result
    }
}

export { AttackAction }
