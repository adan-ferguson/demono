import * as enemies from '../../../data/enemies.json'
import { EnemyAbility, EnemyAbilityDefinition } from './abilities/enemyAbility'

interface EnemyDefinition {
    name: string,
    health: number,
    magicDefense?: number,
    physDefense?: number,
    abilities: EnemyAbilityDefinition[]
}

class Enemy {

    static loadDefinitionFromID(id: string): EnemyDefinition {
        return enemies[id as keyof typeof enemies]
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