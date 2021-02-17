import { DemonInstance } from '../../models/combat/demonInstance'
import { ModelView } from '../modelView'

const DEMON_HTML = `
<div>
    <span data-key="demon.name"></span>
</div>
`

class DemonInstanceView extends ModelView<DemonInstance> {

    constructor(demonInstance: DemonInstance){
        super(demonInstance, 'demon-instance')
    }

    protected makeContents(): void {
        this.element.innerHTML = DEMON_HTML
    }
}

export { DemonInstanceView }