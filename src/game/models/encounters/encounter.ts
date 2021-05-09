import { EnemyCombatant, EnemyOptions } from '../combat/enemy/enemyCombatant'
import { Enemy } from '../enemies/enemy'
import { IDs as EncounterID } from 'game/data/encounters/definitionLoader'
import { IDs as EnemyID } from 'game/data/enemies/definitionLoader'
import { Combat } from '../combat/combat'
import { DataDefinition } from '../../data/dataDefinition'

interface EncounterDefinition extends DataDefinition {
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