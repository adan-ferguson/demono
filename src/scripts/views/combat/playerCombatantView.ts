import { PlayerCombatant } from '../../models/combat/playerCombatant'
import { ModelView } from '../modelView'
import { DemonInstanceView } from './demonInstanceView'

const PLAYER_HTML = `
<div>
    Health: <span data-key="currentHealth"></span> / <span data-key="maxHealth"></span>
</div>
<div>
    PDef: <span data-key='physicalDefense'></span>
</div>
<div>
    MDef: <span data-key='magicDefense'></span>
</div>
<div class='demons'></div>
`

class PlayerCombatantView extends ModelView<PlayerCombatant> {

    constructor(playerCombatant: PlayerCombatant){
        super(playerCombatant, 'player-combatant')
    }

    protected makeContents(): void {
        this.element.innerHTML = PLAYER_HTML
        const demonsEl = this.element.querySelector('.demons')
        this.model.demonInstances.forEach(demonInstance => {
            demonsEl.append(new DemonInstanceView(demonInstance).element)
        })
    }
}

export { PlayerCombatantView }