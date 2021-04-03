import { DemonAbility, DemonAbilityId } from './abilities/ability'
import { Equipment, SerializedEquipment } from './equipment'
import { Demon, DemonStats } from './demon'

class Loadout {

    readonly abilities: DemonAbility[]
    readonly stats: DemonStats

    static loadFromSerializedEquipment(se: SerializedEquipment[]): Loadout {
        return new Loadout(se.map(s => new Equipment(s)))
    }

    constructor(readonly equipmentList: Equipment[]){

        const tierMap: Record<string, number> = {}
        const stats: DemonStats = {
            strength: 0,
            magic: 0,
            armor: 0,
            speed: 0
        }

        this.equipmentList.forEach(equipment => {
            equipment.abilities.forEach(id => {
                if(!tierMap[id]){
                    tierMap[id] = 0
                }
                tierMap[id]++
            })
            let key: keyof DemonStats
            for(key in equipment.stats){
                stats[key] += equipment.stats[key]
            }
        })

        this.abilities = Object.keys(tierMap).map(id => {
            return DemonAbility.loadFromId(id as DemonAbilityId, tierMap[id])
        })

        this.stats = stats
    }
}

export { Loadout }