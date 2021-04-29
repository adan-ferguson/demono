import { EnemyActionSubject } from 'game/models/combat/enemy/enemyAction'
import { DamageType } from 'game/models/combat/damage'
import { EnemyAbilityDefinition } from 'game/models/enemies/enemyAbility'
import { EnemyAttackDefinition } from 'game/models/combat/enemy/enemyAttack'
import { EnemyDefinition } from 'game/models/enemies/enemy'

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

const dat: EnemyDefinition = {
    health: 5,
    name: 'Dat',
    armor: {
        type: DamageType.Magic,
        value: 3
    },
    abilities: [bite]
}

export { dat }