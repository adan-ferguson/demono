import { Result } from 'game/models/combat/combat'
import { DamageResult } from 'game/models/combat/damage'
import { ActivateAbilityResult } from 'game/models/combat/demon/demonAbilityInstance'
import { EnergyChangeResult } from 'game/models/combat/demon/demonInstance'
import { DemonoWidget } from '../demonoWidget'
import { LogWidget } from './logWidget'

const HTML = `
<div class='display'></div>
<div class='log'></div>
`

class MessagingWidget extends DemonoWidget {

    private log: LogWidget

    constructor() {
        super('messaging')
        this.element.innerHTML = HTML
        this.log = new LogWidget()
        this.find('.log').replaceWith(this.log.element)
        this.setMode('hidden')
    }

    displayMessage(message: string): void {
        this.find('.display').textContent = message
        this.setMode('display')
    }

    setMode(mode: 'display' | 'log' | 'hidden'): void {
        this.element.setAttribute('mode', mode)
    }

    addResultToLog(result: Result): void {
        this.log.addResult(result)
        this.setMode('log')
    }
}

export { MessagingWidget }