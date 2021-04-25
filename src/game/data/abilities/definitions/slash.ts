import { DemonAbilityDefinition } from '../ability'
import { PlayerAttackDefinition } from '../../../combat/player/playerAttack'
import { PlayerActionSubject } from 'game/models/combat/player/playerAction'
import { DamageType } from 'game/models/combat/damage'

const slash: DemonAbilityDefinition = {
    id: 'slash',
    name: 'Slash',
    cost: tier => 30 + tier * 10,
    choiceRequirement: 'enemy',
    classification: 'physattack',
    actions: [new PlayerAttackDefinition(PlayerActionSubject.Enemy, {
        damage: tier => 20 + 10 * tier,
        damageType: DamageType.Magic,
        scaling: {
            magic: (tier: number) => 0.3 + 0.1 * tier
        }
    })]
}

export { slash }