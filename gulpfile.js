const fs = require('fs')
const glob = require('glob')
const path = require('path')
const { watch } = require('gulp')

const MODELS_PATH = './src/game/models'
const DEFINITIONS_FOLDERS = [
    'demons/classes',
    'demons/affinities',
    'encounters',
    'enemies'
]

function compileData(folderName, cb){
    let contents = ''
    let names = []
    glob(toGlob(folderName), (error, files) => {
        try {
            files.forEach((filename) => {
                let name = path.basename(filename).replace(/\.[^/.]+$/, '')
                names.push(name)
                contents += `import { ${name} } from './definitions/${name}'\n`
            })
            contents += `export { ${names.join(',')} }`
            fs.writeFileSync(`${MODELS_PATH}/${folderName}/definitionLoader.ts`, contents)
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