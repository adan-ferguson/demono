import { Demon, SerializedDemon } from './demons/demon'
import { Serializable } from './serializable'

interface SerializedPlayer {
    name: string,
    experience: number,
    demonSquads: SerializedDemonSquad[]
    demonLoadouts: SerializedDemonLoadout[],
    loot: SerializedLoot[],
    inventory: SerializedInventory
}

class Player extends Serializable<SerializedPlayer> {

    experience: number
    demonLoadouts: DemonLoadout[]
    demonSquads: DemonSquad[]
    loot: Loot[]
    name: string
    inventory: Inventory

    get startingHealth(): number {
        return 1000
    }

    serialize(): SerializedPlayer {
        return {
            name: this.name,
            experience: this.experience,
            demonLoadouts: this.demonLoadouts.map(loadout => loadout.serialize()),
            demonSquads: this.demonSquads.map(squad => squad.serialize())
            loot: this.loot.map(loot => loot.serialize()),
            inventory: this.inventory.serialize()
        }
    }

    deserialize(serialized: SerializedPlayer): void {
        this.name = serialized.name
        this.experience = serialized.experience
        this.demonLoadouts = serialized.demonLoadouts.map(loadoutDef => new DemonLoadout(loadoutDef))
        this.demonSquads = serialized.demonSquads.map(squadDef => new DemonSquad(squadDef))
        this.loot = serialized.loot.map(lootDef => new Loot(lootDef))
        this.inventory = new Inventory(serialized.inventory)
    }

    isNew(): boolean {
        return this.name ? false : true
    }
}

const LEVEL_EXP_BASE = 100
const LEVEL_EXP_MULTIPLIER = 1.4
function expToLevel(exp: number): number {
    let baseExp = LEVEL_EXP_BASE
    let baseLevel = 0
    while(baseExp < exp){
        baseExp *= LEVEL_EXP_MULTIPLIER
        baseLevel++
    }
    return baseLevel
}

function expRequiredForLevel(level: number): number {
    let baseExp = LEVEL_EXP_BASE
    let baseLevel = 1
    while (baseLevel < level){
        baseExp *= LEVEL_EXP_MULTIPLIER
        baseLevel++
    }
    return baseExp
}

export { Player }