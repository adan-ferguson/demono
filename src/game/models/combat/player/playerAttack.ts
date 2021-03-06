import { PlayerCombatant } from './playerCombatant'
import { DemonStats } from '../../demons/demon'
import { DamageType } from '../damage'
import { Tiered } from '../../demons/abilities/tiered'
import { PlayerAction, PlayerActionDefinition } from './playerAction'
import { Choice } from '../choice'
import { Result } from '../combat'

interface PlayerAttackDefinition extends PlayerActionDefinition {
    type: 'attack'
    damage: Tiered<number>,
    damageType: DamageType,
    scaling?: {
        [keys in keyof DemonStats]?: Tiered<number>
    }
}

class PlayerAttackAction extends PlayerAction {

    constructor(readonly def: PlayerAttackDefinition, readonly tier: number){
        super(def)
    }

    getDamage(player: PlayerCombatant): number {
        let val = this.def.damage(this.tier)
        const scaling = this.def.scaling
        if(scaling){
            Object.keys(scaling).forEach((statName: keyof DemonStats) => {
                const scalingFunc = scaling[statName]
                if(scalingFunc){
                    val += scalingFunc(this.tier) * player.stats[statName]
                }
            })
        }
        return val
    }

    perform(player: PlayerCombatant, choice?: Choice): Result[] {

        const result: Result[] = []
        const damageInfo = {
            type: this.def.damageType,
            damage: this.getDamage(player)
        }

        this.getTargets(player, choice).forEach(t => {
            result.push({
                type: 'damage',
                source: player,
                target: t,
                outcome: player.dealDamage(t, damageInfo)
            })
        })

        return result
    }
}

export { PlayerAttackAction, PlayerAttackDefinition }