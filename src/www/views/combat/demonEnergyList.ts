import { DemonInstance } from 'game/models/combat/demon/demonInstance'
import { DemonoList } from '../demonoList'
import { DemonEnergyWidget } from './demonEnergyWidget'

class DemonEnergyList extends DemonoList<DemonEnergyWidget> {

    private map = new Map<DemonInstance, DemonEnergyWidget>()

    constructor(){
        super('demon-list')
    }

    getFromDemonInstance(demon: DemonInstance): DemonEnergyWidget | undefined {
        return this.map.get(demon)
    }

    setContents(demonInstances: DemonInstance[]): void {
        demonInstances.forEach(demon => {
            const widget = new DemonEnergyWidget(demon)
            this.add(widget)
            this.map.set(demon, widget)
        })
    }
}

export { DemonEnergyList }