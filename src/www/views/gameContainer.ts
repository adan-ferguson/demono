import '../styles/gameContainer.sass'

import { DemonoWidget } from './demonoWidget'
import { LoadGameScene } from './minorScenes/loadGameScene'
import { Player } from 'game/models/player/player'
import { Scene } from './scene'
import { NewGameScene } from './minorScenes/newGameScene'
import { SceneManager } from 'www/sceneManager'
import { DashboardScene } from './dashboard/dashboardScene'

const HTML = `
<div class="scene"></div>
`
class GameContainer extends DemonoWidget {

    private players: Player[]
    private player: Player
    private saveSlot: number
    private currentScene: Scene
    private sceneManager: SceneManager

    constructor() {
        super('game-container')
        this.element.innerHTML = HTML
        this.players = loadPlayers()
        this.sceneManager = new SceneManager(this.find('.scene'))
    }

    start(): void {
        const loadGameScene = new LoadGameScene(this.players)
        loadGameScene.slotSelected.on(slot => {
            this.loadSlot(slot)
        })
        this.sceneManager.setScene(loadGameScene)
    }

    private loadSlot(slot: number): void {
        if(!isValidSlotNumber(slot)){
            throw 'Invalid slot number ' + slot
        }
        this.saveSlot = slot
        this.player = this.players[slot]
        if(this.player.isNew()){
            this.newGame()
        }else{
            this.startGame()
        }
    }

    private newGame(): void {
        const newGameScene = new NewGameScene(this.player)
        newGameScene.playerSetupFinished.on(() => {
            this.startGame()
        })
        this.sceneManager.setScene(newGameScene)
    }

    private startGame(): void {
        const dashboardScene = new DashboardScene(this.player)
        dashboardScene.nextSceneSelected.on(scene => {
            this.sceneManager.setScene(scene)
        })
        this.sceneManager.setScene(dashboardScene)
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