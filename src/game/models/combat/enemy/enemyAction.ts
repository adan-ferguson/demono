import { Choice } from '../choice'
import { Result } from '../results'
import { EnemyCombatant } from './enemyCombatant'
import { Combatant } from '../combatant'

enum EnemyActionSubject {
    Self,
    Player,
    Enemy,
    Enemies,
    Everyone,
    Anyone
}

interface EnemyActionDefinition {
    subject: EnemyActionSubject
}

abstract class EnemyAction {

    constructor(readonly actionDef: EnemyActionDefinition){}
    abstract perform(source: EnemyCombatant, choice?: Choice): Result[]

    protected getTargets(enemy: EnemyCombatant, choice?: Choice): Combatant[] {

        const subject = this.actionDef.subject
        if(subject === EnemyActionSubject.Enemy){
            if(choice instanceof EnemyCombatant){
                return [choice]
            }
        }else if(subject === EnemyActionSubject.Anyone){
            if(choice instanceof Combatant){
                return [choice]
            }
        }else if(subject === EnemyActionSubject.Enemies){
            return enemy.combat.enemyCombatants
        }else if(subject === EnemyActionSubject.Everyone){
            return [enemy.combat.playerCombatant, ...enemy.combat.enemyCombatants]
        }else if(subject === EnemyActionSubject.Self){
            return [enemy]
        }else if(subject === EnemyActionSubject.Player){
            return [enemy.combat.playerCombatant]
        }

        throw 'Failed to get targets, choice was unexpected.'
    }
}

export {
    EnemyAction, EnemyActionDefinition, EnemyActionSubject
}