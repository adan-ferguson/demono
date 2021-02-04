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
        const pathArray = filename.split('/')
        let target = output
        pathArray.forEach(parent => {
          parent = parent.replace('.json', '')
          if(!target[parent]){
            target[parent] = {}
          }
          target = target[parent]
        })
        Object.assign(target, contents)
      })
      for(let type in output.data){
        const path = `src/data/${type}.json`
        fs.writeFileSync(path, JSON.stringify(output.data[type]))
        console.log('wrote', path)
      }
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