import Scene from './scene'
import Combat from '../combat'

const COMBAT_HTML = `
<div class="top">
    Top Part
</div>
<div class="Bottom">
    Bottom Part
</div>
`

export default class CombatScene extends Scene {

    constructor(combat: Combat){
        super()
    }

    populateSceneElement(sceneEl: HTMLElement): void {
        sceneEl.innerHTML = COMBAT_HTML
    }
}