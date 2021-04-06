import { DemonInstance } from 'game/models/combat/demon/demonInstance'
import { DemonoList } from '../demonoList'
import { DemonEnergyWidget } from './demonEnergyWidget'
import { CombatScene } from './combatScene'

class DemonEnergyList extends DemonoList<DemonEnergyWidget> {

    private map = new Map<DemonInstance, DemonEnergyWidget>()

    constructor(readonly combat: CombatScene){
        super('demon-list')
        this.element.addEventListener('mouseleave', () => {
            this.combat.widgets.player.demonStats.hidePreview()
        })
    }

    getFromDemonInstance(demon: DemonInstance): DemonEnergyWidget | undefined {
        return this.map.get(demon)
    }

    setContents(demonInstances: DemonInstance[]): void {
        demonInstances.forEach(demon => {
            const widget = new DemonEnergyWidget(demon, this.combat)
            this.add(widget)
            this.map.set(demon, widget)
        })
    }
}

export { DemonEnergyList }