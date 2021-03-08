import { DemonAbilityDefinition } from '../ability'
import { PlayerAttackDefinition } from '../../../combat/player/playerAttack'
import { PlayerActionSubject } from 'game/models/combat/player/playerAction'
import { DamageType } from 'game/models/combat/damage'

const fireball: DemonAbilityDefinition = {
    id: 'fireball',
    name: 'Fireball',
    cost: tier => 30 + tier * 10,
    choiceRequirement: 'enemy',
    actions: [new PlayerAttackDefinition(PlayerActionSubject.Enemy, {
        damage: tier => 20 + 10 * tier,
        damageType: DamageType.Magic,
        scaling: {
            magic: (tier: number) => 0.3 + 0.1 * tier
        }
    })]
}

export { fireball }