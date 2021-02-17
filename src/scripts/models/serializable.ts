abstract class Serializable<SerializedType> {

    constructor(typeDefinition ?:SerializedType){
        if(typeDefinition){
            this.deserialize(typeDefinition)
        }
    }

    abstract serialize(): SerializedType
    abstract deserialize(definition: SerializedType): void
}

export { Serializable }