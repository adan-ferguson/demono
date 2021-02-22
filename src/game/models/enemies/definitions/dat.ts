import { EnemyDefinition } from '../enemy'

const dat: EnemyDefinition = {
    health: 5,
    name: 'Dat',
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

export { dat }