import { Combatant } from './combatant'
import { Enemy } from '../enemies/enemy'

interface EnemyOptions {
    turnOffset?: number
}

class EnemyCombatant extends Combatant {

    public enemy: Enemy

    constructor(enemy: Enemy, options: EnemyOptions = {}){
        super(enemy.health)
        this.enemy = enemy

        if(options.turnOffset){
            this.enemy.applyTurnOffset(options.turnOffset)
        }
    }

    public get name(): string {
        return this.enemy.name
    }

    get magicDef(): number {
        return this.enemy.armor.type === 'magic' ? this.enemy.armor.value : 0
    }

    get physDef(): number {
        return this.enemy.armor.type === 'phys' ? this.enemy.armor.value : 0
    }
}

export { EnemyCombatant, EnemyOptions }