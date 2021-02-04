import Enemy from './enemy'

interface EncounterDefinition {
    enemies: string[]
}

export default class Encounter {

    static createFromData(def: EncounterDefinition): Encounter{
        const enemies: Enemy[] = []
        def.enemies.forEach(enemyID => {
            enemies.push(Enemy.createFromID(enemyID))
        })
        return new Encounter(enemies)
    }

    public enemies: Enemy[]

    constructor(enemies: Enemy[]){
        this.enemies = enemies
    }
}
