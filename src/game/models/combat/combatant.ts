/**
 * A Combatant is someone who is participating in a Combat and can
 * take damage, be healed, get buffed, etc.
 * (either the player or an enemy)
 */
abstract class Combatant {

    private _health: number
    private _maxHealth: number

    init(): void {
        this._health = this.startingHealth
        this._maxHealth = this.startingHealth
    }

    abstract get startingHealth(): number
    abstract get name(): string
    abstract get physDef(): number
    abstract get magicDef(): number

    get health(): number {
        return this._health
    }

    get maxHealth(): number {
        return this._maxHealth
    }
}

export { Combatant }