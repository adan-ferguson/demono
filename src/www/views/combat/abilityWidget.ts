import { DemonAbilityInstance } from 'game/models/combat/demon/demonAbilityInstance'
import { DemonInstance } from 'game/models/combat/demon/demonInstance'
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
        this.addClass('rightclickable')
        this.setClass('selectable', this.abilityInstance.canBeActivated)
    }
}

export { AbilityWidget }