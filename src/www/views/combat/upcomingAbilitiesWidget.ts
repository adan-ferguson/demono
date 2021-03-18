import '../../styles/combat/upcomingAbilities.sass'
import { DemonoWidget } from '../demonoWidget'
import { EnemyAbilityInstance } from 'game/models/combat/enemy/enemyAbilityInstance'

const HTML = (timeleft: number) => `
<span class="time-icon"></span>
<span class="time-number">${timeleft}</span>
`

class UpcomingAbilitiesWidget extends DemonoWidget {

    constructor(readonly abilities: EnemyAbilityInstance[]){
        super('upcoming-abilities')
        this.update()
    }

    update(): void {
        let html = ''
        this.abilities.forEach(a => {
            if(!a.timeLeft){
                return
            }
            html += HTML(a.timeLeft)
        })
        this.element.innerHTML = html
    }
}

export { UpcomingAbilitiesWidget }