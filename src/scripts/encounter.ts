import Enemy from './enemy'

interface EncounterDefinition {
    enemies: string[]
}

class Encounter {

    public static createFromData(def: EncounterDefinition): Encounter {
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

export { Encounter }