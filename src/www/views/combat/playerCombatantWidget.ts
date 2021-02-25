import { PlayerCombatant } from 'game/models/combat/playerCombatant'
import { BarWidget } from '../barWidget'
import { DemonoWidget } from '../demonoWidget'
import { DemonStatsWidget } from './demonStatsWidget'

const PLAYER_HTML = (name: string) => `
<div class="something">

</div>
<div class="middle">
    <div class="player-card">
        ${name}
    </div>
    <div class="health-bar"></div>
    <div class="energy-bar"></div>
</div>
<div class="current-demon-stats">
</div>
`

class PlayerCombatantWidget extends DemonoWidget {

    healthbar: BarWidget
    energybar: BarWidget
    demonStats: DemonStatsWidget

    constructor(private playerCombatant: PlayerCombatant){
        super('player-combatant')
        this.element.innerHTML = PLAYER_HTML(playerCombatant.name)

        this.healthbar = new BarWidget(
            () => playerCombatant.health,
            () => playerCombatant.maxHealth, {
                showMax: true
            })
        this.find('.health-bar').append(this.healthbar.element)

        this.energybar = new BarWidget(
            () => playerCombatant.currentDemonInstance.energy,
            () => playerCombatant.currentDemonInstance.maxEnergy,
            {
                showMax: true
            })
        this.find('.energy-bar').append(this.energybar.element)

        this.demonStats = new DemonStatsWidget(playerCombatant)
        this.find('.current-demon-stats').append(this.demonStats.element)
    }
}

export { PlayerCombatantWidget }