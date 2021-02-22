import { EncounterDefinition } from '../encounter'

const test: EncounterDefinition = {
    enemies: [
        {
            id: 'bat'
        },
        {
            id: 'cat',
            options: {
                turnOffset: -1
            }
        },
        {
            id: 'dat',
            options: {
                turnOffset: -2
            }
        }
    ]
}

export { test }