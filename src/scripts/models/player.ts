import { Demon, SerializedDemon } from './demons/demon'
import { Serializable } from './serializable'

interface SerializedPlayer {
    name: string,
    experience: number,
    demons: SerializedDemon[]
}

class Player extends Serializable<SerializedPlayer> {

    experience: number
    demons: Demon[]
    name: string

    get startingHealth(): number {
        return 100
    }

    serialize(): SerializedPlayer {
        return {
            name: this.name,
            experience: this.experience,
            demons: this.demons.map(demon => demon.serialize())
        }
    }

    deserialize(serialized: SerializedPlayer): void {
        this.name = serialized.name
        this.experience = serialized.experience
        this.demons = serialized.demons.map(demonDef => new Demon(demonDef))
    }
}

export { Player }