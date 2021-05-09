const fs = require('fs')
const path = require('path')
const { watch } = require('gulp')

const DATA_PATH = './src/game/data'

function compileData(cb) {
    const categories = fs.readdirSync(DATA_PATH)
    categories.forEach(cat => {
        if(fs.lstatSync(path.join(DATA_PATH, cat)).isDirectory()){
            compileCategory(cat)
        }
    })
    cb()
}

function compileCategory(categoryName) {
    let contents = ''
    let names = []
    const basePath = path.join(DATA_PATH, categoryName, 'definitions')
    readDir()
    contents += generateDataTypes(getConfig(categoryName), names)
    fs.writeFileSync(path.join(DATA_PATH, categoryName, 'definitionLoader.ts'), contents)
    console.log(`Definition Loader for ${categoryName} compiled.`)

    function readDir(subdirs = []){
        const files = fs.readdirSync(path.join(basePath, ...subdirs))
        files.forEach(filename => {
            const name = filename.replace(/\.[^/.]+$/, '')
            const filepath = path.join(basePath, ...subdirs, filename)
            if(fs.lstatSync(filepath).isDirectory()) {
                readDir([...subdirs, name])
            }else{
                names.push(name)
                contents += `import { ${name} } from './definitions/${subdirs.join('/')}/${name}'
${name}.categories = '${subdirs}'
${name}.id = '${name}'

`
            }
        })
    }
}

function getConfig(categoryName){
    const rawData = fs.readFileSync(path.join(DATA_PATH, categoryName, 'config.json'))
    if(!rawData) {
        throw 'Could not read config file for ' + categoryName
    }
    const parsedData = JSON.parse(rawData)
    if(!parsedData.className || !parsedData.interfaceName || !parsedData.interfacePath){
        throw 'Config file is missing information'
    }
    return parsedData
}

function generateDataTypes(config, names){
    return `import { ${config.interfaceName} } from '${config.interfacePath}'
    
enum ${config.className}IDs {
    ${names.map(name => `${name} = '${name}'`).join(',\n\t')}
}

type ${config.className}DefinitionList = {
    [keys in ${config.className}IDs]: ${config.interfaceName}
}

const ${config.className}Definitions: ${config.className}DefinitionList = {
    ${names.join(', ')}
}

export { ${config.className}IDs, ${config.className}Definitions }
`
}

exports.default = () => {
    watch(`${DATA_PATH}/**/definitions/**/*.ts`, { ignoreInitial: false }, cb => compileData(cb))
}