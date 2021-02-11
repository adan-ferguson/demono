import { Encounter } from './encounter'
import { Squad } from './squad'
import { EnemyCombatant } from './combat/enemyCombatant'
import { Enemy } from './enemy'
import { Demon } from './demon'
import { DemonInstance } from './combat/demonInstance'

class Combat {

    enemyCombatants: EnemyCombatant[]
    demonInstances: DemonInstance[]

    constructor(encounter: Encounter, squad: Squad){
        this.enemyCombatants = encounter.enemies.map((enemy: Enemy) => new EnemyCombatant(enemy))
        this.demonInstances = squad.demons.map((demon: Demon) => new DemonInstance(demon))
    }
}

export { Combat }