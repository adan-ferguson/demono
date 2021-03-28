import { EnemyDefinition } from '../enemy'
import { EnemyAbilityDefinition } from '../abilities/enemyAbility'
import { DamageType } from 'game/models/combat/damage'
import { EnemyActionSubject } from '../../combat/enemy/enemyAction'
import { EnemyAttackDefinition } from '../../combat/enemy/enemyAttack'

const bite: EnemyAbilityDefinition = {
    name: 'Bite',
    time: 3,
    classification: 'physattack',
    description: '$name gives $target a bite.',
    actions: [new EnemyAttackDefinition(EnemyActionSubject.Player, {
        damageType: DamageType.Physical,
        damage: 5
    })]
}

const bat: EnemyDefinition = {
    health: 5,
    name: 'Bat',
    armor: {
        type: DamageType.Physical,
        value: 1
    },
    abilities: [bite]
}

export { bat }