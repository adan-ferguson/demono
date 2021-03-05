import { DemonAbilityDefinition } from '../ability'
import { AttackDefinition } from '../../../combat/attack'
import { ActionTarget } from '../../../combat/action'

const attackDefinition: AttackDefinition = {
    type: 'attack',
    target: ActionTarget.Enemy,
    damage: tier => 20 + 10 * tier,
    damageType: 'magic',
    scaling: {
        magic: (tier: number) => 0.3 + 0.1 * tier
    }
}

const fireball: DemonAbilityDefinition = {
    id: 'fireball',
    name: 'Fireball',
    cost: tier => 30 + tier * 10,
    choiceRequirement: 'enemy',
    actions: [attackDefinition]
}

export { fireball }