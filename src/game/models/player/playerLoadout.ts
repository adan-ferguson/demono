import { DemonLoadout } from '../demons/demonLoadout'
import { Player } from './player'
import { PlayerItem } from './playerItem.js'

interface PlayerLoadoutDef {
    id: string,
    demonLoadoutIDs: string[],
    itemIDs: string[]
}

class PlayerLoadout {

    readonly id: string
    readonly demonLoadouts: DemonLoadout[]
    readonly playerItems: PlayerItem[]

    constructor(player: Player, def: PlayerLoadoutDef){
        this.id = def.id
        this.demonLoadouts = def.demonLoadoutIDs.map(id => player.getDemonLoadoutByID(id))
            .filter((i): i is DemonLoadout => {
                return i ? true : false
            })
        this.playerItems = def.itemIDs.map(id => player.getPlayerItemById(id))
            .filter((i): i is PlayerItem => {
                return i ? true : false
            })
    }

    serialize(): PlayerLoadoutDef {
        return {
            id: this.id,
            demonLoadoutIDs: this.demonLoadouts.map(loadout => loadout.id),
            itemIDs: this.playerItems.map(item => item.id)
        }
    }

    isValid(): boolean {
        // TODO: check if loadouts are valid for player
        // TODO: check is items are valid for player
        return false
    }
}

export { PlayerLoadout, PlayerLoadoutDef }