import {Serializable} from './serializable'

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
}

export {DemonDefinition, Demon}