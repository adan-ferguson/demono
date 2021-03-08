import '../../styles/combat/combat.sass'
import { Scene } from '../scene'
import { Combat } from 'game/models/combat/combat'
import { PlayerWidget } from './playerWidget'
import { DemonAbilityInstance } from 'game/models/combat/demon/demonAbilityInstance'
import { MessagingWidget } from './messagingWidget'
import { EnemyList } from './enemyList'
import { DemonEnergyList } from './demonEnergyList'
import { AbilityList } from './abilityList'
import { EnemyCombatant } from 'game/models/combat/enemy/enemyCombatant'
import { PlayerCombatant } from '../../../game/models/combat/player/playerCombatant'
import { Combatant } from 'game/models/combat/combatant'
import { CombatantWidget } from './combatantWidget'
import { Visualizer } from './visualizer'

const COMBAT_HTML = `
<div class="combat-zone">
    <demono class="enemy-list"></demono>
    <demono class="messaging"></demono>
    <demono class="player"></demono>
</div>
<div class="actions">
    <demono class="ability-list"></demono>
    <demono class="demon-list"></demono>
</div>
`

enum CombatSceneState {
    WaitingToStart,
    ChooseAction,
    ChooseEnemy,
    Visualizing,
    Ended
}

class CombatScene extends Scene {

    private combat: Combat
    state = CombatSceneState.WaitingToStart
    widgets: {
        enemyList: EnemyList,
        messaging: MessagingWidget,
        player: PlayerWidget,
        abilityList: AbilityList,
        demonEnergyList: DemonEnergyList
    }
    visualizer: Visualizer

    constructor(combat: Combat) {
        super('combat')
        this.combat = combat
        this.visualizer = new Visualizer(this)
    }

    begin(): void {
        this.populate()
        this.combat.init()
        this.widgets.demonEnergyList.selectIndex(0)
        this.update()
    }

    private populate(): void {
        this.element.innerHTML = COMBAT_HTML
        this.widgets = {
            player: this.makePlayer(),
            messaging: this.makeMessaging(),
            enemyList: this.makeEnemyList(),
            demonEnergyList: this.makeDemonEnergyList(),
            abilityList: this.makeAbilityList()
        }
    }

    private makeAbilityList(): AbilityList {
        const abilityList = new AbilityList()
        abilityList.listItemSelected.on(ab => {
            const instance = ab.abilityInstance
            if (instance.ability.choiceRequirement === 'enemy') {
                this.setState(CombatSceneState.ChooseEnemy)
            } else {
                this.useAbility(instance)
            }
        })
        this.find('.ability-list').replaceWith(abilityList.element)
        return abilityList
    }

    private makeDemonEnergyList(): DemonEnergyList {
        const demonList = new DemonEnergyList()
        demonList.setContents(this.combat.playerCombatant.demonInstances)
        demonList.listItemSelected.on(dme => {
            this.widgets.abilityList.setContents(dme.demonInstance.abilityInstances)
        })
        this.find('.demon-list').replaceWith(demonList.element)
        return demonList
    }

    private makeEnemyList(): EnemyList {
        const enemyList = new EnemyList()
        enemyList.setContents(this.combat.enemyCombatants)
        enemyList.listItemClicked.on(enemyWidget => {
            const ability = this.widgets.abilityList.selected?.abilityInstance
            if (ability && this.state === CombatSceneState.ChooseEnemy) {
                this.useAbility(ability, enemyWidget.enemyCombatant)
            }
        })
        this.find('.enemy-list').replaceWith(enemyList.element)
        return enemyList
    }

    useAbility(ability: DemonAbilityInstance, enemyCombatant?: EnemyCombatant): void {
        const results = this.combat.useAbility(ability, enemyCombatant)
        results.forEach(async r => {
            this.widgets.messaging.addResult(r)
            await this.visualizer.visualizeResult(r)
        })
        // TODO: deal with endings
        this.state = CombatSceneState.ChooseAction
    }

    public getWidgetFromCombatant(target: Combatant): undefined | CombatantWidget {
        if (target instanceof PlayerCombatant) {
            return this.widgets.player
        } else if(target instanceof EnemyCombatant) {
            return this.widgets.enemyList.getFromEnemy(target)
        }
        return undefined
    }

    private makeMessaging() {
        const messaging = new MessagingWidget()
        this.find('.messaging').replaceWith(messaging.element)
        return messaging
    }

    private makePlayer(): PlayerWidget {
        const player = new PlayerWidget(this.combat.playerCombatant)
        this.find('.player').replaceWith(player.element)
        return player
    }

    private setState(state: CombatSceneState){
        this.state = state
        if(state === CombatSceneState.ChooseEnemy){
            this.widgets.messaging.setMessage('Select an enemy')
            this.widgets.enemyList.addClassAll('clickable')
        }
        //TODO: other states
    }
}

export { CombatScene }