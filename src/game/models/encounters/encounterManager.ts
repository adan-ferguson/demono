import { Encounter, EncounterDefinition } from './encounter'
import { DataCollection } from 'game/data/dataCollection'
import { EncounterDefinitions, EncounterID } from 'game/data/encounters/definitionLoader'

class EncounterManager {
    dataCollection: DataCollection<EncounterDefinition, EncounterID>

    constructor(){
        // load and organize all the encounters
        this.dataCollection = new DataCollection(EncounterDefinitions)
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