import '../styles/main.sass'
import { CombatScene } from './views/combat/combatScene'
import { Scene } from './views/scene'
import { test as testEncounter } from '../data/encounters.json'

import { Encounter } from './models/encounter'
import { Combat } from './models/combat'
import { Player } from './models/player'

const mainEl:HTMLElement = document.createElement('main')
mainEl.innerHTML = `
<div class="scene"></div>
`

document.body.prepend(mainEl)

const encounter = Encounter.createFromData(testEncounter)
const player = loadPlayer()

const testCombat = new Combat(encounter, player)
const testCombatScene = new CombatScene(testCombat)
setScene(testCombatScene)

function setScene(scene: Scene){
    mainEl.querySelector('.scene').replaceWith(scene.element)
    scene.begin()
}

function loadPlayer(){
    const player = new Player()
    const str = window.localStorage.getItem('player')
    if(str){
        const playerDef = window.JSON.parse(str)
        player.deserialize(playerDef)
    }
    return player
}