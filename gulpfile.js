const fs = require('fs')
const glob = require('glob')
const { watch } = require('gulp')

const MODELS_PATH = 'src/scripts/models'
const DEFINITIONS_FOLDERS = [
    'demons',
    'encounters',
    'enemies'
]

function compileData(folderName, cb){
    let contents = ''
    let names = []
    glob(toGlob(folderName), (error, files) => {
        try {
            files.forEach((filename) => {
                let name = filename
                names.push(name)
                contents += `import { ${name} } from './definitions/${name}\n`
            })
            contents += `export { ${names.join(',')} }`
            fs.writeFileSync(`${MODELS_PATH}/${folderName}/definitionLoader.js`, contents)
            console.log(`Definition Loader for ${folderName} compiled.`)
        }catch(ex){
            console.error(ex)
        }
        cb()
    })
}

function toGlob(folderName){
    return `${MODELS_PATH}/${folderName}/definitions/*.ts`
}

exports.default = () => {
    DEFINITIONS_FOLDERS.forEach(folderName => {
        watch(toGlob(folderName), { ignoreInitial: false }, cb => compileData(folderName, cb))
    })
}