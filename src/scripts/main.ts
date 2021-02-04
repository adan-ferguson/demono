import '../styles/main.sass'
import Combat from './combat'
import CombatScene from './scenes/combat'
import Scene from './scenes/scene'
import {test as testEncounter} from '../data/encounters.json'
import Squad from './squad'
import { Encounter } from './encounter'

const mainEl:HTMLElement = document.createElement('main')
mainEl.innerHTML = `
<div class="scene"></div>
`

document.body.prepend(mainEl)

const encounter = Encounter.createFromData(testEncounter)
const testCombat = new Combat(encounter, new Squad())
const testCombatScene = new CombatScene(testCombat)
setScene(testCombatScene)

function setScene(scene: Scene){
    const newSceneEl = document.createElement('div')
    newSceneEl.classList.add('scene')
    scene.populateSceneElement(newSceneEl)
    mainEl.querySelector('.scene').replaceWith(newSceneEl)
}