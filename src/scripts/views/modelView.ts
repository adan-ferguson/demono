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

    public getData(key: string): string {
        const result = this.getDataFromObject<T>(this.model, key)
        if(result === null){
            console.error(`Invalid data-key value for ${this.model.constructor.name}: ${key}`)
        }
        return result
    }

    protected getDataFromObject<Type>(obj: Type, key: string): string | null {
        if(key in obj){
            return obj[key as keyof typeof obj].toString()
        }
        return null
    }
}

export { ModelView }