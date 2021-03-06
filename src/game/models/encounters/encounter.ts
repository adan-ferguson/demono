import { EnemyCombatant, EnemyOptions } from '../combat/enemy/enemyCombatant'
import { Enemy } from '../enemies/enemy'
import * as EncounterDefinitions from './definitionLoader'
import * as EnemyDefinitions from '../enemies/definitionLoader'
import { Combat } from '../combat/combat'

interface EncounterDefinition {
    enemies: {
        id: keyof typeof EnemyDefinitions,
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

    createEnemyCombatants(combat: Combat): EnemyCombatant[] {
        return this.encounterDefinition.enemies.map(enemyData => {
            return new EnemyCombatant(Enemy.loadFromId(enemyData.id), combat, enemyData.options)
        })
    }
}

export { Encounter, EncounterDefinition }