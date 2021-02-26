import { DemonAbilityInstance } from 'game/models/combat/demonAbilityInstance'
import { DemonInstance } from 'game/models/combat/demonInstance'
import { DemonoWidget } from '../demonoWidget'
import { LiteEvent } from 'game/models/liteEvent'

const ABILITY_HTML = (abilityInstance: DemonAbilityInstance) => `
<span class="name">${abilityInstance.ability.name}</span>
<span class="cost">${abilityInstance.cost}</span>
`

class AbilityWidget extends DemonoWidget {

    clickEvent = new LiteEvent()
    demonInstance: DemonInstance

    constructor(readonly abilityInstance: DemonAbilityInstance){
        super('ability')
        this.element.innerHTML = ABILITY_HTML(abilityInstance)
        this.element.addEventListener('click', () => {
            this.clickEvent.trigger()
        })
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
        if(this.abilityInstance.canBeActivated){
            this.element.classList.add('clickable')
        }else{
            this.element.classList.remove('clickable')
        }
    }
}

export { AbilityWidget }