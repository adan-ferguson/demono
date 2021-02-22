import { EnemyCombatant } from 'game/models/combat/enemyCombatant'
import { Bar } from '../bar'
import { ModelView } from '../modelView'

const ENEMY_HTML = `
<div class="enemy-card">
    <span data-key='name'></span>
</div>
<div class="health-bar"></div>
<div class="stats">
</div>
`

const STAT_HTML = (iconName: string, value: number) => `
<span class="stat">
    <span class="stat-icon" icon-name="${iconName}"></span>
    <span class="stat-value">${value}</span>
</span>
`

class EnemyCombatantView extends ModelView<EnemyCombatant> {

    healthbar: Bar

    constructor(enemyCombatant: EnemyCombatant){
        super(enemyCombatant, 'enemy-combatant')
    }

    protected makeContents(): void {
        this.element.innerHTML = ENEMY_HTML
        this.healthbar = new Bar(() => this.model.health, () => this.model.startingHealth)
        this.find('.health-bar').append(this.healthbar.element)
    }

    update(): void {
        this.updateStatsList()
        super.update()
    }

    private updateStatsList(): void {
        let statsHTML = ''
        if(this.model.physDef > 0){
            statsHTML += STAT_HTML('pshield', this.model.physDef)
        }
        if(this.model.magicDef > 0){
            statsHTML += STAT_HTML('mshield', this.model.magicDef)
        }
        this.find('.stats').innerHTML = statsHTML
    }
}

export { EnemyCombatantView }