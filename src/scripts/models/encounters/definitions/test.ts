import { EncounterDefinition } from '../encounter'

const test: EncounterDefinition = {
    enemies: [
        {
            id: 'bat'
        },
        {
            id: 'bat',
            options: {
                turnOffset: -1
            }
        },
        {
            id: 'bat',
            options: {
                turnOffset: -2
            }
        }
    ]
}

export { test }