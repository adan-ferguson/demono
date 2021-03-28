import '../../styles/combat/messaging.sass'
import { DemonoWidget } from '../demonoWidget'

class MessagingWidget extends DemonoWidget {

    constructor() {
        super('messaging')
    }

    clear(): void {
        this.element.innerHTML = ''
    }

    displayMessage(message: string): void {
        this.element.textContent = message
        this.addClass('shown')
    }
}

export { MessagingWidget }