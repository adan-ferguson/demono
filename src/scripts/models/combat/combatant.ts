/**
 * A Combatant is someone who is participating in a Combat and can
 * take damage, be healed, get buffed, etc.
 * (either the player or an enemy)
 */
abstract class Combatant {

    private _health: number
    private _maxHealth: number

    public init(): void {
        this._health = this.startingHealth
        this._maxHealth = this.startingHealth
    }

    public abstract get startingHealth(): number
    public abstract get name(): string

    public get health(): number {
        return this._health
    }

    public get maxHealth(): number {
        return this._maxHealth
    }
}

export { Combatant }