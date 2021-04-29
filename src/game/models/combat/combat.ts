import { Encounter } from '../encounter'
import { PlayerCombatant } from './player/playerCombatant'
import { EnemyCombatant } from './enemy/enemyCombatant'
import { Player } from '../player/player'
import { DemonAbilityInstance } from './demon/demonAbilityInstance'
import { Choice } from 'game/models/combat/choice'
import { Result } from './result'

enum CombatState {
    Running,
    PlayerWin,
    PlayerLose
}

class Combat {

    enemyCombatants: EnemyCombatant[]
    playerCombatant: PlayerCombatant
    state: CombatState = CombatState.Running

    constructor(readonly encounter: Encounter, player: Player){
        this.enemyCombatants = encounter.createEnemyCombatants(this)
        this.playerCombatant = new PlayerCombatant(player, this)
    }

    get finished(): boolean {
        return this.state !== CombatState.Running
    }

    init(): void{
        // this.enemyCombatants.forEach(ec => ec.init())
        // this.playerCombatant.init()
    }

    useAbility(abilityInstance: DemonAbilityInstance, choice: Choice = null): Result[] {

        if(!abilityInstance.canBeActivated ||
            !abilityInstance.fulfillsChoiceRequirement(choice) ||
            !abilityInstance.canPayCosts()){
            return []
        }

        const results: Result[] = []
        results.push(...abilityInstance.activate(choice))
        this.updateState()
        results.push(...this.doEnemyTurn())
        this.updateState()
        results.push(...this.playerCombatant.beginTurn())
        return results
    }

    private updateState(): void {
        if(!this.enemyCombatants.find(e => e.health)){
            this.state = CombatState.PlayerWin
        }
        if(!this.playerCombatant.health){
            this.state = CombatState.PlayerLose
        }
    }

    private doEnemyTurn(): Result[] {
        const results: Result[] = []
        this.enemyCombatants.forEach(e => {
            if(this.state !== CombatState.Running){
                return false
            }
            results.push(...e.takeTurn())
            this.updateState()
        })
        return results
    }
}

export { Combat }