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
    let data = []
    const basePath = path.join(DATA_PATH, categoryName, 'definitions')
    readDir()
    const contents = generateLoaderCode(getConfig(categoryName), data)
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
                data.push({
                    name: name,
                    categories: subdirs
                })
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

function generateLoaderCode(config, data){
    return `import { DataCollection } from 'game/data/dataCollection'
import { ${config.interfaceName} } from '${config.interfacePath}'
${data.map(d => `import { ${d.name} } from './definitions/${d.categories.join('/')}/${d.name}'`).join('\n')}

type ${config.className}ID = ${data.map(d => `'${d.name}'`).join(' | ')}

const ${config.className}Definitions = new DataCollection<${config.className}ID, ${config.interfaceName}>({
    ${data.map(d => `${d.name}: { definition: ${d.name}, categories: [${d.categories.map(name => `'${name}'`)}] }`).join(',\n    ')}
})

export { ${config.className}ID, ${config.className}Definitions }
`
}

exports.default = () => {
    watch(`${DATA_PATH}/**/definitions/**/*.ts`, { ignoreInitial: false }, cb => compileData(cb))
}