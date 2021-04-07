import '../styles/gameContainer.sass'

import { DemonoWidget } from './demonoWidget'
import { LoadGameScene } from './minorScenes/loadGameScene'
import { Player } from 'game/models/player'
import { Scene } from './scene'

const HTML = `
<div class="scene"></div>
`
class GameContainer extends DemonoWidget {

    private players: Player[]

    constructor() {
        super('game-container')
        this.element.innerHTML = HTML
        this.players = loadPlayers()
    }

    start(): void {
        const loadGameScene = new LoadGameScene(this.players)
        loadGameScene.slotSelected.on(slot => {
            this.loadSlot(slot)
        })
        this.setScene(loadGameScene)
    }

    private loadSlot(slot: number): void {
        if(!isValidSlotNumber(slot)){
            throw 'Invalid slot number ' + slot
        }
    }

    private setScene(scene: Scene){
        const sceneEl = this.element.querySelector('.scene')
        if(!sceneEl){
            throw 'Error while trying to replace scenes.'
        }
        sceneEl.replaceWith(scene.element)
        scene.begin()
    }
}

function loadPlayers(){
    const serializedPlayers =  window.JSON.parse(window.localStorage.getItem('players') || '[]')
    const players: Player[] = []
    for(let i = 0; i < 3; i++){
        players[i] = new Player(serializedPlayers[i])
    }
    return players
}

function isValidSlotNumber(slot: number): boolean {
    return Number.isInteger(slot) && slot >= 0 && slot <= 2
}

export { GameContainer }