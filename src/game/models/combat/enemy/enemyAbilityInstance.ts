import { EnemyAbility } from '../../enemies/abilities/enemyAbility'
import { AbilityInstance } from '../abilityInstance'
import { Combat } from '../combat'
import { EnemyCombatant } from './enemyCombatant'

class EnemyAbilityInstance extends AbilityInstance<EnemyAbility> {

    private _timeLeft: number

    constructor(ability: EnemyAbility, readonly owner: EnemyCombatant){
        super(ability)
        this._timeLeft = ability.time
    }

    get combat(): Combat {
        return this.owner.combat
    }

    set timeLeft(value: number){
        this._timeLeft += value
        this._timeLeft = Math.max(0, this._timeLeft)
    }

    get timeLeft(): number{
        return this._timeLeft
    }

    get ready(): boolean {
        return this.timeLeft === 0
    }
}

export { EnemyAbilityInstance }