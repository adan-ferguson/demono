import { DemonAbility, DemonAbilityId } from './ability'
import { Equipment } from './equipment'
import { DemonClass, DemonClassType } from 'game/models/demons/class'
import { DemonAffinity, DemonAffinityType } from 'game/models/demons/affinity'
import { v4 as uuid } from 'uuid'
import { Player } from '../player'
import { SimpleStats, StatModifiers } from '../stats'

interface DemonLoadoutDef {
    id: string,
    name: string,
    classId: DemonClassType,
    affinityId: DemonAffinityType,
    equipmentIds: string[]
}

class Demon {

    public abilities: DemonAbility[] = []
    public stats: ExtendedStats

    private id: string = uuid()
    private name: string
    private demonClass ?: DemonClass
    private demonAffinity ?: DemonAffinity
    private equipmentList: Equipment[] = []

    constructor(private player: Player, def ?: DemonLoadoutDef){

        if(def){
            this.id = def.id
            this.name = def.name
            this.demonClass = DemonClass.loadFromId(def.classId)
            this.demonAffinity = DemonAffinity.loadFromId(def.affinityId)
            this.equipmentList = def.equipmentIds.map(id => player.getEquipmentFromId(id))
        }

        this.updateCalculations()
    }

    private updateCalculations(){

        if(!this.demonAffinity || !this.demonClass){
            return
        }

        const tierMap: Record<string, number> = {}
        const stats: StatModifiers = this.baseStats()

        this.equipmentList.forEach(equipment => {
            equipment.abilities.forEach(id => {
                if(!tierMap[id]){
                    tierMap[id] = 0
                }
                tierMap[id]++
            })
            let key: keyof StatModifiers
            for(key in equipment.stats){
                stats[key] = (stats[key] || 0) + (equipment.stats[key] || 0)
            }
        })
        this.stats = stats

        this.abilities = Object.keys(tierMap).map(id => {
            return DemonAbility.loadFromId(id as DemonAbilityId, tierMap[id])
        })
    }

    private baseStats(): SimpleStats {

        const stats: SimpleStats = {
            strength: 0,
            magic: 0,
            armor: 0,
            speed: 0
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
}

export { Demon }