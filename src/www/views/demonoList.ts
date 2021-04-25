import { TypedEvent } from 'game/liteEvent'
import { DemonoWidget } from './demonoWidget'

class DemonoList<T extends DemonoWidget> extends DemonoWidget {

    public listItemClicked = new TypedEvent<T>()
    public listItemSelected = new TypedEvent<T>()
    public listItemRightClicked = new TypedEvent<T>()

    private _widgets: T[] = []

    get widgets(): T[] {
        return this._widgets
    }

    get selected(): T | undefined {
        return this._widgets.filter(w => w.hasClass('selected'))[0]
    }

    add(widget: T, addTo = this.element): void {
        addTo.append(widget.element)
        this._widgets.push(widget)
        widget.clicked.on(() => {
            this.listItemClicked.trigger(widget)
            if(widget.hasClass('selectable')){
                this.select(widget)
            }
        })
        widget.rightclicked.on(() => {
            this.listItemRightClicked.trigger(widget)
        })
    }

    select(widget: T): void {

        if(this.selected === widget){
            return
        }

        this.deselectAll()
        widget.addClass('selected')

        if(widget){
            this.listItemSelected.trigger(widget)
        }
    }

    selectIndex(index = 0): void {
        if(this._widgets.length > index){
            this.select(this._widgets[index])
        }
    }

    deselectAll(): void {
        this.removeClassAll('selected')
    }

    addClassAll(className: string): void {
        this.widgets.forEach(w => w.addClass(className))
    }

    removeClassAll(className: string): void {
        this.widgets.forEach(w => w.removeClass(className))
    }

    clearList(): void {
        this.element.innerHTML = ''
        this._widgets = []
    }
}

export { DemonoList }