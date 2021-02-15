import { EnemyAbility, EnemyAbilityDefinition } from './abilities/enemyAbility'
import * as EnemyDefinitions from './definitionLoader'

interface EnemyDefinition {
    name: string,
    health: number,
    magicDefense?: number,
    physDefense?: number,
    abilities: EnemyAbilityDefinition[]
}

class Enemy {

    static loadFromId(id: string): Enemy {
        const def = EnemyDefinitions[id as keyof typeof EnemyDefinitions]
        return new Enemy(def)
    }

    name: string
    health: number
    magicDefense: number
    physDefense: number
    abilities: EnemyAbility[]

    constructor(enemyDef: EnemyDefinition){
        this.name = enemyDef.name
        this.health = enemyDef.health
        this.magicDefense = enemyDef.magicDefense || 0
        this.physDefense = enemyDef.physDefense || 0
        this.abilities = enemyDef.abilities.map(abilityDef => new EnemyAbility(abilityDef))
    }

    applyTurnOffset(turnOffset: number): void {
        this.abilities.forEach(ability => ability.timeLeft += turnOffset)
    }
}

export { EnemyDefinition, Enemy }