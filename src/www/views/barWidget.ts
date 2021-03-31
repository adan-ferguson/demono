import { DemonoWidget } from './demonoWidget'

const BAR_HTML = (label = '') => `
<div class="bar-change"></div>
<div class="bar-value"></div>
${label ? `<div class="text label left">${label}</div>` : ''}
<div class='text value${label ? ' right' : ''}'></div>
<div class="bar-border"></div>
`

interface BarOptions {
    showMax?: boolean,
    label?: string
}

/**
 * A bar showing some sort of meter, like a health bar.
 */
class BarWidget extends DemonoWidget {

    private showMax = false
    private label = ''
    private value: number

    constructor(private maxValue: number, options: BarOptions = {}){
        super('bar')
        if(options.showMax !== undefined){
            this.showMax = options.showMax
        }
        if(options.label !== undefined){
            this.label = options.label
        }
        this.value = 0
        this.makeContents()
    }

    protected makeContents(): void {
        this.element.innerHTML = BAR_HTML(this.label)
    }

    setValue(val: number, animate = false): void {
        this.setClass('animate', animate)
        this.setClass('gaining', val > this.value)
        this.value = Math.max(0, Math.min(this.maxValue, val))

        const str = this.showMax ? this.value + ' / ' + this.maxValue : this.value.toString()
        this.find('.text.value').textContent = str

        const pct = 100 * this.value / this.maxValue

        requestAnimationFrame(() => {
            this.find('.bar-value').style.width = `${pct}%`
            this.find('.bar-change').style.width = `${pct}%`
        })
    }

    changeValue(delta: number, animate = false): void {
        this.setValue(this.value + delta, animate)
    }
}

export { BarWidget }