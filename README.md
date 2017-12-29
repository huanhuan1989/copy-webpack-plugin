# copy-webpack-plugin
webpack1copy文件/文件夹 只是针对于webpack1, 其他未测试

## node-安装
```javascript

npm install copy-webpack1-plugin

```
## 使用方法

```javascript
/**
 * CopyWebpackPlugin 示例说明
 * @param {Array}   copy    需要copy的文件/文件夹(可写正则)
 * @param {String}  entry   原始路径
 * @param {String}  entry   输出路径
 * 
 */
const CopyWebpackPlugin = require('copy-webpack1-plugin')
const path = require('path')

module.exports = {
  entry: "index.js",
  output: {
    path: path.join(__dirname, 'dest'),
    filename: 'bundle.js'
  },
  plugins: [
    new CopyWebpackPlugin([
			{
				from: 'js/commons/*',
				toType: 'dir',
				create: 'js/commons'
			},
		], {
			entry: '_static',
			dist: 'static'
		})
  ]
};
```

| 参数| 说明  |
| --- |-------------:|
| entry | 文件原始目录 |
| dist | 输出目录 |
| copy | 需要拷贝的文件夹或是文件/没有则视为copy整个文件夹 |


>copy属性可用，可不用，其中参数为

| copy参数| 说明  |
| --- |-------------:|
| from | 文件原始目录 |
| to | 输出目录 - 当输出文件除了entry和dist一致外的目录和from一致时，则可省略 |
| toType | 输出目录类型 |
| create | 需要创建文件夹 |
