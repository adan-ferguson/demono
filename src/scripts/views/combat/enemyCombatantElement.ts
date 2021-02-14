import { EnemyCombatant } from '../../models/combat/enemyCombatant'
import { ModelElement } from '../modelElement'

class EnemyCombatantElement extends ModelElement<EnemyCombatant> {

    constructor(enemyCombatant: EnemyCombatant){
        super(enemyCombatant, 'enemy-combatant')
    }

    makeContents(): void {
        this.element.innerHTML = this.model.enemy.name + ' ' + this.model.enemy.health
    }
}

export { EnemyCombatantElement }