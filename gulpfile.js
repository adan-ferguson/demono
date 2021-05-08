const fs = require('fs')
const path = require('path')
const { watch } = require('gulp')

const DATA_PATH = './src/game/data'

function compileData(cb) {
    const categories = fs.readdirSync(DATA_PATH)
    categories.forEach(cat => {
        compileCategory(cat)
    })
    cb()
}

function compileCategory(categoryName) {
    let contents = ''
    let names = []
    const basePath = path.join(DATA_PATH, categoryName, 'definitions')
    readDir()
    contents += `export { ${names.join(',')} }`
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
                contents += `import { ${name} } from './definitions/${subdirs.join('/')}/${name}'\n${name}.categories = '${subdirs}'\n`
            }
        })
    }
}

exports.default = () => {
    watch(`${DATA_PATH}/**/definitions/**/*.ts`, { ignoreInitial: false }, cb => compileData(cb))
}