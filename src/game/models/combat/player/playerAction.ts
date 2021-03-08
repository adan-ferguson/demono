import { Choice } from '../choice'
import { Combatant } from '../combatant'
import { Result } from '../result'
import { PlayerCombatant } from './playerCombatant'
import { EnemyCombatant } from '../enemy/enemyCombatant'

enum PlayerActionSubject {
    Self,
    Enemy,
    Enemies,
    Everyone,
    Anyone
}

abstract class PlayerActionDefinition {
    constructor(readonly subject: PlayerActionSubject){}
}

abstract class PlayerAction {

    constructor(readonly actionDef: PlayerActionDefinition){}
    abstract perform(player: PlayerCombatant, choice?: Choice): Result[]

    protected getTargets(player: PlayerCombatant, choice?: Choice): Combatant[] {

        const subject = this.actionDef.subject
        if(subject === PlayerActionSubject.Enemy){
            if(choice instanceof EnemyCombatant){
                return [choice]
            }
        }else if(subject === PlayerActionSubject.Anyone){
            if(choice instanceof Combatant){
                return [choice]
            }
        }else if(subject === PlayerActionSubject.Enemies){
            return player.combat.enemyCombatants
        }else if(subject === PlayerActionSubject.Everyone){
            return [player, ...player.combat.enemyCombatants]
        }else if(subject === PlayerActionSubject.Self){
            return [player]
        }

        throw 'Failed to get targets, choice was unexpected.'
    }
}

export {
    PlayerAction, PlayerActionDefinition, PlayerActionSubject
}