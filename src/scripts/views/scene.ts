import { DemonoView } from './demonoView'
import { ModelView } from './modelView'

abstract class Scene extends DemonoView {

    constructor(className: string) {
        super('scene ' + className)
    }

    abstract begin(): void
}

export { Scene }