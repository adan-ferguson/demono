import { Demon } from './demon'
import { Player } from './player'

class Squad {

    demons: Demon[]
    player: Player

    constructor(player: Player, demons: Demon[]){
        this.player = player
        this.demons = demons
    }
}

export { Squad }