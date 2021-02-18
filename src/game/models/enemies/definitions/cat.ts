import { EnemyDefinition } from '../enemy'

const cat: EnemyDefinition = {
    health: 5,
    name: 'Cat',
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

export { cat }