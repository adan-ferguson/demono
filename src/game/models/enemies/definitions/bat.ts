import { EnemyDefinition } from '../enemy'

const bat: EnemyDefinition = {
    health: 5,
    name: 'Bat',
    physDef: 1,
    abilities: [
        {
            name: 'Bite',
            time: 3,
            damage: {
                type: 'phys',
                power: 5
            },
            description: '$name gives $target a bite.'
        }
    ]
}

export { bat }