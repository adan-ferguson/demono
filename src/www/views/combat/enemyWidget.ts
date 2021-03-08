import { DamageOutcome } from 'game/models/combat/damage'
import { EnemyCombatant } from 'game/models/combat/enemy/enemyCombatant'
import { BarWidget } from '../barWidget'
import { DemonoWidget } from '../demonoWidget'
import { CombatantWidget } from './combatantWidget'

const ENEMY_HTML = (name: string, armorType = 'none') => `
<div class="enemy-card">
    <span class="name">${name}</span>
    <span class="armor-icon ${armorType}"></span>
</div>
<div class="health-bar"></div>
<div class="buffs"></div>
`

const BUFF_HTML = (iconName: string, value: number) => `
<span class="stat">
    <span class="stat-icon" icon-name="${iconName}"></span>
    <span class="stat-value">${value}</span>
</span>
`

class EnemyWidget extends DemonoWidget implements CombatantWidget {

    healthbar: BarWidget

    constructor(public enemyCombatant: EnemyCombatant) {
        super('enemy')

        let armorType = 'none'
        if (enemyCombatant.physDef) {
            armorType = 'phys'
        } else if (enemyCombatant.magicDef) {
            armorType = 'magic'
        }

        this.element.innerHTML = ENEMY_HTML(enemyCombatant.name, armorType)
        this.healthbar = new BarWidget(enemyCombatant.maxHealth)
        this.healthbar.setValue(this.enemyCombatant.health)
        this.find('.health-bar').append(this.healthbar.element)
    }

    visualizeDamage(damage: DamageOutcome): void {
        this.healthbar.setValue(damage.targetRemainingHealth, true)
    }

    private updateBuffsList(): void {
        // let statsHTML = ''
        // if(this.enemyCombatant.physDef > 0){
        //     statsHTML += BUFF_HTML('pshield', this.enemyCombatant.physDef)
        // }
        // if(this.enemyCombatant.magicDef > 0){
        //     statsHTML += BUFF_HTML('mshield', this.enemyCombatant.magicDef)
        // }
        // this.find('.stats').innerHTML = statsHTML
    }
}

export { EnemyWidget }