import '../../styles/combat/combat.sass'
import { Scene } from '../scene'
import { Combat } from 'game/models/combat/combat'
import { EnemyCombatant } from 'game/models/combat/enemyCombatant'
import { EnemyCombatantWidget } from './enemyCombatantWidget'
import { PlayerCombatantWidget } from './playerCombatantWidget'
import { DemonListWidget } from './demonListWidget'
import { AbilitiesWidget } from './abilitiesWidget'

const COMBAT_HTML = `
<div class="combat-zone">
    <div class="enemies"></div>
    <div class="messaging"></div>
    <div class="player"></div>
</div>
<div class="actions">
    <div class="abilities"></div>
    <div class="demon-list"></div>
</div>
`

class CombatScene extends Scene {

    private combat: Combat
    abilities: AbilitiesWidget
    demonList: DemonListWidget

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
            enemiesEl.append(new EnemyCombatantWidget(enemyCombatant).element)
        })

        this.find('.player')
            .append(new PlayerCombatantWidget(this.combat.playerCombatant).element)

        this.demonList = new DemonListWidget(this.combat.playerCombatant)
        this.find('.demon-list').replaceWith(this.demonList.element)

        this.abilities = new AbilitiesWidget()
        this.abilities.setDemon(this.combat.playerCombatant.currentDemonInstance)
        this.find('.abilities').replaceWith(this.abilities.element)
    }

    update(): void {
        super.update()
    }
}

export { CombatScene }