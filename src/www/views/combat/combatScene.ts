import '../../styles/combat/combat.sass'
import { Scene } from '../scene'
import { Combat } from 'game/models/combat/combat'
import { EnemyCombatantWidget } from './enemyCombatantWidget'
import { PlayerCombatantWidget } from './playerCombatantWidget'
import { DemonEnergyWidget } from './demonEnergyWidget'
import { AbilityWidget } from './abilityWidget'
import { DemonInstance } from 'game/models/combat/demonInstance'
import { DemonoWidget } from '../demonoWidget'

const COMBAT_HTML = `
<div class="combat-zone">
    <div class="enemies"></div>
    <div class="messaging"></div>
    <div class="player"></div>
</div>
<div class="actions">
    <div class="abilities"></div>
    <div class="demon-list"></div>
</div>
`

class CombatScene extends Scene {

    private combat: Combat
    abilities: AbilityWidget
    demonList: DemonEnergyWidget
    selectedDemon: DemonInstance

    constructor(combat: Combat){
        super('combat')
        this.combat = combat
    }

    begin(): void {
        this.populate()
        this.combat.init()
        this.selectDemon(this.combat.playerCombatant.currentDemonInstance)
        this.update()
    }

    private populate(): void {
        this.element.innerHTML = COMBAT_HTML

        const enemiesEl = this.find('.enemies')
        this.combat.enemyCombatants.forEach(enemyCombatant => {
            enemiesEl.append(new EnemyCombatantWidget(enemyCombatant).element)
        })

        this.find('.player')
            .append(new PlayerCombatantWidget(this.combat.playerCombatant).element)

        const demonList = this.find('.demon-list')
        this.combat.playerCombatant.demonInstances.forEach(demonInstance => {
            const dme = new DemonEnergyWidget(demonInstance)
            demonList.append(dme.element)
            dme.clickEvent.on(() => {
                this.selectDemon(demonInstance)
            })
        })
    }

    update(): void {
        super.update()
    }

    private selectDemon(demonInstance: DemonInstance){

        if(this.selectedDemon === demonInstance){
            return
        }

        this.selectedDemon = demonInstance
        this.updateSelectedDemonEnergyBar()
        this.populateAbilities()
    }

    private populateAbilities() {
        const abilities = this.find('.abilities')
        abilities.innerHTML = ''
        this.selectedDemon.abilityInstances.forEach(instance => {
            const ab = new AbilityWidget(instance)
            abilities.append(ab.element)
            ab.clickEvent.on(() => {
                if(!instance.canBeActivated) {
                    return
                }
                if(instance.ability.choiceRequirement !== false){
                    // ?
                    return
                }
                this.combat.useAbility(instance)
            })
        })
    }

    private updateSelectedDemonEnergyBar() {
        const demonEls = this.findAll('demono.demon-energy')
        demonEls.forEach(demonEl => {
            const dew = DemonoWidget.getFromRegistry<DemonEnergyWidget>(demonEl)
            if(dew.demonInstance === this.selectedDemon){
                demonEl.classList.add('selected')
            }else{
                demonEl.classList.remove('selected')
            }
        })
    }
}

export { CombatScene }