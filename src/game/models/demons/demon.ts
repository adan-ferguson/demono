import { Serializable } from '../serializable'
import { DemonAbility } from './abilities/ability'
import { DemonClass, DemonClassId } from './classes/class'
import { Loadout } from './loadout';
import { SerializedEquipment } from './equipment'
import {DemonAffinity, DemonAffinityId } from './affinities/affinity'

interface DemonStats {
    strength: number,
    magic: number,
    armor: number,
    speed: number
}

interface ExtendedStats extends DemonStats {
    [key: string]: number
}

interface SerializedDemon {
    name: string,
    classId: DemonClassId,
    affinityId: DemonAffinityId,
    equipment: SerializedEquipment[]
}

class Demon extends Serializable<SerializedDemon> {

    name: string
    class: DemonClass
    affinity: DemonAffinity
    loadout: Loadout

    deserialize(serialized: SerializedDemon): void {
        this.name = serialized.name
        this.class = DemonClass.loadFromId(serialized.classId)
        this.affinity = DemonAffinity.loadFromId(serialized.affinityId)
        this.loadout = Loadout.loadFromSerializedEquipment(serialized.equipment)
    }

    serialize(): SerializedDemon {
        return {
            name: this.name,
            classId: this.class.id,
            affinityId: this.affinity.id,
            equipment: this.loadout.equipmentList.map(equipment => equipment.serialize())
        }
    }

    getStats(): ExtendedStats {
        return {
            strength: 10 + this.loadout.stats.strength,
            magic: 10 + this.loadout.stats.magic,
            armor: 10 + this.loadout.stats.armor,
            speed: 10 + this.loadout.stats.speed
        }
    }
}

export { Demon, DemonStats, SerializedDemon, ExtendedStats }