# webpack常用拓展


## 清除输出目录

clean-webpack-plugin
当文件内容变化，重新打包，会自动删除原来打包的文件

```js
module.exports = {
    plugins: [
        new CleanWebpackPlugin()
    ],
}
```

## 自动生成页面

html-webpack-plugin

解决的问题：用打包后的js文件时，需要自行创建html文件，引入。但是当js文件变化，再次打包，生成的压缩文件名字变化了，并且用了clean-webpack-plugin插件，清楚了dist目录，把我写的html也删除了。
配置：

1. 自己定义模版，让他按照模版生成页面

```js
module.exports = {
 plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "html/index.html"
        })
    ],
}
```

2. 多入口（chunk）。最终生成的html会把两个打包后的js入口都引入。

```js
entry:{
    home: './src/index.js',
    a: './src/a.js'
}
```
可以配置进行选择性引入

```js
module.exports = {
 plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            chunks: ["home"] // 只使用home打包出来的js
        })
    ],
}
```

生成多个html

```js
module.exports = {
 plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "home.html",
            chunks: ['home']
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "a.html",
            chunks: ['a']
        })
    ],
}
```

## 复制静态资源
copy-webpack-plugin

```js
module.exports = {
    plugins: [
        new CopyPlugin([
            {from: 'source', to: 'dest'},
            {from: 'other', to: 'public'},
        ])
    ]
}
```

## 开发服务器

在**开发阶段**，目前遇到的问题是打包、运行、调试过程过于繁琐，回顾一下我们的操作流程：

1. 编写代码
2. 控制台运行命令完成打包
3. 打开页面查看效果
4. 继续编写代码，回到步骤2

并且，我们往往希望把最终生成的代码和页面部署到服务器上，来模拟真实环境

为了解决这些问题，webpack官方制作了一个单独的库：**webpack-dev-server**

它**既不是plugin也不是loader**

先来看看它怎么用

1. 安装
2. 执行`npx webpack-dev-server`命令

`webpack-dev-server`命令几乎支持所有的webpack命令参数，如`--config`、`-env`等等，你可以把它当作webpack命令使用

这个命令是专门为开发阶段服务的，真正部署的时候还是得使用webpack命令

当我们执行`webpack-dev-server`命令后，它做了以下操作：

1. 内部执行webpack命令，传递命令参数
2. 开启watch
3. 注册hooks：类似于plugin，webpack-dev-server会向webpack中注册一些钩子函数，主要功能如下：
   - 将资源列表（aseets）保存起来
   - 禁止webpack输出文件
4. 用express开启一个服务器，监听某个端口，当请求到达后，根据请求的路径，给予相应的资源内容

![](../public/front-end-engineering/2023-01-06-16-01-47.png)

**配置**

针对webpack-dev-server的配置，参考：[dev-server](https://www.webpackjs.com/configuration/dev-server/)

常见配置有：

- port：配置监听端口
- proxy：配置代理，常用于跨域访问
- stats：配置控制台输出内容


## 普通文件处理

file-loader: 生成依赖的文件到输出目录，然后将模块文件设置为：导出一个路径\

```javascript
//file-loader
function loader(source){
	// source：文件内容（图片内容 buffer）
	// 1. 生成一个具有相同文件内容的文件到输出目录
	// 2. 返回一段代码   export default "文件名"
}
```

url-loader：将依赖的文件转换为：导出一个base64格式的字符串，不生成文件

```javascript
//file-loader
function loader(source){
	// source：文件内容（图片内容 buffer）
	// 1. 根据buffer生成一个base64编码
	// 2. 返回一段代码   export default "base64编码"
}
```
```javascript
 module: {
        rules: [{
            test: /\.(png)|(gif)|(jpg)$/,
            use: [{
                loader: "url-loader",
                options: {
                    // limit: false //不限制任何大小，所有经过loader的文件进行base64编码返回
                    limit: 10 * 1024, //只要文件不超过 100*1024 字节，则使用base64编码，否则，交给file-loader进行处理
                    name: "imgs/[name].[hash:5].[ext]" //ext表示保留原来图片格式
                }
            }]
        }]
    },
```
## 解决路径问题

在使用file-loader或url-loader时，可能会遇到一个非常有趣的问题

比如，通过webpack打包的目录结构如下：

```yaml
dist
    |—— img
        |—— a.png  #file-loader生成的文件
    |—— scripts
        |—— main.js  #export default "img/a.png"
    |—— html
        |—— index.html #<script src="../scripts/main.js" ></script>
```

这种问题发生的根本原因：模块中的路径来自于某个loader或plugin，当产生路径时，loader或plugin只有相对于dist目录的路径，并不知道该路径将在哪个资源中使用，从而无法确定最终正确的路径

面对这种情况，需要依靠webpack的配置publicPath解决


## webpack内置插件


所有的webpack内置插件都作为webpack的静态属性存在的，使用下面的方式即可创建一个插件对象

```javascript
const webpack = require("webpack")

new webpack.插件名(options)
```

### DefinePlugin

全局常量定义插件，使用该插件通常定义一些常量值，例如：

```javascript
new webpack.DefinePlugin({
    PI: `Math.PI`, // PI = Math.PI
    VERSION: `"1.0.0"`, // VERSION = "1.0.0"
    DOMAIN: JSON.stringify("duyi.com")
})
```

这样一来，在源码中，我们可以直接使用插件中提供的常量，当webpack编译完成后，会自动替换为常量的值

### BannerPlugin

它可以为每个chunk生成的文件头部添加一行注释，一般用于添加作者、公司、版权等信息

```javascript
new webpack.BannerPlugin({
  banner: `
  hash:[hash]
  chunkhash:[chunkhash]
  name:[name]
  author:yuanjin
  corporation:duyi
  `
})
```

### ProvidePlugin

自动加载模块，而不必到处 import 或 require

```javascript
new webpack.ProvidePlugin({
  $: 'jquery',
  _: 'lodash'
})
```

然后在我们任意源码中：

```javascript
$('#item'); // <= 起作用
_.drop([1, 2, 3], 2); // <= 起作用
```
