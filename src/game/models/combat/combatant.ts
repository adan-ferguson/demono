import { Combat } from './combat'
import { DamageInfo, DamageOutcome, DamageType } from './damage'
import { Result } from './result'

class DefeatedResult extends Result {
    constructor(readonly combatant: Combatant){
        super()
    }
}

/**
 * A Combatant is someone who is participating in a Combat and can
 * take damage, be healed, get buffed, etc.
 * (either the player or an enemy)
 */
abstract class Combatant {

    private _health: number
    private _maxHealth: number

    constructor(startingHealth: number, readonly combat: Combat){
        this._health = startingHealth
        this._maxHealth = startingHealth
    }

    abstract get name(): string
    abstract get magicDef(): number
    abstract get physDef(): number

    get health(): number {
        return this._health
    }

    set health(value: number){
        this._health = Math.max(0, Math.min(this.maxHealth, value))
    }

    get maxHealth(): number {
        return this._maxHealth
    }

    dealDamage(target: Combatant, damageInfo: DamageInfo): DamageOutcome {
        return target.takeDamage(damageInfo)
    }

    takeDamage(info: DamageInfo): DamageOutcome {
        const blocked = Math.round(this.block(info))
        const damage = Math.round(info.damage - blocked)
        this.health -= damage
        return {
            damage,
            blocked,
            type: info.type,
            targetRemainingHealth: this.health
        }
    }

    private block(info: DamageInfo): number {

        if(!info.damage){
            return 0
        }

        let armor = 0
        if(info.type === DamageType.Physical){
            armor = this.physDef
        }else if(info.type === DamageType.Magic){
            armor = this.magicDef
        }

        return info.damage * (1 - (info.damage / (armor + info.damage)))
    }
}

export { Combatant, DefeatedResult }