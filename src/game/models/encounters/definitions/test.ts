import { EncounterDefinition } from '../encounter'

const test: EncounterDefinition = {
    level: 1,
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

export { test }