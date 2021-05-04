import { DemonoWidget } from './demonoWidget'
import { GameContainer } from './gameContainer'

abstract class Scene extends DemonoWidget {

    gameContainer: GameContainer

    constructor(className: string) {
        super('scene ' + className)
    }

    abstract begin(): void
}

export { Scene }