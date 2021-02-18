import { DemonoView } from './demonoView'

abstract class Scene extends DemonoView {

    constructor(className: string) {
        super('scene ' + className)
    }

    abstract begin(): void
}

export { Scene }