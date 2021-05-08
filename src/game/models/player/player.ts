import { DemonLoadout, DemonLoadoutDef } from '../demons/demonLoadout'
import { PlayerLoadout, PlayerLoadoutDef } from './playerLoadout'
import { DemonAugment } from 'game/models/demons/demonAugment'
import { PlayerInventory, PlayerInventoryDef } from 'game/models/player/playerInventory'
import { PlayerItem } from './playerItem.js'
import { PlayerFlags } from './playerFlags'

interface PlayerDef {
    name: string,
    experience: number,
    selectedLoadout: string
    playerLoadouts: PlayerLoadoutDef[]
    demonLoadouts: DemonLoadoutDef[],
    playerInventory: PlayerInventoryDef,
    flags: PlayerFlags
}

class Player {

    name: string
    experience: number
    selectedLoadoutId: string
    demonLoadouts: DemonLoadout[]
    playerLoadouts: PlayerLoadout[]
    inventory: PlayerInventory
    flags: PlayerFlags

    constructor(def ?: PlayerDef) {
        if (!def) {
            def = newPlayerDef()
        }
        this.name = def.name
        this.experience = def.experience
        this.selectedLoadoutId = def.selectedLoadout
        this.inventory = new PlayerInventory(def.playerInventory)
        this.demonLoadouts = def.demonLoadouts.map(loadoutDef => new DemonLoadout(this, loadoutDef))
        this.playerLoadouts = def.playerLoadouts.map(squadDef => new PlayerLoadout(this, squadDef))
        this.flags = def.flags
    }

    get startingHealth(): number {
        return 1000
    }

    get level(): number {
        return expToLevel(this.experience)
    }

    get selectedLoadout(): PlayerLoadout | undefined {
        return this.getPlayerLoadoutById(this.selectedLoadoutId)
    }

    serialize(): PlayerDef {
        return {
            name: this.name,
            experience: this.experience,
            selectedLoadout: this.selectedLoadoutId,
            demonLoadouts: this.demonLoadouts.map(loadout => loadout.serialize()),
            playerLoadouts: this.playerLoadouts.map(loadout => loadout.serialize()),
            playerInventory: this.inventory.serialize(),
            flags: this.flags
        }
    }

    isNew(): boolean {
        return this.name ? false : true
    }

    getPlayerLoadoutById(id: string): PlayerLoadout | undefined {
        return this.playerLoadouts.find(loadout => loadout.id === id)
    }

    getDemonLoadoutById(id: string): DemonLoadout | undefined {
        return this.demonLoadouts.find(loadout => loadout.id === id)
    }

    getAugmentById(id: string): DemonAugment | undefined {
        return this.inventory.getDemonAugmentById(id)
    }

    getPlayerItemById(id: string): PlayerItem | undefined {
        return this.inventory.getPlayerItemById(id)
    }
}

function newPlayerDef(): PlayerDef {
    return {
        name: '',
        experience: 0,
        playerInventory: {
            playerItems: [],
            demonAugments: [{
                id: 'default-brawler-augment',
                name: 'Razor Claws',
                abilities: ['slash'],
                class: {
                    type: 'brawler',
                    requires: 1
                }
            }, {
                id: 'default-fire-augment',
                name: 'Fire Jewel',
                abilities: ['sear'],
                affinity: {
                    type: 'fire',
                    requires: 1
                }
            }],
            demonClasses: ['brawler'],
            demonAffinities: ['fire']
        },
        demonLoadouts: [{
            id: 'default-demon-loadout',
            name: 'Blasto',
            classId: 'brawler',
            affinityId: 'fire',
            augmentIds: ['default-brawler-augment', 'default-fire-augment']
        }],
        playerLoadouts: [{
            id: 'default-player-loadout',
            demonLoadoutIDs: ['default-demon-loadout'],
            itemIDs: []
        }],
        selectedLoadout: 'default-player-loadout',
        flags: {
            tutorialComplete: false,
            encounters: []
        }
    }
}

const LEVEL_EXP_BASE = 100
const LEVEL_EXP_MULTIPLIER = 1.4

function expToLevel(exp: number): number {
    let baseExp = LEVEL_EXP_BASE
    let baseLevel = 0
    while (baseExp < exp) {
        baseExp *= LEVEL_EXP_MULTIPLIER
        baseLevel++
    }
    return baseLevel
}

function expRequiredForLevel(level: number): number {
    let baseExp = LEVEL_EXP_BASE
    let baseLevel = 1
    while (baseLevel < level) {
        baseExp *= LEVEL_EXP_MULTIPLIER
        baseLevel++
    }
    return baseExp
}

export { Player }