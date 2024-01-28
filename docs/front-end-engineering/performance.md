# 前端性能优化方法论


我们可以从两个方面来看性能优化的意义：

1. 用户角度：网站优化能够让页面加载得更快，响应更加及时，极大提升用户体验。
2. 服务商角度：优化会减少页面资源请求数，减小请求资源所占带宽大小，从而节省可观的带宽资源。

网站优化的目标就是减少网站加载时间，提高响应速度。
Google 和亚马逊的研究表明，Google 页面加载的时间从 0.4 秒提升到 0.9 秒导致丢失了 20% 流量和广告收入，对于亚马逊，页面加载时间每增加 100ms 就意味着 1% 的销售额损失。
可见，页面的加载速度对于用户有着至关重要的影响。


## Webpack 优化

如何分析打包结果？`webpack-bundle-analyzer`

### 1. 构建性能

:::tip
这里所说的构建性能，是指在开发阶段的构建性能，而不是生产环境的构建性能

优化的目标，是降低从打包开始，到代码效果呈现所经过的时间

构建性能会影响开发效率。构建性能越高，开发过程中时间的浪费越少
:::

#### 1.1 减少模块解析

模块解析包括：抽象语法树分析、依赖分析、模块语法替换

![](../public/ts/2024-01-27-11-37-14.png)

如果某个模块不做解析，该模块经过loader处理后的代码就是最终代码。

如果没有loader对该模块进行处理，该模块的源码就是最终打包结果的代码。

如果不对某个模块进行解析，可以缩短构建时间，那么哪些模块不需要解析呢？

模块中无其他依赖：一些已经打包好的第三方库，比如jquery，所以可以配置module.noParse，它是一个正则，被正则匹配到的模块不会解析

```js
module.exports = {
  mode: 'development',
  module: {
    noParse: /jquery/
  }
}
```

#### 1.2 优化loader性能

1. 进一步限制loader的应用范围。对于某些库，不使用loader

例如：babel-loader可以转换ES6或更高版本的语法，可是有些库本身就是用ES5语法书写的，不需要转换，使用babel-loader反而会浪费构建时间
lodash就是这样的一个库，lodash是在ES5之前出现的库，使用的是ES3语法
通过module.rule.exclude或module.rule.include，排除或仅包含需要应用loader的场景

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /lodash/,
                use: "babel-loader"
            }
        ]
    }
}
```

如果暴力一点，甚至可以排除掉node_modules目录中的模块，或仅转换src目录的模块

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                //或
                // include: /src/,
                use: "babel-loader"
            }
        ]
    }
}
```

这种做法是对loader的范围进行进一步的限制，和noParse不冲突

2. 缓存loader的结果

我们可以基于一种假设：如果某个文件内容不变，经过相同的loader解析后，解析后的结果也不变
于是，可以将loader的解析结果保存下来，让后续的解析直接使用保存的结果
cache-loader可以实现这样的功能：第一次打包会慢，因为有缓存的过程，以后就快了

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['cache-loader', ...loaders]
      },
    ],
  },
};
```

有趣的是，cache-loader放到最前面，却能够决定后续的loader是否运行。实际上，loader的运行过程中，还包含一个过程，即pitch

![](../public/front-end-engineering/2024-01-27-11-42-53.png)

cache-loader还可以实现各自自定义的配置，具体方式见文档

3. 为loader的运行开启多线程

thread-loader会开启一个线程池，线程池中包含**适量**的线程

它会把后续的loader放到线程池的线程中运行，以提高构建效率。由于后续的loader会放到新的线程中，所以，后续的loader不能：
- 使用 webpack api 生成文件
- 无法使用自定义的 plugin api
- 无法访问 webpack options

在实际的开发中，可以进行测试，来决定thread-loader放到什么位置

特别注意，开启和管理线程需要消耗时间，在小型项目中使用thread-loader反而会增加构建时间

HappyPack：受限于 Node 是单线程运行的，所以 Webpack 在打包的过程中也是单线程的，特别是在执行 Loader 的时候，长时间编译的任务很多，这样就会导致等待的情况。

HappyPack 可以将 Loader 的同步执行转换为并行的，这样就能充分利用系统资源来加快打包效率了

```js
module: {
  loaders: [
    {
      test: /\.js$/,
      include: [resolve('src')],
      exclude: /node_modules/,
      // id 后面的内容对应下面
      loader: 'happypack/loader?id=happybabel'
    }
  ]
},
plugins: [
  new HappyPack({
    id: 'happybabel',
    loaders: ['babel-loader?cacheDirectory'],
    // 开启 4 个线程
    threads: 4
  })
]
```

#### 1.3 热替换 HMR

热替换并不能降低构建时间（可能还会稍微增加），但可以降低代码改动到效果呈现的时间
当使用webpack-dev-server时，考虑代码改动到效果呈现的过程

![](../public/front-end-engineering/2024-01-27-11-43-39.png)

![](../public/front-end-engineering/2024-01-27-11-43-48.png)

原理

1. 更改配置

```js
module.exports = {
  devServer:{
    hot:true // 开启HMR
  },
  plugins:[ 
    // 可选
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

2. 更改代码

```js
// index.js

if(module.hot){ // 是否开启了热更新
  module.hot.accept() // 接受热更新
}
```

首先，这段代码会参与最终运行！当开启了热更新后，`webpack-dev-server`会向打包结果中注入`module.hot`属性。默认情况下，`webpack-dev-server`不管是否开启了热更新，当重新打包后，都会调用`location.reload`刷新页面

但如果运行了`module.hot.accept()`，将改变这一行为`module.hot.accept()`的作用是让`webpack-dev-server`通过socket管道，把服务器更新的内容发送到浏览器

![](../public/front-end-engineering/2024-01-27-11-45-28.png)

然后，将结果交给插件`HotModuleReplacementPlugin`注入的代码执行
插件`HotModuleReplacementPlugin`会根据覆盖原始代码，然后让代码重新执行
所以，**热替换发生在代码运行期**


**样式热替换**

对于样式也是可以使用热替换的，但需要使用`style-loader`

因为热替换发生时，`HotModuleReplacementPlugin`只会简单的重新运行模块代码

因此`style-loader`的代码一运行，就会重新设置style元素中的样式

而`mini-css-extract-plugin`，由于它生成文件是在构建期间，运行期间并会也无法改动文件，因此它对于热替换是无效的

#### 1.4 其他提升构建性能


1. 多⼊⼝情况下，使⽤ `CommonsChunkPlugin` 来提取公共代码
2. 通过 `externals` 配置来提取常⽤库
3. 利⽤ `DllPlugin` 和 `DllReferencePlugin` 预编译资源模块 通过 `DllPlugin` 来对那些我们引⽤但是绝对不会修改的npm包来进⾏预编译，再通过 `DllReferencePlugin` 将预编译的模块加载进来。
4. 使⽤ `Happypack` 实现多线程加速编译
5. 使⽤ `webpack-uglify-parallel` 来提升 `uglifyPlugin` 的压缩速度。 原理上 `webpack-uglify-parallel` 采⽤了多核并⾏压缩来提升压缩速度
6. 使⽤ `Tree-shaking` 和 `Scope Hoisting` 来剔除多余代码


### 2. 传输性能


:::tip
传输性能是指，打包后的JS代码传输到浏览器经过的时间，在优化传输性能时要考虑到：
1. 总传输量：所有需要传输的JS文件的内容加起来，就是总传输量，重复代码越少，总传输量越少
2. 文件数量：当访问页面时，需要传输的JS文件数量，文件数量越多，http请求越多，响应速度越慢
3. 浏览器缓存：JS文件会被浏览器缓存，被缓存的文件不会再进行传输
:::

#### 2.1 手动分包（极大提升构建性能）

默认情况下，`vue-cli`会利用`webpack`将`src`目录中的所有代码打包成一个`bundle`

这样就导致访问一个页面时，需要加载所有页面的js代码

我们可以利用webpack对动态import的支持，从而达到把不同页面的代码打包到不同文件中

```js
// routes
export default [
  {
    name: "Home",
    path: "/",
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home"),
  },
  {
    name: "About",
    path: "/about",
    component: () => import(/* webpackChunkName: "about" */"@/views/About"),
  }
];
```

什么是分包：将一个整体的代码,分布到不同的打包文件中

什么时候要分包？

- 多个chunk引入了公共模块
- 公共模块体积较大或较少的变动


**基本原理**

手动分包的总体思路是：

1. 先单独的打包公共模块

![](../public/front-end-engineering/2024-01-28-16-38-33.png)

公共模块会被打包成为动态链接库(dll Dynamic Link Library)，并生成资源清单

2. 根据入口模块进行正常打包

打包时，如果发现模块中使用了资源清单中描述的模块，则不会形成下面的代码结构

```js
//源码，入口文件index.js
import $ from "jquery"
import _ from "lodash"
_.isArray($(".red"));
```

由于资源清单中包含jquery和lodash两个模块，因此打包结果的大致格式是：

```js
(function(modules){
  //...
})({
  // index.js文件的打包结果并没有变化
  "./src/index.js":
  function(module, exports, __webpack_require__){
    var $ = __webpack_require__("./node_modules/jquery/index.js")
    var _ = __webpack_require__("./node_modules/lodash/index.js")
    _.isArray($(".red"));
  },
  // 由于资源清单中存在，jquery的代码并不会出现在这里
  "./node_modules/jquery/index.js":
  function(module, exports, __webpack_require__){
    module.exports = jquery;// 直接导出资源清单的名字
  },
  // 由于资源清单中存在，lodash的代码并不会出现在这里
  "./node_modules/lodash/index.js":
  function(module, exports, __webpack_require__){
    module.exports = lodash;
  }
})
```

3. 打包公共模块

打包公共模块是一个独立的打包过程

1. 单独打包公共模块，暴露变量名 . npm run dll

```js
// webpack.dll.config.js
module.exports = {
  mode: "production",
  entry: {
    jquery: ["jquery"],//数组
    lodash: ["lodash"]
  },
  output: {
    filename: "dll/[name].js",
    library: "[name]"// 每个bundle暴露的全局变量名
  }
};
```

利用`DllPlugin`生成资源清单

```js
// webpack.dll.config.js
module.exports = {
  plugins: [
    new webpack.DllPlugin({
      path: path.resolve(__dirname, "dll", "[name].manifest.json"), //资源清单的保存位置
      name: "[name]"//资源清单中，暴露的变量名
    })
  ]
};
```

运行后，即可完成公共模块打包


**使用公共模块**

1. 在页面中手动引入公共模块

```html
<script src="./dll/jquery.js"></script>
<script src="./dll/lodash.js"></script>
```

重新设置`clean-webpack-plugin`。如果使用了插件`clean-webpack-plugin`，为了避免它把公共模块清除，需要做出以下配置

```js
new CleanWebpackPlugin({
  // 要清除的文件或目录
  // 排除掉dll目录本身和它里面的文件
  cleanOnceBeforeBuildPatterns: ["**/*", '!dll', '!dll/*']
})
```

目录和文件的匹配规则使用的是[globbing patterns](https://github.com/sindresorhus/globby#globbing-patterns)语法

使用DllReferencePlugin控制打包结果 

```js
module.exports = {
  plugins:[// 资源清单
    new webpack.DllReferencePlugin({
      manifest: require("./dll/jquery.manifest.json")
    }),
    new webpack.DllReferencePlugin({
      manifest: require("./dll/lodash.manifest.json")
    })
  ]
}
```


**总结**

手动打包的过程：
1. 开启output.library暴露公共模块
2. 用DllPlugin创建资源清单
3. 用DllReferencePlugin使用资源清单

手动打包的注意事项：
1. 资源清单不参与运行，可以不放到打包目录中
2. 记得手动引入公共JS，以及避免被删除
3. 不要对小型的公共JS库使用

优点：
1. 极大提升自身模块的打包速度
2. 极大的缩小了自身文件体积
3. 有利于浏览器缓存第三方库的公共代码

缺点：
1. 使用非常繁琐
2. 如果第三方库中包含重复代码，则效果不太理想

#### 2.2 自动分包（会降低构建效率，开发效率提升，新的模块不需要手动处理了）

1. 基本原理

不同于手动分包，自动分包是从实际的角度出发，从一个更加宏观的角度来控制分包，而一般不对具体哪个包要分出去进行控制 

因此使用自动分包，不仅非常方便，而且更加贴合实际的开发需要

要控制自动分包，关键是要配置一个合理的分包策略 

有了分包策略之后，不需要额外安装任何插件，webpack会自动的按照策略进行分包

实际上，webpack在内部是使用SplitChunksPlugin进行分包的 过去有一个库CommonsChunkPlugin也可以实现分包，不过由于该库某些地方并不完善，到了webpack4之后，已被SplitChunksPlugin取代

![](../public/front-end-engineering/2024-01-28-16-43-50.png)

从分包流程中至少可以看出以下几点：
 
- 分包策略至关重要，它决定了如何分包
- 分包时，webpack开启了一个新的chunk，对分离的模块进行打包
- 打包结果中，公共的部分被提取出来形成了一个单独的文件，它是新chunk的产物


2. 分包策略的基本配置

webpack提供了optimization配置项，用于配置一些优化信息
 
其中splitChunks是分包策略的配置

```js
module.exports = {
  optimization: {
    splitChunks: {
      // 分包策略
    }
  }
}
```

事实上，分包策略有其默认的配置，我们只需要轻微的改动，即可应对大部分分包场景

**chunks**

该配置项用于配置需要应用分包策略的chunk
 
我们知道，分包是从已有的chunk中分离出新的chunk，那么哪些chunk需要分离呢
 
chunks有三个取值，分别是：
 
- all: 对于所有的chunk都要应用分包策略
- async：【默认】仅针对异步chunk应用分包策略
- initial：仅针对普通chunk应用分包策略

所以，你只需要配置chunks为all即可

**maxSize**

该配置可以控制包的最大字节数
 
如果某个包（包括分出来的包）超过了该值，则webpack会尽可能的将其分离成多个包
 
但是不要忽略的是，分包的基础单位是模块，如果一个完整的模块超过了该体积，它是无法做到再切割的，因此，尽管使用了这个配置，完全有可能某个包还是会超过这个体积
 
另外，该配置看上去很美妙，实际意义其实不大
 
因为分包的目的是提取大量的公共代码，从而减少总体积和充分利用浏览器缓存
 
虽然该配置可以把一些包进行再切分，但是实际的总体积和传输量并没有发生变化
 
如果要进一步减少公共模块的体积，只能是压缩和tree shaking


3. 分包策略的其他配置

如果不想使用其他配置的默认值，可以手动进行配置：
 
- automaticNameDelimiter：新chunk名称的分隔符，默认值~

![](../public/front-end-engineering/2024-01-28-16-45-11.png)

- minChunks：一个模块被多少个chunk使用时，才会进行分包，默认值1。如果我自己写一个文件，默认也不分包，因为自己写的那个太小，没达到拆分的条件，所以要配合minSize使用。

- minSize：当分包达到多少字节后才允许被真正的拆分，默认值30000


4. 缓存组

之前配置的分包策略是全局的
 
而实际上，分包策略是基于缓存组的
 
每个缓存组提供一套独有的策略，webpack按照缓存组的优先级依次处理每个缓存组，被缓存组处理过的分包不需要再次分包
 
默认情况下，webpack提供了两个缓存组：

```js
module.exports = {
  optimization:{
    splitChunks: {
      //全局配置
      cacheGroups: {
        // 属性名是缓存组名称，会影响到分包的chunk名
        // 属性值是缓存组的配置，缓存组继承所有的全局配置，也有自己特殊的配置
        vendors: { 
          test: /[\\/]node_modules[\\/]/, // 当匹配到相应模块时，将这些模块进行单独打包
          priority: -10 // 缓存组优先级，优先级越高，该策略越先进行处理，默认值为0
        },
        default: {
          minChunks: 2,  // 覆盖全局配置，将最小chunk引用数改为2
          priority: -20, // 优先级
          reuseExistingChunk: true // 重用已经被分离出去的chunk
        }
      }
    }
  }
}
```

很多时候，缓存组对于我们来说没什么意义，因为默认的缓存组就已经够用了
 
但是我们同样可以利用缓存组来完成一些事情，比如对公共样式的抽离

```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        styles: {// 样式抽离
          test: /\.css$/, // 匹配样式模块
          minSize: 0, // 覆盖默认的最小尺寸，这里仅仅是作为测试
          minChunks: 2 // 覆盖默认的最小chunk引用数
        }
      }
    }
  },
  module: {
    rules: [{ test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] }]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      chunks: ["index"]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:5].css",
      // chunkFilename是配置来自于分割chunk的文件名
      chunkFilename: "common.[hash:5].css" 
    })
  ]
}
```


5. 配合多页应用

虽然现在单页应用是主流，但免不了还是会遇到多页应用
 
由于在多页应用中需要为每个html页面指定需要的chunk，否则都会引入进去，这就造成了问题

```js
new HtmlWebpackPlugin({
  template: "./public/index.html",
  chunks: ["index~other", "vendors~index~other", "index"]
})
```

我们必须手动的指定被分离出去的chunk名称，这不是一种好办法
 
幸好`html-webpack-plugin`的新版本中解决了这一问题

```shell 
npm i -D html-webpack-plugin@next
````
 
做出以下配置即可：

```js
new HtmlWebpackPlugin({
  template: "./public/index.html",
  chunks: ["index"]
})
```

它会自动的找到被index分离出去的chunk，并完成引用
 
目前这个版本仍处于测试解决，还未正式发布
 

6. 原理

自动分包的原理其实并不复杂，主要经过以下步骤：
 
- 检查每个chunk编译的结果
- 根据分包策略，找到那些满足策略的模块
- 根据分包策略，生成新的chunk打包这些模块（代码有所变化）
- 把打包出去的模块从原始包中移除，并修正原始包代码
 
在代码层面，有以下变动
 
1. 分包的代码中，加入一个全局变量webpackJsonp，类型为数组，其中包含公共模块的代码
2. 原始包的代码中，使用数组中的公共代码

#### 2.3 代码压缩 

单模块体积优化


1. 为什么要进行代码压缩: 减少代码体积；破坏代码的可读性，提升破解成本；
2. 什么时候要进行代码压缩: 生产环境
3. 使用什么压缩工具: 目前最流行的代码压缩工具主要有两个：UglifyJs和Terser
 
UglifyJs是一个传统的代码压缩工具，已存在多年，曾经是前端应用的必备工具，但由于它不支持ES6语法，所以目前的流行度已有所下降。
 
Terser是一个新起的代码压缩工具，支持ES6+语法，因此被很多构建工具内置使用。webpack安装后会内置Terser，当启用生产环境后即可用其进行代码压缩。
 
因此，我们选择Terser

关于副作用 side effect
 
副作用：函数运行过程中，可能会对外部环境造成影响的功能
 
如果函数中包含以下代码，该函数叫做副作用函数:
 
- 异步代码
- localStorage
- 对外部数据的修改

如果一个函数没有副作用，同时，函数的返回结果仅依赖参数，则该函数叫做纯函数(pure function)
 
纯函数非常有利于压缩优化。可以手动指定那些是纯函数：pure_funcs:['Math.random']

**Terser**

在Terser的官网可尝试它的压缩效果
 
Terser官网：https://terser.org/

webpack+Terser
 
webpack自动集成了Terser
 
如果你想更改、添加压缩工具，又或者是想对Terser进行配置，使用下面的webpack配置即可

```js
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = {
  optimization: {
    minimize: true, // 是否要启用压缩，默认情况下，生产环境会自动开启
    minimizer: [ // 压缩时使用的插件，可以有多个
      new TerserPlugin(), 
      new OptimizeCSSAssetsPlugin()
    ],
  },
};
```

#### 2.4 tree shaking

压缩可以移除模块内部的无效代码 tree shaking 可以移除模块之间的无效代码

1. 背景
某些模块导出的代码并不一定会被用到，第三方库就是个典型例子
```js
// myMath.js
export function add(a, b){
  console.log("add")
  return a+b;
}

export function sub(a, b){
  console.log("sub")
  return a-b;
}
// index.js
import {add} from "./myMath"
console.log(add(1,2));
```
tree shaking 用于移除掉不会用到的导出
 
2. 使用
 
webpack2开始就支持了tree shaking
 
只要是生产环境，tree shaking自动开启
 
3. 原理
 
webpack会从入口模块出发寻找依赖关系
 
当解析一个模块时，webpack会根据ES6的模块导入语句来判断，该模块依赖了另一个模块的哪个导出
 
webpack之所以选择ES6的模块导入语句，是因为ES6模块有以下特点：commonjs不具备
 
- 导入导出语句只能是顶层语句 
- import的模块名只能是字符串常量
- import绑定的变量是不可变的
 
这些特征都非常有利于分析出稳定的依赖
 
在具体分析依赖时，webpack坚持的原则是：保证代码正常运行，然后再尽量tree shaking
 
所以，如果你依赖的是一个导出的对象，由于JS语言的动态特性，以及webpack还不够智能，为了保证代码正常运行，它不会移除对象中的任何信息
 
因此，我们在编写代码的时候，尽量：
 
- 使用export xxx导出，而不使用export default {xxx}导出。后者会整个导出，但是不一定都需要。
- 使用import {xxx} from "xxx"导入，而不使用import xxx from "xxx"导入
 
依赖分析完毕后，webpack会根据每个模块每个导出是否被使用，标记其他导出为dead code，然后交给代码压缩工具处理
 
代码压缩工具最终移除掉那些dead code代码
 
4. 使用第三方库
 
某些第三方库可能使用的是commonjs的方式导出，比如lodash
 
又或者没有提供普通的ES6方式导出
 
对于这些库，tree shaking是无法发挥作用的
 
因此要寻找这些库的es6版本，好在很多流行但没有使用的ES6的第三方库，都发布了它的ES6版本，比如lodash-es
 
5. 作用域分析
 
tree shaking本身并没有完善的作用域分析，可能导致在一些dead code函数中的依赖仍然会被视为依赖
比如a引用b，b引用了lodash，但是a没有用到b用lodash的导出代码
插件webpack-deep-scope-plugin提供了作用域分析，可解决这些问题
 
6. 副作用问题
 
webpack在tree shaking的使用，有一个原则：一定要保证代码正确运行
 
在满足该原则的基础上，再来决定如何tree shaking
 
因此，当webpack无法确定某个模块是否有副作用时，它往往将其视为有副作用
 
因此，某些情况可能并不是我们所想要的
```js
//common.js
var n  = Math.random();

//index.js
import "./common.js"
```
 
虽然我们根本没用有common.js的导出，但webpack担心common.js有副作用，如果去掉会影响某些功能

如果要解决该问题，就需要标记该文件是没有副作用的

在package.json中加入sideEffects
```json
{
    "sideEffects": false
}
```
 
有两种配置方式：
 
- false：当前工程中，所有模块都没有副作用。注意，这种写法会影响到某些css文件的导入
- 数组：设置哪些文件拥有副作用，例如：["!src/common.js"]，表示只要不是src/common.js的文件，都有副作用

```js
{
    "sideEffects": ["!src/common.js"]
}
```
这种方式我们一般不处理，通常是一些第三方库在它们自己的package.json中标注

webpack无法对css完成tree shaking，因为css跟es6没有半毛钱关系。

因此对css的tree shaking需要其他插件完成。例如：purgecss-webpack-plugin。注意：purgecss-webpack-plugin对css module无能为力


#### 2.5 懒加载

可以理解为异步chunk

```js
// 异步加载使用import语法
const btn = document.querySelector("button");
btn.onclick = async function () {
  //动态加载
  //import 是ES6的草案
  //浏览器会使用JSOP的方式远程去读取一个js模块
  //import()会返回一个promise   （返回结果类似于 * as obj）
  // const { chunk } = await import(/* webpackChunkName:"lodash" */"lodash-es");
  const {
    chunk
  } = await import("./util");// 搞成静态依赖就行 所以加上了util.js
  const result = chunk([3, 5, 6, 7, 87], 2);
  console.log(result);
};

// 因为是动态的，所以tree shaking没了
// 如果想用该咋办？搞成静态依赖就行 所以加上了util.js
```

#### 2.6 gzip

gzip是一种压缩文件的算法

**B/S结构中的压缩传输**

![](../public/front-end-engineering/2024-01-28-16-52-03.png)

- 浏览器告诉服务器支持那些压缩方式。
- 响应头：什么方式解压->ungzip

优点：传输效率可能得到大幅提升

缺点：服务器的压缩需要时间，客户端的解压需要时间

**gzip的原理**

gizp压缩是一种http请求优化方式，通过减少文件体积来提高加载速度。html、js、css文件甚至json数据都可以用它压缩，可以减小60%以上的体积。前端配置gzip压缩，并且服务端使用nginx开启gzip，用来减小网络传输的流量大小。

**使用webpack进行预压缩**

使用compression-webpack-plugin插件对打包结果进行预压缩，可以移除服务器的压缩时间

![](../public/front-end-engineering/2024-01-28-16-52-40.png)

```js
plugins: [
  // 参考文档配置即可，一般取默认
  new CmpressionWebpackPlugin({
    test: /\.js/, //希望对js进行预压缩
    minRatio: 0.5 // 小于0.5才会压缩
  })
]
```

#### 2.7 按需加载 

#### 2.8 DllPlugin

#### 2.9 其他




















































































## Vue

### **如何实现 _vue_ 项目中的性能优化？**

> **编码阶段**
>
> - 尽量减少 _data_ 中的数据，_data_ 中的数据都会增加 _getter_ 和 _setter_，会收集对应的 _watcher_
> - _v-if_ 和 _v-for_ 不能连用
> - 如果需要使用 _v-for_ 给每项元素绑定事件时使用事件代理
> - _SPA_ 页面采用 _keep-alive_ 缓存组件
> - 在更多的情况下，使用 _v-if_ 替代 _v-show_
> - _key_ 保证唯一
> - 使用路由懒加载、异步组件
> - 防抖、节流
> - 第三方模块按需导入
> - 长列表滚动到可视区域动态加载
> - 图片懒加载

> **_SEO_ 优化**
>
> - 预渲染
> - 服务端渲染 _SSR_

> **打包优化**
>
> - 压缩代码
> - _Tree Shaking/Scope Hoisting_
> - 使用 _cdn_ 加载第三方模块
> - 多线程打包 _happypack_
> - _splitChunks_ 抽离公共文件
> - _sourceMap_ 优化

> **用户体验**
>
> - 骨架屏
> - _PWA_

> 还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启 _gzip_ 压缩等。

### **_vue_ 中的 _spa_ 应用如何优化首屏加载速度?**

> 优化首屏加载可以从这几个方面开始：
>
> - 请求优化：CDN 将第三方的类库放到 CDN 上，能够大幅度减少生产环境中的项目体积，另外 CDN 能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。
> - 缓存：将长时间不会改变的第三方类库或者静态资源设置为强缓存，将 max-age 设置为一个非常长的时间，再将访问路径加上哈希达到哈希值变了以后保证获取到最新资源，好的缓存策略有助于减轻服务器的压力，并且显著的提升用户的体验
> - gzip：开启 gzip 压缩，通常开启 gzip 压缩能够有效的缩小传输资源的大小。
> - http2：如果系统首屏同一时间需要加载的静态资源非常多，但是浏览器对同域名的 tcp 连接数量是有限制的(chrome 为 6 个)超过规定数量的 tcp 连接，则必须要等到之前的请求收到响应后才能继续发送，而 http2 则可以在多个 tcp 连接中并发多个请求没有限制，在一些网络较差的环境开启 http2 性能提升尤为明显。
> - 懒加载：当 url 匹配到相应的路径时，通过 import 动态加载页面组件，这样首屏的代码量会大幅减少，webpack 会把动态加载的页面组件分离成单独的一个 chunk.js 文件
> - 预渲染：由于浏览器在渲染出页面之前，需要先加载和解析相应的 html、css 和 js 文件，为此会有一段白屏的时间，可以添加 loading，或者骨架屏幕尽可能的减少白屏对用户的影响体积优化
> - 合理使用第三方库：对于一些第三方 ui 框架、类库，尽量使用按需加载，减少打包体积
> - 使用可视化工具分析打包后的模块体积：webpack-bundle- analyzer 这个插件在每次打包后能够更加直观的分析打包后模块的体积，再对其中比较大的模块进行优化
> - 提高代码使用率：利用代码分割，将脚本中无需立即调用的代码在代码构建时转变为异步加载的过程
> - 封装：构建良好的项目架构，按照项目需求就行全局组件，插件，过滤器，指令，utils 等做一 些公共封装，可以有效减少我们的代码量，而且更容易维护资源优化
> - 图片懒加载：使用图片懒加载可以优化同一时间减少 http 请求开销，避免显示图片导致的画面抖动，提高用户体验
> - 使用 svg 图标：相对于用一张图片来表示图标，svg 拥有更好的图片质量，体积更小，并且不需要开启额外的 http 请求
> - 压缩图片：可以使用 image-webpack-loader，在用户肉眼分辨不清的情况下一定程度上压缩图片

## React

# 性能优化

shouldComponentUpdate 提供了两个参数 nextProps 和 nextState，表示下一次 props 和一次 state 的值，当函数返回 false 时候，render()方法不执行，组件也就不会渲染，返回 true 时，组件照常重渲染。此方法就是拿当前 props 中值和下一次 props 中的值进行对比，数据相等时，返回 false，反之返回 true。

需要注意，在进行新旧对比的时候，是**浅对比，**也就是说如果比较的数据时引用数据类型，只要数据的引用的地址没变，即使内容变了，也会被判定为 true。

面对这个问题，可以使用如下方法进行解决： （1）使用 setState 改变数据之前，先采用 ES6 中 assgin 进行拷贝，但是 assgin 只深拷贝的数据的第一层，所以说不是最完美的解决办法：

```javascript
const o2 = Object.assign({}, this.state.obj);
o2.student.count = "00000";
this.setState({
  obj: o2,
});
```

（2）使用 JSON.parse(JSON.stringfy())进行深拷贝，但是遇到数据为 undefined 和函数时就会错。

```javascript
const o2 = JSON.parse(JSON.stringify(this.state.obj));
o2.student.count = "00000";
this.setState({
  obj: o2,
});
```

**React 如何判断什么时候重新渲染组件？**

组件状态的改变可以因为`props`的改变，或者直接通过`setState`方法改变。组件获得新的状态，然后 React 决定是否应该重新渲染组件。只要组件的 state 发生变化，React 就会对组件进行重新渲染。这是因为 React 中的`shouldComponentUpdate`方法默认返回`true`，这就是导致每次更新都重新渲染的原因。

当 React 将要渲染组件时会执行`shouldComponentUpdate`方法来看它是否返回`true`（组件应该更新，也就是重新渲染）。所以需要重写`shouldComponentUpdate`方法让它根据情况返回`true`或者`false`来告诉 React 什么时候重新渲染什么时候跳过重新渲染。

**避免不必要的 render**

React 基于虚拟 DOM 和高效 Diff 算法的完美配合，实现了对 DOM 最小粒度的更新。大多数情况下，React 对 DOM 的渲染效率足以业务日常。但在个别复杂业务场景下，性能问题依然会困扰我们。此时需要采取一些措施来提升运行性能，其很重要的一个方向，就是避免不必要的渲染（Render）。这里提下优化的点：

- **shouldComponentUpdate 和 PureComponent**

在 React 类组件中，可以利用 shouldComponentUpdate 或者 PureComponent 来减少因父组件更新而触发子组件的 render，从而达到目的。shouldComponentUpdate 来决定是否组件是否重新渲染，如果不希望组件重新渲染，返回 false 即可。

- **利用高阶组件**

在函数组件中，并没有 shouldComponentUpdate 这个生命周期，可以利用高阶组件，封装一个类似 PureComponet 的功能

- **使用 React.memo**

React.memo 是 React 16.6 新的一个 API，用来缓存组件的渲染，避免不必要的更新，其实也是一个高阶组件，与 PureComponent 十分类似，但不同的是， React.memo 只能用于函数组件。
