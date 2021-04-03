import './styles/main.sass'
import { CombatScene } from './views/combat/combatScene'
import { Scene } from './views/scene'

import { Encounter } from 'game/models/encounters/encounter'
import { Combat } from 'game/models/combat/combat'
import { Player } from 'game/models/player'

const mainEl:HTMLElement = document.createElement('main')
mainEl.innerHTML = `
<div class="scene"></div>
`

document.body.prepend(mainEl)

const encounter = Encounter.loadFromId('test')
const player = loadPlayer()

const testCombat = new Combat(encounter, player)
const testCombatScene = new CombatScene(testCombat)
setScene(testCombatScene)

function setScene(scene: Scene){
    const sceneEl = mainEl.querySelector('.scene')
    if(!sceneEl){
        throw 'Error while trying to replace scenes.'
    }
    sceneEl.replaceWith(scene.element)
    scene.begin()
}

function loadPlayer(){
    const str = window.localStorage.getItem('player')
    if(str){
        const playerDef = window.JSON.parse(str)
        return new Player(playerDef)
    }
    return new Player({
        name: 'Sample',
        experience: 0,
        demons: [
            {
                name: 'Aaaaa',
                classId: 'brawler',
                affinityId: 'fire',
                equipment: [{
                    name: 'Sword',
                    abilities: ['fireball'],
                    stats: {
                        strength: 2
                    }
                }]
            },
            {
                name: 'Bbbbb',
                classId: 'brawler',
                affinityId: 'fire',
                equipment: [{
                    name: 'Sword',
                    abilities: ['sear','slash'],
                    stats: {
                        magic: 2,
                        speed: -1
                    }
                }]
            },
            {
                name: 'Ccccccc',
                classId: 'brawler',
                affinityId: 'fire',
                equipment: [{
                    name: 'Sword',
                    abilities: ['fireball','fireball'],
                    stats: {
                        armor: 4,
                        speed: 1
                    }
                }]
            },
            {
                name: 'Ddddd',
                classId: 'brawler',
                affinityId: 'fire',
                equipment: [{
                    name: 'Sword',
                    abilities: ['fireball','sear'],
                    stats: {
                        strength: 2
                    }
                },{
                    name: 'Sword',
                    abilities: ['sear','slash'],
                    stats: {
                        strength: 2
                    }
                }]
            },
            {
                name: 'Eeeeeeeee',
                classId: 'brawler',
                affinityId: 'fire',
                equipment: [{
                    name: 'Sword',
                    abilities: ['fireball','sear','slash']
                }]
            }
        ]
    })
}