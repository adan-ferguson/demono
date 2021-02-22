import { DemonoView } from './demonoView'

const BAR_HTML = (label = '') => `
<div class="bar-value"></div>
<div class="bar-damage"></div>
${label ? `<div class="text label left">${label}</div>` : ''}
<div class='text value${label ? ' right' : ''}'></div>
`

interface BarOptions {
    showMax?: boolean,
    label?: string
}

/**
 * A bar showing some sort of meter, like a health bar.
 */
class Bar extends DemonoView {

    private currentValue
    private currentMaxValue
    showMax = false
    label = ''

    constructor(private value: () => number, private maxValue: () => number, options: BarOptions = {}){
        super('bar')
        if(options.showMax !== undefined){
            this.showMax = options.showMax
        }
        if(options.label !== undefined){
            this.label = options.label
        }
        this.currentValue = value()
        this.currentMaxValue = maxValue()
        this.makeContents()
    }

    protected makeContents(): void {
        this.element.innerHTML = BAR_HTML(this.label)
    }

    update(): void {
        const value = this.value()
        const maxValue = this.maxValue()

        const str = this.showMax ? value + '/' + maxValue : value.toString()
        this.find('.text.value').textContent = str

        const pct = Math.min(100, Math.max(0, 100 * value / maxValue))
        this.find('.bar-value').style.width = `${pct}%`
    }
}

export { Bar }