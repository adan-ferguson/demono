import { DemonoWidget } from '../demonoWidget'

class MessagingWidget extends DemonoWidget {

    constructor() {
        super('messaging')
    }

    hideDisplay(): void {
        this.removeClass('shown')
    }

    displayMessage(message: string): void {
        this.find('.display').textContent = message
        this.addClass('shown')
    }
}

export { MessagingWidget }