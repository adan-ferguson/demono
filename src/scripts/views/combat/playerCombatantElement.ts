import { PlayerCombatant } from '../../models/playerCombatant'
import { ModelElement } from '../modelElement'
import { DemonInstanceElement } from './demonInstanceElement'

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

class PlayerCombatantElement extends ModelElement<PlayerCombatant> {

    constructor(playerCombatant: PlayerCombatant){
        super(playerCombatant, 'player-combatant')
    }

    protected makeContents(): void {
        this.element.innerHTML = PLAYER_HTML
        const demons = this.element.querySelector('demons')
        this.model.demonInstances.forEach(demonInstance => {
            demons.append(new DemonInstanceElement(demonInstance).element)
        })
    }
}

export { PlayerCombatantElement }