import { DemonoWidget } from './demonoWidget'
import '../styles/common/modal.sass'

const modalWrapper = document.createElement('div')
modalWrapper.classList.add('modal-wrapper')
modalWrapper.addEventListener('click', e => {
    if(e.target instanceof Element && e.target.classList.contains('modal-wrapper')){
        hideModal()
    }
})

function hideModal(): void {
    modalWrapper.remove()
    modalWrapper.innerHTML = ''
}

abstract class Modal extends DemonoWidget {

    wrapper: HTMLDivElement

    constructor(className: string){
        super('modal ' + className)
    }

    show(): void{
        modalWrapper.append(this.element)
        document.querySelector('body')?.append(modalWrapper)
    }

    hide(): void {
        hideModal()
    }
}

export { Modal }