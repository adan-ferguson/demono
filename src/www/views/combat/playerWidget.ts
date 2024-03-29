import { PlayerCombatant } from 'game/models/combat/player/playerCombatant'
import { BarWidget } from '../barWidget'
import { DemonoWidget } from '../demonoWidget'
import { DemonStatsWidget } from './demonStatsWidget'
import { CombatantWidget } from './combatantWidget'
import { DamageOutcome } from 'game/models/combat/damage'
import { CombatScene } from './combatScene'
import { FlyingTextDirection, FlyingTextEffect } from '../visualEffects/flyingTextEffect'

const PLAYER_HTML = (name: string) => `
<div class="something">
    <button class="log-button">Log</button>
</div>
<div class="middle">
    <div class="player-card">
        ${name}
    </div>
    <div class="health-bar"></div>
</div>
<div class="demon-stats">
</div>
`

class PlayerWidget extends DemonoWidget implements CombatantWidget {

    healthbar: BarWidget
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

        this.demonStats = new DemonStatsWidget(playerCombatant)
        this.find('.demon-stats').replaceWith(this.demonStats.element)

        this.find('.log-button').addEventListener('click', () => {
            this.combatScene.modals.log.show()
        })
    }

    visualizeDamage(damage: DamageOutcome): void {
        this.healthbar.setValue(damage.targetRemainingHealth, true)
        new FlyingTextEffect({
            message: damage.damage.toString(),
            color: 'red',
            direction: FlyingTextDirection.Up,
            origin: this.healthbar.element.getBoundingClientRect()
        }).run()
    }

    visualizeDefeat(): void {
        // TODO: this
    }
}

export { PlayerWidget }