import { Demon, SerializedDemon } from './demons/demon'
import { Serializable } from './serializable'

interface SerializedPlayer {
    name: string,
    level: number,
    experience: number,
    demons: SerializedDemon[]
}

class Player extends Serializable<SerializedPlayer> {

    level: number
    experience: number
    demons: Demon[]
    name: string

    get startingHealth(): number {
        return 1000
    }

    serialize(): SerializedPlayer {
        return {
            name: this.name,
            experience: this.experience,
            level: this.level,
            demons: this.demons.map(demon => demon.serialize())
        }
    }

    deserialize(serialized: SerializedPlayer): void {
        this.name = serialized.name
        this.experience = serialized.experience
        this.demons = serialized.demons.map(demonDef => new Demon(demonDef))
    }

    isNew(): boolean {
        return this.name ? false : true
    }
}

export { Player }