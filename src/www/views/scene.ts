import { Player } from 'game/models/player/player'
import { DemonoWidget } from './demonoWidget'

abstract class Scene extends DemonoWidget {

    constructor(className: string) {
        super('scene ' + className)
    }

    abstract begin(): void
}

export { Scene }