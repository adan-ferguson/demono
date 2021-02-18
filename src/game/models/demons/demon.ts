import { Serializable } from '../serializable'
import { DemonClass, DemonClassId } from './classes/class'

interface DemonStats {
    strength: number,
    magic: number,
    armor: number,
    speed: number
}

interface SerializedDemon {
    name: string,
    classId: DemonClassId,
    // elementId: string
}

class Demon extends Serializable<SerializedDemon> {

    name: string
    // element: DemonElement
    class: DemonClass

    deserialize(serialized: SerializedDemon): void {
        this.name = serialized.name
        this.class = DemonClass.loadFromId(serialized.classId)
        // this.element = serialized.element
    }

    serialize(): SerializedDemon {
        return {
            name: this.name,
            // element: this.element,
            classId: this.class.id
        }
    }

    getStats(): DemonStats {
        return {
            strength: 10,
            magic: 10,
            armor: 10,
            speed: 10
        }
    }
}

export { Demon, DemonStats, SerializedDemon }