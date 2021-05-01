import { Player } from 'game/models/player/player'
import { Scene } from '../scene'

class LoadoutScene extends Scene {
    constructor(readonly player: Player) {
        super('loadout-scene')
    }

    begin(): void {

    }
}

export { LoadoutScene }