import { PlayerCombatant } from 'game/models/combat/playerCombatant'
import { Bar } from '../bar'
import { DemonoView } from '../demonoView'

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
<div class="demon-stats">
</div>
`

class PlayerCombatantView extends DemonoView {
    healthbar: Bar
    energybar: Bar

    constructor(private playerCombatant: PlayerCombatant){
        super('player-combatant')
        this.element.innerHTML = PLAYER_HTML(playerCombatant.name)

        this.healthbar = new Bar(
            () => playerCombatant.health,
            () => playerCombatant.maxHealth, {
                showMax: true
            })
        this.find('.health-bar').append(this.healthbar.element)

        this.energybar = new Bar(
            () => playerCombatant.currentDemonInstance.energy,
            () => playerCombatant.currentDemonInstance.maxEnergy,
            {
                showMax: true
            })

        this.find('.energy-bar').append(this.energybar.element)
    }
}

export { PlayerCombatantView }