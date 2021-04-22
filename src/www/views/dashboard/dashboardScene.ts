import { Player } from 'game/models/player'
import { Scene } from '../scene'

class DashboardScene extends Scene {

    constructor(readonly player: Player) {
        super('dashboard-scene')
    }

    begin(): void {
        // TODO: this should show current roster, potential encounters and stuff, i dunno
    }
}

export { DashboardScene }