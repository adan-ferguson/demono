import { Demon, DemonDefinition } from './demon'
import { Serializable } from './serializable'
import { Squad } from './squad'

interface PlayerDefinition {
    name: string,
    experience: number,
    demons: DemonDefinition[]
}

class Player extends Serializable<PlayerDefinition> {

    experience = 0
    demons: Demon[] = []
    name = 'Player'

    serialize(): PlayerDefinition {
        return {
            name: this.name,
            experience: this.experience,
            demons: this.demons.map(demon => demon.serialize())
        }
    }

    deserialize(definition: PlayerDefinition): void {
        this.name = definition.name
        this.experience = definition.experience
        this.demons = definition.demons.map(demonDef => new Demon(demonDef))
    }

    makeSquad(): Squad {
        const squad = new Squad(this, this.demons)
        return squad
    }
}

export { Player }