import { Action, ActionDefinition, ActionResult } from './action'
import { Combat } from '../../combat/combat'
import { Choice } from '../../combat/choice'
import { EnemyCombatant } from '../../combat/enemyCombatant'
import { PlayerCombatant } from '../../combat/playerCombatant'
import { DemonStats } from '../demon'
import { DamageOutcome, DamageType } from './damage'
import { Tiered } from './tiered'
import { Combatant } from 'game/models/combat/combatant'

interface AttackDefinition extends ActionDefinition {
    type: 'attack'
    damage: Tiered<number>,
    damageType: DamageType,
    scaling?: {
        [keys in keyof DemonStats]?: Tiered<number>
    }
}

interface AttackResult extends ActionResult {
    damageResult: DamageOutcome,
    source: Combatant,
    target: Combatant
}

class AttackAction extends Action {

    constructor(readonly def: AttackDefinition, tier: number){
        super(tier)
    }

    perform(combat: Combat, choice: Choice): ActionResult[] {

        const result: AttackResult[] = []
        const player = combat.playerCombatant
        const damageInfo = {
            type: this.def.damageType,
            damage: this.getDamage(player, this.tier)
        }

        if(this.def.target === 'enemy' && choice instanceof EnemyCombatant){
            if(choice instanceof EnemyCombatant){
                dealDamage(choice)
            }else{
                throw 'Can not perform damage action due to invalid choice.'
            }
        }else if(this.def.target === 'self'){
            dealDamage(player)
        }else if(this.def.target === 'allEnemies'){
            combat.enemyCombatants.forEach(enemy => {
                dealDamage(enemy)
            })
        }

        return result

        function dealDamage(target: Combatant): void {
            result.push({
                source: player,
                target: target,
                damageResult: player.dealDamage(target, damageInfo)
            })
        }
    }

    private getDamage(player: PlayerCombatant, tier: number): number {
        let val = this.def.damage(tier)
        const scaling = this.def.scaling
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

export { AttackDefinition, AttackResult, AttackAction }
