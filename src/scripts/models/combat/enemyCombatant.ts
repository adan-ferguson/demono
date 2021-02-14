import { Combatant } from './combatant'
import { Enemy } from '../enemy'

class EnemyCombatant extends Combatant {

    public enemy: Enemy

    constructor(enemy: Enemy){
        super()
        this.enemy = enemy
    }

    public get startingHealth(): number {
        return this.enemy.health
    }

    public get name(): string {
        return this.enemy.name
    }
}

export { EnemyCombatant }