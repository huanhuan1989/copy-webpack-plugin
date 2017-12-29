const Files = require('./files')
const Config = require('./config')
const glob = require('glob')

class Base extends Files{
  constructor (...arg) {
    super(...arg)
    this.name = 'Base'
  }

  normalize (opts) {
    return opts
      .map(el => Object.assign({}, Config.defaultParam, el))
      .filter(el => {
        if( !el.to ) {
          el.to = el.from
        }
        return el
      })
  }
  
  /**
   * getFilesName 获取文件名称
   * @param  [{String}]  locationPath  原始数据
   * return  返回新名称
   */
  getFilesName (locationPath) {
    const num = locationPath.lastIndexOf('/') + 1
    locationPath = locationPath.substring(num)
    return locationPath
  }

  /**
   * getFilesNormalize 根据不同的数据格式，返回数组
   * @param  [{String}]  path  文件路径
   * @param  [{String}]  type  文件类型
   * return  压缩后的文件内容
   */
  getFilesNormalize (path) {
    const self = this
    let entryObjSet = {}
    let entryArrSet = []
    return glob.sync(path)
      .map(elem => ({ name: self.getFilesName(elem), value: elem }))
      .reduce((prev, current) => {
        prev['obj'][current.name] = current.value
        prev['arr'].push(current.value)
        return prev
      }, {obj: {}, arr: []})
  }
}

module.exports = Base