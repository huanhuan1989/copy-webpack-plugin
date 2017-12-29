const Base = require('./base')

class CopyWebpackPlugin extends Base {
	constructor (...arg){
			super(...arg)
			this.opts = super.normalize(arg[0])
			this.path = arg[1]
			this.entry = this.path.entry
			this.dist = this.path.dist
			this.DockData = {
					'file': this.singleFile,
					'dir': this.directory
			}
	}

	apply (compiler) {
		const self = this
		const arr = []
		const dist = compiler.options.output.path
		const context = compiler.options.context
		const entryRePath = `${context}/${this.entry}`
		const distRePath = `${dist}/${this.dist}`
		compiler.plugin('after-emit', (compilation, callback) => {
			/**
			 * 1. 文件，直接copy
			 * 2. 文件夹
			 */
			self.opts
			.map(el => (Object.assign({}, {entry:`${entryRePath}/${el.from}`, dist: `${distRePath}/${el.to}`, createPath: `${distRePath}/${el.create}`}, el)))
			.filter(el => {
				self.DockData[el.toType].bind(self)(el)
				return el
			})
			callback && callback()
		})
	}

	async singleFile (item) {
		if (item.create) {
			const fileData = await super.createDir(item.createPath)
			fileData && this.copyFile(item.entry, item.dist)
			return this
		}
		this.copyFile(item.entry, item.dist)
	}

	async directory (item) {
		const fileData = await super.createDir(item.createPath)
		if(fileData) {
			const filesName = super.getFilesNormalize(item.entry)
			for(let key in filesName.obj) {
				this.copyFile(filesName.obj[key], `${item.createPath}/${key}`)
			}
		}
	}

	async copyFile (entry, dist) {
		const isEntryExists = await super.isExists(entry)
		const isDistExists = await super.isExists(dist)
		if (!isEntryExists || isDistExists) {
			return this
		}
		const content = await super.getFilesContent(entry)
		super.writeFileSync(dist, content)
	}
}

module.exports = CopyWebpackPlugin