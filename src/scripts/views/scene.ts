import { DemonoView } from './demonoView'
import { ModelView } from './modelView'

abstract class Scene extends DemonoView {

    constructor(className: string) {
        super('scene ' + className)
    }

    public fullUpdate(): void {
        this.element.querySelectorAll('[data-key]').forEach(el => {
            const model = el.closest('demono.model')
            if(!model){
                console.log(`Element with data-key=${el.getAttribute('data-key')} is not in a model view.`)
                return
            }
            const view = ModelView.getFromRegistry(model)
            const key = el.getAttribute('data-key')
            el.textContent = view.getData(key)
        })
    }

    abstract begin(): void
}

export { Scene }