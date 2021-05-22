interface CategoryRecord<T> {
    defs: T[],
    categories: Record<string, CategoryRecord<T>>
}

type DataDefinitionRecord<IDType extends string, Def> = Record<IDType, {
  definition: Def,
  categories: string[]  
}>

class DataCollection<IDType extends string, Def> {

    readonly byCategory: CategoryRecord<Def> = { defs: [], categories: {} }

    constructor(readonly definitionList: DataDefinitionRecord<IDType, Def>) {
        Object.values(definitionList).forEach(({ definition, categories }) => {
            let currentRecord = this.byCategory
            categories.forEach((category: string) => {
                if (!currentRecord.categories[category]) {
                    currentRecord.categories[category] = { defs: [], categories: {} }
                }
                currentRecord = currentRecord.categories[category]
            })
            currentRecord.defs.push(definition)
        })
    }
}

export { DataCollection, DataDefinitionRecord }