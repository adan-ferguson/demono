import { PlayerCombatant } from './playerCombatant'
import { PlayerAction, PlayerActionDefinition, PlayerActionSubject } from './playerAction'
import { Choice } from '../choice'
import { DamageResult, DamageType } from '../damage'
import { Result } from '../result'
import { DefeatedResult } from '../combatant'
import { Tiered } from 'game/tiered'
import { ExtendedStats, StatType } from 'game/models/stats'

interface PlayerAttackDefinitionArgs {
    readonly damage: Tiered<number>,
    readonly damageType: DamageType,
    readonly scaling: {
        [keys in keyof ExtendedStats]?: Tiered<number>
    }
}

class PlayerAttackDefinition extends PlayerActionDefinition {
    constructor(readonly subject: PlayerActionSubject, readonly args: PlayerAttackDefinitionArgs) {
        super(subject)
    }
}

class PlayerAttackAction extends PlayerAction {

    constructor(readonly def: PlayerAttackDefinition, readonly tier: number){
        super(def)
    }

    getDamage(player: PlayerCombatant): number {
        let val = this.def.args.damage(this.tier)
        const scaling = this.def.args.scaling
        if(scaling){
            Object.keys(scaling).forEach((statName: StatType) => {
                const scalingFunc = scaling[statName]
                if(scalingFunc){
                    val += scalingFunc(this.tier) * player.stats.get(statName)
                }
            })
        }
        return val
    }

    perform(player: PlayerCombatant, choice?: Choice): Result[] {

        const result: Result[] = []
        const damageInfo = {
            type: this.def.args.damageType,
            damage: this.getDamage(player)
        }

        this.getTargets(player, choice).forEach(target => {
            const outcome = player.dealDamage(target, damageInfo)
            result.push(new DamageResult({ source: player, target, outcome }))
            if(target.health <= 0){
                result.push(new DefeatedResult(target))
            }
        })

        return result
    }
}

export { PlayerAttackAction, PlayerAttackDefinition }