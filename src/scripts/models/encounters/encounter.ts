import { EnemyCombatant, EnemyOptions } from '../combat/enemyCombatant'
import { Enemy } from '../enemies/enemy'
import * as EncounterDefinitions from './definitionLoader'

interface EncounterDefinition {
    enemies: {
        id: string,
        options?: EnemyOptions
    }[]
}

class Encounter {

    static loadFromId(id: string): Encounter {
        const def = EncounterDefinitions[id as keyof typeof EncounterDefinitions]
        return new Encounter(def)
    }

    private encounterDefinition: EncounterDefinition

    constructor(encounterDefinition: EncounterDefinition){
        this.encounterDefinition = encounterDefinition
    }

    createEnemyCombatants(): EnemyCombatant[] {
        return this.encounterDefinition.enemies.map(enemyData => {
            return new EnemyCombatant(Enemy.loadFromId(enemyData.id), enemyData.options)
        })
    }
}

export { Encounter, EncounterDefinition }