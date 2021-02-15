import { Scene } from '../scene'
import { Combat } from '../../models/combat/combat'
import { EnemyCombatant } from '../../models/combat/enemyCombatant'
import { EnemyCombatantElement } from './enemyCombatantElement'
import { PlayerCombatantElement } from './playerCombatantElement'
import { ModelElement } from '../modelElement'

const COMBAT_HTML = `
<div class="top">
    <div class="enemies"></div>
</div>
<div class="bottom">
    <div class="player"></div>
</div>
`

class CombatScene extends Scene {

    private combat: Combat

    constructor(combat: Combat){
        super('combat')
        this.combat = combat
        this.populate()
    }

    begin(): void {
        this.combat.init()
        this.update()
    }

    private populate(): void {
        this.element.innerHTML = COMBAT_HTML

        const enemiesEl = this.element.querySelector('.enemies')
        this.combat.enemyCombatants.forEach((enemyCombatant: EnemyCombatant) => {
            enemiesEl.append(new EnemyCombatantElement(enemyCombatant).element)
        })

        const playerEl = this.element.querySelector('.player')
        playerEl.append(new PlayerCombatantElement(this.combat.playerCombatant).element)
    }

    private update(): void {
        const modelEls = this.element.querySelectorAll('demono.model')
        modelEls.forEach(modelEl => {
            ModelElement.getFromRegistry(modelEl).update()
        })
    }
}

export { CombatScene }