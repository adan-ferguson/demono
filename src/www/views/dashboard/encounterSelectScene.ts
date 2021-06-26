import { EncounterManager } from 'game/models/encounters/encounterManager'
import { Player } from 'game/models/player/player'
import { Scene } from '../scene'

class EncounterSelectScene extends Scene {
    encounterManager: EncounterManager
    constructor(readonly player: Player){
        super('encounter-select-scene')
        this.encounterManager = new EncounterManager(player)
    }

    begin(): void{

    }
}

export { EncounterSelectScene }