import { LiteEvent } from "game/models/liteEvent"

interface Registry {
    [key: string]: DemonoWidget
}

const demonoRegistry: Registry = {}
let nextId = 1

abstract class DemonoWidget {

    static getFromRegistry<T extends DemonoWidget>(el: Element): T {
        const registryId = el.getAttribute('demono-id')
        if(!registryId){
            throw 'DemonoWidget not found.'
        }
        const demonoElement = demonoRegistry[registryId] as T
        if(!demonoElement){
            throw 'DemonoWidget not found.'
        }
        return demonoElement
    }

    element: Element
    registryId: string

    constructor(className: string){
        this.element = document.createElement('demono')
        this.element.classList.add(...className.trim().split(' '))

        this.registryId = 'd' + nextId++
        demonoRegistry[this.registryId] = this
        this.element.setAttribute('demono-id', this.registryId)
    }

    update(): void {
        this.getChildDemonoElements().forEach(el => {
            DemonoWidget.getFromRegistry(el).update()
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
}

export { DemonoWidget }