const modelRegistry: RegistryObj = {}
let nextId = 1

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
            const parentModel = el.parentElement.closest('demono.model')
            if(!parentModel || parentModel === this.element){
                views.push(el)
            }
        })
        return views
    }
}

abstract class ModelView<T> extends DemonoView {

    registryId: string

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

        this.registryId = 'd' + nextId++
        modelRegistry[this.registryId] = this
        this.element.setAttribute('model-id', this.registryId)

        this.model = model
        this.makeContents()
    }

    protected abstract makeContents(): void

    public getData(key: string): string {
        const result = this.getDataFromObject<T>(this.model, key)
        if(!result){
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

    update(): void {
        this.element.querySelectorAll('[data-key]').forEach(el => {
            const model = el.parentElement.closest('demono.model')
            if(model !== this.element){
                return
            }
            el.textContent = this.getData(el.getAttribute('data-key'))
        })
        super.update()
    }
}

interface RegistryObj {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: ModelView<any>
}

export { DemonoView, ModelView }