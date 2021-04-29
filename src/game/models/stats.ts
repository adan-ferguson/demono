enum StatTypes {
    Strength = 'Strength',
    Magic = 'Magic',
    Armor = 'Armor',
    Speed = 'Speed',
    ShieldPower = 'Shield Power'
}

interface SimpleStats {
    [StatTypes.Strength]: number,
    [StatTypes.Magic]: number,
    [StatTypes.Armor]: number,
    [StatTypes.Speed]: number
}

type ExtendedStats =  {
    [keys in StatTypes]: number
}

type StatModifiers = {
    [keys in StatTypes]?: number
}

class FullStats {

    readonly statsList: ExtendedStats

    constructor(modifiers: StatModifiers = {}){
        const defaults : StatModifiers = {}
        for(const t in StatTypes){
            defaults[t as keyof StatModifiers] = 0
        }
        this.statsList = Object.assign(defaults, modifiers) as ExtendedStats
    }

    set(key: StatTypes, value: number): void {
        this.statsList[key] = value
    }

    get(key: StatTypes): number {
        return this.statsList[key]
    }
}

export { StatTypes, SimpleStats, ExtendedStats, StatModifiers, FullStats }