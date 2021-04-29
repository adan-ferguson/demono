import { DemonLoadout } from '../demons/demonLoadout'
import { Player } from './player'
import { PlayerItem } from './playerItem.js'

interface PlayerLoadoutDef {
    demonLoadoutIDs: string[],
    itemIDs: string[]
}

class PlayerLoadout {

    readonly demonLoadouts: DemonLoadout[]
    readonly playerItems: PlayerItem[]

    constructor(player: Player, def: PlayerLoadoutDef){
        this.demonLoadouts = def.demonLoadoutIDs.map(id => player.getDemonLoadoutByID(id))
        this.playerItems = def.itemIDs.map(id => player.getPlayerItemById(id))
    }

    serialize(): PlayerLoadoutDef {
        return {
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