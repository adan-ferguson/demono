import { EnemyAbilityInstance } from 'game/models/combat/enemy/enemyAbilityInstance'
import '../../styles/combat/upcomingAbilities.sass'
import { DemonoList } from '../demonoList'
import { UpcomingAbilityWidget } from './upcomingAbilityWidget'

const HTML = `
<span class="time-icon"></span>
<div class="list"></div>
`

class UpcomingAbilitiesList extends DemonoList<UpcomingAbilityWidget> {

    private map = new Map<EnemyAbilityInstance, UpcomingAbilityWidget>()

    constructor(){
        super('upcoming-ability-list')
    }

    setContents(abilities: EnemyAbilityInstance[]): void {
        this.element.innerHTML = HTML
        abilities.forEach(a => {
            if(!a.timeLeft){
                return
            }
            const widget = new UpcomingAbilityWidget(a)
            this.add(widget, this.find('.list'))
            this.map.set(a, widget)
        })
    }

    getByAbility(ability: EnemyAbilityInstance): undefined | UpcomingAbilityWidget {
        return this.map.get(ability)
    }
}

export { UpcomingAbilitiesList }