import { DemonInstance } from 'game/models/combat/demonInstance'
import { Bar } from '../bar'
import { DemonoView } from '../demonoView'

class DemonBar extends DemonoView {

    constructor(readonly demonInstance: DemonInstance){
        super('demon-bar')
        const energyBar = new Bar(
            () => demonInstance.energy,
            () => demonInstance.maxEnergy, {
                showMax: true,
                label: demonInstance.demon.name
            })
        this.element.append(energyBar.element)
    }
}

export { DemonBar }