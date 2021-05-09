import { Encounter, EncounterDefinition } from './encounter'
import { defs } from 'game/data/encounters/definitionLoader'
import { DataCollection } from 'game/data/dataCollection'

class EncounterManager {

    dataCollection: DataCollection<EncounterDefinition>

    constructor(){
        // load and organize all the encounters
        this.dataCollection = new DataCollection(defs)
    }

    // applyFlags(flags: PlayerFlags): void {
    //
    // }
    //
    // getCategories(): string[] {
    //     return []
    // }
}

export { EncounterManager }