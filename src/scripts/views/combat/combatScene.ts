import { Scene } from '../scene'
import { Combat } from '../../models/combat'
import { EnemyCombatant } from '../../models/combat/enemyCombatant'
import { EnemyCombatantElement } from './enemyCombatantElement'
import { PlayerCombatantElement } from './playerCombatantElement'

const COMBAT_HTML = `
<div class="top">
    <div class="enemies"></div>
</div>
<div class="bottom">
</div>
`

class CombatScene extends Scene {

    className: 'combat'
    combat: Combat

    constructor(combat: Combat){
        super()
        this.combat = combat
        this.populate()
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
}

export { CombatScene }