import { DemonClassDefinition } from 'game/models/demons/class'
import { StatType } from 'game/models/stats'

const brawler: DemonClassDefinition = {
    id: 'brawler',
    name: 'Brawler',
    baseStats: {
        [StatType.Strength]: 5,
        [StatType.Magic]: 5,
        [StatType.Attack]: 5,
        [StatType.Defense]: 5,
        [StatType.Speed]: 5
    }
}

export { brawler }