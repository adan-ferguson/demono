import { PlayerCombatant } from 'game/models/combat/player/playerCombatant'
import { BarWidget } from '../barWidget'
import { DemonoWidget } from '../demonoWidget'
import { DemonStatsWidget } from './demonStatsWidget'
import { CombatantWidget } from './combatantWidget'
import { DamageOutcome } from 'game/models/combat/damage'
import { CombatScene } from './combatScene'

const PLAYER_HTML = (name: string) => `
<div class="something">
    <button class="log-button">Log</button>
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

class PlayerWidget extends DemonoWidget implements CombatantWidget {

    healthbar: BarWidget
    energybar: BarWidget
    demonStats: DemonStatsWidget

    constructor(readonly combatScene: CombatScene, private playerCombatant: PlayerCombatant){
        super('player')
        this.element.innerHTML = PLAYER_HTML(playerCombatant.name)

        this.healthbar = new BarWidget(
            playerCombatant.maxHealth, {
                showMax: true
            })
        this.healthbar.setValue(playerCombatant.health)
        this.find('.health-bar').append(this.healthbar.element)

        this.energybar = new BarWidget(
            playerCombatant.currentDemonInstance.maxEnergy,
            {
                showMax: true
            })
        this.healthbar.setValue(playerCombatant.currentDemonInstance.energy)
        this.find('.energy-bar').append(this.energybar.element)

        this.demonStats = new DemonStatsWidget(playerCombatant)
        this.find('.current-demon-stats').append(this.demonStats.element)

        this.find('.log-button').addEventListener('click', () => {
            this.combatScene.modals.log.show()
        })
    }

    visualizeDamage(damage: DamageOutcome): void {
        this.healthbar.setValue(damage.targetRemainingHealth, true)
    }
}

export { PlayerWidget }