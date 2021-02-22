import { DemonInstance } from 'game/models/combat/demonInstance'
import { Bar } from '../bar'
import { DemonoView } from '../demonoView'

const DEMON_HTML = (name: string) => `
<div class="demon-name">${name}</div>
<div class="demon-energy-bar"></div>
`

class DemonEnergyBar extends DemonoView {

    constructor(readonly demonInstance: DemonInstance){
        super('demon-energy-bar')
        this.element.innerHTML = DEMON_HTML(demonInstance.demon.name)
        const energyBar = new Bar(
            () => demonInstance.energy,
            () => demonInstance.maxEnergy, {
                showMax: true
            })
        this.find('.demon-energy-bar').append(energyBar.element)
    }
}

export { DemonEnergyBar }