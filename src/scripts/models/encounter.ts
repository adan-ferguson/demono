import { Enemy, EnemyOptions } from './enemy'

interface EncounterEnemyDefinition {
    id: string,
    options?: EnemyOptions
}

interface EncounterDefinition {
    enemies: EncounterEnemyDefinition[]
}

class Encounter {

    public static createFromData(def: EncounterDefinition): Encounter {
        const enemies: Enemy[] = []
        def.enemies.forEach(enemyData => {
            const enemyDefinition = Enemy.loadDefinitionFromID(enemyData.id)
            enemies.push(new Enemy(enemyDefinition, enemyData.options))
        })
        return new Encounter(enemies)
    }

    public enemies: Enemy[]

    constructor(enemies: Enemy[]){
        this.enemies = enemies
    }
}

export { Encounter, EncounterDefinition, EncounterEnemyDefinition }