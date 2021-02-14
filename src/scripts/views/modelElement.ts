import { DemonoElement } from './demonoElement'

abstract class ModelElement<T> extends DemonoElement {

    model: T

    constructor(model: T, className: string){
        super(className)
        this.model = model
        this.makeContents()
    }

    abstract makeContents(): void
}

export { ModelElement }