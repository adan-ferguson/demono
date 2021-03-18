import { LiteEvent } from 'game/models/liteEvent'

abstract class DemonoWidget {

    element: HTMLElement
    clicked = new LiteEvent()
    rightclicked = new LiteEvent()

    constructor(className: string){
        this.element = document.createElement('demono')
        this.element.classList.add(...className.trim().split(' '))
        this.element.addEventListener('click', () => {
            if(this.hasClass('clickable') || this.hasClass('selectable')){
                this.clicked.trigger()
            }
        })
        this.element.addEventListener('contextmenu', e => {
            if(this.hasClass('rightclickable')){
                e.preventDefault()
                this.rightclicked.trigger()
            }
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