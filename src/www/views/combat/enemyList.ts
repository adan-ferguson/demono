import { EnemyCombatant } from 'game/models/combat/enemyCombatant'
import { DemonoList } from '../DemonoList'
import { EnemyWidget } from './enemyWidget'

class EnemyList extends DemonoList<EnemyWidget> {

    constructor(){
        super('enemy-list')
    }

    setContents(enemies: EnemyCombatant[]): void {
        enemies.forEach(enemyCombatant => {
            this.add(new EnemyWidget(enemyCombatant))
        })
    }
}

export { EnemyList }