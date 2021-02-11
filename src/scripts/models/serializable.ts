abstract class Serializable<TypeDefinition> {

    constructor(typeDefinition ?:TypeDefinition){
        if(typeDefinition){
            this.deserialize(typeDefinition)
        }
    }

    abstract serialize(): TypeDefinition
    abstract deserialize(definition: TypeDefinition): void
}

export { Serializable }