import { Result } from 'game/models/combat/combat'
import { DemonoWidget } from '../demonoWidget'

class MessagingWidget extends DemonoWidget {

    constructor() {
        super('messaging')
    }

    setMessage(message: string): void {
        this.element.textContent = message
    }

    addResult(r: Result): void {

    }
}

export { MessagingWidget }