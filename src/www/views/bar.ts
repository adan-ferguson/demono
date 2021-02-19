import { DemonoView } from './demonoView'

const HEALTHBAR_HTML = `
<div class="bar-value"></div>
<div class="bar-damage"></div>
<div class='value-text'>9</div>
`

interface BarOptions {
    showMax ?: boolean
    maxValue ?: number,
    initialValue ?: number
}

/**
 * A bar showing some sort of meter, like a health bar.
 */
class Bar extends DemonoView {

    showMax = false
    maxValue = 100
    value = 0

    constructor(options: BarOptions){
        super('bar')
        if(options.showMax !== undefined){
            this.showMax = options.showMax
        }
        if(options.maxValue !== undefined){
            this.maxValue = options.maxValue
        }
        if(options.initialValue !== undefined){
            this.value = options.initialValue
        }
        this.makeContents()
        this.update()
    }

    protected makeContents(): void {
        this.element.innerHTML = HEALTHBAR_HTML
    }

    public setValue(value: number): void{
        this.value = value
        this.update()
    }

    update(): void {
        this.find('.value-text').textContent = this.value.toString()
        this.find('.bar-value').style.width = `${this.value / this.maxValue}%`
    }
}

export { Bar }