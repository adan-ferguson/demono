import { PlayerActionSubject } from 'game/models/combat/player/playerAction'
import { DamageType } from 'game/models/combat/damage'
import { DemonAbilityDefinition } from 'game/models/demons/ability'
import { PlayerAttackDefinition } from 'game/models/combat/player/playerAttack'
import { StatType } from 'game/models/stats'

const fireball: DemonAbilityDefinition = {
    id: 'fireball',
    name: 'Fireball',
    cost: tier => 30 + tier * 10,
    choiceRequirement: 'enemy',
    classification: 'magic-attack',
    actions: [new PlayerAttackDefinition(PlayerActionSubject.Enemy, {
        damage: tier => 20 + 10 * tier,
        damageType: DamageType.Magic,
        scaling: {
            [StatType.Magic]: (tier: number) => 0.3 + 0.1 * tier
        }
    })]
}

export { fireball }