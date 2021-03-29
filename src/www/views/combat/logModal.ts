import { ActivateAbilityResult } from 'game/models/combat/abilityInstance'
import { DamageResult } from 'game/models/combat/damage'
import { EnergyChangeResult, EnergyChangeType } from 'game/models/combat/demon/demonInstance'
import { Result } from 'game/models/combat/result'
import { Modal } from '../modal'

class LogModal extends  Modal {

    constructor(){
        super('log-modal')
    }

    addResult(result: Result): void {
        if (result instanceof DamageResult) {
            return this.addDamageResult(result)
        }

        if (result instanceof ActivateAbilityResult) {
            return this.addActivateAbilityResult(result)
        }

        if (result instanceof EnergyChangeResult) {
            return this.addEnergyChangeResult(result)
        }
    }

    private addRow(row: string){
        const el = document.createElement('div')
        el.textContent = row
        this.element.appendChild(el)
    }

    private addEnergyChangeResult(result: EnergyChangeResult): void {
        if(result.type !== EnergyChangeType.FromAbility){
            return
        }
        this.addRow(`${result.demon.demon.name} ${result.delta > 0 ? 'gained' : 'lost'} ${result.delta} energy.`)
    }

    private addActivateAbilityResult(result: ActivateAbilityResult): void {
        this.addRow(`${result.abilityInstance.owner.name} used ${result.abilityInstance.ability.name}.`)
    }

    private addDamageResult(result: DamageResult): void {
        this.addRow(`${result.target.name} takes ${result.outcome.damage} damage. (${result.outcome.blocked} blocked)`)
    }
}

export { LogModal }