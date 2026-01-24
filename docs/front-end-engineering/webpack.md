# webpack onePage

## 如何在浏览器端实现模块
### 浏览器端的模块化
问题：

+ 效率问题：精细的模块划分带来了更多的JS文件，更多的JS文件带来了更多的请求，降低了页面访问效率
+ 兼容性问题：浏览器目前仅支持ES6的模块化标准，并且还存在兼容性问题
+ 工具问题：浏览器不支持npm下载的第三方包

这些仅仅是前端工程化的一个缩影

当开发一个具有规模的程序，你将遇到非常多的非业务问题，这些问题包括：执行效率、兼容性、代码的可维护性可扩展性、团队协作、测试等等等等，我们将这些问题称之为工程问题。工程问题与业务无关，但它深刻的影响到开发进度，如果没有一个好的工具解决这些问题，将使得开发进度变得极其缓慢，同时也让开发者陷入技术的泥潭。

### 根本原因
思考：上面提到的问题，为什么在node端没有那么明显，反而到了浏览器端变得如此严重呢？

答：<font style="color:#F5222D;">在node端，运行的JS文件在本地，因此可以本地读取文件</font>，它的效率比浏览器远程传输文件高的多

**根本原因**：在浏览器端，开发时态（devtime）和运行时态（runtime）的侧重点不一样

**开发时态，devtime：**

1. 模块划分越细越好
2. 支持多种模块化标准
3. 支持npm或其他包管理器下载的模块
4. 能够解决其他工程化的问题

**运行时态，runtime：**

1. 文件越少越好
2. 文件体积越小越好
3. 代码内容越乱越好
4. 所有浏览器都要兼容
5. 能够解决其他运行时的问题，主要是执行效率问题

这种差异在小项目中表现的并不明显，可是一旦项目形成规模，就越来越明显，如果不解决这些问题，前端项目形成规模只能是空谈

### 解决办法
既然开发时态和运行时态面临的局面有巨大的差异，因此，我们需要有一个工具，这个工具能够让开发者专心的在开发时态写代码，然后利用这个工具将开发时态编写的代码转换为运行时态需要的东西。

这样的工具，叫做**构建工具**

<!-- 这是一张图片，ocr 内容为：devtime 模块1 runtime 构建工具 模块2 target.js 模块3 模块4 -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1615709548244-ea8fbf74-44f7-4c2d-ad0d-9ea8bed1bc57.png)

这样一来，开发者就可以专注于开发时态的代码结构，而不用担心运行时态遇到的问题了。

### 常见的构建工具
+ **webpack**
+ grunt
+ gulp
+ browserify
+ fis
+ 其他

## webpack的安装和使用 
> webpack官网：[https://www.webpackjs.com/](https://www.webpackjs.com/)
>

### webpack简介
全部东西视为模块

webpack是基于模块化的打包（构建）工具，它把一切视为模块

它通过一个开发时态的入口模块为起点，分析出所有的依赖关系，然后经过一系列的过程（压缩、合并），最终生成运行时态的文件。

webpack的特点：

+ **为前端工程化而生**：webpack致力于解决前端工程化，特别是浏览器端工程化中遇到的问题，让开发者集中注意力编写业务代码，而把工程化过程中的问题全部交给webpack来处理
+ **简单易用**：支持零配置，可以不用写任何一行额外的代码就使用webpack
+ **强大的生态**：webpack是非常灵活、可以扩展的，webpack本身的功能并不多，但它提供了一些可以扩展其功能的机制，使得一些第三方库可以融于到webpack中
+ **基于nodejs**：由于webpack在构建的过程中需要读取文件，因此**它是（****<font style="color:#F5222D;">中间是）</font>****<font style="color:#F5222D;">运行在node环境中的</font>**

> 理解:中间打包需要node环境，如果左边是浏览器环境，右边即浏览器；如果左边是node环境，右边即node
>

+ **基于模块化**：webpack在构建过程中要分析依赖关系，方式是通过模块化导入语句进行分析的，它支持各种模块化标准，包括CommonJS、ES6 Module

> 只打包依赖的东西
>

### webpack的安装
webpack通过npm安装，它提供了两个包：

+ webpack：核心包，包含了webpack构建过程中要用到的所有api
+ webpack-cli：提供一个简单的cli命令，它调用了webpack核心包的api，来完成构建过程

安装方式：

+ 全局安装：可以全局使用webpack命令，但是无法为不同项目对应不同的webpack版本
+ 本地安装：推荐，每个项目都使用自己的webpack版本进行构建

先初始化npm init，在npm i -D webpack webpack-cli   D开发依赖，而不是生产,右边要运行，右边已经构建完成，和webpack没关系了 

### 使用
webpack

默认情况下，webpack会以`./src/index.js`作为入口文件分析依赖关系，打包到`./dist/main.js`文件中

通过--mode选项可以控制webpack的打包结果的运行环境

npx webpack命令运行

<font style="color:#F5222D;">src里面是开发时候的代码，dist里面是运行时候的代码. src	里面如果语法错误，也不报错，因为根本就不运行</font>

> 打包完成的代码要在什么环境内运行？
>

1. 

开发环境配置：npx webpack --mode=development

生产环境配置：npx webpack --mode=production

2. 也可以在package.json配置

```javascript
"scripts": {
  "build": "webpack --mode=production",
  "dev": "webpack --mode=development"
},
运行：npm run build--------生产环境
		 npm run dev----------开发环境	
```

3. 也可以在webpack.config.js里面配置以下代码：

```javascript
module.exports = {
    mode: 'development',
};
```

## 模块化兼容性
由于webpack同时支持CommonJS和ES6 module，因此需要理解它们互操作时webpack是如何处理的

### 同模块化标准
如果导出和导入使用的是同一种模块化标准，打包后的效果和之前学习的模块化没有任何差异

<!-- 这是一张图片，ocr 内容为：--------------- CommonJsimport CommonjSexport reguire("./a") module.exports二 a:1, b:2, C:3 a:1, b:2, -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1615779492219-2888c77e-eba5-426e-8381-8c81679cc215.png)

<!-- 这是一张图片，ocr 内容为：ES6import ES6export /a" objfrom import as vara三1; export exportvarb-2; exportdefau1t3; a:1, b:2, defau1t:3 importcfrom"./a" -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1615779502334-4ebb05ee-a9b2-4d40-9d65-d4748484b3b6.png)

### 不同模块化标准
不同的模块化标准，webpack按照如下的方式处理

<!-- 这是一张图片，ocr 内容为：CommonjSimport ES6export require("./a") export vara三1; exportvarb-2; exportdefau1t3; a:1, b:2, defau1t:3 -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1615779520133-5b015b28-1a6b-469e-b8b4-2f99844ea91c.png)

<!-- 这是一张图片，ocr 内容为：ES6import CommonSe export import*asobjfrom"./a" module.exports a:1, b:2, importcfrom a:1, b:2, C:3 -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1615779531779-ff8dded5-bd98-4e97-b477-467e71f4bcc7.png)





命令实现：es6导出，commonjs导入

package.json配置好

```json
"scripts": {
    "build": "webpack --mode=production",
    "dev": "webpack --mode=development"
  },
```

写好代码

index.js

```javascript
var obj = require("./es6a")
console.log(obj);
console.log(obj.a, obj.b, obj.default)
```

es6a.js

```javascript
export var a = 1;
export var b = 2;
export default 3;
```

<font style="color:#F5222D;">运行webpack : npm run dev</font>

es6导出，commonjs导入

common:

```javascript
module.exports = {
    a: 1,
    b: 2,
    c: 3
}
```

index

```javascript
import * as obj from "./commonjsa"
// import obj from "./commonjsa"
console.log(obj)
```

### 最佳实践
代码编写最忌讳的是精神分裂，选择一个合适的模块化标准，然后贯彻整个开发阶段。

## 数字特效
## 配置文件
命令npx webpack打包

通过命令给与参数：npx webpack --mode=development也能完成打包、

webpack提供的cli支持很多的参数，例如`--mode`，但更多的时候，我们会使用更加灵活的配置文件来控制webpack的行为



默认情况下，webpack会读取`webpack.config.js`文件作为配置文件，但也可以通过CLI参数`--config`来指定某个配置文件

命令：npx webpack --config 123.js

配置文件中<font style="color:#F5222D;">通过CommonJS模块导出</font>一个对象<font style="color:#F5222D;">，不能用es6（面试题）</font>对象中的各种属性对应不同的webpack配置

<font style="background-color:#FADB14;">因为中间打包的过程中要读取配置文件的内容</font>

<font style="background-color:#FADB14;">打包的过程中要运行配置文件</font>

<font style="background-color:#FADB14;">src下面main.js就算有错误，打包过程也不报错，因为打包和main.js无关</font>

```javascript
module.exports = {}
```

**<font style="color:#F5222D;">注意：配置文件中的代码，必须是有效的node代码</font>**

**<font style="color:#F5222D;"></font>**

当命令行参数与配置文件中的配置出现冲突时，以命令行参数为准。

**基本配置：**

1. mode：编译模式，字符串，取值为development或production，指定编译结果代码运行的环境，会影响webpack对编译结果代码格式的处理

在webpack.config.js里

```javascript
module.exports = {
  mode: "production"
}
```

2. entry：入口，字符串（后续会详细讲解），指定入口文件

默认./src/index.js

```javascript
module.exports = {
  entry:"./123.js"
}
```

3. output：出口，对象（后续会详细讲解），指定编译结果文件

默认./dist/main.js

```javascript
module.exports = {
  output:{
    filename:"bundle.js"
  }
}
```

## devtool配置
### source map 源码地图
> 本小节的知识与 webpack 无关
>

前端发展到现阶段，很多时候都不会直接运行源代码，可能需要对源代码进行合并、压缩、转换等操作，真正运行的是转换后的代码



<!-- 这是一张图片，ocr 内容为：1js 2.js 3.ts bundle.js 合并压缩后的代码 -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1616068966946-55fa2ee6-1cd8-46a1-9093-e57c4e804398.png)



这就给调试带来了困难，因为当运行发生错误的时候，我们更加希望能看到源代码中的错误，而不是转换后代码的错误

> jquery压缩后的代码：[https://code.jquery.com/jquery-3.4.1.min.js](https://code.jquery.com/jquery-3.4.1.min.js)
>

为了解决这一问题，chrome浏览器率先支持了source map，其他浏览器纷纷效仿，目前，几乎所有新版浏览器都支持了source map

source map实际上是一个配置，配置中不仅记录了所有源码内容，还记录了和转换后的代码的对应关系

下面是浏览器处理source map的原理

<!-- 这是一张图片，ocr 内容为：1.请求 3浏览器再次请求庄 bundlejs &*&*......*......*&*&9%%$##9进9# &**&(& 转换后的代码丑陋且难以理解 (&(*&*(AA(Q*_4*&*4*入*&*&**(*) 大)*AAA **(***(*(**) 2.浏览器发现有sourcemap //# sourcemappingURLbundleap bundle.map 该文件中记录了原始代码 还记录了转换后的代码和原始代码的对应 关系 -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1616068989695-ca5eb6b3-26cd-4266-a3af-8d0ebf0e2a84.png)

<!-- 这是一张图片，ocr 内容为：3,显示原始代码中对应位置的错误 1.运行 bundlejs bundle.map 该文件中记录了原始代码 &+&州%%$##必##@&*(*&(& &*&*......*..... 还记录了转换后的代码和原始代码的对应 (&(*(&*(AA(Q*_(*&**八*&*&(**(*) 关系 *(*)*(**(*(*)*)*入AN /#spurceMappingURL-bundleap 2.发生错误 -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1616069017898-ff7c25cd-cc10-474c-9609-9510ac0e5d6c.png)

**最佳实践**：

1. source map 应在开发环境中使用，作为一种调试手段
2. source map <font style="color:#F5222D;">不应该在生产环境中使用</font>，source map的文件一般较大，不仅会导致额外的网络传输，还容易暴露原始代码。即便要在生产环境中使用source map，用于调试真实的代码运行问题，也要做出一些处理规避网络传输和代码暴露的问题。

### webpack中的source map
使用 webpack 编译后的代码难以调试，可以通过 devtool 配置来**优化调试体验**

具体的配置见文档：[https://www.webpackjs.com/configuration/devtool/](https://www.webpackjs.com/configuration/devtool/)

使用开发环境：

```javascript
module.exports = {
  mode: "development",
}
```

<!-- 这是一张图片，ocr 内容为：varobjenull; objcabcoix console.og( module" -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1616070047464-d296c155-8d0d-42c8-841e-a6ff5e876ce4.png)浏览器自带

```javascript
eval("var obj = null;\nobj.abc();\nconsole.log(\"a module\")\n\n//# sourceURL=webpack:///./src/a.js?");
```

eval是简易版的source map    

生产环境production就不行，要想有则需要 devtool 配置

```javascript
module.exports = {
    mode: "production",
    devtool: "eval"
}
```

## <font style="background-color:#D3ADF7;">webpack 编译过程</font>
webpack 的作用是将源代码编译（构建、打包）成最终代码

<!-- 这是一张图片，ocr 内容为：js 编译 js .hbs png css sass jpg jpg png sass STATICASSETS sass -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1616070817729-e378c192-9d10-483a-8936-1324a1b19529.png)

整个过程大致分为三个步骤

1. 初始化
2. 编译
3. 输出



<!-- 这是一张图片，ocr 内容为：编译 输出 初始化 -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1616070830256-d69214bc-f1ad-4add-a490-f727c8ed2835.png)

### 初始化
此阶段，webpack会将**CLI参数**、**配置文件**、**默认配置**进行融合，形成一个最终的配置对象。

对配置的处理过程是依托一个第三方库`yargs`完成的

此阶段相对比较简单，主要是为接下来的编译阶段做必要的准备

目前，可以简单的理解为，初始化阶段主要用于产生一个最终的配置

### 编译
1. **创建chunk**

chunk是webpack在内部构建过程中的一个概念，译为`块`，它表示通过<font style="color:#F5222D;">某个入口找到的所有依赖的统称</font>。

根据入口模块（默认为`./src/index.js`）创建一个chunk



<!-- 这是一张图片，ocr 内容为：chunk main 入口模块 /src/indexjs -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1616070840544-9d62d50d-d898-44a1-abe4-80500ef4250f.png)

每个chunk都有至少两个属性：

+ name：默认为main
+ id：唯一编号，开发环境和name相同，生产环境是一个数字，从0开始
2. **构建所有依赖模块**

<!-- 这是一张图片，ocr 内容为：mainchunk 入口 根据dependencies的 内容递归加载模块 模块文件 chunk中的模块记录 检查记录 记录 转换后的代码 模块id 保存转换后的模 已记录则结束 块代码 未记录则继续 /src/index.js XXXXXXXXX /src/a.js XXXXXXXXX 替换依赖函数 读取文件内容 语法分析 保存到 AST 抽象语法树 dependencies中 记录依赖 -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1616070855880-0398d65b-fd9a-4d9f-8861-1aab52f483c9.png)

<!-- 这是一张图片，ocr 内容为：未加载 /src/indeX.js 内容(字符串): console.log("index") require(./a"; requireC./b") -->AST->树形结构遍历,找到所有依赖 [./src/ajjs"/rc/o.js" -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630672329824-2beddbc8-5043-45ed-8c5d-39200e7e3849.png)<!-- 这是一张图片，ocr 内容为：转换后的代码: console.log("'index") webpackrequire./rc/a.js"; webpackrequire(/src/b.j" -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630672375198-7c2b32f3-3ab8-4810-b28f-7d4c36acad8f.png)

形成表格

<!-- 这是一张图片，ocr 内容为：模块id:./src/indexjs 转换后的代码: console.log("'indeX" 11 Webpackrequire/src/a.js"; webpackrequire"/src/b.js") -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630672460248-408bba9d-f12b-490c-96cc-0472cf574ba4.png)

递归加载./src/a.js

<!-- 这是一张图片，ocr 内容为：/src/ajs未加载 requireC/b") consolelogC'a") module.exports"a" ['./src/b.js"] webpackrequire(/src/b.js") console.logCa") module.exports-"a -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630672585213-a0f3e404-c8f6-45d8-850d-0c4b9bdd0fe3.png)

记录下来，保存到模块列表中

<!-- 这是一张图片，ocr 内容为：模块id:./src/a.js 转换后的代码: _webpackrequire/src/b.js") console.logCa") T module.exports二" "'a -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630672608179-5cc2d1b8-97ab-4eee-bfa9-50146e71219c.png)

递归加载./src/b.js。这里加载的b是由于a依赖b,实际上b还没有加载

<!-- 这是一张图片，ocr 内容为：未加载 /src/b.js console.log("b") moduleexports-"b"; 口 console.log(b") module.exports"b" -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630672733484-6ebf0ea1-ca5f-40db-ad7f-b4e484b4c10e.png)

记录下来，保存到模块列表中

<!-- 这是一张图片，ocr 内容为：模块id:./src/b.js 转换后的代码: consOle.logCb") moduleexports-"b"; -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630672693235-feb43230-c563-4c4f-99ac-980c602a4fd5.png)

a加载完毕，继续加载index，到了b

<!-- 这是一张图片，ocr 内容为：/src/b.js已记录不加载 -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630672832047-66c41694-cf79-4eaf-9674-b1e73a471eb9.png)



> AST在线测试工具：[https://astexplorer.net/](https://astexplorer.net/)
>



简图



<!-- 这是一张图片，ocr 内容为：mainchunk 模块2 模块1 模块4 入口 模块3 -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1616070867512-743340dd-f142-4a04-b51f-78d2dd5883ce.png)



3. **产生chunk assets**

在第二步完成后，chunk中会产生一个模块列表，列表中包含了**模块id**和**模块转换后的代码**

接下来，webpack会根据配置为chunk生成一个资源列表，即`chunk assets`，资源列表可以理解为是生成到最终文件的文件名和文件内容

<!-- 这是一张图片，ocr 内容为：mainchunk chunk中的模块记录 chunkassets 转换后的代码 模块id 文件内容 文件名 /src/indexjs XXXXXXXXX /dist/mainjs XXXXXXXXX /src/ajs XXXXXXXXX /dist/main.js.map XXXXXXXXX chunkhash:XxxxxxxXxxXxxXXXXXxXXXX -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1616070878940-07dfb974-cd0d-4685-a4f6-765772021f43.png)

> chunk hash是根据所有chunk assets的内容生成的一个hash字符串
>
> hash：一种算法，具体有很多分类，特点是将一个任意长度的字符串转换为一个固定长度的字符串，而且可以保证原始内容不变，产生的hash字符串就不变
>

简图



<!-- 这是一张图片，ocr 内容为：mainchunk chunkassets 模块2 模块1 模块4 入口 模块3 chunkhash:XxxxxxXXxXXxXXXXXXXXXXX -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1616070889564-6990dd2c-d0be-4446-bf34-df1a96d897a1.png)

4. **合并chunk assets**

将多个chunk的assets合并到一起，并产生一个总的hash



<!-- 这是一张图片，ocr 内容为：mainchunk chunkassets assets chunkhash:XxXXxxxxxxxxxxxxxxxXxxx abcchunk chunkassets hash:XxxxxxxxxxXxXXXxXXXXxXx chunkhash:XXXXxXXxXXXXXXXXXXXXXXX -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1616070901529-72a7661f-2314-4a52-9c42-9060f8373bc7.png)

### 输出
此步骤非常简单，webpack将利用node中的fs模块（文件处理模块），根据编译产生的总的assets，生成相应的文件。



<!-- 这是一张图片，ocr 内容为：文件1 assets 文件2 输出 文件3 文件4 -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1616070915203-b1496f86-ff65-4cda-bac9-df3e459b79ba.png)



### 总过程
<!-- 这是一张图片，ocr 内容为：webpack命令 输出 初始化 编译 按照资源列表 读取命令参数 chunkid,name,chunkhash 生成文件 导入配置文件 合并配置对象 chunkid,name,chunkhash hash -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1616070969836-2f6c32d5-273f-47d3-b7c8-5dabeaada325.png)



<!-- 这是一张图片，ocr 内容为：mainchunk 入口 根据dependencies的 内容递归加载模块 模块文件 chunk中的模块记录 检查记录 转换后的代码 记录 模块id 保存转换后的模 已记录则结束 块代码 未记录则继续 /src/indexjjs XXXXXXXXX /src/ajs XXXXXXXXX 替换依赖函数 读取文件内容 语法分析 保存到 AST 抽象语法树 dependencies中 记录依赖 -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1616070957234-f34324b7-2839-4ca3-85f8-892c1345826b.png)



**涉及术语**

1. module：模块，分割的代码单元，webpack中的模块可以是任何内容的文件，不仅限于JS
2. chunk：webpack内部构建模块的块，一个chunk中包含多个模块，这些模块是从入口模块通过依赖分析得来的
3. bundle：chunk构建好模块后会生成chunk的资源清单，清单中的每一项就是一个bundle，可以认为bundle就是最终生成的文件
4. hash：最终的资源清单所有内容联合生成的hash值
5. chunkhash：chunk生成的资源清单内容联合生成的hash值
6. chunkname：chunk的名称，如果没有配置则使用main
7. id：通常指chunk的唯一编号，如果在开发环境下构建，和chunkname相同；如果是生产环境下构建，则使用一个从0开始的数字进行编号



# 入口和出口


<!-- 这是一张图片，ocr 内容为：webpack命令 输出 初始化 编译 按照资源列表 读取命令参数 chunkid,name,chunkhash 生成文件 导入配置文件 合并配置对象 chunkid,name,chunkhash hash -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630673953334-87309acd-aad7-4dce-8a6a-c463994b1faf.png)



> node内置模块 - path: [https://nodejs.org/dist/latest-v12.x/docs/api/path.html](https://nodejs.org/dist/latest-v12.x/docs/api/path.html)
>



**出口**



这里的出口是针对资源列表的文件名或路径的配置



出口通过output进行配置



**入口**



**入口真正配置的是chunk**



入口通过entry进行配置



规则：



+ name：chunkname
+ hash: 总的资源hash，<font style="color:#F5222D;">通常用于解决缓存问题。哈希就是根据文件内容生成出来的。内容变化，哈希变化。反之，就算文件内容有所改变，浏览器会用缓存，对于更新的文件无动于衷</font>
+ chunkhash: 使用<font style="color:#F5222D;">chunkhash</font>
+ id: 使用chunkid，不推荐。会导致生产环境和开发环境的名字不一致。



# 入口和出口的最佳实践 


具体情况具体分析



下面是一些经典场景



## 一个页面一个JS


<!-- 这是一张图片，ocr 内容为：JS pageA JS pageB JS pagec -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630673991535-9aaa9a57-92da-47e5-b24b-9833101a1a66.png)



源码结构



```plain
|—— src
    |—— pageA   页面A的代码目录
        |—— index.js 页面A的启动模块
        |—— ...
    |—— pageB   页面B的代码目录
        |—— index.js 页面B的启动模块
        |—— ...
    |—— pageC   页面C的代码目录
        |—— main1.js 页面C的启动模块1 例如：主功能
        |—— main2.js 页面C的启动模块2 例如：实现访问统计的额外功能
        |—— ...
    |—— common  公共代码目录
        |—— ...
```



webpack配置



```javascript
module.exports = {
    entry:{
        pageA: "./src/pageA/index.js",
        pageB: "./src/pageB/index.js",
        pageC: ["./src/pageC/main1.js", "./src/pageC/main2.js"]
    },
    output:{
        filename:"[name].[chunkhash:5].js"
    }
}
```



这种方式适用于页面之间的功能差异巨大、公共代码较少的情况，这种情况下打包出来的最终代码不会有太多重复

> 面试题：打包出来的js，里面会有公共代码，这里代码的重复会造成什么影响？
>

<font style="color:#BFBFBF;">不好维护。并不存在这种问题，因为写的并不是打包出来的js。自己写的并没有重复代码。</font>

导致传输量增加。

<!-- 这是一张图片，ocr 内容为：公共代码:4KB 页面A:10KB B+4KB 页面B:10KB +4KB 页面C:10KB 4KB 14*3-42KB -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630717797021-d6fc59db-0de2-48a3-88a0-0ea66bb2825e.png)<!-- 这是一张图片，ocr 内容为：公共代码:4KB 页面A:10KB 4KB 页面B:10KB 页面C:10KB 14*3-42KB 缓存 34KB -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630717820729-a416a7a0-3042-4078-9b7e-875c7d603d39.png)



## 一个页面多个JS


<!-- 这是一张图片，ocr 内容为：JS e pageA JS JS pageB -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630674004010-edb40db2-6454-499a-aa87-6dd70e82d5a2.png)



源码结构



```plain
|—— src
    |—— pageA   页面A的代码目录
        |—— index.js 页面A的启动模块
        |—— ...
    |—— pageB   页面B的代码目录
        |—— index.js 页面B的启动模块
        |—— ...
    |—— statistics   用于统计访问人数功能目录
        |—— index.js 启动模块
        |—— ...
    |—— common  公共代码目录
        |—— ...
```



webpack配置



```javascript
module.exports = {
    entry:{
        pageA: "./src/pageA/index.js",
        pageB: "./src/pageB/index.js",
        statistics: "./src/statistics/index.js"//statistics和AB都没关系，可以单独开一个chunk
    },
    output:{
        filename:"[name].[chunkhash:5].js"
    }
}
```



这种方式适用于页面之间有一些**独立**、相同的功能，专门使用一个chunk抽离这部分JS有利于浏览器更好的缓存这部分内容。



> 思考：为什么不使用多启动模块的方式？
>



## 单页应用


所谓单页应用，是指整个网站（或网站的某一个功能块）只有一个页面，页面中的内容全部靠JS创建和控制。 vue和react都是实现单页应用的利器。



<!-- 这是一张图片，ocr 内容为：JS index -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630674016988-6a8a05b5-b4bf-41d0-bcfd-99cf748de49c.png)



源码结构



```plain
|—— src
    |—— subFunc   子功能目录
        |—— ...
    |—— subFunc   子功能目录
        |—— ...
    |—— common  公共代码目录
        |—— ...
    |—— index.js
```



webpack配置



```javascript
module.exports = {
    entry: "./src/index.js",
    output:{
        filename:"index.[hash:5].js"
    }
}
```



# loader


> webpack做的事情，仅仅是分析出各种模块的依赖关系，然后形成资源列表，最终打包生成到指定的文件中。  
更多的功能需要借助webpack loaders和webpack plugins完成。
>



webpack loader： loader本质上是一个函数，它的作用是将某个源码字符串转换成另一个源码字符串返回。



<!-- 这是一张图片，ocr 内容为：字符串(代码) 字符串(代码) loader -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630719057500-fcb0fdb3-a0e6-448d-b41d-7337e4c3c684.png)



loader函数的将在模块解析的过程中被调用，以得到最终的源码。



**全流程：**



<!-- 这是一张图片，ocr 内容为：wedpack命令 输出 初始化 编译 按照资源列表 读取命令参数 chunkid, chunkhash name, 生成文件 导入配置文件 合并配置对象 chunkid,name,chunkhash hash -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630719066763-b6fe23ea-173d-4950-b5f8-3b9ecf175c89.png)



**chunk中解析模块的流程：**



<!-- 这是一张图片，ocr 内容为：chunk 入口 根据dependencies的 内容递归加载模块 模块文件 chunk中的模块记录 检查记录 记录 模块id 转换后的代码 保存转换后的模 已记录则结束 块代码 未记录则继续 /src/index.js XXXXXXXXX /src/a.js XXXXXXXXX 替换依赖函数 读取文件内容 语法分析 保存到 AST 抽象语法树 dependencies中 记录依赖 -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630719077379-9c8fae47-9759-42da-a085-31f5d5a215fb.png)



**chunk中解析模块的更详细流程：**



<!-- 这是一张图片，ocr 内容为：根据dependencies的 入口 内容递归加载模块 模块文件 检查记录 记录 保存转换后的模 已记录则结束 块代码 未记录则继续 替换依赖函数 读取文件内容 保存到 AST 处理loaders 抽象语法树 dependencies中 记录依赖 -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630719087851-501003a3-78cd-4b7b-8f9a-abae313439bc.png)



**处理loaders流程：**



<!-- 这是一张图片，ocr 内容为：是 读取规则中对应 当前模块的是否 满足某个规则 的loaders 否,空数组 loaders数组 code code code loader loader loader 源码 -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630719098155-7265c03f-6b39-4ad3-bcf5-1056118759f8.png)



**loader配置：**



**完整配置**



```javascript
module.exports = {
    module: { //针对模块的配置，目前版本只有两个配置，rules、noParse
        rules: [ //模块匹配规则，可以存在多个规则
            { //每个规则是一个对象
                test: /\.js$/, //匹配的模块正则
                use: [ //匹配到后应用的规则模块
                    {  //其中一个规则
                        loader: "模块路径", //loader模块的路径，该字符串会被放置到require中
                        options: { //向对应loader传递的额外参数

                        }
                    }
                ]
            }
        ]
    }
}
```



**简化配置**



```javascript
module.exports = {
    module: { //针对模块的配置，目前版本只有两个配置，rules、noParse
        rules: [ //模块匹配规则，可以存在多个规则
            { //每个规则是一个对象
                test: /\.js$/, //匹配的模块正则
                use: ["模块路径1", "模块路径2"]//loader模块的路径，该字符串会被放置到require中
            }
        ]
    }
}
```



# plugin


loader的功能定位是转换代码，而一些其他的操作难以使用loader完成，比如：



+ 当webpack生成文件时，顺便多生成一个说明描述文件
+ 当webpack编译启动时，控制台输出一句话表示webpack启动了
+ 当xxxx时，xxxx



这种类似的功能需要把功能嵌入到webpack的编译流程中，而这种事情的实现是依托于plugin的



<!-- 这是一张图片，ocr 内容为：wedpack命令 输出 初始化 编译 按照资源列表 读取命令参数 chunkid,name,chunkhash 生成文件 导入配置文件 合并配置对象 chunkid,name,chunkhash hash -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630741194396-5a27c75c-8cd7-4178-b57d-641fb231f739.png)



plugin的**本质**是一个带有apply方法的对象



```javascript
var plugin = {
    apply: function(compiler){
        
    }
}
```



通常，习惯上，我们会将该对象写成构造函数的模式



```javascript
class MyPlugin{
    apply(compiler){

    }
}

var plugin = new MyPlugin();
```



要将插件应用到webpack，需要把插件对象配置到webpack的plugins数组中，如下：



```javascript
module.exports = {
    plugins:[
        new MyPlugin()
    ]
}
```



<font style="color:#F5222D;">apply函数会在初始化阶段，创建好Compiler对象后运行。</font>



compiler对象是在初始化阶段构建的，整个webpack打包期间只有一个compiler对象，后续完成打包工作的是compiler对象内部创建的compilation



apply方法会在**创建好compiler对象后调用**，并向方法传入一个compiler对象



<!-- 这是一张图片，ocr 内容为：Compiler Compilation 输出 初始化 编译 文件发生变化 -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630741209865-85b083eb-ae75-48ab-ae34-93234bf5e768.png)

> compiler只有一个，compilation可能多个
>



compiler对象提供了大量的钩子函数（hooks，可以理解为事件），plugin的开发者可以注册这些钩子函数，参与webpack编译和生成。



你可以在apply方法中使用下面的代码注册钩子函数:



```javascript
class MyPlugin{
    apply(compiler){
        compiler.hooks.事件名称.事件类型(name, function(compilation){
            //事件处理函数
        })
    }
}
```



**事件名称**



即要监听的事件名，即钩子名，所有的钩子：[https://www.webpackjs.com/api/compiler-hooks](https://www.webpackjs.com/api/compiler-hooks)



**事件类型**



这一部分使用的是 Tapable API，这个小型的库是一个专门用于钩子函数监听的库。



它提供了一些事件类型：



+ tap：注册一个同步的钩子函数，函数运行完毕则表示事件处理结束
+ tapAsync：注册一个基于回调的异步的钩子函数，函数通过调用一个回调表示事件处理结束
+ tapPromise：注册一个基于Promise的异步的钩子函数，函数通过返回的Promise进入已决状态表示事件处理结束



**处理函数**



处理函数有一个事件参数`compilation`



# 区分环境




有些时候，我们需要针对生产环境和开发环境分别书写webpack配置



以前可以用这种方式来区分：

<!-- 这是一张图片，ocr 内容为：scripts" "webpack--configwebpack.devjs dev": "prod":"webpack--configwebpack.pro.js" -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1630743572364-0d743bc8-5f19-4251-ba6e-0d1db50cb472.png) 

为了更好的适应这种要求，webpack允许配置不仅可以是一个对象，还可以是一个**函数**



```javascript
module.exports = env => {
    return {
        //配置内容
    }
}
```



在开始构建时，webpack如果发现配置是一个函数，会调用该函数，将函数返回的对象作为配置内容，因此，开发者可以根据不同的环境返回不同的对象



在调用webpack函数时，webpack会向函数传入一个参数env，该参数的值来自于webpack命令中给env指定的值，例如



```shell
npx webpack --env abc # env: "abc"

npx webpack --env.abc # env: {abc:true}
npx webpack --env.abc=1  # env： {abc:1}
npx webpack --env.abc=1 --env.bcd=2 # env: {abc:1, bcd:2}
```



这样一来，我们就可以在命令中指定环境，在代码中进行判断，根据环境返回不同的配置结果。



# 其他细节配置


## context


```javascript
context: path.resolve(__dirname, "app")
```



该配置会影响入口和loaders的解析，入口和loaders的相对路径会以context的配置作为基准路径，这样，你的配置会独立于CWD（current working directory 当前执行路径）



## output


### library


```javascript
library: "abc"
```



这样一来，打包后的结果中，会将自执行函数的执行结果暴露给abc



### libraryTarget


```javascript
libraryTarget: "var"
```



该配置可以更加精细的控制如何暴露入口包的导出结果



其他可用的值有：



+ var：默认值，暴露给一个普通变量
+ window：暴露给window对象的一个属性
+ this：暴露给this的一个属性
+ global：暴露给global的一个属性
+ commonjs：暴露给exports的一个属性
+ 其他：[https://www.webpackjs.com/configuration/output/#output-librarytarget](https://www.webpackjs.com/configuration/output/#output-librarytarget)



## target


```javascript
target:"web" //默认值
```



设置打包结果最终要运行的环境，常用值有



+ web: 打包后的代码运行在web环境中
+ node：打包后的代码运行在node环境中
+ 其他：[https://www.webpackjs.com/configuration/target/](https://www.webpackjs.com/configuration/target/)



## module.noParse


```javascript
noParse: /jquery/
```



不解析正则表达式匹配的模块，通常用它来忽略那些<font style="color:#F5222D;">大型的单模块库</font>，以提高**构建性能。和运行性能无关。**



## resolve


resolve的相关配置主要用于控制模块解析过程



### modules


```javascript
modules: ["node_modules"]  //默认值。可以自行配置更改
```



当解析模块时，如果遇到导入语句，`require("test")`，webpack会从下面的位置寻找依赖的模块



1. 当前目录下的`node_modules`目录
2. 上级目录下的`node_modules`目录
3. ...



### extensions


```javascript
extensions: [".js", ".json"]  //默认值
```



<font style="color:#F5222D;">当解析模块时，遇到无具体后缀的导入语句，例如</font>`<font style="color:#F5222D;">require("test")</font>`<font style="color:#F5222D;">，会依次测试它的后缀名</font>

<font style="color:#F5222D;">webpack自动补全后缀名，而不是node</font>



+ test.js
+ test.json



### alias


```javascript
alias: {
  "@": path.resolve(__dirname, 'src'),
  "_": __dirname
}
```



有了alias（别名）后，导入语句中可以加入配置的键名，例如`require("@/abc.js")`，webpack会将其看作是`require(src的绝对路径+"/abc.js")`。



在大型系统中，源码结构往往比较深和复杂，别名配置可以让我们更加方便的导入依赖



## externals


```javascript
externals: {    jquery: "$",    lodash: "_"}
```



从最终的bundle中排除掉配置的配置的源码，例如，入口模块是



```javascript
//index.jsrequire("jquery")require("lodash")
```



生成的bundle是：



```javascript
(function(){
    ...
})({
    "./src/index.js": function(module, exports, __webpack_require__){
        __webpack_require__("jquery")
        __webpack_require__("lodash")
    },
    "jquery": function(module, exports){
        //jquery的大量源码
    },
    "lodash": function(module, exports){
        //lodash的大量源码
    },
})
```



但有了上面的配置后，则变成了



```javascript
(function(){
    ...
})({
    "./src/index.js": function(module, exports, __webpack_require__){
        __webpack_require__("jquery")
        __webpack_require__("lodash")
    },
    "jquery": function(module, exports){
        module.exports = $;
    },
    "lodash": function(module, exports){
        module.exports = _;
    },
})
```



这比较适用于一些第三方库来自于外部CDN的情况，这样一来，即可以在页面中使用CDN，又让bundle的体积变得更小，还不影响源码的编写



## stats


stats控制的是构建过程中控制台的输出内容







好东西



[https://www.tailwindcss.cn/](https://www.tailwindcss.cn/)



[https://tailwindcss.com/](https://tailwindcss.com/)



https://tailwindcss.com/docs文档



[https://play.tailwindcss.com/?ref=producthunt](https://play.tailwindcss.com/?ref=producthunt)



```html
<div class="w-full h-full bg-red-400 fixed"></div>
<!-- 本身不能设置高度，高度相对于父元素，变成绝对定位才可以 -->
```



```html
<div class="w-full h-full flex bg-red-400 fixed">
    <div class="w-60 bg-gray-800 h-full"></div>
    <!-- <div class="w-60 bg-blue-200 h-full"></div> -->
    <div class="bg-blue-200 h-full flex-grow"></div>
    <!-- 宽度自动增长 -->
</div>
```



```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <div class="w-full h-full flex bg-red-400 fixed">
            <div class="w-60 bg-gray-800 h-full text-gray-50">
                <h1 class="font-bold text-2xl text-center my-5">Logo</h1>
                <ul>
                    <li class="text-center py-4 text-green-50 hover:text-green-300 hover:bg-gray-900"><a href="">Lorem.</a></li>
                    <li class="text-center py-4 text-green-50 hover:text-green-300 hover:bg-gray-900"><a href="">Earum.</a></li>
                    <li class="text-center py-4 text-green-50 hover:text-green-300 hover:bg-gray-900"><a href="">Eveniet?</a></li>
                    <li class="text-center py-4 text-green-50 hover:text-green-300 hover:bg-gray-900"><a href="">Veniam.</a></li>
                    <li class="text-center py-4 text-green-50 hover:text-green-300 hover:bg-gray-900"><a href="">Dolore!</a></li>
                </ul>
            </div>

            <div class="bg-blue-200 h-full flex-grow"></div>
        </div>
    </body>
</html>
```



配合postcss使用的



vscode插件：



智能提示：tailwind css intellisense



查看文档：tailwind docs



# 技术拓展


[https://www.tailwindcss.cn/docs](https://www.tailwindcss.cn/docs)



[https://github.com/yjisme/boilerplate-tranditional-proj](https://github.com/yjisme/boilerplate-tranditional-proj)



vscode插件：Tailwind css intellisense智能提示



[https://quasar.dev/](https://quasar.dev/)

