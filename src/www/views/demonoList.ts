import { TypedEvent } from 'game/models/liteEvent'
import { DemonoWidget } from './demonoWidget'

class DemonoList<T extends DemonoWidget> extends DemonoWidget {

    public listItemClicked = new TypedEvent<T>()
    public listItemSelected = new TypedEvent<T>()
    private _widgets: T[] = []

    get widgets(): T[] {
        return this._widgets
    }

    get selected(): T | undefined {
        return this._widgets.filter(w => w.hasClass('selected'))[0]
    }

    add(widget: T): void {
        this.element.append(widget.element)
        widget.clicked.on(() => {
            this.listItemClicked.trigger(widget)
            if(widget.hasClass('selectable')){
                this.select(widget)
            }
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
}

export { DemonoList }