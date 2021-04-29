import { EnemyAbility } from '../../enemies/enemyAbility'
import { AbilityInstance } from '../abilityInstance'
import { Combat } from '../combat'
import { Result } from '../result'
import { EnemyCombatant } from './enemyCombatant'

class EnemyAbilityTickResult extends Result {
    readonly timeLeft: number
    constructor(readonly abilityInstance: EnemyAbilityInstance){
        super()
        this.timeLeft = abilityInstance.timeLeft
    }
}

class EnemyAbilityActivateResult extends Result {
    constructor(
        readonly abilityInstance: EnemyAbilityInstance,
        readonly timeLeftAfter = abilityInstance.timeLeft){
        super()
    }
}

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
        this._timeLeft = value
        this._timeLeft = Math.max(0, this._timeLeft)
    }

    get timeLeft(): number{
        return this._timeLeft
    }

    get ready(): boolean {
        return this.timeLeft === 0
    }
}

export { EnemyAbilityInstance, EnemyAbilityTickResult, EnemyAbilityActivateResult }