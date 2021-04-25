import { DemonAbility, DemonAbilityId } from './ability'
import { Equipment, SerializedEquipment } from './equipment'
import { Demon, DemonStats, ExtendedStats } from './demon'
import { DemonClass, DemonClassType } from 'game/models/demons/class'
import { DemonAffinity, DemonAffinityType } from 'game/models/demons/affinity'
import { v4 as uuid } from 'uuid'
import { Player } from '../player'

interface DemonLoadoutDef {
    id: string,
    name: string,
    classId: DemonClassType,
    affinityId: DemonAffinityType,
    equipmentIds: string[]
}

class Demon {

    private abilities: DemonAbility[] = []
    private stats: ExtendedStats = {}

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
            this.updateCalculations()
        }
    }

    private updateCalculations(){

        if(!this.demonAffinity || !this.demonClass){
            return
        }

        const tierMap: Record<string, number> = {}
        const stats = this.baseStats()

        this.equipmentList.forEach(equipment => {
            equipment.abilities.forEach(id => {
                if(!tierMap[id]){
                    tierMap[id] = 0
                }
                tierMap[id]++
            })
            let key: keyof DemonStats
            for(key in equipment.stats){
                if(!(key in stats)){
                    stats[key] = 0
                }
                stats[key] += equipment.stats[key]
            }
        })
        this.stats = stats

        this.abilities = Object.keys(tierMap).map(id => {
            return DemonAbility.loadFromId(id as DemonAbilityId, tierMap[id])
        })
    }

    private baseStats(): ExtendedStats {

        if(!this.demonAffinity || !this.demonClass){
            return {}
        }

        const stats: DemonStats = {
            strength: 0,
            magic: 0,
            armor: 0,
            speed: 0
        }

        const classStats = this.demonClass.baseStats
        for(const key in classStats){
            stats[key] += classStats
        }

        const affinityStats = this.demonAffinity.baseStats
        for(const key in affinityStats){
            stats[key] += affinityStats
        }

        return stats
    }
}

export { Demon }