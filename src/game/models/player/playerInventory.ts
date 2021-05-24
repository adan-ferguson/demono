import { DemonAugment, DemonAugmentDef } from '../demons/demonAugment'
import { PlayerItem, PlayerItemDef } from './playerItem.js'
import { DemonAffinityID } from 'game/data/affinities/definitionLoader'
import { DemonClassID } from 'game/data/classes/definitionLoader'

interface PlayerInventoryDef {
    playerItems: PlayerItemDef[]
    demonAugments: DemonAugmentDef[]
    demonAffinities: DemonAffinityID[]
    demonClasses: DemonClassID[]
}

class PlayerInventory {

    readonly playerItems: PlayerItem[]
    readonly demonAugments: DemonAugment[]
    readonly demonAffinities: DemonAffinityID[]
    readonly demonClasses: DemonClassID[]

    constructor(def: PlayerInventoryDef){
        this.playerItems = def.playerItems.map(itemDef => new PlayerItem(itemDef))
        this.demonAugments = def.demonAugments.map(equipDef => new DemonAugment(equipDef))
        this.demonAffinities = def.demonAffinities.slice()
        this.demonClasses = def.demonClasses.slice()
    }


    getPlayerItemById(id: string): PlayerItem | undefined {
        return this.playerItems.find(item => item.id === id)
    }

    getDemonAugmentById(id: string): DemonAugment | undefined {
        return this.demonAugments.find(augment => augment.id === id)
    }

    serialize(): PlayerInventoryDef {
        return {
            playerItems: this.playerItems.map(item => item.serialize()),
            demonAugments: this.demonAugments.map(augment => augment.serialize()),
            demonAffinities: this.demonAffinities.slice(),
            demonClasses: this.demonClasses.slice()
        }
    }
}

export { PlayerInventory, PlayerInventoryDef }