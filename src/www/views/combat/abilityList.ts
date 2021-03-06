import { DemonoList } from '../DemonoList'
import { AbilityWidget } from './abilityWidget'
import { DemonAbilityInstance } from 'game/models/combat/demonAbilityInstance'

class AbilityList extends DemonoList<AbilityWidget> {

    private map = new Map<DemonAbilityInstance, AbilityWidget>()

    constructor(){
        super('ability-list')
    }

    setContents(abilities: DemonAbilityInstance[]): void {
        abilities.forEach(ability => {
            const widget = new AbilityWidget(ability)
            this.add(widget)
            this.map.set(ability, widget)
        })
    }
}

export { AbilityList }