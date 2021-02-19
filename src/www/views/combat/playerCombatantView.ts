import { PlayerCombatant } from 'game/models/combat/playerCombatant'
import { ModelView } from '../demonoView'

const PLAYER_HTML = `
<div>
    Health: <span data-key="health"></span> / <span data-key="maxHealth"></span>
</div>
<div>
    PDef: <span data-key='physDefense'></span>
</div>
<div>
    MDef: <span data-key='magicDefense'></span>
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