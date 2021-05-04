import { DemonAbility, DemonAbilityId } from './ability'
import { DemonAugment } from './demonAugment'
import { DemonClass, DemonClassType } from 'game/models/demons/class'
import { DemonAffinity, DemonAffinityType } from 'game/models/demons/affinity'
import { v4 as uuid } from 'uuid'
import { Player } from '../player/player'
import { FullStats, SimpleStats, StatType } from '../stats'

interface DemonLoadoutDef {
    id: string,
    name: string,
    classId: DemonClassType,
    affinityId: DemonAffinityType,
    augmentIds: string[]
}

class DemonLoadout {

    public abilities: DemonAbility[] = []
    public stats: FullStats

    readonly id: string
    readonly name: string
    readonly demonClass ?: DemonClass
    readonly demonAffinity ?: DemonAffinity
    readonly augments: DemonAugment[] = []

    constructor(private player: Player, def: DemonLoadoutDef){

        this.id = def.id
        this.name = def.name
        this.demonClass = DemonClass.loadFromId(def.classId)
        this.demonAffinity = DemonAffinity.loadFromId(def.affinityId)
        this.augments = def.augmentIds
            .map(id => player.getAugmentById(id))
            .filter((i): i is DemonAugment => {
                return i ? true : false
            })

        this.updateCalculations()
    }

    private updateCalculations(){

        if(!this.demonAffinity || !this.demonClass){
            return
        }

        const tierMap: Record<string, number> = {}
        const stats = new FullStats(this.baseStats())

        this.augments.forEach(augment => {
            augment.abilities.forEach(id => {
                if(!tierMap[id]){
                    tierMap[id] = 0
                }
                tierMap[id]++
            })
            let key: StatType
            for(key in augment.stats){
                stats.set(key, stats.get(key) + (augment.stats[key] || 0))
            }
        })
        this.stats = stats

        this.abilities = Object.keys(tierMap).map(id => {
            return DemonAbility.loadFromId(id as DemonAbilityId, tierMap[id])
        })
    }

    private baseStats(): SimpleStats {

        const stats: SimpleStats = {
            [StatType.Strength]: 0,
            [StatType.Magic]: 0,
            [StatType.Defense]: 0,
            [StatType.Speed]: 0
        }

        if(!this.demonAffinity || !this.demonClass){
            return stats
        }

        let key: keyof SimpleStats
        const classStats = this.demonClass.baseStats
        for(key in classStats){
            stats[key] += classStats[key]
        }

        const affinityStats = this.demonAffinity.baseStats
        for(key in affinityStats){
            stats[key] += affinityStats[key]
        }

        return stats
    }

    public serialize(): DemonLoadoutDef {

        if(!this.demonClass || !this.demonAffinity){
            throw 'Can not serialized demon loadout, class and affinity must be set.'
        }

        return {
            id: this.id,
            name: this.name,
            classId: this.demonClass.id,
            affinityId: this.demonAffinity.id,
            augmentIds: this.augments.map(augment => augment.id)
        }
    }
}

export { DemonLoadout, DemonLoadoutDef }