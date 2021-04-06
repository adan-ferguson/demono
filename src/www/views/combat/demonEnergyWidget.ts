import { DemonInstance } from 'game/models/combat/demon/demonInstance'
import { LiteEvent } from 'game/models/liteEvent'
import { BarWidget } from '../barWidget'
import { DemonoWidget } from '../demonoWidget'
import { CombatScene } from './combatScene'

class DemonEnergyWidget extends DemonoWidget {

    clicked = new LiteEvent()
    energyBar: BarWidget

    constructor(readonly demonInstance: DemonInstance, readonly combat: CombatScene){
        super('demon-energy')
        this.element.innerHTML = ''
        this.energyBar = new BarWidget(
            demonInstance.maxEnergy, {
                showMax: true,
                label: demonInstance.demon.name
            })
        this.energyBar.setValue(demonInstance.energy)
        this.element.append(this.energyBar.element)
        this.setClass('active', this.demonInstance.isActive)
        this.addClass('selectable')

        this.element.addEventListener('mouseenter', () => {
            this.combat.widgets.player.demonStats.preview(demonInstance)
        })
    }

    visualizeEnergyChange(delta: number): void {
        this.energyBar.changeValue(delta, true)
    }
}

export { DemonEnergyWidget }