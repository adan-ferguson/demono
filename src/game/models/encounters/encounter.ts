import { EnemyCombatant, EnemyOptions } from '../combat/enemy/enemyCombatant'
import { Enemy } from '../enemies/enemy'
import { Combat } from '../combat/combat'
import { EnemyID } from 'game/data/enemies/definitionLoader'
import { EncounterDefinitions, EncounterID } from 'game/data/encounters/definitionLoader'

interface EncounterDefinition {
    enemies: {
        id: EnemyID,
        options?: EnemyOptions
    }[],
    level: number
}

class Encounter {

    enemies: {
        id: EnemyID;
        options?: EnemyOptions | undefined
    }[]
    level: number

    static loadFromId(id: EncounterID): Encounter {
        return new Encounter(EncounterDefinitions.getDefinition(id))
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