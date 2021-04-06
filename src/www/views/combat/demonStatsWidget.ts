import { DemonoWidget } from '../demonoWidget'
import { PlayerCombatant } from 'game/models/combat/player/playerCombatant'
import { DemonInstance } from 'game/models/combat/demon/demonInstance'

enum Difference {
    Higher = 'higher',
    Lower = 'lower',
    Equal = 'equal'
}

const STAT_ROW_HTML = (name: string, val: number, preview?: number) => `
<div class="stat-row">
    <span class="stat-name">${name}:</span>
    <span class="stat-value">${val}</span>
    ${preview !== undefined ? PREVIEW_HTML(preview, getDifference(preview, val)) : ''}
</div>
`

const PREVIEW_HTML = (preview: number, diff: Difference) => `
<span class="stat-preview">
    <span class="preview-arrow">-></span>
    <span class="preview-value ${diff.toString()}">${preview}</span>
</span>
`

class DemonStatsWidget extends DemonoWidget {

    private previewDemon?: DemonInstance

    constructor(readonly playerCombatant: PlayerCombatant){
        super('demon-stats')
        this.update()
    }

    update(): void {
        let html = ''
        Object.entries(this.playerCombatant.stats).forEach(([key, val]) => {
            const previewVal = this.previewDemon && key in this.previewDemon.stats ? this.previewDemon.stats[key] : undefined
            html += STAT_ROW_HTML(key, val, previewVal)
        })
        this.element.innerHTML = html
    }

    preview(demon: DemonInstance): void {
        this.previewDemon = demon
        this.update()
    }

    hidePreview(): void {
        this.previewDemon = undefined
        this.update()
    }
}

function getDifference(val1: number, val2: number): Difference {
    if(val1 === val2){
        return Difference.Equal
    }else if(val1 > val2){
        return Difference.Higher
    }else{
        return Difference.Lower
    }
}

export { DemonStatsWidget }

