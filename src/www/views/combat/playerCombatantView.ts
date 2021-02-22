import { PlayerCombatant } from 'game/models/combat/playerCombatant'
import { ModelView } from '../modelView'
import { DemonEnergyBarView } from './demonEnergyBarView'
import { Bar } from '../bar'

const PLAYER_HTML = `
<div class="stats">

</div>
<div class="middle">
    <div class="player-card">
        <span data-key='name'></span>
    </div>
    <div class="health-bar"></div>
    <div class="energy-bar"></div>
</div>
<div class="demons">

</div>
`

class PlayerCombatantView extends ModelView<PlayerCombatant> {
    healthbar: Bar
    energybar: Bar

    constructor(playerCombatant: PlayerCombatant){
        super(playerCombatant, 'player-combatant')
    }

    protected makeContents(): void {
        this.element.innerHTML = PLAYER_HTML

        const demonsEl = this.find('.demons')
        this.model.demonInstances.forEach(demonInstance => {
            demonsEl.append(new DemonEnergyBarView(demonInstance).element)
        })

        this.healthbar = new Bar(
            () => this.model.health,
            () => this.model.maxHealth, {
                showMax: true
            })
        this.find('.health-bar').append(this.healthbar.element)

        this.energybar = new Bar(
            () => this.model.currentDemonInstance.energy,
            () => this.model.currentDemonInstance.maxEnergy,
            {
                showMax: true
            })
        this.find('.energy-bar').append(this.energybar.element)
    }
}

export { PlayerCombatantView }