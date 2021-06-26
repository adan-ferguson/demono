import { Player } from 'game/models/player/player'
import { Scene } from '../scene'
import { EncounterSelectScene } from './encounterSelectScene'
import { LoadoutScene } from './loadoutScene'
import { TypedEvent } from 'game/liteEvent'

class DashboardScene extends Scene {

    readonly nextSceneSelected = new TypedEvent<Scene>()

    constructor(readonly player: Player) {
        super('dashboard-scene')
    }

    begin(): void {
        this.loadoutSceneButton()
        this.encounterSelectButton()
    }

    private encounterSelectButton() {
        const btn = this.makeButton('Encounters', new EncounterSelectScene(this.player))
        if(!this.player.selectedLoadout){
            btn.disabled = true
            btn.title = 'Select a loadout first'
        }
    }

    private loadoutSceneButton() {
        const btn = this.makeButton('Loadouts', new LoadoutScene((this.player)))
        if(!this.player.flags.tutorialComplete){
            btn.disabled = true
        }
    }

    private makeButton(text: string, scene: Scene) {
        const btn = document.createElement('button')
        btn.textContent = text
        this.element.appendChild(btn)
        btn.addEventListener('click', () => {
            this.nextSceneSelected.trigger(scene)
        })
        return btn
    }
}

export { DashboardScene }