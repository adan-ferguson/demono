import { DemonoView } from './demonoView'

const HEALTHBAR_HTML = `
<div class="bar-value"></div>
<div class="bar-damage"></div>
<div class='value-text'></div>
`

interface BarOptions {
    showMax?: boolean
}

/**
 * A bar showing some sort of meter, like a health bar.
 */
class Bar extends DemonoView {

    private currentValue
    private currentMaxValue
    showMax = false

    constructor(readonly value: () => number, readonly maxValue: () => number, options: BarOptions = {}){
        super('bar')
        if(options.showMax !== undefined){
            this.showMax = options.showMax
        }
        this.currentValue = value()
        this.currentMaxValue = maxValue()
        this.makeContents()
    }

    protected makeContents(): void {
        this.element.innerHTML = HEALTHBAR_HTML
    }

    update(): void {
        const value = this.value()
        const maxValue = this.value()

        const str = this.showMax ? value + '/' + maxValue : value.toString()
        this.find('.value-text').textContent = str

        const pct = Math.min(100, Math.max(0, 100 * value / maxValue))
        this.find('.bar-value').style.width = `${pct}%`
    }
}

export { Bar }