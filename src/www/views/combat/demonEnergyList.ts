import { DemonInstance } from 'game/models/combat/demon/demonInstance'
import { DemonoList } from '../demonoList'
import { DemonEnergyWidget } from './demonEnergyWidget'

class DemonEnergyList extends DemonoList<DemonEnergyWidget> {

    constructor(){
        super('demon-list')
    }

    setContents(demonInstances: DemonInstance[]): void {
        demonInstances.forEach(demon => {
            this.add(new DemonEnergyWidget(demon))
        })
    }
}

export { DemonEnergyList }