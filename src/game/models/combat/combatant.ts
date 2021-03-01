/**
 * A Combatant is someone who is participating in a Combat and can
 * take damage, be healed, get buffed, etc.
 * (either the player or an enemy)
 */
abstract class Combatant {

    private _health: number
    private _maxHealth: number

    constructor(startingHealth: number){
        this._health = startingHealth
        this._maxHealth = startingHealth
    }

    abstract get name(): string

    get health(): number {
        return this._health
    }

    get maxHealth(): number {
        return this._maxHealth
    }

    dealDamage(target: Combatant, amount: number, type: 'phys' | 'magic'): number {

    }
}

export { Combatant }