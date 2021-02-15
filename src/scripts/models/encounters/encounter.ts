import { EnemyCombatant, EnemyOptions } from '../combat/enemyCombatant'
import { Enemy } from '../enemies/enemy'

interface EncounterDefinition {
    enemies: {
        id: string,
        options?: EnemyOptions
    }[]
}

class Encounter {

    public enemies: EnemyCombatant[]

    constructor(def: EncounterDefinition){
        this.enemies = def.enemies.map(enemyData => {
            const enemyDefinition = Enemy.loadDefinitionFromID(enemyData.id)
            const enemy = new Enemy(enemyDefinition)
            return new EnemyCombatant(enemy, enemyData.options)
        })
    }
}

export { Encounter, EncounterDefinition }