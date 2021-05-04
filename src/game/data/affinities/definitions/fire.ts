import { DemonAffinityDefinition } from 'game/models/demons/affinity'
import { StatType } from 'game/models/stats'

const fire: DemonAffinityDefinition = {
    id: 'fire',
    name: 'Fire',
    baseStats: {
        [StatType.Strength]: 5,
        [StatType.Magic]: 5,
        [StatType.Attack]: 5,
        [StatType.Defense]: 5,
        [StatType.Speed]: 5
    }
}

export { fire }