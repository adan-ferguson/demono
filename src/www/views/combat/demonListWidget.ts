import { BarWidget } from '../barWidget'
import { DemonoWidget } from '../demonoWidget'
import { PlayerCombatant } from 'game/models/combat/playerCombatant'

class DemonListWidget extends DemonoWidget {

    constructor(readonly player: PlayerCombatant){
        super('demon-list')

        player.demonInstances.forEach(demonInstance => {
            const wrapper = document.createElement('div')
            const energyBar = new BarWidget(
                () => demonInstance.energy,
                () => demonInstance.maxEnergy, {
                    showMax: true,
                    label: demonInstance.demon.name
                })
            wrapper.append(energyBar.element)
            this.element.append(wrapper)
        })
    }

    update(): void {
        this.findAll('.bar').forEach((el, index) => {
            const active = this.player.currentDemonIndex === index
            if(active){
                el.classList.add('active')
            }else{
                el.classList.remove('active')
            }
        })
        super.update()
    }
}

export { DemonListWidget }