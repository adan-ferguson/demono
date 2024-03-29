import { DemonoList } from '../demonoList'
import { AbilityWidget } from './abilityWidget'
import { DemonAbilityInstance } from 'game/models/combat/demon/demonAbilityInstance'

class AbilityList extends DemonoList<AbilityWidget> {

    private map = new Map<DemonAbilityInstance, AbilityWidget>()

    constructor(){
        super('ability-list')
    }

    setContents(abilities: DemonAbilityInstance[]): void {
        this.map.clear()
        this.clearList()
        abilities.forEach(ability => {
            const widget = new AbilityWidget(ability)
            this.add(widget)
            this.map.set(ability, widget)
        })
    }

    update(): void {
        this.deselectAll()
        this.map.forEach(aw => {
            aw.update()
        })
    }

    getFromAbility(abilityInstance: DemonAbilityInstance): AbilityWidget | undefined {
        return this.map.get(abilityInstance)
    }
}

export { AbilityList }