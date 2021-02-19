import { PlayerCombatant } from 'game/models/combat/playerCombatant'
import { ModelView } from '../modelView'

const PLAYER_HTML = `
<div>
    Health: <span data-key="health"></span> / <span data-key="maxHealth"></span>
</div>
<div>
    PDef: <span data-key='physDef'></span>
</div>
<div>
    MDef: <span data-key='magicDef'></span>
</div>
`

class PlayerCombatantView extends ModelView<PlayerCombatant> {

    constructor(playerCombatant: PlayerCombatant){
        super(playerCombatant, 'player-combatant')
    }

    protected makeContents(): void {
        this.element.innerHTML = PLAYER_HTML
    }
}

export { PlayerCombatantView }