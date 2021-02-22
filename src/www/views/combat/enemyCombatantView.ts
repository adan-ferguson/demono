import { EnemyCombatant } from 'game/models/combat/enemyCombatant'
import { EnemyArmorType } from 'game/models/enemies/enemy'
import { Bar } from '../bar'
import { DemonoView } from '../demonoView'

const ENEMY_HTML = (name: string, armorType: EnemyArmorType = 'none') => `
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

class EnemyCombatantView extends DemonoView {

    healthbar: Bar

    constructor(private enemyCombatant: EnemyCombatant){
        super('enemy-combatant')

        let armorType: EnemyArmorType = 'none'
        if(enemyCombatant.physDef){
            armorType = 'phys'
        }else if(enemyCombatant.magicDef){
            armorType = 'magic'
        }

        this.element.innerHTML = ENEMY_HTML(enemyCombatant.name, armorType)
        this.healthbar = new Bar(() => enemyCombatant.health, () => enemyCombatant.startingHealth)
        this.find('.health-bar').append(this.healthbar.element)
    }

    update(): void {
        this.updateBuffsList()
        super.update()
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

export { EnemyCombatantView }