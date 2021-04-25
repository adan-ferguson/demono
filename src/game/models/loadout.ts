import { Demon } from './demons/demon'
import { Player } from './player'

interface DemonSquadDef {
    demonLoadoutIDs: string[],
    itemIDs: string[]
}

class Loadout {

    readonly demonLoadouts: Demon[]
    readonly items: Item[]

    constructor(dsd: DemonSquadDef, player: Player){
        this.demonLoadouts = dsd.demonLoadoutIDs.map(id => player.getDemonLoadoutByID(id))
        this.items = dsd.itemIDs.map(id => player.getItemByID(id))
    }

    serialize(): DemonSquadDef {

    }

    isValid(): boolean {
        // TODO: check if loadouts are valid for player
        // TODO: check is items are valid for player
    }
}

export { Loadout, DemonSquadDef }