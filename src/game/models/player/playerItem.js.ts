import { v4 as uuid } from 'uuid'

interface PlayerItemDef {
    id: string,
    name: string
}

class PlayerItem {

    readonly id: string = uuid()
    readonly name: string;

    constructor(def: PlayerItemDef){
        if(def){
            this.id = def.id
            this.name = def.name
        }
    }

    serialize(): PlayerItemDef {
        return {
            id: this.id,
            name: this.name
        }
    }
}

export { PlayerItem, PlayerItemDef }