import { Combatant } from '../../models/combat/combatant'
import { ModelView } from '../demonoView'

const UNIT_SIZE = 10
const BORDER_SIZE = 0.5
const ANGLE_OFFSET = 2

const HEALTHBAR_HTML = (id: string) => `
<svg>
    <clipPath id="healthbar-clip-path-${id}">
        <polygon></polygon>
    </clipPath>
    <rect fill="green" x="0" y="0" height="${UNIT_SIZE}" class="value-bar" clip-path="url(#healthbar-clip-path-${id})"/>
    <polygon class="border" fill="none" stroke="black" stroke-width="${BORDER_SIZE}"></polygon>
</svg>
<div class="flex-spacer">
    <div class="phys-defense"></div>
    <div class='value-text'></div>
    <div class="magic-defense"></div>
</div>
`
class HealthbarView extends ModelView<Combatant> {

    constructor(combatant: Combatant){
        super(combatant, 'health-bar')
    }

    protected makeContents(): void {
        this.element.innerHTML = HEALTHBAR_HTML(this.registryId)
        requestAnimationFrame(() => {
            this.drawSvg()
        })
    }

    private drawSvg(): void {
        const rect = this.element.getBoundingClientRect()
        const ratio = rect.width / rect.height
        const svg = this.element.querySelector('svg')

        const w = ratio * UNIT_SIZE
        const h = UNIT_SIZE
        const b = BORDER_SIZE
        const ao = ANGLE_OFFSET

        const viewbox = [-b, -b, b*2+w, b*2+h].join(' ')
        svg.setAttribute('viewBox', viewbox)

        const polygonPoints = [
            [0,h/2],
            [ao,0],
            [w-ao,0],
            [w,h/2],
            [w-ao,h],
            [ao,h]
        ].join(' ')
        svg.querySelector('clipPath polygon')
            .setAttribute('points', polygonPoints)
        svg.querySelector('.border')
            .setAttribute('points', polygonPoints)
    }
}

export { HealthbarView }