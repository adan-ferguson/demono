import '../styles/main.sass'
import Combat from './combat'
import CombatScene from './scenes/combat'
import Scene from './scenes/scene'
import {encounters} from '../../dist/data.json'
import Squad from './squad'

const mainEl:HTMLElement = document.createElement('main')
mainEl.innerHTML = `
<div class="scene"></div>
`

document.body.prepend(mainEl)

const testCombat = new Combat(Encounter.createFromData(encounters.test), new Squad())
const testCombatScene = new CombatScene(testCombat)
setScene(testCombatScene)

function setScene(scene: Scene){
    const newSceneEl = document.createElement('div')
    newSceneEl.classList.add('scene')
    scene.populateSceneElement(newSceneEl)
    mainEl.querySelector('.scene').replaceWith(newSceneEl)
}