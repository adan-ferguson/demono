import { EnemyCombatant } from '../../models/combat/enemyCombatant'
import { ModelElement } from '../modelElement'

const ENEMY_HTML = `
<div>
    <span data-key='name'></span>
</div>
<div>
    <span data-key='health'></span> / <span data-key='maxHealth'></span>
</div>
`

class EnemyCombatantElement extends ModelElement<EnemyCombatant> {

    constructor(enemyCombatant: EnemyCombatant){
        super(enemyCombatant, 'enemy-combatant')
    }

    protected makeContents(): void {
        this.element.innerHTML = ENEMY_HTML
    }
}

export { EnemyCombatantElement }