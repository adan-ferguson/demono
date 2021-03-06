import { Ability } from 'game/models/combat/ability'
import { EnemyAction, EnemyActionDefinition } from 'game/models/combat/enemy/enemyAction'
import { EnemyAttackAction, EnemyAttackDefinition } from '../../combat/enemy/enemyAttack'

interface EnemyAbilityDefinition {
    name: string,
    time: number,
    description: string,
    actions: EnemyActionDefinition[]
}

class EnemyAbility extends Ability {

    readonly name: string
    readonly time: number
    readonly description: string

    constructor(def: EnemyAbilityDefinition){
        super(getActions(def))
        this.name = def.name
        this.time = def.time
        this.description = def.description
    }
}

function getActions(def: EnemyAbilityDefinition): EnemyAction[]{
    return def.actions.map(def => {
        if(def as EnemyAttackDefinition){
            return new EnemyAttackAction(def as EnemyAttackDefinition)
        }
        throw 'Action problem'
    })
}

export { EnemyAbility, EnemyAbilityDefinition }