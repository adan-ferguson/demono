import { DemonoView } from './demonoView'

/* eslint-disable @typescript-eslint/ban-types */
abstract class ModelView<T extends Object> extends DemonoView {

    protected model: T

    constructor(model: T, className: string){
        super('model ' + className)
        this.model = model
        this.makeContents()
    }

    protected abstract makeContents(): void

    public getData(key: string): string {
        let result = this.getDataFromObject(this.model, key)
        if(result === null){
            console.error(`Invalid data-key value for ${this.model.constructor.name}: ${key}`)
            result = ''
        }
        return result
    }

    protected getDataFromObject(obj: Object, key: string): string | null {
        if(key in obj){
            return obj[key as keyof typeof obj].toString()
        }
        return null
    }

    update(): void {
        this.element.querySelectorAll('[data-key]').forEach(el => {
            const model = el.parentElement?.closest('demono.model')
            if(model !== this.element){
                return
            }
            el.textContent = this.getData(<string>el.getAttribute('data-key'))
        })
        super.update()
    }
}

export { ModelView }