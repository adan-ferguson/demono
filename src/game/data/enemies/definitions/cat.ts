import { EnemyActionSubject } from 'game/models/combat/enemy/enemyAction'
import { DamageType } from 'game/models/combat/damage'
import { EnemyAttackDefinition } from 'game/models/combat/enemy/enemyAttack'
import { EnemyAbilityDefinition } from 'game/models/enemies/enemyAbility'
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

const cat: EnemyDefinition = {
    health: 5,
    name: 'Cat',
    abilities: [bite]
}

export { cat }