enum StatType {
    Strength = 'Strength',
    Magic = 'Magic',
    Armor = 'Armor',
    Speed = 'Speed',
    ShieldPower = 'Shield Power'
}

interface SimpleStats {
    [StatType.Strength]: number,
    [StatType.Magic]: number,
    [StatType.Armor]: number,
    [StatType.Speed]: number
}

type ExtendedStats =  {
    [keys in StatType]: number
}

type StatModifiers = {
    [keys in StatType]?: number
}

class FullStats {

    readonly statsList: ExtendedStats

    constructor(modifiers: StatModifiers = {}){
        const defaults : StatModifiers = {}
        for(const t in StatType){
            defaults[t as keyof StatModifiers] = 0
        }
        this.statsList = Object.assign(defaults, modifiers) as ExtendedStats
    }

    set(key: StatType, value: number): void {
        this.statsList[key] = value
    }

    get(key: StatType): number {
        return this.statsList[key]
    }
}

export { StatType, SimpleStats, ExtendedStats, StatModifiers, FullStats }