import * as enemies from '../data/enemies.json'

interface EnemyDefinition {
    name: string,
    health: number
}

export default class Enemy {

    static createFromID(enemyID: string): Enemy {
        return new Enemy(enemies[enemyID as keyof typeof enemies])
    }

    constructor(enemyDef: EnemyDefinition){

    }
}