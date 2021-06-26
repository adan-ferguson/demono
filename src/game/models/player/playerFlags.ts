import { EncounterID } from 'game/data/encounters/definitionLoader'
import { EncounterFlags } from '../encounters/encounterFlags'

interface PlayerFlags {
    tutorialComplete: boolean,
    encounters: Record<EncounterID, EncounterFlags>
}

export { PlayerFlags }