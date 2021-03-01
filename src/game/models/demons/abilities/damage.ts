import { Choice } from 'game/models/combat/choice'
import { Combat } from 'game/models/combat/combat'
import { Action, ActionInfo, ActionResult } from './action'
import { Tiered } from './tiered'
import { EnemyCombatant } from '../../combat/enemyCombatant'
import { PlayerCombatant } from '../../combat/playerCombatant'
import { DemonStats } from '../demon'

interface DamageInfo extends ActionInfo {
    target: 'self' | 'enemy' | 'allEnemies',
    value: Tiered<number>,
    type: 'phys' | 'magic',
    scaling?: {
        [keys in keyof DemonStats]?: Tiered<number>
    }
}

class DamageAction extends Action {

    constructor(readonly info: DamageInfo){
        super()
    }

    perform(tier: number, combat: Combat, choice: Choice): ActionResult {
        if(this.info.target === 'enemy' && choice instanceof EnemyCombatant){
            const amount = combat.playerCombatant.dealDamage(
                choice, this.getDamage(combat.playerCombatant, tier), this.info.type
            )
        }else if(this.info.target === 'self'){
            // TODO: this
        }else if(this.info.target === 'allEnemies'){
            // TODO: this
        }
        return {}
    }

    private getDamage(player: PlayerCombatant, tier: number): number {
        let val = this.info.value(tier)
        const scaling = this.info.scaling
        if(scaling){
            Object.keys(scaling).forEach((statName: keyof DemonStats) => {
                const scalingFunc = scaling[statName]
                if(scalingFunc){
                    val += scalingFunc(tier) * player.stats[statName]
                }
            })
        }
        return val
    }
}

export { DamageInfo, DamageAction }