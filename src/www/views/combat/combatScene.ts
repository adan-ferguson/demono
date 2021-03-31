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
import { LogModal } from './logModal'
import { InfoModal } from './infoModal'

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
    Idle,
    ChooseEnemy,
    Visualizing,
    Ended
}

class CombatScene extends Scene {

    private combat: Combat
    state = CombatSceneState.Idle
    widgets: {
        enemyList: EnemyList,
        messaging: MessagingWidget,
        player: PlayerWidget,
        abilityList: AbilityList,
        demonEnergyList: DemonEnergyList
    }
    modals: {
        info: InfoModal,
        log: LogModal
    }
    visualizer: Visualizer

    constructor(combat: Combat) {
        super('combat')
        this.combat = combat
        this.visualizer = new Visualizer(this)
        this.element.addEventListener('click', e => {
            if(e.target instanceof Element) {
                const closest = e.target.closest('.clickable,.selectable')
                if (!closest) {
                    this.resetState()
                }
            }
        })
    }

    begin(): void {
        this.populate()
        this.combat.init()
        this.widgets.demonEnergyList.selectIndex(0)
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
        this.modals = {
            info: new InfoModal(),
            log: new LogModal()
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
        abilityList.listItemRightClicked.on(ab => {
            this.modals.info.showAbility(ab.abilityInstance)
        })
        this.find('.ability-list').replaceWith(abilityList.element)
        return abilityList
    }

    private makeDemonEnergyList(): DemonEnergyList {
        const demonList = new DemonEnergyList()
        demonList.setContents(this.combat.playerCombatant.demonInstances)
        demonList.listItemSelected.on(dme => {
            this.widgets.abilityList.setContents(dme.demonInstance.abilityInstances)
            this.resetState()
        })
        demonList.listItemRightClicked.on(demon => {
            this.modals.info.showDemon(demon.demonInstance)
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
        enemyList.listItemRightClicked.on(enemy => {
            this.modals.info.showEnemy(enemy.enemyCombatant)
        })
        this.find('.enemy-list').replaceWith(enemyList.element)
        return enemyList
    }

    async useAbility(ability: DemonAbilityInstance, enemyCombatant?: EnemyCombatant): Promise<void> {
        const results = this.combat.useAbility(ability, enemyCombatant)
        this.widgets.abilityList.update()
        for(let i = 0; i < results.length; i++){
            const r = results[i]
            this.modals.log.addResult(r)
            await this.visualizer.visualizeResult(r)
        }
        // TODO: deal with endings
        this.setState(CombatSceneState.Idle)
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
        const player = new PlayerWidget(this, this.combat.playerCombatant)
        this.find('.player').replaceWith(player.element)
        return player
    }

    private setState(state: CombatSceneState){
        this.state = state
        if(state === CombatSceneState.ChooseEnemy){
            this.widgets.messaging.displayMessage('Select an enemy')
            this.widgets.enemyList.addClassAll('clickable')
        }else if(state === CombatSceneState.Idle){
            this.widgets.messaging.clear()
            this.widgets.enemyList.removeClassAll('clickable')
        }
    }

    private resetState(){
        if(this.state === CombatSceneState.Idle ||
            this.state === CombatSceneState.Ended ||
            this.state === CombatSceneState.Visualizing ||
            this.combat.finished){
            return
        }
        this.setState(CombatSceneState.Idle)
    }
}

export { CombatScene }