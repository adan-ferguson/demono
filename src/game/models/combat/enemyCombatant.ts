import { Combatant } from './combatant'
import { Enemy } from '../enemies/enemy'

interface EnemyOptions {
    turnOffset ?: number
}

class EnemyCombatant extends Combatant {

    public enemy: Enemy

    constructor(enemy: Enemy, options: EnemyOptions = {}){
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

    get magicDef(): number {
        return this.enemy.magicDef
    }

    get physDef(): number {
        return this.enemy.physDef
    }
}

export { EnemyCombatant, EnemyOptions }