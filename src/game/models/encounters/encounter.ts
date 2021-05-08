import { EnemyCombatant, EnemyOptions } from '../combat/enemy/enemyCombatant'
import { Enemy } from '../enemies/enemy'
import * as EncounterDefinitions from 'game/data/encounters/definitionLoader'
import * as EnemyDefinitions from 'game/data/enemies/definitionLoader'
import { Combat } from '../combat/combat'

interface EncounterDefinition {
    categories?: string,
    enemies: {
        id: keyof typeof EnemyDefinitions,
        options?: EnemyOptions
    }[],
    level: number
}

class Encounter {

    enemies: {
        id: keyof typeof EnemyDefinitions;
        options?: EnemyOptions | undefined
    }[]
    level: number

    static loadFromId(id: string): Encounter {
        const def = EncounterDefinitions[id as keyof typeof EncounterDefinitions]
        return new Encounter(def)
    }

    constructor(encounterDefinition: EncounterDefinition){
        this.enemies = encounterDefinition.enemies
        this.level = encounterDefinition.level
    }

    createEnemyCombatants(combat: Combat): EnemyCombatant[] {
        return this.enemies.map(enemyData => {
            return new EnemyCombatant(Enemy.loadFromId(enemyData.id), combat, enemyData.options)
        })
    }
}

export { Encounter, EncounterDefinition }