import { TypedEvent } from 'game/models/liteEvent'
import { DemonoWidget } from './demonoWidget'

class DemonoList<T extends DemonoWidget> extends DemonoWidget {

    public listItemClicked = new TypedEvent<T>()
    public listItemSelected = new TypedEvent<T>()
    private selected: T

    get widgets(): T[] {
        return this.findWidgets<T>()
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

        this.removeClassAll('selected')
        widget.addClass('selected')

        this.selected = widget
        if(widget){
            this.listItemSelected.trigger(widget)
        }
    }

    selectIndex(index = 0): void {
        const widgets = this.findWidgets<T>()
        if(widgets.length > index){
            this.select(widgets[index])
        }
    }

    addClassAll(className: string): void {
        this.widgets.forEach(w => w.addClass(className))
    }

    removeClassAll(className: string): void {
        this.widgets.forEach(w => w.removeClass(className))
    }
}

export { DemonoList }