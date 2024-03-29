# 前端工程化 OnePage


## 为什么会出现前端工程化

> 模块化：意味着 JS 总算可以开发大型项目（解决 JS 的复用问题）
>  
> 组件化：解决 HTML、CSS、JS 的复用问题
>  
> 工程化：前端项目越来越复杂、前端项目模块（组件）越来越多
>  
> 为什么前端项目越来越复杂？
>  
> 在书写前端项目的时候，可能会涉及到使用其他的语言，typescript、less/sass、coffeescript，涉及到编译
>  
> 在部署的时候，还需要对代码进行丑化、压缩
>  
> 代码优化：为 CSS 代码添加兼容性前缀
>  
> 前端项目模块（组件）越来越多？
>  
> 专门有一个 node_modules 来管理这些可以复用的代码。
>  
> 前端工程化的出现，归根结底，其实就是要解决开发环境和生产环境不一致的问题。


## nodejs对CommonJS的实现

为了实现CommonJS规范，nodejs对模块做出了以下处理

1. 为了保证高效的执行，仅加载必要的模块。nodejs只有执行到`require`函数时才会加载并执行模块
> nodejs中导入模块，使用相对路径，并且必须以./或../开头,浏览器可以省略./，nodejs不行

2. 为了隐藏模块中的代码，nodejs执行模块时，会将模块中的所有代码放置到一个函数中执行，以保证不污染全局变量。
```javascript
 (function(){
     //模块中的代码
 })()
```

3. 为了保证顺利的导出模块内容，nodejs做了以下处理
   1. 在模块开始执行前，初始化一个值`module.exports = {}`
   2. `module.exports`即模块的导出值
   3. 为了方便开发者便捷的导出，nodejs在初始化完`module.exports`后，又声明了一个变量`exports = module.exports`
```javascript
 (function(module){
     module.exports = {};
     var exports = module.exports;
     //模块中的代码
     return module.exports;
 })()
//面试题经常考module.exports与module几乎没区别，只是最后返回module.exports
```
面试
```javascript
var util = require('./index.js');

console.log(module.exports == exports);//没区别
module.exports = {
  getNumber: function () {
    count++;
    return count;
  },
  abc: 123
}
console.log(module.exports == exports);//module被赋值了，exports={},他两个不一样了。应用：下一题
// 最终导出的是module.exports
```
经典面试题
util.js
```javascript
var count = 0;
module.exports = {
  getNumber: function () {
    count++;
    return count;
  },
  abc: 123
}
exports.bcd = 456;
```
index.js
```javascript
var util = require('./util.js');
console.log(util.bcd)//undefined
// 因为最终返回module.exports,当前面被重新赋值，意味着module.exports和exports无关了
```
经验：对exports赋值无意义，建议用module.exports

4. 为了避免反复加载同一个模块，nodejs默认开启了模块缓存，如果加载的模块已经被加载过了，则会自动使用之前的导出结果


过去，JS很难编写大型应用，因为有以下两个问题：

1. **全局变量污染**
2. **难以管理的依赖关系**

这些问题，都导致了JS无法进行精细的模块划分，因为精细的模块划分会导致更多的全局污染以及更加复杂的依赖关系
于是，先后出现了两大模块化标准，用于解决以上两个问题：

- **CommonJS**
- **ES6 Module**
> 注意：上面提到的两个均是模块化**标准**，具体的实现需要依托于JS的宿主环境

## nodejs

node环境支持 CommonJS 模块化标准，所以，要使用 CommonJS，必须要先安装node

官网地址：[https://nodejs.org/zh-cn/](https://nodejs.org/zh-cn/)

nodejs直接运行某个js文件，该文件被称之为入口文件

nodejs遵循EcmaScript标准，但由于脱离了浏览器环境，因此：

1. 你可以在nodejs中使用EcmaScript标准的任何语法或api，例如：循环、判断、数组、对象等
2. 你不能在nodejs中使用浏览器的 web api，例如：dom对象、window对象、document对象等
## CommonJS标准和使用
node中的所有代码均在CommonJS规范下运行
具体规范如下：

1. 一个JS文件即为一个模块，一个模块就是一个相对独立的功能，模块中的所有全局代码产生的变量、函数，均不会对全局造成任何污染，仅在模块内使用
2. 如果一个模块需要暴露一些数据或功能供其他模块使用，需要使用代码`module.exports = xxx`，该过程称之为模块的**导出**
3. 如果一个模块需要使用另一个模块导出的内容，需要使用代码`require("模块路径")`
   1. 路径必须以`./`或`../`开头
   2. 如果模块文件后缀名为.js，可以省略后缀名
   3. require函数返回的是模块导出的内容
4. 模块具有缓存，第一次导入模块时会缓存模块的导出，之后再导入同一个模块，直接使用之前缓存的结果。

同时也解决了JS的两个问题
浏览器里面可以直接用的函数变量都在全局，但是commonjs里面require不在全局，undefined,同理module

**原理:** require中的伪代码
```javascript
function require(modulePath){
  //1. 根据传递的模块路径，得到模块完整的绝对路径
  var moduleId = require.resolve(modulePath);
  //2. 判断缓存
  if(cache[moduleId]){
    return cache[moduleId];
  }
  //3. 真正运行模块代码的辅助函数
  function _require(exports, require, module, __filename, __dirname){
    // 目标模块的代码在这里
  }
  //4. 准备并运行辅助函数
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var __filename = moduleId; // 得到模块文件的绝对路径
  var __dirname = ...; // 得到模块所在目录的绝对路径
  _require.call(exports, exports, _require, module, __filename, __dirname);// exports绑定this，说明this == exports
  //5. 缓存 module.exports
  cache[moduleId] = module.exports;
  //6. 返回 module.exports
  return module.exports;
}
// 根据传递的模块路径，得到模块完整的绝对路径
require.resolve = function(modulePath){
  // 略
}
```

1. 根据传递的模块路径，得到模块完整的绝对路径。因为绝对路径不会重复。

2. require引入相同模块会有缓存，不会重复加载

3. 如果没有缓存。真正运行模块代码的辅助函数
```javascript
function _require(exports, require, module, __filename, __dirname) {
  // 目标模块的代码在这里
}
```

6. 返回 module.exports

`this === exports === module.exports === {}`

## 下面的代码执行结果是什么？
```javascript
// a.js
exports.d = 4;//this === exports ==={a:1,d:4}
this.e = 5;//{a:1,d:4,e:5}
console.log(this === exports);//true
console.log(this === module.exports);//false
console.log(exports === module.exports);//false

// index.js
var a = arguments[1]("./a.js");
// 原理可知 arguments[1]相当于require
// a === module.exports ===fn {c:3}
console.log(typeof a);//function
console.log(a.a, a.b, a.c, a.d, a.e);//undefined  undefined 3 undefined undefined
console.log(arguments.length);//5
```
## ES6 module

由于种种原因，CommonJS标准难以在浏览器中实现，因此一直在浏览器端一直没有合适的模块化标准，直到ES6标准出现
ES6规范了浏览器的模块化标准，一经发布，各大浏览器厂商纷纷在自己的浏览器中实现了该规范

模块的引入：浏览器使用以下方式引入一个ES6模块文件

```html
<script src="JS文件" type="module">
```

1. 模块的导出分为两种，**基本导出（具名导出）**和**默认导出**
**基本导出**导出的是该对象的某个属性，**默认导出**导出的是该对象的特殊属性`default`
```javascript
//导出结果：想象成一个对象
{
    a: xxx, //基本导出  具名导出  named exports
    b: xxx, //基本导出
    default: xxx, //默认导出
    c: xxx //基本导出
}
```

   1. 基本导出可以有多个，默认导出只能有一个
   2. 基本导出必须要有名字，默认导出由于有特殊名字，所以可以不用写名字
```javascript
export var a = 1 //基本导出 a = 1
export var b = function(){} //基本导出 b = function(){}
export function method(){}  //基本导出 method = function(){}
var c = 3;
export { c } //基本导出 c = 3
export { c as temp } //基本导出 temp = 3

export default 3 //默认导出 default = 3
export default function(){} //默认导出 default = function(){}
export { c as default } //默认导出 default = 3

export {a, b, c as default} //基本导出 a=1, b=function(){}, 默认导出 default = 3
```

2. **模块的导入**
```javascript
import {a,b} from "模块路径"   //导入属性 a、b，放到变量a、b中
import {a as temp1, b as temp2} from "模块路径" //导入属性a、b，放到变量temp1、temp2 中
import {default as a} from "模块路径" //导入属性default，放入变量a中，default是关键字，不能作为变量名，必须定义别名
import {default as a, b} from "模块路径" //导入属性default、b，放入变量a、b中
import c from "模块路径"  //相当于 import {default as c} from "模块路径"
import c, {a,b} from "模块路径" //相当于 import {default as c, a, b} from "模块路径"
import * as obj from "模块路径" //将模块对象放入到变量obj中
import "模块路径" //不导入任何内容，仅执行一次模块
```
注意

   1. ES6 module 采用依赖预加载模式，所有模块导入代码均会提升到代码顶部
   2. 不能将导入代码放置到判断、循环中
   3. 导入的内容放置到**常量**中，不可更改
   4. ES6 module 使用了缓存，保证每个模块仅加载一次

## 请对比一下CommonJS和ES Module

> 1. CMJ 是社区标准，ESM 是官方标准
> 2. CMJ 是使用 API 实现的模块化，ESM 是使用新语法实现的模块化
> 3. CMJ 仅在 node 环境中支持，ESM 各种环境均支持
> 4. CMJ 是动态的依赖，ESM 既支持动态，也支持静态
> 5. ESM 导入时有符号绑定，CMJ 只是普通函数调用和赋值

CommonJS是社区模块化标准，node环境支持该标准。它不产生新的语法，是使用API实现的，本质是把要加载的模块放到一个闭包中执行（这里可以详细的阐述）。因此，node环境中的所有JS文件在执行的时候，都是放到一个函数环境中执行的，这对使得模块内部可以访问函数的参数，如exports、module、__dirname等，而且对this的指向也会有影响。CommonJS是动态的模块化标准，这就意味着依赖关系是在运行过程中确定的，同时也意味着在导入导出模块时，并不限制书写的位置。
ES Module是官方模块化标准，目前node和浏览器均支持该标准，它引入了新的语法。ES Module是静态的模块化标准，在模块执行前，会递归确定所有依赖关系，然后加载所有文件，加载完成后再运行，这在浏览器环境下会产生多次请求。由于使用的是静态依赖，因此，它要求导入导出的代码必须放置到顶层，因为只有这样才能在代码运行前就确定依赖关系。ES Module导入模块时会将导入的结果绑定到标识符中，该标识符是一个常量，不可更改。
CommonJS和ES Module都使用了缓存，保证每个模块仅执行一次。

1.讲讲模块化规范

2.import和require的区别

3.require是如何解析路径的

1、ESM是编译时导出结果，CommonJS是运⾏时导出结果

2、ESM是导出引⽤，CommonJS是导出⼀个值

3、ESM⽀持异步，CommonJS只⽀持同步

下面的模块导出了什么结果？ 
```javascript
exports.a = 'a';
module.exports.b = 'b';
this.c = 'c';
module.exports = {
  d: 'd'
}
```
  
## 对前端工程化，模块化，组件化的理解？ 

> 这三者中，模块化是基础，没有模块化，就没有组件化和工程化
>  
> 模块化的出现，解决了困扰前端的两大难题：全局污染问题和依赖混乱问题，从而让精细的拆分前端工程成为了可能。
>  
> 工程化的出现，解决了前端开发环境和生产环境要求不一致的矛盾。在开发环境中，我们希望代码使用尽可能的细分，代码格式尽可能的统一和规范，而在生产环境中，我们希望代码尽可能的被压缩、混淆，尽可能的优化体积。工程化的出现，就是为了解决这一矛盾，它可以让我们舒服的在开发环境中书写代码，然后经过打包，生成最合适的生产环境代码，这样就解放了开发者的精力，让开发者把更多的注意力集中在开发环境上即可。
>  
> 组件化开发是一些前端框架带来的概念，它把一个网页，或者一个站点，甚至一个完整的产品线，划分为多个小的组件，组件是一个可以复用的单元，它包含了一个某个区域的完整功能。这样一来，前端便具备了开发复杂应用的能力。

 
## webpack 中的 loader 属性和 plugins 属性的区别是什么？ 
> 它们都是 webpack 功能的扩展点。
>
> loader 是加载器，主要用于代码转换，比如 JS 代码降级，CSS 预编译、模块化等
>
> plugins 是插件，webpack 打包流程中每个环节都提供了钩子函数，可以利用这些钩子函数参与到打包生命周期中，更改或增加 webpack 的某些功能，比如生成页面和 css 文件、压缩打包结果等

 
## webpack 的核心概念都有哪些？ 
> 参考答案：
>  
> -  loader
加载器，主要用于代码转换，比如 JS 代码降级，CSS 预编译、模块化等 
> -  plugin
插件，webpack 打包流程中每个环节都提供了钩子函数，可以利用这些钩子函数参与到打包生命周期中，更改或增加 webpack 的某些功能，比如生成页面和 css 文件、压缩打包结果等 
> -  module
模块。webpack 将所有依赖均视为模块，无论是 js、css、html、图片，统统都是模块 
> -  entry
入口。打包过程中的概念，webpack 以一个或多个文件作为入口点，分析整个依赖关系。 
> -  chunk
打包过程中的概念，一个 chunk 是一个相对独立的打包过程，以一个或多个文件为入口，分析整个依赖关系，最终完成打包合并 
> -  bundle
webpack 打包结果 
> -  tree shaking
树摇优化。在打包结果中，去掉没有用到的代码。 
> -  HMR
热更新。是指在运行期间，遇到代码更改后，无须重启整个项目，只更新变动的那一部分代码。 
> -  dev server
开发服务器。在开发环境中搭建的临时服务器，用于承载对打包结果的访问 

 
## ES6 中如何实现模块化的异步加载？ 
> 使用动态导入即可，导入后，得到的是一个 Promise，完成后，得到一个模块对象，其中包含了所有的导出结果。

 
## 说一下 webpack 中的几种 hash 的实现原理是什么？ 
> 参考答案：
>  
> -  hash
hash 是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的 hash 值都会更改，并且全部文件都共用相同的 hash 值 
> -  chunkhash
每个打包过程单独的 hash 值，如果一个项目有多个 entry，则每个 entry 维护自己的 chunkhash。 
> -  contenthash
每个文件内容单独的 hash 值，它和打包结果文件内容有关，只要文件内容不变，contenthash 不变。 

 
## webpack 如果使用了 hash 命名，那是每次都会重新生成 hash 吗？ 
> 参考答案：
>  
> 不会。它跟关联的内容是否有变化有关系，如果没有变化，hash 就不会变。具体来说，contenthash 和具体的打包文件内容有关，chunkhash 和某一 entry 为起点的打包过程中涉及的内容有关，hash 和整个工程所有模块内容有关。

 
## webpack 中是如何处理图片的？
> 参考答案：
>  
> webpack 本身不处理图片，它会把图片内容仍然当做 JS 代码来解析，结果就是报错，打包失败。如果要处理图片，需要通过 loader 来处理。其中，url-loader 会把图片转换为 base64 编码，然后得到一个 dataurl，file-loader 则会将图片生成到打包目录中，然后得到一个资源路径。但无论是哪一种 loader，它们的核心功能，都是把图片内容转换成 JS 代码，因为只有转换成 JS 代码，webpack 才能识别。

 
##  webpack 打包出来的 html 为什么 style 放在头部 script 放在底部？ 
> 说明：这道题的表述是有问题的，webpack 本身并不打包 html，相反，它如果遇到 html 代码会直接打包失败，因为 webpack 本身只能识别 JS。之所以能够打包出 html 文件，是因为插件或 loader 的作用，其中，比较常见的插件是 html-webpack-plugin。所以这道题的正确表述应该是：「html-webpack-plugin 打包出来的 html 为什么 style 放在头部 script 放在底部？」

  
##  webpack 配置如何实现开发环境不使用 cdn、生产环境使用 cdn？ 
> 要配置 CDN，有两个步骤：
>  
> 1. 在 html 模板中直接加入 cdn 引用
> 2. 在 webpack 配置中，加入`externals`配置，告诉 webpack 不要打包其中的模块，转而使用全局变量
> 
 
> 若要在开发环境中不使用 CDN，只需根据环境变量判断不同的环境，进行不同的打包处理即可。
>  
> 1. 在 html 模板中使用 ejs 模板语法进行判断，只有在生产环境中引入 CDN
> 2. 在 webpack 配置中，可以根据`process.env`中的环境变量进行判断是否使用`externals`配置
> 3. 在`package.json`脚本中设置不同的环境变量完成打包或开发启动。

 
## 介绍一下 webpack4 中的 tree-shaking 的工作流程？ 
> 推荐阅读：[https://tsejx.github.io/webpack-guidebook/principle-analysis/operational-principle/tree-shaking](https://tsejx.github.io/webpack-guidebook/principle-analysis/operational-principle/tree-shaking)

  
## 说一下 webpack loader 的作用是什么？ 
> 参考答案：
>  
> 用于转换代码。有时是因为 webpack 无法识别某些内容，比如图片、css 等，需要由 loader 将其转换为 JS 代码。有时是因为某些代码需要被特殊处理，比如 JS 兼容性的处理，需要由 loader 将其进一步转换。不管是什么情况，loader 的作用只有一个，就是转换代码。

 
## 在开发过程中如果需要对已有模块进行扩展，如何进行开发保证调用方不受影响？ 
> 参考答案：
>  
> 实际上就是一个版本管理的问题。
>  
> 如果此次模块升级只是修复了某一些 bug，作为补丁版本升级即可，不影响主版本和次版本号
>  
> 如果此次模块升级会新增一些内容，完全兼容之前的 API，作为次版本升级即可
>  
> 如果此次模块升级会修改之前的 API，则作为主版本升级
>  
> 在开发项目时，让项目依赖模块的主版本，因此，当模块更新时，只要不是主版本更新，项目都可以非常方便的升级模块版本，无须改动任何代码。但若涉及主版本更新，项目可以完全无视此次版本更新，仍然使用之前的旧版本，无须改动任何代码；当然也可以升级主版本，但就会涉及代码的改动，这就好比跟将 vue2 升级到 vue3 会涉及大量改动一样。
>  
> 而在开发模块时，在一开始就要精心设计 API，尽量保证 API 的接口稳定，不要经常变动主版本号。如果实在要更新主版本，就需要在一段时间内同时维护两个版本（新的主版本，旧的主版本），给予其他项目一定的升级时间。

 
##  export 和 export default 的区别是什么？ 
> 参考答案：
>  
> export 为普通导出，又叫做具名导出，顾名思义，它导出的数据必须带有命名，比如变量定义、函数定义这种带有命名的语句。在导出的模块对象中，命名即为模块对象的属性名。在一个模块中可以有多个具名导出
>  
> export default 为默认导出，在模块对象中名称固定为 default，因此无须命名，通常导出一个表达式或字面量。在一个模块中只能有一个默认导出。

 
## webpack 打包原理是什么？ 
> 参考答案：
>  
> 1. **初始化参数**：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
> 2. **开始编译**：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 `run` 方法开始执行编译
> 3. **确定入口**：根据配置中的 `entry` 找出所有的入口文件
> 4. **编译模块**：从入口文件出发，调用所有配置的 `loader` 对模块进行翻译，再把翻译后的内容转换成 AST，通过对 AST 的分析找出该模块依赖的模块，再 `递归` 本步骤直到所有入口依赖的文件都经过了本步骤的处理
> 5. **完成模块编译**：在经过第 4 步使用 `loader` 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的 `依赖关系图`
> 6. **输出资源**：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
> 7. **输出完成**：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

 
## webpack 热更新原理是什么？ 
> 参考答案：
>  
> 当开启热更新后，页面中会植入一段 websocket 脚本，同时，开发服务器也会和客户端建立 websocket 通信，当源码发生变动时，webpack 会进行以下处理：
>  
> 1. webpack 重新打包
> 2. webpack-dev-server 检测到模块的变化，于是通过 webscoket 告知客户端变化已经发生
> 3. 客户端收到消息后，通过 ajax 发送请求到开发服务器，以过去打包的 hash 值请求服务器的一个 json 文件
> 4. 服务器告诉客户端哪些模块发生了变动，同时告诉客户端这次打包产生的新 hash 值
> 5. 客户端再次用过去的 hash 值，以 JSONP 的方式请求变动的模块
> 6. 服务器响应一个函数调用，用于更新模块的代码
> 7. 此时，模块代码已经完成更新。客户端按照之前的监听配置，执行相应模块变动后的回调函数。


## 如何优化 webpack 的打包速度？ 
> 参考答案：
>  
> 1.  noParse
很多第三方库本身就是已经打包好的代码，对于这种代码无须再进行解析，可以使用 noParse 配置排除掉这些第三方库 
> 2.  externals
对于一些知名的第三方库可以使用 CDN，这部分库可以通过 externals 配置不进行打包 
> 3.  限制 loader 的范围
在使用 loader 的时候，可以通过 exclude 排除掉一些不必要的编译，比如 babel-loader 对于那些已经完成打包的第三方库没有必要再降级一次，可以排除掉 
> 4.  开启 loader 缓存
可以利用`cache-loader`缓存 loader 的编译结果，避免在源码没有变动时反复编译 
> 5.  开启多线程编译
可以利用`thread-loader`开启多线程编译，提升编译效率 
> 6.  动态链接库
对于某些需要打包的第三方库，可以使用 dll 的方式单独对其打包，然后 DLLPlugin 将其整合到当前项目中，这样就避免了在开发中频繁去打包这些库 


## webpack 如何实现动态导入？ 
> 参考答案：
>  
> 当遇到代码中包含动态导入语句时，webpack 会将导入的模块及其依赖分配到单独的一个 chunk 中进行打包，形成单独的打包结果。而动态导入的语句会被编译成一个普通的函数调用，该函数在执行时，会使用 JSONP 的方式动态的把分离出去的包加载到模块集合中。

 
## 说一下 webpack 有哪几种文件指纹 
> 参考答案：
>  
> -  hash
hash 是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的 hash 值都会更改，并且全部文件都共用相同的 hash 值 
> -  chunkhash
每个打包过程单独的 hash 值，如果一个项目有多个 entry，则每个 entry 维护自己的 chunkhash。 
> -  contenthash
每个文件内容单独的 hash 值，它和打包结果文件内容有关，只要文件内容不变，contenthash 不变。 

 
## 常用的 webpack Loader 都有哪些？ 
> 参考答案：
>  
> - cache-loader：启用编译缓存
> - thread-loader：启用多线程编译
> - css-loader：编译 css 代码为 js
> - file-loader：保存文件到输出目录，将文件内容转换成文件路径
> - postcss-loader：将 css 代码使用 postcss 进行编译
> - url-loader：将文件内容转换成 dataurl
> - less-loader：将 less 代码转换成 css 代码
> - sass-loader：将 sass 代码转换成 css 代码
> - vue-loader：编译单文件组件
> - babel-loader：对 JS 代码进行降级处理

 
## 说一下 webpack 常用插件都有哪些？ 
> 参考答案：
>  
> - clean-webpack-plugin：清除输出目录
> - copy-webpack-plugin：复制文件到输出目录
> - html-webpack-plugin：生成 HTML 文件
> - mini-css-extract-plugin：将 css 打包成单独文件的插件
> - HotModuleReplacementPlugin：热更新的插件
> - purifycss-webpack：去除无用的 css 代码
> - optimize-css-assets-webpack-plugin：优化 css 打包体积
> - uglify-js-plugin：对 JS 代码进行压缩、混淆
> - compression-webpack-plugin：gzip 压缩
> - webpack-bundle-analyzer：分析打包结果


## 使用 babel-loader 会有哪些问题，可以怎样优化？ 
> 参考答案：
>  
> 1. 如果不做特殊处理，babel-loader 会对所有匹配的模块进行降级，这对于那些已经处理好兼容性问题的第三方库显得多此一举，因此可以使用 exclude 配置排除掉这些第三方库
> 2. 在旧版本的 babel-loader 中，默认开启了对 ESM 的转换，这样会导致 webpack 的 tree shaking 失效，因为 tree shaking 是需要保留 ESM 语法的，所以需要关闭 babel-loader 的 ESM 转换，在其新版本中已经默认关闭了。

 
## babel 是如何对 class 进行编译的？ 
> 参考答案：
>  
> 本质上就是把 class 语法转换成普通构造函数定义，并做了以下处理：
>  
> 1. 增加了对 this 指向的检测
> 2. 将原型方法和静态方法变为不可枚举
> 3. 将整个代码放到了立即执行函数中，运行后返回构造函数本身

 
## 释一下 babel-polyfill 的作用是什么？ 
> 说明：
>  
> babel-polyfill 已经是一个非常古老的项目了，babel 从 7.4 版本开始已不再支持它，转而使用更加强大的 core-js，此题也适用于问「core-js 的作用是什么」

  
## 解释一下 less 的&的操作符是做什么用的？ 
> 参考答案：
>  
> &符号后面的内容会和父级选择器合并书写，即中间不加入空格字符

 

## webpack proxy 工作原理，为什么能解决跨域？ 
> 说明：
>  
> 严格来说，webpack 只是一个打包工具，它并没有 proxy 的功能，甚至连服务器的功能都没有。之所以能够在 webpack 中使用 proxy 配置，是因为它的一个插件，即 webpack-dev-server 的能力。
>  
> 所以，此题应该问做：「webpack-dev-server 工作原理，为什么能解决跨域？」

  
## 组件发布的是不是所有依赖这个组件库的项目都需要升级？ 
> 参考答案：
>  
> 实际上就是一个版本管理的问题。
>  
> 如果此次模块升级只是修复了某一些 bug，作为补丁版本升级即可，不影响主版本和次版本号
>  
> 如果此次模块升级会新增一些内容，完全兼容之前的 API，作为次版本升级即可
>  
> 如果此次模块升级会修改之前的 API，则作为主版本升级
>  
> 在开发项目时，让项目依赖模块的主版本，因此，当模块更新时，只要不是主版本更新，项目都可以非常方便的升级模块版本，无须改动任何代码。但若涉及主版本更新，项目可以完全无视此次版本更新，仍然使用之前的旧版本，无须改动任何代码；当然也可以升级主版本，但就会涉及代码的改动，这就好比跟将 vue2 升级到 vue3 会涉及大量改动一样。
>  
> 而在开发模块时，在一开始就要精心设计 API，尽量保证 API 的接口稳定，不要经常变动主版本号。如果实在要更新主版本，就需要在一段时间内同时维护两个版本（新的主版本，旧的主版本），给予其他项目一定的升级时间。


## 具体说一下 splitchunksplugin 的使用场景及使用方法。（字节跳动） 
>  
> 1.  公共模块
比如某些多页应用会有多个入口，从而形成多个 chunk，而这些 chunk 中用到了一些公共模块，为了减少整体的包体积，可以使用 splitchunksplugin 将公共模块分离出来。
可以配置 minChunks 来指定被多少个 chunk 引用时进行分包 
> 2.  并行下载
由于 HTML5 支持 defer 和 async，因此可以同时下载多个 JS 文件以充分利用带宽。如果打包结果是一个很大的文件，就无法利用到这一点。
可以利用 splitchunks 插件将文件进行拆分，通过配置 maxSize 属性指定包体积达到多大时进行拆分 

 
## 描述一下 webpack 的构建流程？（CVTE） 
> 参考答案：
>  
> 1. **初始化参数**：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
> 2. **开始编译**：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 `run` 方法开始执行编译
> 3. **确定入口**：根据配置中的 `entry` 找出所有的入口文件
> 4. **编译模块**：从入口文件出发，调用所有配置的 `loader` 对模块进行翻译，再把翻译后的内容转换成 AST，通过对 AST 的分析找出该模块依赖的模块，再 `递归` 本步骤直到所有入口依赖的文件都经过了本步骤的处理
> 5. **完成模块编译**：在经过第 4 步使用 `loader` 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的 `依赖关系图`
> 6. **输出资源**：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
> 7. **输出完成**：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

 
## 解释一下 webpack 插件的实现原理？（CVTE） 
> 参考答案：
>  
> 本质上，webpack 的插件是一个带有`apply`函数的对象。当 webpack 创建好 compiler 对象后，会执行注册插件的 apply 函数，同时将 compiler 对象作为参数传入。
>  
> 在 apply 函数中，开发者可以通过 compiler 对象监听多个钩子函数的执行，不同的钩子函数对应 webpack 编译的不同阶段。当 webpack 进行到一定阶段后，会调用这些监听函数，同时将 compilation 对象传入。开发者可以使用 compilation 对象获取和改变 webpack 的各种信息，从而影响构建过程。

 
## 有用过哪些插件做项目的分析吗？（CVTE） 
> 参考答案：
>  
> 用过 webpack-bundle-analyzer 分析过打包结果，主要用于优化项目打包体积

 
## 什么是 babel，有什么作用？ 
> 参考答案：
>  
> babel 是一个 JS 编译器，主要用于将下一代的 JS 语言代码编译成兼容性更好的代码。
>  
> 它其实本身做的事情并不多，它负责将 JS 代码编译成为 AST，然后依托其生态中的各种插件对 AST 中的语法和 API 进行处理

 
## 解释一下 npm 模块安装机制是什么？ 
> 参考答案：
>  
> 1. npm 会检查本地的 node_modules 目录中是否已经安装过该模块，如果已经安装，则不再重新安装
> 2. npm 检查缓存中是否有相同的模块，如果有，直接从缓存中读取安装
> 3. 如果本地和缓存中均不存在，npm 会从 registry 指定的地址下载安装包，然后将其写入到本地的 node_modules 目录中，同时缓存起来。

 
## webpack与grunt、gulp的不同？
三者都是前端构建工具，grunt和gulp在早期比较流行，现在webpack相对来说比较主流，不过一些轻量化的任务还是会用gulp来处理，比如单独打包CSS文件等。
[grunt](https://link.zhihu.com/?target=https%3A//www.gruntjs.net/)和[gulp](https://link.zhihu.com/?target=https%3A//www.gulpjs.com.cn/)是基于任务和流（Task、Stream）的。类似jQuery，找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据， 整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程。
webpack是基于入口的。webpack会自动地递归解析入口所需要加载的所有资源文件，然后用不同的Loader来处理不同的文件，用Plugin来扩展webpack功能。
所以总结一下：

- 从构建思路来说

gulp和grunt需要开发者将整个前端构建过程拆分成多个`Task`，并合理控制所有`Task`的调用关系 webpack需要开发者找到入口，并需要清楚对于不同的资源应该使用什么Loader做何种解析和加工

- 对于知识背景来说
gulp更像后端开发者的思路，需要对于整个流程了如指掌 webpack更倾向于前端开发者的思路
- 

## 2. 与webpack类似的工具还有哪些？谈谈你为什么最终选择（或放弃）使用webpack？
同样是基于入口的打包工具还有以下几个主流的：

- webpack
- [rollup](https://link.zhihu.com/?target=https%3A//rollupjs.org/)
- [parcel](https://link.zhihu.com/?target=https%3A//parceljs.org/)

**从应用场景上来看：**

- webpack适用于大型复杂的前端站点构建
- rollup适用于基础库的打包，如vue、react
- parcel适用于简单的实验性项目，他可以满足低门槛的快速看到效果

由于parcel在打包过程中给出的调试信息十分有限，所以一旦打包出错难以调试，所以不建议复杂的项目使用parcel

## 3.有哪些常见的Loader？他们是解决什么问题的？

- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- source-map-loader：加载额外的 Source Map 文件，以方便断点调试
- image-loader：加载并且压缩图片文件
- babel-loader：把 ES6 转换成 ES5
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
- style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
- eslint-loader：通过 ESLint 检查 JavaScript 代码



## 4.有哪些常见的Plugin？他们是解决什么问题的？

- define-plugin：定义环境变量
- commons-chunk-plugin：提取公共代码
- uglifyjs-webpack-plugin：通过UglifyES压缩ES6代码

---

## 5.Loader和Plugin的不同？
**不同的作用**

- **Loader**直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析_非JavaScript文件_的能力。
- **Plugin**直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

**不同的用法**

- **Loader**在module.rules中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个Object，里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）
- **Plugin**在plugins中单独配置。 类型为数组，每一项是一个plugin的实例，参数都通过构造函数传入。

---

## 6.webpack的构建流程是什么?从读取配置到输出文件这个过程尽量说全
Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3. 确定入口：根据配置中的 entry 找出所有的入口文件；
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5. 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

---

## 7.是否写过Loader和Plugin？描述一下编写loader或plugin的思路？
Loader像一个"翻译官"把读到的源文件内容转义成新的文件内容，并且每个Loader通过链式操作，将源文件一步步翻译成想要的样子。
编写Loader时要遵循单一原则，每个Loader只做一种"转义"工作。 每个Loader的拿到的是源文件内容（source），可以通过返回值的方式将处理后的内容输出，也可以调用this.callback()方法，将内容返回给webpack。 还可以通过 this.async()生成一个callback函数，再用这个callback将处理后的内容输出出去。 此外webpack还为开发者准备了开发loader的工具函数集——loader-utils。
相对于Loader而言，Plugin的编写就灵活了许多。 webpack在运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。


## 11.怎么配置单页应用？怎么配置多页应用？
单页应用可以理解为webpack的标准模式，直接在entry中指定单页应用的入口即可，这里不再赘述
多页应用的话，可以使用webpack的 AutoWebPlugin来完成简单自动化的构建，但是前提是项目的目录结构必须遵守他预设的规范。 多页应用中要注意的是：

- 每个页面都有公共的代码，可以将这些代码抽离出来，避免重复的加载。比如，每个页面都引用了同一套css样式表
- 随着业务的不断扩展，页面可能会不断的追加，所以一定要让入口的配置足够灵活，避免每次添加新页面还需要修改构建配置

---

## 12.npm打包时需要注意哪些？如何利用webpack来更好的构建？
Npm是目前最大的 JavaScript 模块仓库，里面有来自全世界开发者上传的可复用模块。你可能只是JS模块的使用者，但是有些情况你也会去选择上传自己开发的模块。 关于NPM模块上传的方法可以去[官网](https://link.zhihu.com/?target=https%3A//docs.npmjs.com/)上进行学习，这里只讲解如何利用webpack来构建。
NPM模块需要注意以下问题：

1. 要支持CommonJS模块化规范，所以要求打包后的最后结果也遵守该规则。
2. Npm模块使用者的环境是不确定的，很有可能并不支持ES6，所以打包的最后结果应该是采用ES5编写的。并且如果ES5是经过转换的，请最好连同SourceMap一同上传。
3. Npm包大小应该是尽量小（有些仓库会限制包大小）
4. 发布的模块不能将依赖的模块也一同打包，应该让用户选择性的去自行安装。这样可以避免模块应用者再次打包时出现底层模块被重复打包的情况。
5. UI组件类的模块应该将依赖的其它资源文件，例如.css文件也需要包含在发布的模块里。



基于以上需要注意的问题，我们可以对于webpack配置做以下扩展和优化：

1. CommonJS模块化规范的解决方案： 设置output.libraryTarget='commonjs2'使输出的代码符合CommonJS2 模块化规范，以供给其它模块导入使用
2. 输出ES5代码的解决方案：使用babel-loader把 ES6 代码转换成 ES5 的代码。再通过开启devtool: 'source-map'输出SourceMap以发布调试。
3. Npm包大小尽量小的解决方案：Babel 在把 ES6 代码转换成 ES5 代码时会注入一些辅助函数，最终导致每个输出的文件中都包含这段辅助函数的代码，造成了代码的冗余。解决方法是修改.babelrc文件，为其加入transform-runtime插件
4. 不能将依赖模块打包到NPM模块中的解决方案：使用externals配置项来告诉webpack哪些模块不需要打包。
5. 对于依赖的资源文件打包的解决方案：通过css-loader和extract-text-webpack-plugin来实现，配置如下：
```javascript
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        // 增加对 CSS 文件的支持
        test: /\.css/,
        // 提取出 Chunk 中的 CSS 代码到单独的文件中
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        }),
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 输出的 CSS 文件名称
      filename: 'index.css',
    }),
  ],
};
```
## 13.如何在vue项目中实现按需加载？
**Vue UI组件库的按需加载** 为了快速开发前端项目，经常会引入现成的UI组件库如ElementUI、iView等，但是他们的体积和他们所提供的功能一样，是很庞大的。 而通常情况下，我们仅仅需要少量的几个组件就足够了，但是我们却将庞大的组件库打包到我们的源码中，造成了不必要的开销。
不过很多组件库已经提供了现成的解决方案，如Element出品的[babel-plugin-component](https://link.zhihu.com/?target=https%3A//github.com/ElementUI/babel-plugin-component)和AntDesign出品的[babel-plugin-import](https://link.zhihu.com/?target=https%3A//github.com/ant-design/babel-plugin-import) 安装以上插件后，在.babelrc配置中或babel-loader的参数中进行设置，即可实现组件按需加载了。
```javascript
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```
**单页应用的按需加载** 现在很多前端项目都是通过单页应用的方式开发的，但是随着业务的不断扩展，会面临一个严峻的问题——首次加载的代码量会越来越多，影响用户的体验。
通过import(*)语句来控制加载时机，webpack内置了对于import(*)的解析，会将import(*)中引入的模块作为一个新的入口在生成一个chunk。 当代码执行到import(*)语句时，会去加载Chunk对应生成的文件。import()会返回一个Promise对象，所以为了让浏览器支持，需要事先注入Promise polyfill

## 能说说webpack的作用吗?

- **模块打包(静态资源拓展)**。可以将不同模块的文件打包整合在一起，并且保证它们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，保证项目结构的清晰和可读性。
- **编译兼容(翻译官loader)**。在前端的“上古时期”，手写一堆浏览器兼容代码一直是令前端工程师头皮发麻的事情，而在今天这个问题被大大的弱化了，通过webpack的Loader机制，不仅仅可以帮助我们对代码做polyfill，还可以编译转换诸如.less, .vue, .jsx这类在浏览器无法识别的格式文件，让我们在开发的时候可以使用新特性和新语法做开发，提高开发效率。
- **能力扩展(plugins)**。通过webpack的Plugin机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如按需加载，代码压缩等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。
## 为什么要打包呢?
逻辑多、文件多、项目的复杂度高了，所以要打包
例如:
让前端代码具有校验能力===>出现了ts
css不好用===>出现了sass、less
webpack可以解决这些问题
## 能说说模块化的好处吗?

- 避免命名冲突(减少命名空间污染)
- 更好的分离, 按需加载
- 更高复用性
- 高可维护性
## 模块化打包方案知道啥，可以说说吗?

**1、commonjs**
commonjs 是 Node 中的模块规范，通过 require 及 exports 进行导入导出 
commonJS用**同步**的方式加载模块。在**服务端**，模块文件都存在本地磁盘，读取非常快，所以这样做不会有问题。但是在**浏览器端**，限于网络原因，更合理的方案是使用异步加载。
**总结:commonjs是用在服务器端的，同步的，如nodejs**
**2、AMD**
AMD规范采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
**总结:amd, cmd是用在浏览器端的，异步的，如requirejs和seajs**
**3、CMD**
CMD是另一种js模块化方案，它与AMD很类似，不同点在于：AMD 推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行。此规范其实是在sea.js推广过程中产生的。
**总结:amd, cmd是用在浏览器端的，异步的，如requirejs和seajs**
**4、esm**
esm 是 tc39 对于 ESMAScript 的模块话规范，正因是语言层规范，**因此在 Node 及 浏览器中均会支持**。
它使用 import/export 进行模块导入导出.
如上例所示，使用import命令的时候，用户需要知道所要加载的变量名或函数名。其实ES6还提供了export default命令，为模块指定默认输出，对应的import语句不需要使用大括号。这也更趋近于ADM的引用写法。
export default命令，为模块指定默认输出
## 那ES6 模块与 CommonJS 模块的差异有哪些呢?
**1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。**

- CommonJS 模块输出的是值的**拷贝**(浅拷贝)，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
- ES6 模块的运行机制与 CommonJS 不一样。JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。原始值变了，import加载的值也会跟着变。**因此，ES6 模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块。**

**2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。**

- 运行时加载: CommonJS 模块就是对象；即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为“运行时加载”。
- 编译时加载: ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块，这种加载称为“编译时加载”。

CommonJS 加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。
## webpack的编译(打包)流程说说

- **初始化参数**：解析webpack配置参数，合并shell传入和webpack.config.js文件配置的参数,形成最后的配置结果；
- **开始编译**：上一步得到的参数初始化compiler对象，注册所有配置的插件，插件 监听webpack构建生命周期的事件节点，做出相应的反应，执行对象的run方法开始执行编译；
- _**确定入口**_：从配置的entry入口，开始解析文件构建AST语法树，找出依赖，递归下去；
- **编译模块**：递归中根据文件类型和loader配置，调用所有配置的loader对文件进行转换，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
- **完成模块编译并输出**：递归完事后，得到每个文件结果，包含每个模块以及他们之间的依赖关系，根据entry或分包配置生成代码块chunk;
- **输出完成**：输出所有的chunk到文件系统；
## 说一下 Webpack 的热更新原理吧？
Webpack 的热更新又称**热替换**（Hot Module Replacement），缩写为** HMR**。 这个机制**可以做到不用刷新浏览器**而将**新变更的模块替换掉旧的模块**。
HMR的核心就是**客户端从服务端拉去更新后的文件**，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS(无线路由)与浏览器之间维护了一个 Websocket，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该chunk的增量更新。
后续的部分(拿到增量更新之后如何处理？哪些状态该保留？哪些又需要更新？)由 HotModulePlugin 来完成，提供了相关 API 以供开发者针对自身场景进行处理，像react-hot-loader 和 vue-loader 都是借助这些 API 实现 HMR。
## 路由懒加载的原理
[https://juejin.cn/post/6844904180285456398](https://juejin.cn/post/6844904180285456398)
## 路由懒加载?
当刚运行项目的时候，发现刚进入页面，就将所有的js文件和css文件加载了进来，这一进程十分的消耗时间。 如果打开哪个页面就对应的加载响应页面的js文件和css文件，那么页面加载速度会大大提升。

**懒加载的好处是什么?**

懒加载简单来说就是延迟加载或按需加载，即在需要的时候的时候进行加载。

**怎么使用的路由懒加载?**

使用到的是es6的import语法，可以实现动态导入

**路由懒加载的原理是什么**

通过Webpack编译打包后，会把每个路由组件的代码分割成一一个js文件，初始化时不会加载这些js文件，只当激活路由组件才会去加载对应的js文件。

作用就是webpack在打包的时候，对异步引入的库代码进行代码分割时（需要配置webpack的SplitChunkPlugin插件），为分割后的代码块取得名字
Vue中运用import的懒加载语句以及webpack的魔法注释，在项目进行webpack打包的时候，对不同模块进行代码分割，在首屏加载时，用到哪个模块再加载哪个模块，实现懒加载进行页面的优化。

# npx

1. **运行本地命令**

使用`npx 命令`时，它会首先从本地工程的`node_modules/.bin`目录中寻找是否有对应的命令

例如：

```shell
npx webpack
```

上面这条命令寻找本地工程的`node_modules/.bin/webpack`

如果将命令配置到`package.json`的`scripts`中，可以省略`npx`

2. **临时下载执行**

当执行某个命令时，如果无法从本地工程中找到对应命令，则会把命令对应的包下载到一个临时目录，下载完成后执行，临时目录中的命令会在适当的时候删除

例如：

```shell
npx prettyjson 1.json
```

npx会下载`prettyjson`包到临时目录，然后运行该命令

如果命令名称和需要下载的包名不一致时，可以手动指定报名

例如`@vue/cli`是包名，`vue`是命令名，两者不一致，可以使用下面的命令

```shell
npx -p @vue/cli vue create vue-app
```

3. **npm init**

`npm init`通常用于初始化工程的`package.json`文件

除此之外，有时也可以充当`npx`的作用

```shell
npm init 包名 # 等效于 npx create-包名
npm init @命名空间 # 等效于 npx @命名空间/create
npm init @命名空间/包名 # 等效于 npx @命名空间/create-包名
```

## git 指令

git fetch
git fetch origin 分支
git rebase FETCH_HEAD
本地master更新到最新：git fetch origin master; git rebase FETCH_HEAD

git 和 svn 的区别
经常使用的 git 命令？
git pull 和 git fetch 的区别
git rebase 和 git merge 的区别
git rebase和merge 
git分支管理、分支开发 
git回退操作
git reset 和 git reverse区别？你还用过什么别的指令？
git遇到冲突怎么进行解决

git-flow
   git reset --hard 版本号
git 如何合并分支; 
git 中，提交了 a, 然后又提交了 b, 如何撤回 b ? 
git merge、git rebase的区别
假设 master 分支切出了 test 分支，供所有人合代码测试，
然后我们 从稳定的 master 切出
一个 feature 分支进行开发，
现在 我们开发完了 feature 分支并将其merge 到 test 分支进行测试，
测试过程中出现一些问题，由于疏忽你;忘记切回 feature ，而是直接在 test 分支进行了开发
导致：
test 分支优先于你的featuce 分支，此时你应该怎么特 test 分支的修改带入 feature

## **知道git的原理吗?说说他的原理吧**

Workspace：工作区，就是平时进行开发改动的地方，是当前看到最新的内容，在开发的过程也就是对工作区的操作
Index：暂存区，当执行 git add 的命令后，工作区的文件就会被移入暂存区，暂存区标记了当前工作区中那些内容是被 Git 管理的，当完成某个需求或者功能后需要提交代码，第一步就是通过 git add 先提交到暂存区。
Repository：本地仓库，位于自己的电脑上，通过 git commit 提交暂存区的内容，会进入本地仓库。
Remote：远程仓库，用来托管代码的服务器，远程仓库的内容能够被分布在多个地点的处于协作关系的本地仓库修改，本地仓库修改完代码后通过 git push 命令同步代码到远程仓库

## package.json 字段

**name**
npm 包的名字，必须是一个小写的单词，可以包含连字符-和下划线_，发布时必填。

**version**
npm 包的版本。需要遵循语义化版本格式x.x.x。

**description**
npm 包的描述。

**keywords**
npm 包的关键字。

**homepage**
npm 包的主页地址。

**bugs**
npm 包问题反馈的地址。

**license**
为 npm 包指定许可证

**author**
npm 包的作者

**files**
npm 包作为依赖安装时要包括的文件，格式是文件正则的数组。也可以使用 npmignore 来忽略个别文件。
以下文件总是被包含的，与配置无关
package.json
[README.md](http://readme.md/)
CHANGES / CHANGELOG / HISTORY
LICENCE / LICENSE
以下文件总是被忽略的，与配置无关
.git
.DS_Store
node_modules
.npmrc
npm-debug.log
package-lock.json
...

**main**
指定npm包的入口文件。

**module**
指定 ES 模块的入口文件。

**typings**
指定类型声明文件。

**bin**
开发可执行文件时，bin 字段可以帮助你设置链接，不需要手动设置 PATH。

**repository**
npm 包托管的地方

**scripts**
可执行的命令。

**dependencies**
npm包所依赖的其他npm包

**devDependencies**
npm 包所依赖的构建和测试相关的 npm 包.

**peerDependencies**
指定 npm 包与主 npm 包的兼容性，当开发插件时是需要的.

**engines**
指定 npm 包可以使用的 Node 版本.


- CSRF: 文件流steam（字节2020校招）

```
文件流就是内存数据和磁盘文件数据之间的流动
通过fs模块当中的方法实现
```


- 安全相关：XSS，CSRF（字节2020校招）

```
CSRF: 跨站点请求伪造， 用户访问正规网站进行登录的操作，然后进入恶意网站，恶意网站会返回一个带有攻击性的代码，在用户没有意识的情况下去请求正规网站的信息， 而正规网站没有进行来源校验，不知道是不是通过正规网站如果访问的就会将用户信息返回，导致恶意攻击	
	解决方案： 
  	1. 判断用户来源refer
    2. 为cookie设置 仅限同意网站连接（SameSite）  老版本浏览器不支持
    3. 使用非cookie 令牌
    4. 发送验证码
    5. 二次验证
 
 XSS: Cross Site Scripting  跨站脚本攻击
    1. 恶意用户提交了恶意内容到服务器
    防御方式： 防止脚本存入数据库  可以将脚本进行转码
    2. 恶意用户转发给正常用户一个正常网站但地址里面存在恶意内容
    防御方式： 过滤脚本信息
```

- 数据劫持（字节2020校招）
- CSP，阻止iframe的嵌入（字节2020校招）
- 进程和线程的区别知道吗？他们的通信方式有哪些？（字节2020校招）
- js为什么是单线程（字节2020校招 + 京东2020校招）
- section是用来做什么的（字节2020社招）
- 了解SSO吗（字节2020社招）
- 服务端渲染的方案有哪些？next.js和nuxt.js的区别（字节2020社招）
- cdn的原理（字节2020社招）
- JSBridge的原理（字节2020社招）
- 了解过Serverless，什么是Serverless（字节2020社招）

```
无服务器~
云计算？
```

- 你还知道哪些新的前端技术（微前端、Low Code、可视化、BI、BFF）（字节2020社招）
- 权限系统设计模型（DAC、MAC、RBAC、ABAC）（字节2020社招）
- 什么是微前端（字节2020社招）

```
微前端是一种前端架构，当前端业务发展到一定的业务程度的时候需要一种用于分散复杂度的架构模式于是出了微前端
```

- Node了解多少，有实际的项目经验吗（字节2020社招）
- Linux了解多少，linux上查看日志的命令是什么（字节2020社招）
- 强缓存和协商缓存（腾讯2020校招）
- node可以做大型服务器吗，为什么（腾讯2020校招）
- 用express还是koa（腾讯2020校招）
- 用node写过哪些接口，登录验证是怎么做的（腾讯2020实习）
- 清理node模块缓存的方法（腾讯2020校招）
- 模仿一个xss的场景（从攻击到防御的流程）（腾讯2020校招）
- Event loop知道吗？Node的eventloop的生命周期（京东2020校招）
- JWT单点登录实现原理（小米2020校招）
- 博客项目为什么使用Mysql?（小米2020校招）
- 如何看待Node.js的中间件？它的好处是什么？（小米2020校招）
- 为什么Node.js支持高并发请求？（小米2020校招）
- 博客项目是SSR渲染还是客户端渲染？（小米2020校招）
- web socket 和 socket io（广州长视科技2020校招）
- 是否使⽤过webpack(不是通过vuecli的⽅式)（掌数科技2020社招）
- 是否了解过express或者koa（掌数科技2020社招）
- node如何实现热更新 （橙智科技2020社招）
- Node 知道哪些（express, sequelize，一面也问了）（微医云2020校招）
- 用node做过什么（微医云2020校招）
- Rest接口（微医云2020校招）
- Linux指令
- 测试工具什么什么
- Linux指令
- 测试工具什么什么
- 浏览器和node环境的事件循环机制。（流利说2020校招）
- https建立连接的过程。（流利说2020校招）
- 讲述下http缓存机制，强缓存，协商缓存。（流利说2020校招）
- jwt原理（北京蒸汽记忆2020校招）
- 需求：实现一个页面操作不会整页刷新的网站，并且能在浏览器前进、后退时正确响应。给出你的技术实现方案？
- 对Node的优点和缺点提出了自己的看法
- nodejs的适用场景
- (如果会用node)知道route, middleware, cluster, nodemon, pm2, server-side rendering么?
- 解释一下 Backbone 的 MVC 实现方式？
- 什么是“前端路由”?什么时候适合使用“前端路由”? “前端路由”有哪些优点和缺点?

操作系统：进程线程、死锁条件
Redis的底层数据结构 
mongo的实务说一下, redis缓存机制
happypack 原理 【多进程打包 又讲了下进程和线程的区别】 

- koa 的原理 与express 的对比 
- 非js写的Node.js模块是如何使用Node.js调用的 【代码转换过程】 
除了都会哪些后端语言 【一开始说自己用Node.js，面试官又问有没有其他的，楼主大学学过java，不过没怎么实践过】 
- Mysql的存储引擎 【这个直接不知道了 TAT】
- 两个场景设计题感觉自己的设计方案还是有瑕疵的不是面试官想要的，并且问到mysql存储引擎直接无言以对了，感觉自己知识的广度还是有一定欠缺。最后问到性能优化正好自己之前优化过自己的博客网站做过相关的实践
- koa了解吗 

koa洋葱圈模型运行机制 express和koa区别 
nginx原理 
正向代理与反向代理 
手写中间件测试请求时间 

-   进程和线程的区别 

mongo的实务

node模块加载机制（require()原理）

路径转变，缓存

koa用的多吗

redis缓存机制是啥

8、 mysql如何创建索引
9、 mysql如何处理博客的点赞问题

完成prosimeFy
babel 原理，class 是转换成什么
[https://juejin.cn/post/6844904024928419848](https://juejin.cn/post/6844904024928419848)
```javascript
const fs = require("fs");

fs.readFile("./index.js", function (err, file) {
  console.log(file, "file");
});

function prosimeFy(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      let callback = function (...args) {
        resolve(args);
      };
      fn.apply(null, [...args, callback]);
    });
  };
}

const fsPromiseReadFile = prosimeFy(fs.readFile);

fsPromiseReadFile("./index.js").then((err, file) => {
  console.log(file, "file");
});

```

```javascript
const wrapperFun = promisify(fun);
const fun = (callback) => {
  setTimeout(() => {
    callback();
  }, 1000);
};
async () => {
  //   await wrapperFun(); //需要return这个
};

async function promisify() {
  // to do
}
```


   1. 


进程线程 

   1. 

   2.  页面缓存cache-control 
   3.  node写过东西吗 
   4.  node模块，path模块 
   5.  对比一下commonjs模块化和es6 module 
   6.  两个文件export的时候导出了相同的变量，避免重复--as 
   7.  exports和module.export的区别 
   8.  http和https 
   9.  非对称加密和对称加密 
   10.  打乱一个数组Math.random()的范围 
   11.  问的特别全面，基础几乎全问 
   12.  网站安全，CSRF，XSS，SQL注入攻击 
   13.  token是做什么的 

node koa
\4. 由于简历写了了解Nodejs的底层原理。问了Node.js内存泄漏和如何定位内存泄漏
常见的内存场景：1. 闭包 2. http.globalAgent 开启keepAlive的时候，未清除事件监听
定位内存泄漏：1. heapdump 2. 用chromedev 生成三次内存快照
\5. Node.js垃圾回收的原理
\4. 客户端发请求给服务端发生了什么
\6. 你知道MySQL和MongDB区别吗
\7. 你平时怎么使用nodeJS的
\8. restful风格规范是什么
新生代(from空间，to空间)，老生代(标记清除，引用计数)
NodeJs的EventLoop和V8的有什么区别
Node作为服务端语言，跟其他服务端语言比有什么特性？优势和劣势是什么？
Mysql接触过？跨表查询外键索引（就知道个关键字所以没往下问了）
1、介绍一下[项目](http://www.mianshigee.com/interview/search?q=%E9%A1%B9%E7%9B%AE)的难点以及怎么解决的
5、移动端的业务有做过吗？
**6、介绍一下你对中间件的理解7、怎么保证后端服务稳定性，怎么做容灾8、怎么让数据库查询更快9、数据库是用的什么？10、为什么用mysql**1、如何用Node开启一个服务器
2、你的项目当中哪些地方用到了Node，为什么这个地方要用Node处理 

   - 后端语言，涉及各种类型，主要都是TS，Java等，nodeJS作为动态语言，你怎么看？
   - 怎么理解后端，后端主要功能是做什么？
   - 校验器怎么做的？
   - 你对校验器做了什么封装？你用的这个库提供哪些功能？怎么实现两个关联参数校验？
2.  进程与线程的概念 
3.  进程和线程的区别 
4.  浏览器渲染进程的线程有哪些 
5.  进程之前的通信方式 
6.  僵尸进程和孤儿进程是什么？ 
7.  死锁产生的原因？如果解决死锁的问题？ 
8.  如何实现浏览器内多个标签页之间的通信? 
9.  对Service Worker的理解 

Mysql两种引擎

· 数据库表编码格式，UTF8和GBK区别

· 一个表里面姓名和学号两列，一行sql查询姓名重复的信息

· 防范XSS攻击

· 过滤或者编码哪些字符



1. export和module.export区别
2. Comonjs和es6 import区别

· Video标签可以播放的视频格式

1.  JWT 
2.  中间件有了解吗 
3.  进程和线程是什么 
4.  nodejs的process的nexttick 为什么比微任务快 
5.  进程之间如何实现数据通信和数据同步 
6.  node服务层如何封装接口 
7.  深挖底层原理 一直在拓展问 

网易：谈谈同步10和异步10和它们的应用场景。[https://zhuanlan.zhihu.com/p/115912936](https://zhuanlan.zhihu.com/p/115912936)
队列解决：实现bfs返回树中值为value的节点
网易：
```javascript
function A() {
  this.n = 0;
}
A.prototype.callMe = function () {
  console.log(this.n);
};
let a = new A();
document.addEventListener("click", a.callMe); //undefined。一个this指向window,相当于把a.callMe隐式赋给了cb。
document.addEventListener("click", () => {
  a.callMe(); //0
});

document.addEventListener("click", function () {
  a.callMe(); //0
});

```

你知道MySQL和MongDB区别吗

   1. · 如何防止sql注入

3 如何判断请求的资源已经全部返回。（从http角度，不要从api角度）

8 异步缓冲队列实现。例如需要发送十个请求，但最多只支持同时发送五个请求，需要等有请求完成后再进行剩余请求的发送。

2.用写websocket进度条以及使用场景

3.写回到上次浏览的位置（我说的记住位置存在sessionstorage/localstorage里），他问窗口大小变动怎么办，我说获取当前窗口大小等比例缩放scolltop。。。

6.正向代理，反向代理以及他们的应用场景

针对博客问了一下session，讲了cookie、session以及jwt，最后问如果不用cookie和localstorage，怎么做校验，比如匿名用户

你觉得你做过最牛逼的事情是什么

如果你有一天成了技术大牛，你最想做的事情是什么

介绍了下简历里各个项目的背景

react native ；node

博客技术文章怎么写的

monrepo技术栈，好处

node 中间件原理

发布订阅once加一个标识

是否能用于生产环境

父子组件执行顺序的原因

10w数据：虚拟滚动，bff（缓存，解决渲染问题）——新元

•如果你的技术方案和一起合作的同学不一致，你该怎么说服他？
• 压力
•我觉得你说的这个方案不可行
• 稳定性
• 看到你家在深圳，计划长期在北京发展吗？

- 个轮播组件的API
• 案例问题
•假设我们现在面临着着会怎么排查？-个故障，部分用户反馈无法进入登录页面，你将
会怎么排查？

egg又不是不可替代的，一个bff而已，egg团队去开发artus了，Artus是更上层的框架，还是基于egg的

node里面for循环处理10亿数据，出现两个问题，js卡死，内存不够

为什么老是有题目处理101数据

我跟他讲：分开循环解决js卡死，把结果用node里面的fs.writefile写入本地文件

解決内存不够

bam就是浏览器上作为一个代理 但实际上mock数据还是在那个「API管理平台上的」

[]==![] 是true

[]== [] 是false

双等号 两边数据类型一样 如果是引用类型，就判断引用地址是否相同，两边数据类型不一样便会隐式转换。

有一点反直觉

如何在一个图片长列表页使用懒加载进行性能优化 ，然后说了图片替换和监听窗口滚动实现图片按需加载，那么如何实现监听呢？，然后扯到节流监听滚动条变化执行函数
输入框要求每次输入都要有联想功能，即随时向后台请求数据，但是频繁输入时，如何防止频繁多次请求
你对操作系统，编译原理的理解

- 设计一个扫码登录的逻辑，为什么你扫码就可以登录你自己号，同时有这么多二维码
- 讲清楚服务端，PC端，和手机端的逻辑
- 怎么保存登陆态

项目权限管理（高低权限怎么区分，如果网络传输中途被人改包，怎么防止这一潜在危险）
在淘宝里面，商品数据量很大，前端怎么优化使加载速度更快、用户体验更好(severless + indexdb)  \8. 在7的条件下，已知用户当前在商品列表页，并且下一步操作是点击某个商品进入详情页，怎么加快详情页的渲染速度

## npm安装和查找机制
> 1. npm 会检查本地的 node_modules 目录中是否已经安装过该模块，如果已经安装，则不再重新安装
> 2. npm 检查缓存中是否有相同的模块，如果有，直接从缓存中读取安装（不需要网络）
> 3. 如果本地和缓存中均不存在，npm 会从 registry 指定的地址下载安装包，然后将其写入到本地的 node_modules 目录中，同时缓存起来。

npm 缓存相关命令 
```shell
# 清除缓存
npm cache clean -f

# 获取缓存位置
npm config get cache

# 设置缓存位置
npm config set cache "新的缓存路径"
```
