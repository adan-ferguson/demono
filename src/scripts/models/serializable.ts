abstract class Serializable<SerializedObject> {

    constructor(typeDefinition ?:SerializedObject){
        if(typeDefinition){
            this.deserialize(typeDefinition)
        }
    }

    abstract serialize(): SerializedObject
    abstract deserialize(definition: SerializedObject): void
}

export { Serializable }