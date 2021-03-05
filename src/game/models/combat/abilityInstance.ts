import { Ability } from './ability'
import { Choice } from './choice'
import { Combat, Result } from './combat'

abstract class AbilityInstance<T extends Ability> {

    constructor(readonly ability: T){

    }

    abstract get combat(): Combat

    protected performActions(choice: Choice = null): Result[] {

        // if(this.def.target === ActionTarget.Enemy && choice instanceof EnemyCombatant){
        //     if(choice instanceof EnemyCombatant){
        //         dealDamage(choice)
        //     }else{
        //         throw 'Can not perform damage action due to invalid choice.'
        //     }
        // }else if(this.def.target === 'self'){
        //     dealDamage(player)
        // }else if(this.def.target === 'allEnemies'){
        //     combat.enemyCombatants.forEach(enemy => {
        //         dealDamage(enemy)
        //     })
        // }

        const results: Result[] = []
        this.ability.actions.forEach(action => {
            results.push(...action.perform(this.combat, choice))
        })
        return results
    }
}



export { AbilityInstance }