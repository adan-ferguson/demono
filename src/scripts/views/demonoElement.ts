abstract class DemonoElement {

    public element: Element

    constructor(className: string){
        this.element = document.createElement('demono')
        this.element.classList.add(...className.trim().split(' '))
    }
}

export { DemonoElement }