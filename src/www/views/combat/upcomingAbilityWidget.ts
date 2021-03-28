import { DemonoWidget } from '../demonoWidget'
import { EnemyAbilityInstance } from 'game/models/combat/enemy/enemyAbilityInstance'

const HTML = (classification: string) => `
<span class="classification-icon" style="background-image: url('../../assets/${classification + '.svg'}')"></span>
<span class="time-left"></span>
`

class UpcomingAbilityWidget extends DemonoWidget {

    constructor(readonly abilityInstance: EnemyAbilityInstance){
        super('upcoming-ability')
        this.element.innerHTML = HTML(abilityInstance.ability.classification)
        this.setTimeLeft(abilityInstance.timeLeft)
    }

    setTimeLeft(timeLeft: number): void {
        this.find('.time-left').textContent = timeLeft.toString()
    }
}

export { UpcomingAbilityWidget }