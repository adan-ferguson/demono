import { Combatant } from 'game/models/combat/combatant'
import { ModelView } from '../demonoView'

const HEALTHBAR_HTML = `
<div class="bar-value"></div>
<div class="bar-damage"></div>
<div class='value-text'>9</div>
`
class HealthbarView extends ModelView<Combatant> {

    constructor(combatant: Combatant){
        super(combatant, 'health-bar')
    }

    protected makeContents(): void {
        this.element.innerHTML = HEALTHBAR_HTML
    }
}

export { HealthbarView }