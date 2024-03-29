import { Combatant } from '../combatant'
import { Enemy } from '../../enemies/enemy'
import {EnemyAbilityActivateResult, EnemyAbilityInstance, EnemyAbilityTickResult } from './enemyAbilityInstance'
import { Combat } from '../combat'
import { DamageType } from '../damage'
import { Result } from '../result'

interface EnemyOptions {
    turnOffset?: number
}

class EnemyBeginTurnResult extends Result {
    constructor(readonly enemy: EnemyCombatant){
        super()
    }
}

class EnemyCombatant extends Combatant {

    public enemy: Enemy
    abilities: EnemyAbilityInstance[]

    constructor(enemy: Enemy, combat: Combat, options: EnemyOptions = {}){
        super(enemy.health, combat)
        this.enemy = enemy
        this.abilities = enemy.abilities.map(ability => {
            const eai = new EnemyAbilityInstance(ability, this)
            eai.timeLeft += options.turnOffset || 0
            return eai
        })
    }

    public get name(): string {
        return this.enemy.name
    }

    get magicDef(): number {
        return this.enemy.armor?.type === DamageType.Magic ? this.enemy.armor.value : 0
    }

    get physDef(): number {
        return this.enemy.armor?.type === DamageType.Physical ? this.enemy.armor.value : 0
    }

    takeTurn(): Result[] {
        const result: Result[] = []
        if(!this.health) {
            return []
        }

        //TODO: tick buffs
        result.push(new EnemyBeginTurnResult(this))
        this.abilities.forEach(ability => {
            if(this.combat.finished){
                return
            }
            ability.timeLeft--
            result.push(new EnemyAbilityTickResult(ability))
            if(ability.ready){
                ability.timeLeft += ability.ability.time
                result.push(new EnemyAbilityActivateResult(ability))
                result.push(...ability.performActions())
            }
        })

        return result
    }
}

export { EnemyCombatant, EnemyOptions, EnemyBeginTurnResult }