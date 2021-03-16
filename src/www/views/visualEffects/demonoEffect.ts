import { DemonoWidget } from '../demonoWidget'

interface Coords {
    x: number,
    y: number
}

abstract class DemonoEffect extends DemonoWidget {

    protected destination: Coords

    constructor(className: string, readonly origin: Coords, readonly duration = 2000){
        super(className)
        this.element.style.transition = `all ${duration/1000}s ease`
        this.setPosition(this.origin)
    }

    run(): void {
        document.querySelector('body')?.appendChild(this.element)
        requestAnimationFrame(() => {
            this.start()
            setTimeout(() => {
                this.element.remove()
            }, this.duration)
        })
    }

    protected setPosition(coords: Coords): void {
        this.element.style.left = coords.x + 'px'
        this.element.style.top = coords.y + 'px'
    }

    protected abstract start(): void
}

export { DemonoEffect }