import { EnemyCombatant } from 'game/models/combat/enemy/enemyCombatant'
import { DemonoList } from '../demonoList'
import { EnemyWidget } from './enemyWidget'
import '../../styles/combat/enemies.sass'

class EnemyList extends DemonoList<EnemyWidget> {

    private map = new Map<EnemyCombatant, EnemyWidget>()

    constructor(){
        super('enemy-list')
    }

    setContents(enemies: EnemyCombatant[]): void {
        enemies.forEach(enemyCombatant => {
            const widget = new EnemyWidget(enemyCombatant)
            this.add(widget)
            this.map.set(enemyCombatant, widget)
        })
    }

    getFromEnemy(enemy: EnemyCombatant): undefined | EnemyWidget {
        return this.map.get(enemy)
    }
}

export { EnemyList }