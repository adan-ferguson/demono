import { Result } from 'game/models/combat/combat'
import { DamageResult } from 'game/models/combat/damage'
import { ActivateAbilityResult } from 'game/models/combat/demon/demonAbilityInstance'
import { EnergyChangeResult } from 'game/models/combat/demon/demonInstance'
import { DemonoWidget } from '../demonoWidget'
import { LogWidget } from './logWidget'

const HTML = `
<div class='display'></div>
<div class='log'></div>
<button class='toggle-log'>Log</button>
`

class MessagingWidget extends DemonoWidget {

    private log: LogWidget
    private logVisible: boolean

    constructor() {
        super('messaging')
        this.element.innerHTML = HTML
        this.log = new LogWidget()
        this.find('.log').replaceWith(this.log.element)
        this.setMode('hidden')
        this.logVisible = false

        this.find('.toggle-log').addEventListener('click', () => {
            this.logVisible = !this.logVisible
            this.setMode(this.logVisible ? 'log' : 'hidden')
        })
    }

    hideDisplay(): void {
        this.setMode(this.logVisible ? 'log' : 'hidden')
    }

    displayMessage(message: string): void {
        this.find('.display').textContent = message
        this.setMode('display')
    }

    addResultToLog(result: Result): void {
        this.log.addResult(result)
    }

    private setMode(mode: 'display' | 'log' | 'hidden'): void {
        this.element.setAttribute('mode', mode)
    }
}

export { MessagingWidget }