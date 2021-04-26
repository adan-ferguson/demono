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
    const files = fs.readdirSync(path.join(DATA_PATH, categoryName, 'definitions'))
    files.forEach(filename => {
        let name = filename.replace(/\.[^/.]+$/, '')
        names.push(name)
        contents += `import { ${name} } from './definitions/${name}'\n`
    })
    contents += `export { ${names.join(',')} }`
    fs.writeFileSync(path.join(DATA_PATH, categoryName, 'definitionLoader.ts'), contents)
    console.log(`Definition Loader for ${categoryName} compiled.`)
}

exports.default = () => {
    watch(`${DATA_PATH}/**/definitions/**/*.ts`, { ignoreInitial: false }, cb => compileData(cb))
}