import { DemonLoadout, DemonLoadoutDef } from '../demons/demonLoadout'
import { PlayerLoadout, PlayerLoadoutDef } from './playerLoadout'
import { DemonEquipment } from 'game/models/demons/demonEquipment'
import { PlayerInventory, PlayerInventoryDef } from 'game/models/player/playerInventory'
import { PlayerItem } from './playerItem.js'

interface SerializedPlayer {
    name: string,
    experience: number,
    playerLoadouts: PlayerLoadoutDef[]
    demonLoadouts: DemonLoadoutDef[],
    playerInventory: PlayerInventoryDef
}

class Player {

    experience: number
    demonLoadouts: DemonLoadout[]
    playerLoadouts: PlayerLoadout[]
    inventory: PlayerInventory
    name: string

    constructor(def ?: SerializedPlayer){
        if(def){
            this.deserialize(def)
        }
    }

    get startingHealth(): number {
        return 1000
    }

    get level(): number {
        return expToLevel(this.experience)
    }

    serialize(): SerializedPlayer {
        return {
            name: this.name,
            experience: this.experience,
            demonLoadouts: this.demonLoadouts.map(loadout => loadout.serialize()),
            playerLoadouts: this.playerLoadouts.map(loadout => loadout.serialize()),
            playerInventory: this.inventory.serialize()
        }
    }

    deserialize(serialized: SerializedPlayer): void {
        this.name = serialized.name
        this.experience = serialized.experience
        this.inventory = new PlayerInventory(serialized.playerInventory)
        this.demonLoadouts = serialized.demonLoadouts.map(loadoutDef => new DemonLoadout(this, loadoutDef))
        this.playerLoadouts = serialized.playerLoadouts.map(squadDef => new PlayerLoadout(this, squadDef))
    }

    isNew(): boolean {
        return this.name ? false : true
    }

    getDemonLoadoutByID(id: string): DemonLoadout {
        const loadout = this.demonLoadouts.find(loadout => loadout.id === id)
        if(!loadout){
            throw 'Undefined demon loadout, id: ' + id
        }
        return loadout
    }

    getEquipmentById(id: string): DemonEquipment {
        const equipment = this.inventory.getDemonEquipmentById(id)
        if(!equipment){
            throw 'Undefined demon equipment, id: ' + id
        }
        return equipment
    }

    getPlayerItemById(id: string): PlayerItem {
        const item = this.inventory.getPlayerItemById(id)
        if(!item){
            throw 'Undefined player item, id: ' + id
        }
        return item
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