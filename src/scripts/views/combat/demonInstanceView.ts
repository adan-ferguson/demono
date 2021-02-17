import { DemonInstance } from '../../models/combat/demonInstance'
import { ModelView } from '../modelView'

const DEMON_HTML = `
<div>
    <span data-key="name"></span>
</div>
`

class DemonInstanceView extends ModelView<DemonInstance> {

    constructor(demonInstance: DemonInstance){
        super(demonInstance, 'demon-instance')
    }

    protected makeContents(): void {
        this.element.innerHTML = DEMON_HTML
    }

    public getData(key: string): string {
        return this.getDataFromObject(this.model.demon, key) ||
            this.getDataFromObject(this.model.stats, key) ||
            super.getData(key)
    }
}

export { DemonInstanceView }