import { DemonInstance } from 'game/models/combat/demonInstance'
import { LiteEvent } from 'game/models/liteEvent'
import { BarWidget } from '../barWidget'
import { DemonoWidget } from '../demonoWidget'

class DemonEnergyWidget extends DemonoWidget {

    clicked = new LiteEvent()

    constructor(readonly demonInstance: DemonInstance){
        super('demon-energy')
        this.element.innerHTML = ''
        const energyBar = new BarWidget(
            () => demonInstance.energy,
            () => demonInstance.maxEnergy, {
                showMax: true,
                label: demonInstance.demon.name
            })
        this.element.append(energyBar.element)
    }

    update(): void {
        this.setClass('active', this.demonInstance.isActive)
        this.addClass('selectable')
        super.update()
    }
}

export { DemonEnergyWidget }