import { EnemyCombatant } from 'game/models/combat/enemyCombatant'
import { Bar } from '../bar'
import { DemonoView } from '../demonoView'

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

class EnemyCombatantView extends DemonoView {

    healthbar: Bar

    constructor(private enemyCombatant: EnemyCombatant){
        super('enemy-combatant')
        this.element.innerHTML = ENEMY_HTML
        this.healthbar = new Bar(() => enemyCombatant.health, () => enemyCombatant.startingHealth)
        this.find('.health-bar').append(this.healthbar.element)
    }

    update(): void {
        this.updateStatsList()
        super.update()
    }

    private updateStatsList(): void {
        let statsHTML = ''
        if(this.enemyCombatant.physDef > 0){
            statsHTML += STAT_HTML('pshield', this.enemyCombatant.physDef)
        }
        if(this.enemyCombatant.magicDef > 0){
            statsHTML += STAT_HTML('mshield', this.enemyCombatant.magicDef)
        }
        this.find('.stats').innerHTML = statsHTML
    }
}

export { EnemyCombatantView }