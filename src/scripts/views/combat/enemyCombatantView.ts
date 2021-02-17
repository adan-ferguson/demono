import { EnemyCombatant } from '../../models/combat/enemyCombatant'
import { ModelView } from '../modelView'

const ENEMY_HTML = `
<div>
    <span data-key='name'></span>
</div>
<div>
    <span data-key='health'></span> / <span data-key='maxHealth'></span>
</div>
`

class EnemyCombatantView extends ModelView<EnemyCombatant> {

    constructor(enemyCombatant: EnemyCombatant){
        super(enemyCombatant, 'enemy-combatant')
    }

    protected makeContents(): void {
        this.element.innerHTML = ENEMY_HTML
    }
}

export { EnemyCombatantView }