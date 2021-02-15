import { Combatant } from './combatant'
import { Enemy } from '../enemies/enemy'

interface EnemyOptions {
    turnOffset ?: number
}

class EnemyCombatant extends Combatant {

    public enemy: Enemy

    constructor(enemy: Enemy, options: EnemyOptions){
        super()
        this.enemy = enemy

        if(options.turnOffset){
            this.enemy.applyTurnOffset(options.turnOffset)
        }
    }

    public get startingHealth(): number {
        return this.enemy.health
    }

    public get name(): string {
        return this.enemy.name
    }

    get magicDefense(): number {
        return this.enemy.magicDefense
    }

    get physDefense(): number {
        return this.enemy.physDefense
    }
}

export { EnemyCombatant, EnemyOptions }