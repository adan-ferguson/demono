import { DemonAbility, DemonAbilityId } from './ability'
import { DemonEquipment } from './demonEquipment'
import { DemonClass, DemonClassType } from 'game/models/demons/class'
import { DemonAffinity, DemonAffinityType } from 'game/models/demons/affinity'
import { v4 as uuid } from 'uuid'
import { Player } from '../player/player'
import { FullStats, SimpleStats, StatTypes } from '../stats'

interface DemonLoadoutDef {
    id: string,
    name: string,
    classId: DemonClassType,
    affinityId: DemonAffinityType,
    equipmentIds: string[]
}

class DemonLoadout {

    public abilities: DemonAbility[] = []
    public stats: FullStats

    readonly id: string = uuid()
    readonly name: string
    readonly demonClass ?: DemonClass
    readonly demonAffinity ?: DemonAffinity
    readonly equipments: DemonEquipment[] = []

    constructor(private player: Player, def ?: DemonLoadoutDef){

        if(def){
            this.id = def.id
            this.name = def.name
            this.demonClass = DemonClass.loadFromId(def.classId)
            this.demonAffinity = DemonAffinity.loadFromId(def.affinityId)
            this.equipments = def.equipmentIds.map(id => player.getEquipmentById(id))
        }

        this.updateCalculations()
    }

    private updateCalculations(){

        if(!this.demonAffinity || !this.demonClass){
            return
        }

        const tierMap: Record<string, number> = {}
        const stats = new FullStats(this.baseStats())

        this.equipments.forEach(equipment => {
            equipment.abilities.forEach(id => {
                if(!tierMap[id]){
                    tierMap[id] = 0
                }
                tierMap[id]++
            })
            let key: StatTypes
            for(key in equipment.stats){
                stats.set(key, stats.get(key) + (equipment.stats[key] || 0))
            }
        })
        this.stats = stats

        this.abilities = Object.keys(tierMap).map(id => {
            return DemonAbility.loadFromId(id as DemonAbilityId, tierMap[id])
        })
    }

    private baseStats(): SimpleStats {

        const stats: SimpleStats = {
            [StatTypes.Strength]: 0,
            [StatTypes.Magic]: 0,
            [StatTypes.Armor]: 0,
            [StatTypes.Speed]: 0
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
            equipmentIds: this.equipments.map(equipment => equipment.id)
        }
    }
}

export { DemonLoadout, DemonLoadoutDef }