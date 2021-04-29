import { DemonEquipment, DemonEquipmentDef } from '../demons/demonEquipment'
import { PlayerItem, PlayerItemDef } from './playerItem.js'

interface PlayerInventoryDef {
    playerItems: PlayerItemDef[]
    demonEquipments: DemonEquipmentDef[]
}

class PlayerInventory {

    readonly playerItems: PlayerItem[] = []
    readonly demonEquipments: DemonEquipment[] = []

    constructor(def: PlayerInventoryDef){
        this.playerItems = def.playerItems.map(itemDef => new PlayerItem(itemDef))
        this.demonEquipments = def.demonEquipments.map(equipDef => new DemonEquipment(equipDef))
    }

    getPlayerItemById(id: string): PlayerItem | undefined {
        return this.playerItems.find(item => item.id === id)
    }

    getDemonEquipmentById(id: string): DemonEquipment | undefined {
        return this.demonEquipments.find(equipment => equipment.id === id)
    }

    serialize(): PlayerInventoryDef {
        return {
            playerItems: this.playerItems.map(item => item.serialize()),
            demonEquipments: this.demonEquipments.map(equipment => equipment.serialize())
        }
    }
}

export { PlayerInventory, PlayerInventoryDef }