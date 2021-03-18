import '../../styles/effects/flyingText.sass'
import { DemonoEffect } from './demonoEffect'

enum FlyingTextDirection {
    Down = 'down'
}

interface FlyingTextEffectArgs {
    message: string
    color: string
    direction: FlyingTextDirection
    origin: DOMRect
}

const EFFECT_HTML = (args: FlyingTextEffectArgs) => `
<span style='color:${args.color};'>${args.message}</span>
`

class FlyingTextEffect extends DemonoEffect {

    readonly direction: FlyingTextDirection

    constructor(args: FlyingTextEffectArgs){
        super('flying-text-effect', {
            x: args.origin.x + args.origin.width / 2,
            y: args.origin.y + args.origin.height / 2
        })
        this.element.innerHTML = EFFECT_HTML(args)
        this.direction = args.direction
    }

    start(): void{
        const currentTransform = getComputedStyle(this.element).transform
        this.element.style.transform = currentTransform + ' translateY(3rem)'
        this.element.style.opacity = '0'
    }
}

export { FlyingTextEffect, FlyingTextDirection }