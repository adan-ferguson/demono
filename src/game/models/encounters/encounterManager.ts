import { Encounter } from './encounter'
import * as EncounterCategories from 'game/data/encounters/definitionLoader'

class EncounterManager {

    readonly encounters: Record<keyof typeof EncounterDefinitions, Encounter> = {}

    constructor(){
        // load and organize all the encounters
    }

    applyFlags(flags: PlayerFlags): void {

    }

    getCategories(): (typeof EncounterCategories)[] {
        return []
    }
}

export { EncounterManager }