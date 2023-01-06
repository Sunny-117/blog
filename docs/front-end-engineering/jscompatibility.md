# JS兼容性

## babel

> 官网：[https://babeljs.io/](https://babeljs.io/)
>
>民间中文网：[https://www.babeljs.cn/](https://www.babeljs.cn/)


### babel简介

babel一词来自于希伯来语，直译为巴别塔

巴别塔象征的统一的国度、统一的语言

而今天的JS世界缺少一座巴别塔，不同版本的浏览器能识别的ES标准并不相同，就导致了开发者面对不同版本的浏览器要使用不同的语言，和古巴比伦一样，前端开发也面临着这样的困境。

babel的出现，就是用于解决这样的问题，它是一个编译器，可以把不同标准书写的语言，编译为统一的、能被各种浏览器识别的语言

![](../public/front-end-engineering/2023-01-06-16-46-05.png)

由于语言的转换工作灵活多样，babel的做法和postcss、webpack差不多，它本身仅提供一些分析功能，真正的转换需要依托于插件完成


![](../public/front-end-engineering/2023-01-06-16-46-13.png)

### babel的安装

babel可以和构建工具联合使用，也可以独立使用

如果要独立的使用babel，需要安装下面两个库：

- @babel/core：babel核心库，提供了编译所需的所有api
- @babel/cli：提供一个命令行工具，调用核心库的api完成编译

```shell
npm i -D @babel/core @babel/cli
```

### babel的使用

@babel/cli的使用极其简单

它提供了一个命令`babel`

```shell
# 按文件编译
babel 要编译的文件 -o 编辑结果文件
npx babel js/a.js -o js/b.js

# 按目录编译
babel 要编译的整个目录 -d 编译结果放置的目录
npx babel js -d dist
```

### babel的配置

可以看到，babel本身没有做任何事情，真正的编译要依托于**babel插件**和**babel预设**来完成

> babel预设和postcss预设含义一样，是多个插件的集合体，用于解决一系列常见的兼容问题


如何告诉babel要使用哪些插件或预设呢？需要通过一个配置文件`.babelrc`

```json
{
    "presets": [],
    "plugins": []
}
```
### babel预设

babel有多种预设，最常见的预设是`@babel/preset-env`

安装 `@babel/preset-env`可以让你使用最新的JS语法，而无需针对每种语法转换设置具体的插件


**配置**

```json
{
    "presets": [
        "@babel/preset-env"
    ]
}
```

**兼容的浏览器**

`@babel/preset-env`需要根据兼容的浏览器范围来确定如何编译，和postcss一样，可以使用文件`.browserslistrc`来描述浏览器的兼容范围

```
last 3 version
> 1%
not ie <= 8
```

**自身的配置**

和`postcss-preset-env`一样，`@babel/preset-env`自身也有一些配置

> 具体的配置见：[https://www.babeljs.cn/docs/babel-preset-env#options](https://www.babeljs.cn/docs/babel-preset-env#options)


配置方式是：

```json
{
    "presets": [
        ["@babel/preset-env", {
            "配置项1": "配置值",
            "配置项2": "配置值",
            "配置项3": "配置值"
        }]
    ]
}
```

其中一个比较常见的配置项是`usebuiltins`，该配置的默认值是false

它有什么用呢？由于该预设仅转换新的语法，并不对新的API进行任何处理

例如：

```javascript
new Promise(resolve => {
    resolve()
})
```

转换的结果为

```javascript
new Promise(function (resolve) {
  resolve();
});
```

如果遇到没有Promise构造函数的旧版本浏览器，该代码就会报错

而配置`usebuiltins`可以在编译结果中注入这些新的API，它的值默认为`false`，表示不注入任何新的API，可以将其设置为`usage`，表示根据API的使用情况，按需导入API

对于新的api    npm i core-js
对于新的语法变成api实现   generator-runtime

```json
{
    "presets": [
        ["@babel/preset-env", {
            "useBuiltIns": "usage",
            "corejs": 3//默认会使用2，我需要使用3版本
        }]
    ]
}
```
### babel插件

先安装在使用 npm i -D ...

> 注意：@babel/polyfill 已过时，目前被`core-js`和`generator-runtime`所取代


除了预设可以转换代码之外，插件也可以转换代码，它们的顺序是：

- 插件在 Presets 前运行。
- 插件顺序从前往后排列。
- Preset 顺序是颠倒的（从后往前）。

```js
{
  "preset": ['a','b'],
  "plugins":['c','d']
}
// cdba
```

通常情况下，`@babel/preset-env`只转换那些已经形成正式标准的语法，对于某些处于早期阶段、还没有确定的语法不做转换。

如果要转换这些语法，就要单独使用插件

下面随便列举一些插件

#### `@babel/plugin-proposal-class-properties`

该插件可以让你在类中书写初始化字段

```javascript
class A {
    a = 1;
    constructor(){
        this.b = 3;
    }
}
```

#### `@babel/plugin-proposal-function-bind`

该插件可以让你轻松的为某个方法绑定this

```javascript
function Print() {
    console.log(this.loginId);
}

const obj = {
    loginId: "abc"
};

obj::Print(); //相当于：Print.call(obj);
```

> 遗憾的是，目前vscode无法识别该语法，会在代码中报错，虽然并不会有什么实际性的危害，但是影响观感


#### `@babel/plugin-proposal-optional-chaining`

```javascript
const obj = {
  foo: {
    bar: {
      baz: 42,
    },
  },
};

const baz = obj?.foo?.bar?.baz; // 42

const safe = obj?.qux?.baz; // undefined
```

#### `babel-plugin-transform-remove-console`

该插件会移除源码中的控制台输出语句

#### `@babel/plugin-transform-runtime`

用于提供一些公共的API，这些API会帮助代码转换
使用的时候发现依赖其他库，所以还要安装babel runtime


## ESLint

ESLint是一个针对JS的代码风格**检查**工具，当不满足其要求的风格时，会给予警告或错误

官网：[https://eslint.org/](https://eslint.org/)

民间中文网：[https://eslint.bootcss.com/](https://eslint.bootcss.com/)

### 使用

ESLint通常配合编辑器使用

1. 在vscode中安装`ESLint`

该工具会自动检查工程中的JS文件

检查的工作交给`eslint`库，如果当前工程没有，则会去全局库中查找，如果都没有，则无法完成检查

另外，检查的依据是`eslint`的配置文件`.eslintrc`，如果找不到工程中的配置文件，也无法完成检查

2. 安装`eslint`

`npm i [-g] eslint`

3. 创建配置文件

可以通过`eslint`交互式命令创建配置文件

> 由于windows环境中git窗口对交互式命名支持不是很好，建议使用powershell


`npx eslint --init`

> eslint会识别工程中的`.eslintrc.*`文件，也能够识别`package.json`中的`eslintConfig`字段


### 配置

### env

配置代码的运行环境

- browser：代码是否在浏览器环境中运行
- es6：是否启用ES6的全局API，例如`Promise`等

### parserOptions

该配置指定`eslint`对哪些语法的支持

- ecmaVersion: 支持的ES语法版本
- sourceType 
   - script：传统脚本
   - module：模块化脚本

### parser

`eslint`的工作原理是先将代码进行解析，然后按照规则进行分析

`eslint` 默认使用`Espree`作为其解析器，你可以在配置文件中指定一个不同的解析器。

### globals

配置可以使用的额外的全局变量

```json
{
  "globals": {
    "var1": "readonly",
    "var2": "writable"
  }
}
```

`eslint`支持注释形式的配置，在代码中使用下面的注释也可以完成配置

```javascript
/* global var1, var2 */
/* global var3:writable, var4:writable */
```

### extends

该配置继承自哪里

它的值可以是字符串或者数组

比如：

```json
{
  "extends": "eslint:recommended"
}
```

表示，该配置缺失的位置，使用`eslint`推荐的规则

### ignoreFiles

排除掉某些不需要验证的文件

`.eslintignore`   要放在根目录

```
dist/**/*.js
node_modules// 自动忽略
```

### rules

`eslint`规则集

每条规则影响某个方面的代码风格

每条规则都有下面几个取值：

- off 或 0 或 false: 关闭该规则的检查
- warn 或 1 或 true：警告，不会导致程序退出
- error 或 2：错误，当被触发的时候，程序会退出

除了在配置文件中使用规则外，还可以在注释中使用：

```javascript
/* eslint eqeqeq: "off", curly: "error" */
```

> [https://eslint.bootcss.com/docs/rules/](https://eslint.bootcss.com/docs/rules/)
> 带有🔧的可以自动修复：npx eslint --fix src/index.js

> ESLint官网：[https://eslint.org/](https://eslint.org/)
>  
> ESLint民间中文网：[https://eslint.bootcss.com/](https://eslint.bootcss.com/)


### ESLint的由来

JavaScript是一个过于灵活的语言，因此在企业开发中，往往会遇到下面两个问题：

-  如何让所有员工书写高质量的代码？
比如使用`===`替代`==` 
-  如何让所有员工书写的代码风格保持统一？
比如字符串统一使用单引号 

上面两个问题，一个代表着代码的质量，一个代表着代码的风格。

如果纯依靠人工进行检查，不仅费时费力，而且还容易出错。

ESLint由此诞生，它是一个工具，**预先配置好各种规则**，通过这些规则来自动化的验证代码，甚至自动修复

![](../public/front-end-engineering/2023-01-06-16-49-52.png)


### 如何验证

```shell
# 验证单个文件
npx eslint 文件名
# 验证全部文件
npx eslint src/**
```

### 配置规则

eslint会自动寻找根目录中的配置文件，它支持三种配置文件：

- `.eslintrc` JSON格式
- `.eslintrc.js` JS格式
- `.eslintrc.yml` YAML格式

这里以`.eslintrc.js`为例：

```javascript
// ESLint 配置
module.exports = {
  // 配置规则
  rules: {
    规则名1: 级别,
    规则名2: 级别,
    ...
  },
};
```

每条规则由名称和级别组成

**规则名称决定了要检查什么**

**规则级别决定了检查没通过时的处理方式**

所有的规则名称看这里：

- 官方：[https://eslint.org/docs/rules/](https://eslint.org/docs/rules/)
- 中文：[https://eslint.bootcss.com/docs/rules/](https://eslint.bootcss.com/docs/rules/)

所有级别如下：

- 0 或 'off'：关闭规则
- 1 或 'warn'：验证不通过提出警告
- 2 或 'error'：验证不通过报错，退出程序

### 在VSCode中及时发现问题

每次都要输入命令发现问题非常麻烦

可以安装VSCode插件**ESLint**，只要项目的node_modules中有eslint，它就会按照项目根目录下的规则自动检测

### 使用继承

ESLint的规则非常庞大，全部自定义过于麻烦

一般我们继承其他企业开源的方案来简化配置

这方面做的比较好的是一家叫Airbnb的公司，他们在开发前端项目的时候自定义了一套开源规则，受到全世界的认可

我们只需要安装它即可

```shell
# 为了避免版本问题，不要直接安装eslint，直接安装下面的包，会自动安装相应版本的eslint
npm i -D eslint-config-airbnb
```

然后稍作配置

```shell
module.exports = {
	extends: 'airbnb' # 配置继承自 airbnb
}
```



## 企业开发的实际情况

![](../public/front-end-engineering/2023-01-06-16-50-09.png)

我们要做什么？

- 安装好VSCode的ESLint插件
- 学会查看ESLint错误提示