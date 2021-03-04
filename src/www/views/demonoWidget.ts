import { LiteEvent } from 'game/models/liteEvent'

interface Registry {
    [key: string]: DemonoWidget
}

const demonoRegistry: Registry = {}
let nextId = 1

abstract class DemonoWidget {

    static getFromRegistry<T extends DemonoWidget = DemonoWidget>(el: Element): T | null{
        const registryId = el.getAttribute('demono-id')
        if(!registryId){
            return null
        }
        const demonoElement = demonoRegistry[registryId] as T
        if(!demonoElement){
            return null
        }
        return demonoElement
    }

    element: Element
    registryId: string
    clicked = new LiteEvent()

    constructor(className: string){
        this.element = document.createElement('demono')
        this.element.classList.add(...className.trim().split(' '))

        this.registryId = 'd' + nextId++
        demonoRegistry[this.registryId] = this
        this.element.setAttribute('demono-id', this.registryId)

        this.element.addEventListener('click', () => {
            if(this.hasClass('clickable') || this.hasClass('selectable')){
                this.clicked.trigger()
            }
        })
    }

    update(): void {
        this.getChildDemonoElements().forEach(el => {
            DemonoWidget.getFromRegistry(el)?.update()
        })
    }

    protected find(querySelector: string): HTMLElement {
        const result = this.element.querySelector<HTMLElement>(querySelector)
        if(result === null){
            console.error(`Error finding element with query selector ${querySelector}`)
            return document.createElement('div')
        }
        return result
    }

    protected findAll(querySelector: string): HTMLElement[] {
        const result = this.element.querySelectorAll<HTMLElement>(querySelector)
        return [...result]
    }

    protected findWidgets<T extends DemonoWidget = DemonoWidget>(querySelector = 'demono'): T[] {
        return this
            .findAll(querySelector)
            .map(el => DemonoWidget.getFromRegistry<T>(el))
            .filter(notNull)
        function notNull(val: T | null): val is T {
            return val !== null
        }
    }

    protected getChildDemonoElements(): Element[] {
        const views: Element[] = []
        this.element.querySelectorAll('demono').forEach(el => {
            const parentEl = el.parentElement?.closest('demono')
            if(parentEl === this.element){
                views.push(el)
            }
        })
        return views
    }

    public setClass(className: string, val: boolean): void {
        if(val){
            this.addClass(className)
        }else{
            this.removeClass(className)
        }
    }

    public addClass(className: string): void {
        this.element.classList.add(className)
    }

    public removeClass(className: string): void {
        this.element.classList.remove(className)
    }

    public hasClass(className: string): boolean {
        return this.element.classList.contains(className)
    }
}

export { DemonoWidget }