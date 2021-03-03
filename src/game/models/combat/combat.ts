import { Encounter } from '../encounters/encounter'
import { PlayerCombatant } from './playerCombatant'
import { EnemyCombatant } from './enemyCombatant'
import { Player } from '../player'
import { TypedEvent } from '../liteEvent'
import { DemonAbilityInstance } from './demonAbilityInstance'
import { Choice } from 'game/models/combat/choice'

interface CombatUpdate {
    id?: string
}

class Combat {

    enemyCombatants: EnemyCombatant[]
    playerCombatant: PlayerCombatant
    onUpdate = new TypedEvent<CombatUpdate>()

    constructor(encounter: Encounter, player: Player){
        this.enemyCombatants = encounter.createEnemyCombatants()
        this.playerCombatant = new PlayerCombatant(player)
    }

    init(): void{
        // this.enemyCombatants.forEach(ec => ec.init())
        // this.playerCombatant.init()
    }

    useAbility(abilityInstance: DemonAbilityInstance, choice: Choice = false): void {
        if(!abilityInstance.canBeActivated || !abilityInstance.fulfillsChoiceRequirement(choice)){
            return
        }
        const results = abilityInstance.performActions(this, choice)
    }
}

export { Combat }