import { EnemyArmorType, EnemyDefinition } from '../enemy'
import { EnemyAbilityDefinition } from '../abilities/enemyAbility'
import { EnemyActionSubject } from 'game/models/combat/enemy/enemyAction'
import { DamageType } from 'game/models/combat/damage'
import { EnemyAttackDefinition } from 'game/models/combat/enemy/enemyAttack'

const bite: EnemyAbilityDefinition = {
    name: 'Bite',
    time: 3,
    description: '$name gives $target a bite.',
    actions: [{
        type: 'attack',
        subject: EnemyActionSubject.Player,
        damageType: DamageType.Physical,
        damage: 5
    } as EnemyAttackDefinition]
}

const cat: EnemyDefinition = {
    health: 5,
    name: 'Cat',
    abilities: [bite]
}

export { cat }