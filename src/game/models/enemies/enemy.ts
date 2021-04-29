import { DamageType } from '../combat/damage'
import { EnemyAbility, EnemyAbilityDefinition } from './EnemyAbility'
import * as EnemyDefinitions from './definitionLoader'

interface Armor {
    type: DamageType,
    value: number
}

interface EnemyDefinition {
    name: string,
    health: number,
    armor?: Armor,
    abilities: EnemyAbilityDefinition[]
}

class Enemy {

    static loadFromId(id: string): Enemy {
        const def = EnemyDefinitions[id as keyof typeof EnemyDefinitions]
        return new Enemy(def)
    }

    name: string
    health: number
    abilities: EnemyAbility[]
    armor?: Armor

    constructor(enemyDef: EnemyDefinition){
        this.name = enemyDef.name
        this.health = enemyDef.health
        this.armor = enemyDef.armor
        this.abilities = enemyDef.abilities.map(abilityDef => new Ability(abilityDef))
    }
}

export { EnemyDefinition, Enemy, Armor }