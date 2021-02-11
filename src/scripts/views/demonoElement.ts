abstract class DemonoElement<T> extends HTMLElement {

    model: T

    constructor(model: T){
        super()
        this.model = model
        this.makeContents()
    }

    abstract makeContents(): void
}

export { DemonoElement }