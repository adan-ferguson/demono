import { DemonInstance } from 'game/models/combat/demon/demonInstance'
import { LiteEvent } from 'game/models/liteEvent'
import { BarWidget } from '../barWidget'
import { DemonoWidget } from '../demonoWidget'

class DemonEnergyWidget extends DemonoWidget {

    clicked = new LiteEvent()

    constructor(readonly demonInstance: DemonInstance){
        super('demon-energy')
        this.element.innerHTML = ''
        const energyBar = new BarWidget(
            demonInstance.maxEnergy, {
                showMax: true,
                label: demonInstance.demon.name
            })
        energyBar.setValue(demonInstance.energy)
        this.element.append(energyBar.element)
        this.setClass('active', this.demonInstance.isActive)
    }
}

export { DemonEnergyWidget }