import { PlayerCombatant } from './playerCombatant'
import { DemonStats } from '../demons/demon'
import { ActionDefinition } from './action'
import { Tiered } from '../demons/abilities/tiered'
import { DamageType } from './damage'
import { AttackAction } from './attack'

interface PlayerAttackDefinition extends ActionDefinition {
    type: 'playerattack'
    damage: Tiered<number>,
    damageType: DamageType,
    scaling?: {
        [keys in keyof DemonStats]?: Tiered<number>
    }
}

class PlayerAttackAction extends AttackAction<PlayerCombatant> {

    constructor(readonly def: PlayerAttackDefinition, readonly tier: number){
        super()
    }

    get damageType(): DamageType {
        return this.def.damageType
    }

    getDamage(source: PlayerCombatant): number {
        let val = this.def.damage(this.tier)
        const scaling = this.def.scaling
        if(scaling){
            Object.keys(scaling).forEach((statName: keyof DemonStats) => {
                const scalingFunc = scaling[statName]
                if(scalingFunc){
                    val += scalingFunc(this.tier) * source.stats[statName]
                }
            })
        }
        return val
    }
}

export { PlayerAttackAction }