import { Encounter, EncounterDefinition } from './encounter'
import { DataCollection } from 'game/data/dataCollection'
import { EncounterDefinitions, EncounterID } from 'game/data/encounters/definitionLoader'
import { Player } from '../player/player'

interface EncounterCategoryInfo {
    id: string,
    name: string,
    encounters: Encounter[],
    subcategories?: EncounterCategoryInfo[]
}

class EncounterManager {

    getCategories(): string[] {
        return Object.keys(EncounterDefinitions.byCategory.categories)
    }

    getCategoryInfo(categoryName: string): EncounterCategoryInfo {
        const a = EncounterDefinitions.byCategory.categories[categoryName]
    }
}

export { EncounterManager }