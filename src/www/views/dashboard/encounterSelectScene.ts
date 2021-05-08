import { Player } from 'game/models/player/player'
import { Scene } from '../scene'

class EncounterSelectScene extends Scene {
    constructor(readonly player: Player){
        super('encounter-select-scene')
    }

    begin(): void{
        
    }
}

export { EncounterSelectScene }