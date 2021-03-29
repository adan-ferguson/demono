import '../../styles/effects/flyingText.sass'
import { Coords, DemonoEffect } from './demonoEffect'

enum FlyingTextDirection {
    Down = 'down',
    Up = 'up'
}

interface FlyingTextEffectArgs {
    message: string
    color?: string
    direction: FlyingTextDirection
    origin: DOMRect,
    duration?: number,
    distance?: number
}

const EFFECT_HTML = (color: string, message: string) => `
<span style='color:${color};'>${message}</span>
`

class FlyingTextEffect extends DemonoEffect {

    readonly direction: FlyingTextDirection
    readonly distance: number

    constructor(args: FlyingTextEffectArgs){
        super('flying-text-effect', getOrigin(args), args.duration || undefined)
        this.element.innerHTML = EFFECT_HTML(args.color || 'black', args.message)
        this.direction = args.direction
        this.distance = args.distance || 5
    }

    protected start(): void{
        const currentTransform = getComputedStyle(this.element).transform
        const distance = this.distance * (this.direction === FlyingTextDirection.Down ? 1 : -1)
        const translateStr = ` translateY(${distance}rem)`
        this.element.style.transform = currentTransform + translateStr
        this.element.style.opacity = '0'
    }
}

function getOrigin(args: FlyingTextEffectArgs): Coords {
    if(args.direction === FlyingTextDirection.Down){
        return  {
            x: args.origin.x + args.origin.width / 2,
            y: args.origin.y + args.origin.height
        }
    }else{
        return  {
            x: args.origin.x + args.origin.width / 2,
            y: args.origin.y
        }
    }
}

export { FlyingTextEffect, FlyingTextDirection }