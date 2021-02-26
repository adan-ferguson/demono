import { DemonInstance } from 'game/models/combat/demonInstance'
import { LiteEvent } from 'game/models/liteEvent'
import { BarWidget } from '../barWidget'
import { DemonoWidget } from '../demonoWidget'

class DemonEnergyWidget extends DemonoWidget {

    clickEvent = new LiteEvent()

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
        this.element.addEventListener('click', () => {
            this.clickEvent.trigger()
        })
    }

    update(): void {
        if(this.demonInstance.isActive){
            this.element.classList.add('active')
        }else{
            this.element.classList.remove('active')
        }
        super.update()
    }
}

export { DemonEnergyWidget }