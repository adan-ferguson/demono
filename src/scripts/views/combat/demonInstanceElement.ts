import { DemonInstance } from '../../models/combat/demonInstance'
import { ModelElement } from '../modelElement'

const DEMON_HTML = `
<div>
    <span data-key="demon.name"></span>
</div>
`

class DemonInstanceElement extends ModelElement<DemonInstance> {

    constructor(demonInstance: DemonInstance){
        super(demonInstance, 'demon-instance')
    }

    protected makeContents(): void {
        this.element.innerHTML = DEMON_HTML
    }
}

export { DemonInstanceElement }