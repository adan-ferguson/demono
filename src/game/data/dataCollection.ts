import { DataDefinition } from 'game/data/dataDefinition'

interface CategoryRecord<T> {
    defs: T[],
    categories: Record<string, CategoryRecord<T>>
}

class DataCollection<Def extends DataDefinition>{
    
    readonly byCategory: CategoryRecord<Def> = { defs: [], categories: {} }
    readonly byId: Record<string, Def>

    constructor(readonly defs: Def[]){
        defs.forEach(def => {
            if(!def.id || !def.categories){
                throw 'Failed to load definition, properties not set correctly.'
            }
            const categories = def.categories ? def.categories.split(',') : ['uncategorized']
            let currentRecord = this.byCategory
            categories.forEach(category => {
                if(!currentRecord.categories[category]){
                    currentRecord.categories[category] = { defs: [], categories: {} }
                }
                currentRecord = currentRecord.categories[category]
            })
            currentRecord.defs.push(def)
            this.byId[def.id] = def
        })
    }

    getById(id: string){

    }
}

export { DataCollection }