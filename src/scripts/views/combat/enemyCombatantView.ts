import { EnemyCombatant } from '../../models/combat/enemyCombatant'
import { ModelView } from '../demonoView'
import { HealthbarView } from './healthbarView'

const ENEMY_HTML = `
<div class="enemy-card">
    <span data-key='name'></span>
</div>
`

class EnemyCombatantView extends ModelView<EnemyCombatant> {

    constructor(enemyCombatant: EnemyCombatant){
        super(enemyCombatant, 'enemy-combatant')
    }

    protected makeContents(): void {
        this.element.innerHTML = ENEMY_HTML
        this.element.append(new HealthbarView(this.model).element)
    }
}

export { EnemyCombatantView }