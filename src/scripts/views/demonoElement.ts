abstract class DemonoElement {

    element: HTMLElement

    constructor(className: string){
        this.element = document.createElement('div')
        this.element.classList.add(...className.split(' '))
    }
}

export { DemonoElement }