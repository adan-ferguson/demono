import { Combatant } from '../../models/combat/combatant'
import { ModelView } from '../demonoView'

const HEALTHBAR_HTML = `
<div class="bar-value"></div>
<div class="bar-damage"></div>
<div class="flex-spacer">
    <div class="phys-defense"></div>
    <div class='value-text'></div>
    <div class="magic-defense"></div>
</div>
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