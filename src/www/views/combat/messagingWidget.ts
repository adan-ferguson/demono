import { DemonoWidget } from '../demonoWidget'

class MessagingWidget extends DemonoWidget {

    constructor() {
        super('messaging')
    }

    setMessage(message: string): void {
        this.element.textContent = message
    }
}

export { MessagingWidget }