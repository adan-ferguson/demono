import { EncounterFlags } from '../encounters/encounterFlags'

interface PlayerFlags {
    tutorialComplete: boolean,
    encounters: EncounterFlags[]
}

export { PlayerFlags }