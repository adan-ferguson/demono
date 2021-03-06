import { DemonoWidget } from '../demonoWidget'
import { PlayerCombatant } from 'game/models/combat/player/playerCombatant'
import { DemonStats } from 'game/models/demons/demon'

const HTML = (stats: DemonStats) => `
<div>Strength: <span>${stats.strength}</span></div>
<div>Magic: <span>${stats.magic}</span></div>
<div>Armor: <span>${stats.armor}</span></div>
<div>Speed: <span>${stats.speed}</span></div>`

class DemonStatsWidget extends DemonoWidget {
    constructor(private playerCombatant: PlayerCombatant){
        super('demon-stats')
        this.update()
    }

    update(): void{
        this.element.innerHTML = HTML(this.playerCombatant.stats)
    }
}

export { DemonStatsWidget }

