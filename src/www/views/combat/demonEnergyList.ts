import { DemonInstance } from 'game/models/combat/demonInstance'
import { DemonoList } from '../DemonoList'
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