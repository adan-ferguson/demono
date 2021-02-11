import { Scene } from '../scene'
import { Combat } from '../../models/combat'
import { EnemyCombatant } from '../../models/combat/enemyCombatant'
import { EnemyCombatantElement } from './enemyCombatantElement'

const COMBAT_HTML = `
<div class="top">
    <div class="enemies"></div>
</div>
<div class="bottom">
</div>
`

class CombatScene extends Scene {

    combat: Combat

    constructor(combat: Combat){
        super()
        this.combat = combat
    }

    populate(): void {
        this.innerHTML = COMBAT_HTML

        const enemiesEl = this.querySelector('.enemies')
        this.combat.enemyCombatants.forEach((enemyCombatant: EnemyCombatant) => {
            enemiesEl.append(new EnemyCombatantElement(enemyCombatant))
        })
    }
}

export { CombatScene }