import { DemonAugment, DemonAugmentDef } from '../demons/demonAugment'
import { PlayerItem, PlayerItemDef } from './playerItem.js'
import { DemonClassType } from 'game/models/demons/class'
import { DemonAffinityType } from 'game/models/demons/affinity'

interface PlayerInventoryDef {
    playerItems: PlayerItemDef[]
    demonAugments: DemonAugmentDef[]
    demonAffinities: DemonAffinityType[]
    demonClasses: DemonClassType[]
}

class PlayerInventory {

    readonly playerItems: PlayerItem[]
    readonly demonAugments: DemonAugment[]
    readonly demonAffinities: DemonAffinityType[]
    readonly demonClasses: DemonClassType[]

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

    static newPlayerInventoryDef(): PlayerInventoryDef {
        return {
            playerItems: [],
            demonAugments: [{
                name: 'Razor Claws',
                abilities: ['slash'],
                class: {
                    type: 'brawler',
                    requires: 1
                }
            }, {
                name: 'Fire Jewel',
                abilities: ['sear'],
                affinity: {
                    type: 'fire',
                    requires: 1
                }
            }],
            demonClasses: ['brawler'],
            demonAffinities: ['fire']
        }
    }
}

export { PlayerInventory, PlayerInventoryDef }