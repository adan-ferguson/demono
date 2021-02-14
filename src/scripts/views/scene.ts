import { DemonoElement } from './demonoElement'

abstract class Scene extends DemonoElement {

    constructor(className: string) {
        super('scene ' + className)
    }

    abstract begin(): void
}

export { Scene }