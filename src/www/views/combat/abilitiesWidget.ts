import { DemonAbilityInstance } from 'game/models/combat/demonAbilityInstance'
import { DemonInstance } from 'game/models/combat/demonInstance'
import { DemonoWidget } from '../demonoWidget'

const ABILITY_HTML = (ability: DemonAbilityInstance) => `
<div>some ability</div>
`

class AbilitiesWidget extends DemonoWidget {
    demonInstance: DemonInstance

    constructor(){
        super('abilities')
    }

    public setDemon(demonInstance: DemonInstance): void{
        this.demonInstance = demonInstance

        let html = ''
        this.demonInstance.abilityInstances.forEach((ability: DemonAbilityInstance) => {
            html += ABILITY_HTML(ability)
        })
        this.element.innerHTML = html
    }
}

export { AbilitiesWidget }