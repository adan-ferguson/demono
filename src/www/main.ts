import './styles/main.sass'
import { CombatScene } from './views/combat/combatScene'
import { Scene } from './views/scene'

import { Encounter } from '../game/models/encounters/encounter'
import { Combat } from '../game/models/combat/combat'
import { Player } from '../game/models/player'

const mainEl:HTMLElement = document.createElement('main')
mainEl.innerHTML = `
<div class="scene"></div>
`

document.body.prepend(mainEl)

const encounter = Encounter.loadFromId('test')
const player = loadPlayer()

const testCombat = new Combat(encounter, player)
const testCombatScene = new CombatScene(testCombat)
setScene(testCombatScene)

function setScene(scene: Scene){
    mainEl.querySelector('.scene').replaceWith(scene.element)
    scene.begin()
}

function loadPlayer(){
    const str = window.localStorage.getItem('player')
    if(str){
        const playerDef = window.JSON.parse(str)
        return new Player(playerDef)
    }
    return new Player({
        name: 'Sample',
        experience: 0,
        demons: [
            {
                name: 'Bipbop',
                classId: 'brawler'
            }
        ]
    })
}