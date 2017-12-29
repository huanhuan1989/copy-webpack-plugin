const fs = require('fs')
const promise = require('promise')

/**
 * Files 
 */
class Files {
  constructor () {
    this.DEF_IMG_TYPE = ['jpg', 'png', 'ico', 'gif', 'bmp', 'jpeg', 'tiff', 'svg', 'swf']
  }

  isFile (locationPath) {
    return fs.statSync(locationPath).isFile()
  }

  ifDir (locationPath) {
    return fs.statSync(locationPath).isDirectory()
  }

  isExists (locationPath) {
    return new Promise((resolve, reject) => {
      return fs.exists(locationPath, function (exists) {
        return exists ? resolve(true) : resolve(false)
      })
    })
  }

  getSuffix (entry) {
    if(entry.indexOf('.') != -1) {
      return entry.match(/\.(\w+)/)[1]
    }
    return ''
  }

  getFileType (entry) {
    const self = this
    const suffix = self.getSuffix(entry)
    let result = false
    self.DEF_IMG_TYPE
      .map(item => ({name: item}))
      .filter(item => {
        if(item.name === suffix){
          result = true
        }
        return item
      })

    return result
  }

  createDir (distDirPath) {
    const self = this
    return new Promise((resolve, reject) => {
      return self.isExists(distDirPath).then(data => {
        if (data) {
          resolve(true)
          return 'exists dir!'
        }

        return fs.mkdir(distDirPath, (err) => {
          if (err) {
            reject(err)
            return 'creat err!'
          }
          resolve(true)
          return 'creat done!'
        })
      }, err => (console.log('----createDir方法-----', err)))
    })
  }

  readFileSync (locationPath) {
    return fs.readFileSync(locationPath, 'utf-8')
  }

  writeFileSync (distFilesPath, content) {
    return fs.writeFileSync(distFilesPath, content)
  }
  
  getFilesContent (filePath) {
    const type = this.getFileType(filePath)
    const bufferC = type ? '' : 'utf-8'
    return new Promise((resolve, reject) => {
      return fs.readFile(filePath, bufferC, function (err, data) {
        if (err) {
          reject('creat err!')
          return 'creat err!'
        }
        resolve(data)
        return data
      })
    })
  }

  readdir (localPath) {
    return new Promise((resolve, reject) => {
      return fs.readdir(localPath, (err, files) => {
        if(err){
          reject(err)
        }
        resolve(files)
      })
    })
  }
}

module.exports = Files