import { DemonClassDefinition } from 'game/models/demons/class'
import { StatType } from 'game/models/stats'

const brawler: DemonClassDefinition = {
    id: 'brawler',
    name: 'Brawler',
    baseStats: {
        [StatType.Strength]: 10,
        [StatType.Magic]: 10,
        [StatType.Armor]: 10,
        [StatType.Speed]: 10
    }
}

export { brawler }