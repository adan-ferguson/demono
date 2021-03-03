import { DemonAbilityInstance } from 'game/models/combat/demonAbilityInstance'
import { DemonInstance } from 'game/models/combat/demonInstance'
import { DemonoWidget } from '../demonoWidget'
import { LiteEvent } from 'game/models/liteEvent'

const ABILITY_HTML = (abilityInstance: DemonAbilityInstance) => `
<span class="name">${abilityInstance.ability.name}</span>
<span class="cost">${abilityInstance.cost}</span>
`

class AbilityWidget extends DemonoWidget {

    clicked = new LiteEvent()
    demonInstance: DemonInstance

    constructor(readonly abilityInstance: DemonAbilityInstance){
        super('ability')
        this.element.innerHTML = ABILITY_HTML(abilityInstance)
    }

    public setDemon(demonInstance: DemonInstance): void{
        this.demonInstance = demonInstance
        let html = ''
        this.demonInstance.abilityInstances.forEach((ability: DemonAbilityInstance) => {
            html += ABILITY_HTML(ability)
        })
        this.element.innerHTML = html
    }

    update(): void {
        this.setClass('selectable', this.abilityInstance.canBeActivated)
    }
}

export { AbilityWidget }