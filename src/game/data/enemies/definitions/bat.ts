import { DamageType } from 'game/models/combat/damage'
import { EnemyActionSubject } from 'game/models/combat/enemy/enemyAction'
import { EnemyAttackDefinition } from 'game/models/combat/enemy/enemyAttack'
import { EnemyDefinition } from 'game/models/enemies/enemy'
import { EnemyAbilityDefinition } from 'game/models/enemies/enemyAbility'

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