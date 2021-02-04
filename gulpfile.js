const fs = require('fs')
const glob = require('glob')
const {watch} = require('gulp')

const output = {}
const DATA_GLOB = 'data/**/*.json'

function compileData(cb){
  glob(DATA_GLOB, (error, files) => {
    try {
      files.forEach((filename) => {
        const contents = JSON.parse(fs.readFileSync(filename, 'utf8'))
        Object.assign(output, contents)
      })
      fs.writeFileSync('src/data.json', JSON.stringify(output))
      console.log('Data Compiled')
    }catch(ex){
      console.error(ex)
    }
    cb()
  })
}

exports.default = () => {
  watch(DATA_GLOB, {ignoreInitial: false}, compileData)
}