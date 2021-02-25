import { DemonAbility, DemonAbilityId } from "./abilities/ability"
import {Equipment, SerializedEquipment } from "./equipment"
import {Demon} from "./demon";

class Loadout {

    static loadFromSerializedEquipment(se: SerializedEquipment[]): Loadout {
        return new Loadout(se.map(s => new Equipment(s)))
    }

    constructor(readonly equipmentList: Equipment[]){

    }

    getAbilities(): DemonAbility[] {
        const tierMap: Record<string, number> = {}
        this.equipmentList.forEach(equipment => {
            equipment.abilities.forEach(id => {
                if(!tierMap[id]){
                    tierMap[id] = 0
                }
                tierMap[id]++
            })
        })

        return Object.keys(tierMap).map(id => {
            return DemonAbility.loadFromId(id as DemonAbilityId, tierMap[id])
        })
    }
}

export { Loadout }