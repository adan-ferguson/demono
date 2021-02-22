import '../../styles/combat/combat.sass'
import { Scene } from '../scene'
import { Combat } from 'game/models/combat/combat'
import { EnemyCombatant } from 'game/models/combat/enemyCombatant'
import { EnemyCombatantView } from './enemyCombatantView'
import { PlayerCombatantView } from './playerCombatantView'
import { DemonEnergyBar } from './demonEnergyBar'

const COMBAT_HTML = `
<div class="combat-zone">
    <div class="enemies">
        <span data-key='name'></span>
    </div>
    <div class="messaging"></div>
    <div class="player"></div>
</div>
<div class="actions">
    <div class="abilities"></div>
    <div class="demon-list">
        <div class="empty-demon"></div>
        <div class="empty-demon"></div>
        <div class="empty-demon"></div>
        <div class="empty-demon"></div>
        <div class="empty-demon"></div>
    </div>
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

        const enemiesEl = this.find('.enemies')
        this.combat.enemyCombatants.forEach((enemyCombatant: EnemyCombatant) => {
            enemiesEl.append(new EnemyCombatantView(enemyCombatant).element)
        })

        this.find('.player')
            .append(new PlayerCombatantView(this.combat.playerCombatant).element)

        this.combat.playerCombatant.demonInstances.forEach(demonInstance => {
            this.find('.empty-demon')
                .replaceWith(new DemonEnergyBar(demonInstance).element)
        })
    }

    update(): void {
        super.update()

    }
}

export { CombatScene }