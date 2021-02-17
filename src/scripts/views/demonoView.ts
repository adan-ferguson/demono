import { ModelView } from './modelView'

abstract class DemonoView {

    public element: Element

    constructor(className: string){
        this.element = document.createElement('demono')
        this.element.classList.add(...className.trim().split(' '))
    }

    update(): void {
        this.getModelElements().forEach(el => {
            ModelView.getFromRegistry(el).update()
        })
    }

    /**
     * Get model elements which are children of this model element, but
     * aren't children of another model element.
     */
    protected getModelElements(): Element[] {
        const views: Element[] = []
        this.element.querySelectorAll('demono.model').forEach(el => {
            const closest = el.closest('demono.model')
            if(!closest || closest === this.element){
                views.push(closest)
            }
        })
        return views
    }
}

export { DemonoView }