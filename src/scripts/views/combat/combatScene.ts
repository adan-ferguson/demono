import '../../../styles/combat.sass'
import { Scene } from '../scene'
import { Combat } from '../../models/combat/combat'
import { EnemyCombatant } from '../../models/combat/enemyCombatant'
import { EnemyCombatantView } from './enemyCombatantView'
import { PlayerCombatantView } from './playerCombatantView'

const COMBAT_HTML = `
<div class="top">
    <div class="enemies"></div>
</div>
<div class="middle">
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
    }

    begin(): void {
        this.populate()
        this.combat.init()
        this.update()
    }

    private populate(): void {
        this.element.innerHTML = COMBAT_HTML

        const enemiesEl = this.element.querySelector('.enemies')
        this.combat.enemyCombatants.forEach((enemyCombatant: EnemyCombatant) => {
            enemiesEl.append(new EnemyCombatantView(enemyCombatant).element)
        })

        const playerEl = this.element.querySelector('.player')
        playerEl.append(new PlayerCombatantView(this.combat.playerCombatant).element)
    }
}

export { CombatScene }