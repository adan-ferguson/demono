interface EnemyAbilityDefinition {
    name: string,
    time: number,
    description: string,
    damage?: DamageData
}

interface DamageData {
    type: 'phys' | 'magic' | 'mixed',
    power: number
}

class EnemyAbility {

    name: string
    timeLeft: number
    time: number
    description: string
    damage: DamageData

    constructor(def: EnemyAbilityDefinition){
        this.name = def.name
        this.timeLeft = def.time
        this.time = def.time
        this.description = def.description
        this.damage = def.damage
    }

    applyTurnOffset(offset: number): void {
        this.timeLeft = Math.max(0, this.timeLeft + offset)
    }
}

export { EnemyAbility, EnemyAbilityDefinition }