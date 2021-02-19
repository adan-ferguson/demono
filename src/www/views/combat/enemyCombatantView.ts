import { EnemyCombatant } from 'game/models/combat/enemyCombatant'
import { Bar } from '../bar'
import { ModelView } from '../modelView'

const ENEMY_HTML = `
<div class="enemy-card">
    <span data-key='name'></span>
</div>
`

class EnemyCombatantView extends ModelView<EnemyCombatant> {

    healthbar: Bar

    constructor(enemyCombatant: EnemyCombatant){
        super(enemyCombatant, 'enemy-combatant')
    }

    protected makeContents(): void {
        this.healthbar = new Bar({
            showMax: false,
            maxValue: this.model.startingHealth,
            initialValue: this.model.health
        })
        this.element.innerHTML = ENEMY_HTML
        this.element.append(this.healthbar.element)
    }
}

export { EnemyCombatantView }