import { DemonoView } from './demonoView'

interface RegistryObj {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: ModelView<any>
}

const modelRegistry: RegistryObj = {}

let nextId = 1

abstract class ModelView<T> extends DemonoView {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static getFromRegistry(el: Element): ModelView<any> {
        const registryId = el.getAttribute('model-id')
        const modelElement = modelRegistry[registryId]
        if(!modelElement){
            throw 'Model Element not found.'
        }
        return modelElement
    }

    protected model: T

    constructor(model: T, className: string){
        super('model ' + className)

        const registryId = 'd' + nextId++
        modelRegistry[registryId] = this
        this.element.setAttribute('model-id', registryId)

        this.model = model
        this.makeContents()
    }

    protected abstract makeContents(): void

    public update(): void {
        const bindedEls = this.element.querySelectorAll(':not(.model) [data-key], [data-key]')
        bindedEls.forEach(el => {
            const key = el.getAttribute('data-key')
            if (key in this.model) {
                el.textContent = this.model[key as keyof T].toString()
            }
        })

        const nestedModelEls = this.element.querySelectorAll('demono.model')
        nestedModelEls.forEach(modelEl => {
            ModelView.getFromRegistry(modelEl).update()
        })
    }
}

export { ModelView }