import { PlayerCombatant } from '../../models/playerCombatant'
import { ModelElement } from '../modelElement'

const PLAYER_HTML = `
<div class='stat'>
    Health: <span stat-name="currentHealth"></span> / <span stat-name="maxHealth"></span>
</div>
<div class='stat'>
    PDef: <span class='physicalDefense'></span>
</div>
<div class='stat'>
    MDef: <span class='magicDefense'></span>
</div>
<div class='demons'></div>
`

class PlayerCombatantElement extends ModelElement<PlayerCombatant> {

    constructor(playerCombatant: PlayerCombatant){
        super(playerCombatant, 'player-combatant')
    }

    makeContents(): void {

    }
}

export { PlayerCombatantElement }