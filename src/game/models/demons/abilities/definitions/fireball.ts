import { DemonAbilityDefinition } from '../ability'
import { DamageAction } from '../damage'

const fireball: DemonAbilityDefinition = {
    id: 'fireball',
    name: 'Fireball',
    cost: tier => 30 + tier * 10,
    choiceRequirement: 'enemy',
    actions: [
        new DamageAction({
            target: 'enemy',
            value: tier => 20 + 10 * tier,
            type: 'magic',
            scaling: {
                magic: (tier: number) => 0.3 + 0.1 * tier
            }
        })
    ]
}

export { fireball }