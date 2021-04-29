import { DemonAffinityDefinition } from 'game/models/demons/affinity'
import { StatType } from 'game/models/stats'

const fire: DemonAffinityDefinition = {
    id: 'fire',
    name: 'Fire',
    baseStats: {
        [StatType.Strength]: 10,
        [StatType.Magic]: 10,
        [StatType.Armor]: 10,
        [StatType.Speed]: 10
    }
}

export { fire }