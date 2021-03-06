import { EnemyCombatant } from 'game/models/combat/enemy/enemyCombatant'
import { DemonoList } from '../demonoList'
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