import '../../styles/combat/combat.sass'
import { Scene } from '../scene'
import { Combat } from 'game/models/combat/combat'
import { EnemyWidget } from './enemyWidget'
import { PlayerWidget } from './playerWidget'
import { AbilityWidget } from './abilityWidget'
import { DemonAbilityInstance } from 'game/models/combat/demonAbilityInstance'
import { MessagingWidget } from './messagingWidget'
import { EnemyList } from './enemyList'
import { DemonEnergyList } from './demonEnergyList'
import { AbilityList } from './abilityList'

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

interface State {
    type: 'idle' | 'chooseEnemy',
    pendingAbility?: DemonAbilityInstance
}

interface ChooseEnemyState extends State {
    type: 'chooseEnemy',
    pendingAbility: DemonAbilityInstance
}

class CombatScene extends Scene {

    private combat: Combat
    state: State
    widgets: {
        enemyList: EnemyList,
        messaging: MessagingWidget,
        player: PlayerWidget,
        abilityList: AbilityList,
        demonEnergyList: DemonEnergyList
    }

    constructor(combat: Combat){
        super('combat')
        this.combat = combat
        this.state = {
            type: 'idle'
        }
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
            if(instance.ability.choiceRequirement === 'enemy'){
                this.setState({
                    type: 'chooseEnemy',
                    pendingAbility: instance
                })
            }else{
                this.combat.useAbility(instance)
            }
        })
        return abilityList
    }

    private makeDemonEnergyList(): DemonEnergyList {
        const demonList = new DemonEnergyList()
        demonList.setContents(this.combat.playerCombatant.demonInstances)
        demonList.listItemClicked.on(dme => {
            demonList.select(dme)
        })
        demonList.listItemSelected.on(dme => {
            this.widgets.abilityList.setContents(dme.demonInstance.abilityInstances)
        })
        return demonList
    }

    private makeEnemyList(): EnemyList {
        const enemyList = new EnemyList()
        enemyList.setContents(this.combat.enemyCombatants)
        enemyList.listItemClicked.on(enemyWidget => {
            if(this.state as ChooseEnemyState){
                this.combat.useAbility((this.state as ChooseEnemyState).pendingAbility, enemyWidget.enemyCombatant)
            }
        })
        this.find('.enemies').replaceWith(enemyList.element)
        return enemyList
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

    update(): void {
        super.update()
    }

    private setState(state: State){
        this.state = state

        if(state.type === 'chooseEnemy'){
            this.widgets.messaging.setMessage('Select an enemy')
            this.widgets.enemyList.addClassAll('clickable')
        }
    }
}

export { CombatScene }