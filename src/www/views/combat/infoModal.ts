import { DemonAbilityInstance } from 'game/models/combat/demon/demonAbilityInstance'
import { DemonInstance } from 'game/models/combat/demon/demonInstance'
import { EnemyCombatant } from 'game/models/combat/enemy/enemyCombatant'
import { Modal } from '../modal'

class InfoModal extends Modal {

    constructor(){
        super('info-modal')
    }

    showAbility(ability: DemonAbilityInstance): void {
        this.element.innerHTML = 'TODO: show ability info here'
        this.show()
    }

    showDemon(demonInstance: DemonInstance): void {
        this.element.innerHTML = 'TODO: show demon info here'
        this.show()
    }

    showEnemy(enemyCombatant: EnemyCombatant): void {
        this.element.innerHTML = 'TODO: show enemy info here'
        this.show()
    }
}

export { InfoModal }