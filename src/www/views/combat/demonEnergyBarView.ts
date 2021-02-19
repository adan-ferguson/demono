import { DemonInstance } from 'game/models/combat/demonInstance'
import { ModelView } from '../demonoView'

const DEMON_HTML = `
<div class="demon-bar">
    <div class="energy-bar"></div>
    <div class="energy-count">
        <span data-key="energy"></span> / <span data-key="maxEnergy"></span>
    </div>
    <div class="name" data-key="name"></div>
</div>
`

class DemonEnergyBarView extends ModelView<DemonInstance> {

    constructor(demonInstance: DemonInstance){
        super(demonInstance, 'demon-energy-bar')
    }

    protected makeContents(): void {
        this.element.innerHTML = DEMON_HTML
    }

    public getData(key: string): string {
        return this.getDataFromObject(this.model.demon, key) ||
            this.getDataFromObject(this.model.stats, key) ||
            super.getData(key)
    }

    update(): void {
        super.update()
        console.log('would be updating demon bar here if it was applicable')
    }
}

export { DemonEnergyBarView }