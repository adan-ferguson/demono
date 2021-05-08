import * as EncounterDefinitions from 'game/data/encounters/definitionLoader'

interface EncounterFlags {
    id: keyof typeof EncounterDefinitions,
    completed: boolean
}

export { EncounterFlags }