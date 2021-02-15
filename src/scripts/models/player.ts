import { Demon, DemonDefinition } from './demons/demon'
import { Serializable } from './serializable'
import { PlayerCombatant } from './combat/playerCombatant'

interface PlayerDefinition {
    name: string,
    experience: number,
    demons: DemonDefinition[]
}

class Player extends Serializable<PlayerDefinition> {

    experience = 0
    demons: Demon[] = []
    name = 'Player'

    get startingHealth(): number {
        return 100
    }

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
}

export { Player }