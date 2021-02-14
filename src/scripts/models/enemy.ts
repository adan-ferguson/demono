import * as enemies from '../../data/enemies.json'

interface EnemyDefinition {
    name: string,
    health: number
}

interface EnemyOptions {
    turnOffset ?: number
}

class Enemy {

    static loadDefinitionFromID(id: string): EnemyDefinition {
        return enemies[id as keyof typeof enemies]
    }

    name: string
    health: number
    options: EnemyOptions

    constructor(enemyDef: EnemyDefinition, options: EnemyOptions = {}){
        this.name = enemyDef.name
        this.health = enemyDef.health
        this.options = Object.assign({
            turnOffset: 0
        }, options)
    }
}

export { EnemyDefinition, Enemy, EnemyOptions }