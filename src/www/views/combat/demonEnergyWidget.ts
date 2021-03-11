import { DemonInstance } from 'game/models/combat/demon/demonInstance'
import { LiteEvent } from 'game/models/liteEvent'
import { BarWidget } from '../barWidget'
import { DemonoWidget } from '../demonoWidget'

class DemonEnergyWidget extends DemonoWidget {

    clicked = new LiteEvent()
    energyBar: BarWidget

    constructor(readonly demonInstance: DemonInstance){
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
    }

    visualizeEnergyChange(delta: number): void {
        this.energyBar.changeValue(delta, true)
    }
}

export { DemonEnergyWidget }