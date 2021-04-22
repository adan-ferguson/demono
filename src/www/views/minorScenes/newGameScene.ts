import { Scene } from '../scene'
import { LiteEvent } from 'game/models/liteEvent'
import { Player } from 'game/models/player'

const HTML = `
<input type="text" placeholder="Enter your name..."/>
`

class NewGameScene extends Scene {

    readonly playerSetupFinished = new LiteEvent()

    constructor(readonly player: Player) {
        super('new-game-scene')
    }

    begin(): void {
        this.element.innerHTML = HTML
        const input = this.find('input') as HTMLInputElement
        this.element.addEventListener('keypress', e => {
            if(e.key === 'Enter' && input.value.length){
                this.player.name = input.value
                this.playerSetupFinished.trigger()
            }
        })
    }
}

export { NewGameScene }