import { DemonAffinityDefinition } from 'game/models/demons/affinity'
import { StatType } from 'game/models/stats'

const fire: DemonAffinityDefinition = {
    name: 'Fire',
    baseStats: {
        [StatType.Strength]: 5,
        [StatType.Magic]: 5,
        [StatType.Armor]: 5,
        [StatType.Speed]: 5
    }
}

export { fire }