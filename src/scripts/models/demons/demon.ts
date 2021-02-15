import { Serializable } from '../serializable'

interface DemonStats {
    strength: number,
    magic: number,
    armor: number,
    speed: number
}

interface DemonDefinition {
    name: string,
    class: string,
    element: string
}

class Demon extends Serializable<DemonDefinition> {

    name: string
    element: string

    deserialize(definition: DemonDefinition): void {
        this.name = definition.name
        this.element = definition.element
    }

    serialize(): DemonDefinition {
        return {
            name: this.name,
            element: this.element,
            class: 'huh?'
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

export { DemonDefinition, Demon, DemonStats }