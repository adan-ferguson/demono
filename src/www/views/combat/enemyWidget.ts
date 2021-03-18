import { DamageOutcome } from 'game/models/combat/damage'
import { EnemyCombatant } from 'game/models/combat/enemy/enemyCombatant'
import { BarWidget } from '../barWidget'
import { DemonoWidget } from '../demonoWidget'
import { FlyingTextDirection, FlyingTextEffect } from '../visualEffects/flyingTextEffect'
import { CombatantWidget } from './combatantWidget'
import { UpcomingAbilitiesWidget } from './upcomingAbilitiesWidget'

const ENEMY_HTML = (name: string, armorType = 'none') => `
<div class="upcoming-abilities"></div>
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
    upcomingAbilities: UpcomingAbilitiesWidget

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
        this.healthbar.setValue(enemyCombatant.health)
        this.find('.health-bar').append(this.healthbar.element)

        this.upcomingAbilities = new UpcomingAbilitiesWidget(enemyCombatant.abilities)
        this.find('.upcoming-abilities').replaceWith(this.upcomingAbilities.element)
    }

    visualizeDamage(damage: DamageOutcome): void {
        this.healthbar.setValue(damage.targetRemainingHealth, true)
        this.flyingText(-damage.damage + '', 'red')
    }

    private flyingText(message: string, color = 'black'){
        new FlyingTextEffect({
            message,
            color,
            direction: FlyingTextDirection.Down,
            origin: this.healthbar.element.getBoundingClientRect()
        }).run()
    }

    private updateUpcomingAbilities(){
        this.upcomingAbilities.update()
        // TODO: update pct health notches
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