import { Ability } from 'game/models/combat/ability'

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

class EnemyAbility extends Ability {

    name: string
    time: number
    description: string
    damage?: DamageData

    constructor(def: EnemyAbilityDefinition){
        super(getActions(def))
        this.name = def.name
        this.time = def.time
        this.description = def.description
        this.damage = def.damage
    }
}

function getActions(def: EnemyAbilityDefinition): EnemyAction[]{

}

export { EnemyAbility, EnemyAbilityDefinition }