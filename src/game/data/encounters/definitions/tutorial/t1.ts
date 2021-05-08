import { EncounterDefinition } from 'game/models/encounters/encounter'

const t1: EncounterDefinition = {
    level: 0,
    enemies: [
        {
            id: 'dat',
            options: {
                turnOffset: -2
            }
        },
        {
            id: 'bat'
        },
        {
            id: 'cat',
            options: {
                turnOffset: -1
            }
        },
    ]
}

export { t1 }