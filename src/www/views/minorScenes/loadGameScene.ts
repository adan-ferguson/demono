import '../../styles/loadGameScene.sass'

import { Scene } from '../scene'
import { Player } from 'game/models/player/player'
import { DemonoWidget } from '../demonoWidget'
import { DemonoList } from '../demonoList'
import { TypedEvent } from 'game/liteEvent'

const EMPTY_SLOT_HTML = `
<div class='slot empty-slot'>New Game</div>
`

const FILLED_SLOT_HTML = (player: Player) => `
<div class='slot'>${player.name} (lvl ${player.level})</div>
`

class LoadGameScene extends Scene {

    readonly slotSelected = new TypedEvent<number>()

    constructor(readonly players: Player[]) {
        super('load-game-scene')
    }

    begin(): void {
        const list = new PlayerList(this.players)
        this.element.append(list.element)
        list.listItemClicked.on(playerSlot => {
            const player = playerSlot.player
            const slot = this.players.indexOf(player)
            this.slotSelected.trigger(slot)
        })
    }
}

class PlayerSlot extends DemonoWidget {
    constructor(readonly player: Player){
        super('player-slot')
        this.addClass('clickable')
        this.element.innerHTML = player.isNew() ? EMPTY_SLOT_HTML : FILLED_SLOT_HTML(player)
    }
}

class PlayerList extends DemonoList<PlayerSlot> {
    constructor(readonly players: Player[]){
        super('player-list')
        players.forEach(player => {
            this.add(new PlayerSlot(player))
        })
    }
}

export { LoadGameScene }