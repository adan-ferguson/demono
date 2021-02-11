import { Combatant } from './combatant'
import { Enemy } from '../enemy'

class EnemyCombatant extends Combatant {
    enemy: Enemy

    constructor(enemy: Enemy){
        super()
        this.enemy = enemy
    }
}

export { EnemyCombatant }