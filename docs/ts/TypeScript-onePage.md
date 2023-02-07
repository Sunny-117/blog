# TypeScript onePage

## 为什么学习 TS

- 获得更好的开发体验
- 解决 JS 中难以解决的问题

```javascript
function getUserName() {
  if (Math.random() < 0.5) {
    return "袁进";
  }
  return 404;
}
let myname = getUserName(); //名字可能错了，类型也可能错误
myname = myname
  .split(" ")
  .filter((it) => it) //过滤空的
  .map((it) => it[0].toUpperCase() + it.substr(1))
  .join(" ");
```

## JS 的问题

- 使用了不存在的变量，函数或成员
- 把一个不确定的类型当做一个确定的类型处理
- 在使用 undefined null 的成员

### JS 原罪

- JS 语言本身特性决定了改语言无法适应大型复杂项目
- 弱类型：某个变量，可以随时更换类型
- 解释性：错误的发生时间，是在运行时

前端开发中，大部分时间都在排错

## TypeScript

> TS 是 JS 的超集，是一个可选的，静态的类型系统

类型系统：对代码中所有的标识符（变量，函数，参数，返回值）进行类型检查

静态的：无论浏览器环境，还是 node，无法直接识别 TS 代码

> babel:es6--->es5
> tsc:ts---->es
> tsc:ts 编译器

静态：类型检查发生的时间，在编译的时候，而非运行时

TS 不参与任何运行时候的类型检查，运行的是 JS 代码

## TS 常识

- 2012 年微软发布
- Anders Hejlsberg 负责开发 TS 项目
- 开源 拥抱 ES 标准
- 官网：[https://www.typescriptlang.org/](https://www.typescriptlang.org/)
- 中文：[https://www.tslang.cn/](https://www.tslang.cn/)

### 额外的惊喜

有了类型检查，增强了面向对象的开发

JS 中， 也有类和对象，JS 支持面向对象开发。没有类型检查，很多面向对象的场景实现起来有诸多问题

使用 TS 后，可以编写出完善的面向对象代码。

## 在 node 中搭建 TS 开发环境

默认情况 TS 会做出假设：

- 假设当前执行环境是 DOM
- 如果使用代码中没有使用模块化语句，便认为改代码全局执行
- 编译的目标代码是 ES3

有两种方式更改以上假设：

- 使用 tsc 命令时加上选项参数
- 使用 TS 配置文件，更改编译选项

## TS 配置文件

1. tsconfig.json
2. tsc --init 生成配置文件

使用配置文件后，使用 tsc 进行编译时，不能跟上文件名，如果跟上的话，会忽略配置文件

直接 tsc 即可编译

```javascript
{
  "compilerOptions": {//编译选项
    "target":"es2016",//配置编译目标代码的版本标准
    "module":"commonjs",//配置编译目标使用的模块化标准
    "lib":["es2016"],//这里没有node环境可以配置，但是去掉了浏览器环境，
    // 也不知道这是node环境，所以导致console也没有了，这里必须要安装第三大库
    "outDir":"./dist/"//dist里面放编译结果
  },
  "include":["./src"]//要编译的文件夹。默认整个工程
}
```

第三方库：@types/node

@types 是一个 ts 官方的类型库 其中包含了很多对 JS 代码的类型描述。（第三方库 axios,lodash,mock 等是 JS 写的，没有类型检查，我需要类型检查，就去 types 里面找有没有对应的类型库）

> jQuery:js 写的，没有类型检查
> 安装@types/jquery,为 jquery 库添加类型定义

cnpm i -D @types/node 开发依赖，运行时候不需要，所以-D

```json
{
  "compilerOptions": {
    //...
  },
  "includes": ["./src"], //标识要编译的文件夹，默认所有
  "files": ["./src/index.ts"] // 编译文件夹里面的某个文件
}
```

> 编译和运行流程：

得先 tsc 编译 ts
在 node index.js 运行 js
嫌麻烦，所以衍生出用第三方库简化流程

## 第三方库简化编译运行流程

ts-node:编译完没有 dist 目录，没有 js 文件，直接运行 js

cnpm i -g ts-node 安装后，运行用 ts-node src/index.ts，编译完直接执行，没有 dist 文件

监控代码变化，变化后再次编译运行

nodemon: 用于检测文件变化

cnpm i -g nodemon

执行命令：nodemon --exec ts-node .\src\index.ts

可以把这个命令弄到 package.json 里面

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node ./src/index.ts"
  }
}
```

### 两个细节

- nodemon 检测的范围太广，我只想让他检测 ts

```javascript
 "dev":"nodemon -e ts --exec ts-node ./src/index.ts"//表示检测文件的拓展名ts
```

- src 文件夹之外的 ts 文件

```javascript
"dev":"nodemon --watch src -e ts --exec ts-node ./src/index.ts"//只监控文件夹src的
```

最终可以使用 tsc 完成最后的打包

## 基本类型约束

> TS 是一个可选的静态的类型系统

## 如何进行类型约束

仅需要在 变量、函数的参数、函数的返回值位置加上`:类型`

```javascript
function sum(a: number, b: number): number {
  return a + b;
}
console.log(sum(3, 4));
```

ts 在很多场景中可以完成类型推导

any: 表示任意类型，对该类型，ts 不进行类型检查

> 小技巧，如何区分数字字符串和数字，关键看怎么读？
> 如果按照数字的方式朗读，则为数字；否则，为字符串。

## 源代码和编译结果的差异

编译结果中没有类型约束信息

## 基本类型

- number：数字
- string：字符串
- boolean：布尔
- 数组
- object: 对象
- null 和 undefined

boolean

```javascript
function isOdd(n: number): boolean {
  return n % 2 === 0;
}
console.log(isOdd(3));
```

数组

```javascript
let num: number[]; //num必须是数组，数组里每一项都是number
num = [1, 2];
// 或语法糖
let num: Array<number> = [3, 4, 5];
```

object: 对象

```javascript
let u: object;
u = {
  name: "abc",
  age: 19,
  // 不能约束对象里面的东西
};
```

应用场景

```javascript
// 传入一个对象，打印对象所有属性值
function printValues(obj: object) {
  const vals = Object.values(obj); //返回的是一个any类型的数组(不知道数组每一项是什么的数组)
  vals.forEach((v) => {
    console.log(v);
  });
}
printValues({
  name: "abc",
  age: 19,
});
```

null 和 undefined 是所有其他类型的子类型，它们可以赋值给其他类型

```javascript
let m: string = null; //隐患产生了
let n: string = undefined; //隐患产生了
n.toLocaleLowerCase(); //报错
```

通过在 tsconfig.json 里面添加`strictNullChecks:true`，可以获得更严格的空类型检查，null 和 undefined 只能赋值给自身。

## 其他常用类型

- 联合类型：多种类型任选其一

配合类型保护进行判断

```typescript
let name: string | undefined; // 联合类型
// name.的时候没有提示了
if (typeof name === "string") {
  // name.  确定为string出现提示了
}
//即类型保护
```

类型保护：当对某个变量进行类型判断之后，在判断的语句块中便可以确定它的确切类型，typeof 可以触发基本类型保护。

- void 类型：通常用于约束函数的返回值，表示该函数没有任何返回

- never 类型：通常用于约束函数的返回值，表示该函数永远不可能结束

```js
function test(): never {
  throw new Error("123");
  console.log("此处代码无法访问");
}
```

```js
function test(): never {
  while (true) {}
}
```

- 字面量类型：使用一个值进行约束

字符串
数组
对象

- 元祖类型（Tuple）: 一个固定长度的数组，并且数组中每一项的类型确定

- any 类型: any 类型可以绕过类型检查，因此，any 类型的数据可以赋值给任意类型

## 类型别名

对已知的一些类型定义名称

```
type 类型名 = ...
```

```typescript
type Gender = "男" | "女";
type User = {
  name: string;
  age: number;
  gender: Gender;
};
let u: User;

u = {
  name: "ads",
  gender: "男",
  age: 34,
};

function getUsers(g: Gender): User[] {
  return [];
}
getUsers("女");
```

## 函数的相关约束

函数重载：在函数实现之前，对函数调用的多种情况进行声明

```typescript
function combine(a: number, b: number): number;
function combine(a: string, b: string): string;
function combine(a: number | string, b: number | string): number | string {
  //两个数字，相乘返回；
  //两个字符串，拼接返回
  if (typeof a === "number" && typeof b === "number") {
    return a * b;
  } else if (typeof a === "string" && typeof b === "string") {
    return a + b;
  }
  throw new Error("a和b必须是相同类型");
}
const result1 = combine(1, 2);
const result2 = combine("1", "2");
```

可选参数：可以在某些参数名后加上问号，表示该参数可以不用传递。可选参数必须在参数列表的末尾。

默认参数(一旦传递了默认参数，就默认可选)

## 扩展类型-枚举

> 扩展类型：类型别名、枚举、接口、类

枚举通常用于约束某个变量的取值范围。

字面量和联合类型配合使用，也可以达到同样的目标。

## 字面量类型的问题

- 在类型约束位置，会产生重复代码。可以使用类型别名解决该问题。

```javascript
type Gender = "男" | "女";
let gender: Gender;
gender = "男";
function searchGender(g: Gender) {}
```

- 逻辑含义和真实的值产生了混淆，会导致当修改真实值的时候，产生大量的修改。

```javascript
type Gender = "帅哥" | "美女"; //把男女改为帅哥美女
```

- 字面量类型不会进入到编译结果。

## 枚举

如何定义一个枚举：

```
enum 枚举名{
    枚举字段1 = 值1,
    枚举字段2 = 值2,
    ...
}
```

逻辑名称和真实名称区分开来

```javascript
enum Gender{
    male = "男",
    female = "女"
}
let gender =  Gender.male;
console.log(gender)
```

枚举会出现在编译结果中，编译结果中表现为对象。

```typescript
enum Gender {
  male = "男",
  female = "女",
}
let gender = Gender.male;

function printGenders() {
  const vals = Object.values(Gender);
  vals.forEach((v) => console.log(v));
}
printGenders();
```

枚举的规则：

- 枚举的字段值可以是字符串或数字
- 数字枚举的值会自动自增

```typescript
enum Level {
  level1 = 1, //不赋值就是0，后面依次递增
  level2,
  level3,
}
let l: Level = Level.level1;
l = Level.level2;
console.log(l); //2
```

- 被数字枚举约束的变量，可以直接赋值为数字
- 数字枚举的编译结果 和 字符串枚举有差异

![](../public/ts/2023-02-07-11-12-59.png)

最佳实践：

- 尽量不要在一个枚举中既出现字符串字段，又出现数字字段
- 使用枚举时，尽量使用枚举字段的名称，而不使用真实的值（逻辑含义与真实区分开）

### 扩展：位枚举（枚举的位运算）

针对的数字枚举

位运算：两个数字换算成 2 进制后进行的计算

```typescript
enum Permission {
  // 通过2进制位上的标识确定权限
  Read = 1, //2^0   0001
  Write = 2, //2^1  0010
  Create = 4, //2^2 0100
  Delete = 8, //2^3 1000
}
//3 == 0011 可读，可写
// 1. 如何组合权限:    |:或运算
// let p1 = Permission.Read | Permission.Write;
let p2: Permission = Permission.Read | Permission.Write;

// 2. 如何判断是否拥有某个权限

function hasPermission(target: Permission, per: Permission) {
  //target里面包不包含per
  return (target & per) === per; //且运算
}
// 判断变量p2是否拥有可读权限
hasPermission(p2, Permission.Read);

// 3. 如何删除某个权限

p2 = p2 ^ Permission.Write; //异或（两个位置相同取0不同取1）
```

## 模块化

相关配置：

| 配置名称            | 含义                             |
| ------------------- | -------------------------------- |
| module              | 设置编译结果中使用的模块化标准   |
| moduleResolution    | 设置解析模块的模式               |
| noImplicitUseStrict | 编译结果中不包含"use strict"     |
| removeComments      | 编译结果移除注释                 |
| noEmitOnError       | 错误时不生成编译结果             |
| esModuleInterop     | 启用 es 模块化交互非 es 模块导出 |

> 前端领域中的模块化标准：ES6、commonjs、amd、umd、system、esnext

> TS 中如何书写模块化语句
> 编译结果??

## TS 中如何书写模块化语句

TS 中，导入和导出模块，统一使用 ES6 的模块化标准

如果不写导入，可以快速修复

必须是声明导出方式，如果使用默认导出，就没有智能导入了

```typescript
export default {
  name: "kevin",
  sum(a: number, b: number) {
    return a + b;
  },
};
```

导入的时候不要添加.ts，因为编译后是 js 了，但是编译结果没有 js 文件

## 编译结果中的模块化

可配置：在配置文件中设置

```json
 "module":"commonjs",
```

如果不希望注释也在编译的结果中：在配置文件里面写上

```json
{
  "removeComments": true
}
```

TS 中的模块化在编译结果中：

- 如果编译结果的模块化标准是 ES6： 没有区别
- 如果编译结果的模块化标准是 commonjs：导出的声明会变成 exports 的属性，默认的导出会变成 exports 的 default 属性；导入：把整个对象拿到，依次取属性

## 解决默认导入的错误

方案 1
![](../public/ts/2023-02-07-11-14-40.png)

方案 2
![](../public/ts/2023-02-07-11-14-45.png)
方案 3

`"esModuleInterop": true`

![](../public/ts/2023-02-07-11-14-51.png)

## 如何在 TS 中书写 commonjs 模块化代码（一般不会遇到此问题）

如果使用之前的 commonjs 的话，就失去类型检查功能了
可以这样导入（条件：必须经过 esModuleInterop 的配置）：import myModule from './myModule'，就有类型检查了

使用以下语法就可以解决：

导出：export = xxx

导入：import xxx = require("xxx")

## 模块解析

模块解析：应该从什么位置寻找模块

TS 中，有两种模块解析策略

- classic：经典（过时）
- node：node 解析策略（唯一的变化，是将 js 替换为 ts）
  - 相对路径`require("./xxx")     先找当前路径有没有，没有的话看package.json的main.ts，没有就这个文件夹下的index.ts`
  - 非相对模块`require("xxx")     当前文件夹有没有node-modules,在node-modules下有没有改模块`

为了防止出错，强行 node 解析策略：加上配置："moduleResolution":"node"

## 接口和类型兼容性

## 扩展类型-接口

接口：inteface

> 扩展类型：类型别名、枚举、接口、类

TypeScript 的接口：用于约束类、对象、函数的契约（标准）

契约（标准）的形式：

- API 文档，弱标准
- 代码约束，强标准

和类型别名一样，接口，不出现在编译结果中

1.  接口约束对象
2.  接口约束函数

对象

```typescript
interface User {
  name: string;
  age: number;
}
// 和类型别名的区别:约束类
/* type User = {
    name:string,
    age:number
} */
let u: User = {
  name: "abc",
  age: 19,
};
```

函数

```typescript
interface User {
  name: string;
  age: number;
  // 书写方式1    sayHello:() => void
  // 书写方式2    sayHello():void
  // 和类型别名一样，接口，不出现在编译结果中,所以不能写函数实现
  sayHello(): void;
}
let u: User = {
  name: "abc",
  age: 19,
  sayHello() {
    console.log("asda");
  },
};
```

类型别名约束函数

```typescript
type Condition = (n: number) => boolean;

function sum(numbers: number[], callBack: Condition) {
  let s = 0;
  numbers.forEach((n) => {
    if (callBack(n)) {
      s += n;
    }
  });
  return s;
}
const result = sum([3, 4, 5, 6, 7], (n) => n % 2 !== 0);
console.log(result);
```

接口约束函数

```typescript
interface Condition {
  (n: number): boolean;
}

// 可以这样写
/* type Condition = {//定界符
    (n:number):boolean
} */

function sum(numbers: number[], callBack: Condition) {
  let s = 0;
  numbers.forEach((n) => {
    if (callBack(n)) {
      s += n;
    }
  });
  return s;
}
const result = sum([3, 4, 5, 6, 7], (n) => n % 2 !== 0);
console.log(result);
```

**接口可以继承**

```typescript
interface A {
  T1: string;
}
interface B extends A {
  //接口B里面有A里面所有成员
  T2: number;
}
let u: B = {
  T2: 33,
  T1: "ab",
};
```

可以通过接口之间的继承，实现多种接口的组合

```typescript
interface A {
  T1: string;
}
interface B {
  T2: number;
}
interface C extends A, B {
  T3: boolean;
}
let u: C = {
  T2: 33,
  T1: "abc",
  T3: true,
};
```

使用类型别名可以实现类似的组合效果，需要通过`&`，它叫做交叉类型

```typescript
type A = {
  T1: string;
};
type B = {
  T2: number;
};
type C = {
  T3: boolean;
} & A &
  B;

let u: C = {
  T2: 123,
  T1: "abc",
  T3: true,
};
```

它们的区别：

- 子接口不能覆盖父接口的成员
- 交叉类型会把相同成员的类型进行交叉 不是覆盖 无法正常赋值了

**readonly**

只读修饰符，修饰的目标是只读

只读修饰符不在编译结果中

![](../public/ts/2023-02-07-11-15-52.png)

![](../public/ts/2023-02-07-11-16-05.png)

![](../public/ts/2023-02-07-11-16-13.png)

![](../public/ts/2023-02-07-11-16-20.png)

## 类型兼容性

B->A，如果能完成赋值，则 B 和 A 类型兼容

鸭子辨型法（子结构辨型法）：目标类型需要某一些特征，赋值的类型只要能满足该特征即可

- 基本类型：完全匹配
- 对象类型：鸭子辨型法

类型断言

```typescript
interface Duck {
  sound: "嘎嘎嘎";
  swin(): void;
}
let person = {
  name: "伪装成鸭子的人",
  age: 11,
  //sound: "嘎嘎嘎",这里需要类型断言，因为这里的sound:嘎嘎嘎是string,但是要求sound是嘎嘎嘎字面量
  sound: "嘎嘎嘎" as "嘎嘎嘎",
  swin() {
    console.log(this.name + "正在游泳，并发出了" + this.sound + "的声音");
  },
};
let duck: Duck = person; //这个结构满足鸭子的特征，所以可以赋值了
```

解决的问题：假设有个函数，用于得到服务器某个接口的返回结果，是一个用户对象。对象有很多属性，但是实际需要的属性很少，就可以用鸭子辨型法。

当直接使用对象字面量赋值的时候，会进行更加严格的判断

![](../public/ts/2023-02-07-11-17-25.png)

- 函数类型

一切无比自然

**参数**：传递给目标函数的参数可以少，但不可以多

```typescript
interface Condition {
  (n: number, i: number): boolean;
}

function sum(numbers: number[], callBack: Condition) {
  let s = 0;
  for (let i = 0; i < numbers.length; i++) {
    const n = numbers[i];
    if (callBack(n, i)) {
      s += n;
    }
  }
  return s;
}
// const result = sum([3, 4, 5, 6, 7], n => n % 2 !== 0);
// const result = sum([3, 4, 5, 6, 7], (n, i) => i % 2 !== 0);
// console.log(result);
```

**返回值**：要求返回必须返回；不要求返回，你随意；

> 忠告：不要死记硬背，理解 TS，舒服安全逻辑地写代码

## TS 中的类

> 面向对象思想

基础部分，学习类的时候，仅讨论新增的语法部分。

**属性**

```js
class User {
  constructor(name: string) {
    this.name = name; // 报错
  }
  // TS不允许动态添加属性
  // const obj={}
  // obj.name ='aaa' 报错
}
```

使用属性列表来描述类中的属性

**属性的初始化检查配置**

`strictPropertyInitialization:true`

![](../public/ts/2023-02-07-11-18-39.png)

属性的初始化位置：

1. 构造函数中
2. 属性默认值

默认：性别男

> 方法 1：构造函数中

```typescript
class User {
  name: string;
  age: number;
  gender: "男" | "女";
  constructor(name: string, age: number, gender: "男" | "女" = "男") {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }
}
const u = new User("abc", 19);
```

> 方法 2：属性默认值

```typescript
class User {
  name: string;
  age: number;
  gender: "男" | "女" = "男";
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
const u = new User("abc", 1);
u.gender = "女"; //可改
```

**属性可以修饰为可选的**

```js
pid: string;
// ...
pid: string | undefined;
```

**属性可以修饰为只读的**

```typescript
class User {
  readonly id: number;
  name: string;
  age: number;
  gender: "男" | "女" = "男";
  pid?: string;
  constructor(name: string, age: number) {
    this.id = Math.random();
    this.name = name;
    this.age = age;
  }
}
```

不希望外部使用

```typescript
class User {
  name: string;
  age: number;
  gender: "男" | "女" = "男";
  publishNumber: number = 3; //每天一个可以发布多少文章
  curNumber: number = 0; //当前可以发布的文章数
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
const u = new User("abc", 1);
u.publishNumber; //不希望外部使用
u.curNumber; //不希望外部使用
// JS用Symble
```

**使用访问修饰符**

访问修饰符可以控制类中的某个成员的访问权限

- public：默认的访问修饰符，公开的，所有的代码均可访问
- private：私有的，只有在类中可以访问
- protected：见下文

**属性简写**

如果某个属性，通过构造函数的参数传递，并且不做任何处理的赋值给该属性。可以进行简写。
加上的是修饰符（public private ...）

![](../public/ts/2023-02-07-11-20-12.png)

**访问器**

作用：用于控制属性的读取和赋值

方式 1：类似 java es6
方式 2：类似 c#

```typescript
class User {
  constructor(public name: string, public _age: number) {}
  set age(value: number) {
    if (value < 0) {
      this._age = 0;
    } else if (value > 200) {
      this._age = 200;
    } else {
      this._age = value;
    }
  }
  get age() {
    return Math.floor(this._age);
  }
}
```

## 泛型

有时，书写某个函数时，会丢失一些类型信息（多个位置的类型应该保持一致或有关联的信息）

```typescript
function take(arr: any[], n: number): any[] {
  if (n > arr.length) {
    return arr;
  }
  const newArr: any[] = [];
  for (let i = 0; i < n; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
}
const newArr = take(["2", 3, 4, 5, 1], 3);
console.log(newArr);
// any应该相同
```

泛型：是指附属于函数、类、接口、类型别名之上的类型

泛型相当于是一个类型变量，在定义时，无法预先知道具体的类型，可以用该变量来代替，只有到调用时，才能确定它的类型

很多时候，TS 会智能的根据传递的参数，推导出泛型的具体类型

如果无法完成推导，并且又没有传递具体的类型，默认为空对象

泛型可以设置默认值（不能完成推导，又没有传递就使用默认值）

![](../public/ts/2023-02-07-11-20-27.png)

## 在函数中使用泛型

在函数名之后写上`<泛型名称>`

```typescript
function take<T>(arr: T[], n: number): T[] {
  //T依附于函数
  if (n > arr.length) {
    return arr;
  }
  const newArr: T[] = [];
  for (let i = 0; i < n; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
}
take<number>([1, 2], 2); //调用的时候才知道T的类型
```

如果不写泛型名称，会自动推导

![](../public/ts/2023-02-07-11-20-35.png)

## 如何在类型别名、接口、类中使用泛型

直接在名称后写上`<泛型名称>`

```typescript
// 回调函数：判断数组中的某一项是否满足条件
// type callback = (n: number, i: number) => boolean;
type callback<T> = (n: T, i: number) => boolean;
// 封装一个filter
function filter<T>(arr: T[], callback: callback<T>): T[] {
  const newArr: T[] = [];
  arr.forEach((n, i) => {
    if (callback(n, i)) {
      newArr.push(n);
    }
  });
  return newArr;
}

const arr = [3, 4, 5, 2, 1, 6];
console.log(filter(arr, (n) => n % 2 !== 0));

// 接口
interface callback<T> {
  (n: T, i: number): boolean;
}
```

类

```typescript
export class ArrayHelper<T> {
  constructor(private arr: T[]) {}
  take(n: number): T[] {
    if (n > this.arr.length) {
      return this.arr;
    }
    const newArr: T[] = [];
    for (let i = 0; i < n; i++) {
      newArr.push(this.arr[i]);
    }
    return newArr;
  }
  shuffle() {
    for (let i = 0; i < this.arr.length; i++) {
      const targetIndex = this.getRandom(0, this.arr.length);
      const temp = this.arr[i];
      this.arr[i] = this.arr[targetIndex];
      this.arr[targetIndex] = temp;
    }
  }
  private getRandom(min: number, max: number) {
    const dec = max - min;
    return Math.floor(Math.random() * dec + max);
  }
}
const helper = new ArrayHelper([1, 2]); //自动类型推导

helper.take(); //结果是number类型
```

## 泛型约束

泛型约束，用于现实泛型的取值

```typescript
interface hasNameProperty {
  //nameToUpperCase函数只能传递满足此接口的类型
  name: string;
}
/**
 * 将某个对象name的属性的每个单词的首字母大写，并将该对象返回
 */
function nameToUpperCase<T extends hasNameProperty>(obj: T): T {
  obj.name = obj.name
    .split(" ")
    .map((s) => s[0].toUpperCase() + s.substr(1))
    .join(" ");
  return obj;
}
const o = {
  name: "kevin yuan",
  age: 19,
};
const newO = nameToUpperCase(o);
console.log(newO.name); //Kevin Yuan
```

## 多泛型

> 写函数或类，依赖多种类型

```typescript
// 将两个数组混合[1,2] ['a','b'] === [1,'a',2,'b']
function mixinArray<T, K>(arr1: T[], arr2: K[]): (T | K)[] {
  if (arr1.length !== arr2.length) {
    throw new Error("长度不等");
  }
  let result: (T | K)[] = [];
  for (let i = 0; i < arr2.length; i++) {
    result.push(arr1[i]);
    result.push(arr2[i]);
  }
  return result;
}

const result = mixinArray([1, 2, 3], ["a", "b", "c"]);
result.forEach((it) => console.log(it));
```

## 深入理解类和接口

## 面向对象概述

### 为什么要讲面向对象

1. TS 为前端面向对象开发带来了契机

JS 语言没有类型检查，如果使用面向对象的方式开发，会产生大量的接口，而大量的接口会导致调用复杂度剧增，这种复杂度必须通过严格的类型检查来避免错误，尽管可以使用注释或文档或记忆力，但是它们没有强约束力。

TS 带来了完整的类型系统，因此开发复杂程序时，无论接口数量有多少，都可以获得完整的类型检查，并且这种检查是据有强约束力的。

2. 面向对象中有许多非常成熟的模式，能处理复杂问题

在过去的很多年中，在大型应用或复杂领域，面向对象已经积累了非常多的经验。

> 基于 ts 的 nextjs 相当于前端的 java spring

### 什么是面向对象

面向对象：Oriented（基于） Object（事物），简称 OO。

是一种编程思想，它提出一切以类对切入点思考问题。

其他编程思想：面向过程（模块化）、函数式编程

> 学开发最重要最难的是什么？思维

面向过程：以功能流程为思考切入点，不太适合大型应用

函数式编程：以数学运算为思考切入点

面向对象：以划分类为思考切入点。类是最小的功能单元

类：可以产生对象的模板。

### 如何学习

1. TS 中的 OOP （面向对象编程，Oriented Object Programing）
2. 小游戏练习

理解 -> 想法 -> 实践 -> 理解 -> ....

## 类的继承

### 继承的作用

继承可以描述类与类之间的关系

> 坦克、玩家坦克、敌方坦克
> 玩家坦克是坦克，敌方坦克是坦克

如果 A 和 B 都是类，并且可以描述为 A 是 B，则 A 和 B 形成继承关系：

- B 是父类，A 是子类
- B 派生 A，A 继承自 B
- B 是 A 的基类，A 是 B 的派生类

如果 A 继承自 B，则 A 中自动拥有 B 中的所有成员

![](../public/ts/2023-02-07-11-21-01.png)

### 成员的重写

重写(override)：**子类中覆盖父类的成员**

子类成员**不能改变**父类成员的**类型**

无论是属性还是方法，子类都可以对父类的相应成员进行重写，但是重写时，需要保证类型的匹配。

注意 this 关键字：在继承关系中，this 的指向是动态——调用方法时，根据具体的调用者确定 this 指向

super 关键字：在子类的方法中，可以使用**super 关键字读取父类成员**

### 类型匹配

鸭子辨型法
子类的对象，始终可以赋值给父类
let p:Tank = new EnemyTank()

面向对象中，这种现象，叫做里氏替换原则

如果需要判断一个数据的具体子类类型，可以使用 instanceof

### protected 修饰符

readonly：只读修饰符

访问权限修饰符：private public protected

protected: 受保护的成员，只能在**自身和子类**中访问

### 单根性和传递性

单根性：每个类最多只能拥有一个父类

传递性：如果 A 是 B 的父类，并且 B 是 C 的父类，则，可以认为 A 也是 C 的父类

## 抽象类

### 为什么需要抽象类

![](../public/ts/2023-02-07-11-21-11.png)

有时，某个类只表示一个抽象概念，主要用于提取子类共有的成员，而不能直接创建它的对象。该类可以作为抽象类。

给类前面加上`abstract`，表示该类是一个抽象类，不可以创建一个抽象类的对象。

### 抽象成员

父类中，可能知道有些成员是必须存在的，但是不知道该成员的值或实现是什么，因此，需要有一种强约束，让继承该类的子类，必须要实现该成员。

**抽象类中**，可以有抽象成员，这些抽象成员必须在子类中实现**。抽象成员必须出现在抽象类中。**

```typescript
abstract class Chess {
  x: number = 0;
  y: number = 0;
  abstract readonly name: string;
}
class Horse extends Chess {
  // 方式1：快速修复
  // readonly name:string = '马'
  // 方式2
  // readonly name: string
  // constructor() {
  //     super()
  //     this.name = '跑'
  // }
  // 方式3：访问器
  get name() {
    return "兵";
  } //没写set，本身就是只读的
}
```

```typescript
abstract class Chess {
  x: number = 0;
  y: number = 0;
  abstract readonly name: string;
  abstract move(targetX: number, targetY: number): boolean;
}
class Horse extends Chess {
  move(targetX: number, targetY: number): boolean {
    this.x = targetX;
    this.y = targetY;
    console.log("移动成功");
    return true;
  }
  get name() {
    return "兵";
  }
}
```

### 设计模式 - 模板模式

设计模式：面对一些常见的功能场景，有一些固定的、经过多年实践的成熟方法，这些方法称之为设计模式。

模板模式：有些方法，所有的子类实现的流程完全一致，只是流程中的某个步骤的具体实现不一致，可以将该方法提取到父类，在父类中完成整个流程的实现，遇到实现不一致的方法时，将该方法做成抽象方法。

```typescript
abstract class Chess {
  x: number = 0;
  y: number = 0;

  abstract readonly name: string;

  move(targetX: number, targetY: number): boolean {
    console.log("1. 边界判断");
    console.log("2. 目标位置是否有己方棋子");
    //3. 规则判断
    if (this.rule(targetX, targetY)) {
      this.x = targetX;
      this.y = targetY;
      console.log(`${this.name}移动成功`);
      return true;
    }
    return false;
  }

  protected abstract rule(targetX: number, targetY: number): boolean;
}

class Horse extends Chess {
  protected rule(targetX: number, targetY: number): boolean {
    return true;
  }

  readonly name: string = "马";
}

class Pao extends Chess {
  protected rule(targetX: number, targetY: number): boolean {
    return false;
  }

  readonly name: string;

  constructor() {
    super();
    this.name = "炮";
  }
}

class Soldier extends Chess {
  protected rule(targetX: number, targetY: number): boolean {
    return true;
  }

  get name() {
    return "兵";
  }
}
class King extends Chess {
  name: string = "将";

  protected rule(targetX: number, targetY: number): boolean {
    throw new Error("Method not implemented.");
  }
}
```

## 静态成员

### 什么是静态成员

静态成员是指，**附着在类上的成员（属于某个构造函数的成员）**

使用 static 修饰的成员，是静态成员

实例成员：对象成员，属于某个类的对象

静态成员：非实例成员，属于某个类

```typescript
class User {
  constructor(
    public loginId: string,
    public loginPwd: string,
    public name: string,
    public age: number
  ) {}
  static login(loginId: string, loginPwd: string): User | undefined {
    return undefined;
  }
}
```

### 静态方法中的 this

实例方法中的 this 指向的是**当前对象**

而静态方法中的 this 指向的是**当前类**

```typescript
class User {
  static users: User[] = [];

  constructor(
    public loginId: string,
    public loginPwd: string,
    public name: string,
    public age: number
  ) {
    //需要将新建的用户加入到数组中
    User.users.push(this);
  }

  sayHello() {
    console.log(
      `大家好，我叫${this.name}，今年${this.age}岁了，我的账号是${this.loginId}`
    );
  }

  static login(loginId: string, loginPwd: string): User | undefined {
    return this.users.find(
      (u) => u.loginId === loginId && u.loginPwd === loginPwd
    );
  }
}

new User("u1", "123", "王富贵", 11);
new User("u2", "123", "坤坤", 18);
new User("u3", "123", "旺财", 22);

const result = User.login("u3", "123");
if (result) {
  result.sayHello();
} else {
  console.log("登录失败，账号或密码不正确");
}
```

### 设计模式 - 单例模式

单例模式：某些类的对象，在系统中最多只能有一个，为了避免开发者造成随意创建多个类对象的错误，可以使用单例模式进行强约束。

```typescript
class Board {
  width: number = 500;
  height: number = 700;

  init() {
    console.log("初始化棋盘");
  }

  private constructor() {} //构造函数私有，只能在内部创建对象

  private static _board;

  static createBoard(): Board {
    if (this._board) {
      return this._board;
    }
    this._board = new Board();
    return this._board;
  }
}

const b1 = Board.createBoard(); //静态方法创建
const b2 = Board.createBoard();
console.log(b1 === b2);
```

## 再谈接口

接口用于约束类、对象、函数，是一个类型契约。
有一个马戏团，马戏团中有很多动物，包括：狮子、老虎、猴子、狗，这些动物都具有共同的特征：名字、年龄、种类名称，还包含一个共同的方法：打招呼，它们各自有各自的技能，技能是可以通过训练改变的。狮子和老虎能进行火圈表演，猴子能进行平衡表演，狗能进行智慧表演
马戏团中有以下常见的技能：

- 火圈表演：单火圈、双火圈
- 平衡表演：独木桥、走钢丝
- 智慧表演：算术题、跳舞

不适用接口实现时：

- **对能力（成员函数）没有强约束力**
- **容易将类型和能力耦合在一起**

**系统中缺少对能力的定义 —— 接口**
面向对象领域中的接口的语义：**表达了某个类是否拥有某种能力**
某个类具有某种能力，其实，就是实现了某种接口
**类型保护函数**：通过调用该函数，会触发 TS 的类型保护，该函数必须返回 boolean
接口和类型别名的最大区别：接口可以被类实现，而类型别名不可以

接口可以继承类，表示该类的所有成员都在接口中。

## 索引器

`对象[值]`，使用成员表达式

**在 TS 中，默认情况下，不对索引器（成员表达式）做严格的类型检查**

使用配置`noImplicitAny`开启对隐式 any 的检查。

隐式 any：TS 根据实际情况推导出的 any 类型

```typescript
class User {
  [prop: string]: any; //属性名是字符串，类型是any就行
  constructor(public name: string, public age: number) {}
  sayHello() {}
}
const u = new User("aa", 22);
u.pid = "samoia";
```

在索引器中，键的类型可以是字符串，也可以是数字

```typescript
class MyArray {
  [index: number]: string;
  0 = "asdas";
  1 = "sdas";
  2 = "asds";
}
const my = new MyArray();
// my[0]
// my[5] = 'a'
```

在类中，索引器书写的位置应该是所有成员之前

TS 中索引器的作用

- **在严格的检查下，可以实现为类动态增加成员**
- **可以实现动态的操作类成员**

在 JS 中，所有的成员名本质上，都是字符串，如果使用数字作为成员名，**会自动转换为字符串。**

在 TS 中，如果某个类中使用了两种类型的索引器，**要求两种索引器的值类型必须匹配**

```typescript
class A {
  [prop: number]: string;
  [prop: string]: string;
}
const a = new A();
a[0] = "as";
a["scads"] = "asa";
```

## this 指向约束

[https://yehudakatz.com/2011/08/10/understanding-javascript-function-invocation-and-this/](https://yehudakatz.com/2011/08/10/understanding-javascript-function-invocation-and-this/)

### 在 JS 中 this 指向的几种情况

明确：大部分时候，this 的指向取决于函数的调用方式

- 如果直接调用函数（全局调用），this 指向全局对象或 undefined (启用严格模式)
- 如果使用`对象.方法`调用，this 指向对象本身
- 如果是 dom 事件的处理函数，this 指向事件处理对象

特殊情况：

- 箭头函数，this 在函数声明时确定指向，指向函数位置的 this
- 使用 bind、apply、call 手动绑定 this 对象

### TS 中的 this

配置**noImplicitThis**为 true，表示不允许 this**隐式的指向 any**

在 TS 中，允许在书写函数时，手动声明该函数中 this 的指向，**将 this 作为函数的第一个参数**，该参数只用于约束 this，并不是真正的参数，也不会出现在编译结果中。

```typescript
// interface IUser {
//     name: string,
//     age: number,
//     sayHello(this: IUser): void
// }

// const u: IUser = {
//     name: "ssf",
//     age: 33,
//     sayHello() {
//         console.log(this.name, this.age)
//     }
// }
// const say = u.sayHello;

class User {
  constructor(public name: string, public age: number) {}

  sayHello() {
    // 类里面的this使用了严格模式，全局调用this指向undefined
    // this指向用户对象本身
    console.log(this, this.name, this.age);
  }
}
```

## 装饰器

### 概述

> 面向对象的概念（java：注解，c#：特征），decorator
> angular 大量使用，react 中也会用到
> 目前 JS 支持装饰器，目前处于建议征集的第二阶段

###### 解决的问题

装饰器，能够带来额外的信息量，可以达到分离**关注点**的目的。

- **信息书写位置的问题**
- **重复代码的问题**

上述两个问题产生的根源：某些信息，在定义时，能够附加的信息量有限。

**装饰器的作用：为某些属性、类、参数、方法提供元数据信息(metadata)**

元数据：描述数据的数据

###### 装饰器的本质

在 JS 中，装饰器是一个函数。（**装饰器是要参与运行的**）

装饰器可以修饰：

- 类
- 成员（属性+方法）
- 参数

```typescript
class User {
  // @require
  // @range(3, 5)
  // @description('账号')
  loginId: string; //必须是3-5个字符
  loginPwd: string; //必须是6-12位字符
  age: number; //必须是数字0-100
  gender: "男" | "女";
}
class Article {
  title: string;
}
/**
 * 统一的验证函数
 * @param obj
 */
function validate(obj: object) {
  for (const key in obj) {
    const val = (obj as any)[key];
    // 缺少该属性的验证规则
  }
}
```

### 类装饰器

类装饰器的本质是一个函数，该函数接收一个参数，表示类本身（构造函数本身）

使用装饰器`**@得到一个函数**`

**在 TS 中，如何约束一个变量为类**

- **Function**
- `**new (参数)=>object**`

在 TS 中要使用装饰器，需要开启`experimentalDecorators`

装饰器函数的运行时间：**在类定义后直接运行**

类装饰器可以具有的**返回值**：

- **void：仅运行函数**
- **返回一个新的类：会将新的类替换掉装饰目标**

```typescript
function test(target: new () => object) {
  return class B {
    // 	不建议这样做
  };
}
@test
class A {}
const a = new A();
console.log(a); //B{}
```

```typescript
function test(target: new () => object) {
  return class B extends target {
    // 不建议这样做
  };
}
@test
class A {
  prop1: string; //失去了类型检查
}
const a = new A();
console.log(a); //B{}
```

```typescript
function test(target: new (...args: any[]) => object) {}
@test
class A {
  prop1: string;
  constructor(public prop2: string, public prop3: string) {} //默认不能有参数，加上剩余参数能有参数了
}
```

```typescript
function test(str: string) {
  return function (target: new (...args: any[]) => object) {};
}
@test("这是一个类") //要满足返回一个函数
class A {
  prop1: string;
}
```

多个装饰器的情况：会按照**后加入先调用**的顺序进行调用。

```typescript
type constructor = new (...args: any[]) => object;
function d1(target: constructor) {
  console.log("d1");
}
function d2(target: constructor) {
  console.log("d2");
}
@d1
@d2
//先输出d2 后 d1
class A {
  prop1: string;
}
```

面试题

```typescript
type constructor = new (...args: any[]) => object;
function d1() {
  console.log("d1");
  return function (target: constructor) {
    console.log("d1 decorator");
  };
}
function d2() {
  console.log("d2");
  return function (target: constructor) {
    console.log("d2 decorator");
  };
}
@d1() //先运行d1 d2函数，得到的d1 d2装饰器，装饰器从下到上运行
@d2()
class A {
  prop1: string;
}
```

### 成员装饰器

- 属性

属性装饰器也是一个函数，该函数需要两个参数：

1. **如果是静态属性，则为类本身；如果是实例属性，则为类的原型**；
2. 固定为一个字符串，表示属性名

**实例属性**

```typescript
type constructor = new (...args: any[]) => object;
function d(target: any, key: string) {
  // console.log(target === A.prototype, key)
  if (!target.__props) {
    target.__props = [];
  }
  target.__props.push(key);
}
class A {
  @d
  prop1: string;
  @d
  prop2: string;
}
// console.log((A.prototype as any).__props)
const a = new A();
console.log((a as any).__props);
```

**静态属性**

```typescript
function d(target: any, key: string) {
  console.log(target, key);
}
class A {
  @d
  prop1: string;
  @d
  static prop2: string;
}
```

- 方法

方法装饰器也是一个函数，该函数需要三个参数：

1. 如果是静态方法，则为类本身；如果是实例方法，则为类的原型；
2. 固定为一个字符串，表示方法名
3. 属性描述对象

```typescript
function d() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    // console.log(target, key, descriptor)
    descriptor.enumerable = true; //可以更改属性描述符
  };
}
class A {
  @d()
  method1() {}
}
```

可以有多个装饰器修饰

### 练习：类和属性的描述装饰器

### reflect-metadata 库

该库的作用：保存元数据

```typescript
import "reflect-metadata";
@Reflect.metadata("a", "一个类")
class A {
  @Reflect.metadata("prop", "一个属性")
  prop1: string;
}
const obj = new A();
console.log(Reflect.getMetadata("a", A));
console.log(Reflect.getMetadata("prop", obj, "prop1"));
```

### class-validator 和 class-transformer 库

```typescript
import "reflect-metadata";
import {
  IsNotEmpty,
  validate,
  MinLength,
  MaxLength,
  Min,
  Max,
} from "class-validator";

class RegUser {
  @IsNotEmpty({ message: "账号不可以为空" })
  @MinLength(5, { message: "账号必须至少有5个字符" })
  @MaxLength(12, { message: "账号最多12个字符" })
  loginId: string;

  loginPwd: string;

  @Min(0, { message: "年龄的最小值是0" })
  @Max(100, { message: "年龄的最大值是100" })
  age: number;
  gender: "男" | "女";
}

const post = new RegUser();
post.loginId = "22";
post.age = -1;

validate(post).then((errors) => {
  console.log(errors);
});
```

```typescript
import "reflect-metadata";
import { plainToClass, Type } from "class-transformer";
import axios from "axios";

class User {
  id: number;
  firstName: string;
  lastName: string;

  @Type(() => Number) //告诉他age是数字
  age: number;

  getName() {
    return this.firstName + " " + this.lastName;
  }

  isAdult() {
    return this.age > 36 && this.age < 60;
  }
}

axios
  .get("https://api.myjson.com/bins/1b59tw")
  .then((resp) => resp.data)
  .then((users) => {
    const us = plainToClass(User, users);
    // console.log(us.getName(), us.isAdult())
    for (const u of us) {
      console.log(typeof u.age, u.age);
    }
  });
```

### 补充

- **参数装饰器**

依赖注入、依赖倒置

要求函数有三个参数：

1. 如果方法是静态的，则为类本身；如果方法是实例方法，则为类的原型
2. 方法名称
3. 在参数列表中的索引

- **关于 TS 自动注入的元数据**

如果安装了`reflect-metadata`，并且导入了该库，并且在某个成员上添加了元数据，并且启用了`emitDecoratorMetadata`。

则 TS 在编译结果中，会将约束的类型，**作为元数据加入到相应位置**

**这样一来，TS 的类型检查（约束）将有机会在运行时进行。**

- **AOP(aspect oriented programming)**

编程方式，属于面向对象开发。

将一些在**业务中**共同出现的功能块，横向切分，已达到**分离关注点**的目的。

```typescript
class RegUser {
  loginId: string;

  loginPwd: string;
  // @规则
  age: number;
  // @规则
  pid: string;

  email: string;

  /**
   * 将用户保存到数据库
   */
  save() {
    // 验证抽离出去了
    if (validate(this)) {
      //通过后保存数据库
    }
  }
}
```

## 类型演算

> 根据已知的信息，计算出新的类型

### 三个关键字

- typeof

TS 中的 typeof，书写的位置在类型约束的位置上。

表示：获取某个数据的类型

```typescript
const a: string = "asnd";
let b: typeof a = "ad";
console.log(typeof b);
```

当 typeof 作用于类的时候，得到的类型，是该类的构造函数

```typescript
// 当想要约束参数为构造函数的时候：
class User {
  loginId: string;
  loginPwd: string;
}
// 方法1
// function createUser(cls: new () => User): User {
//     return new cls()
// }
// 方法2
function createUser(cls: typeof User): User {
  return new cls();
}
const u = createUser(User);
```

- keyof

作用于类、接口、类型别名，用于获取其他类型中的所有成员名组成的联合类型

```typescript
interface User {
  loginId: string;
  loginPwd: string;
  age: number;
}
// function printUserProperty(obj: User, prop: string) {
//     console.log(obj[prop])//报错，因为不确定prop是loginId,loginPwd,age之一
// }
function printUserProperty(obj: User, prop: "loginId" | "loginPwd" | "age") {
  console.log(obj[prop]);
}
const u: User = {
  loginId: "sada",
  loginPwd: "sss",
  age: 22,
};
printUserProperty(u, "age");

// 场景：某个类型应该是某个类型所有字段中的一个
```

应用 keyof

```typescript
interface User {
  loginId: string;
  loginPwd: string;
  age: number;
}
function printUserProperty(obj: User, prop: keyof User) {
  console.log(obj[prop]);
}
const u: User = {
  loginId: "sada",
  loginPwd: "sss",
  age: 22,
};
printUserProperty(u, "age");
```

- in

该关键字往往和 keyof 联用，限制某个索引类型的取值范围。

```typescript
interface User {
  loginId: string;
  loginPwd: string;
  age: number;
}
type Obj = {
  // [p:string]:string//太宽泛，什么属性都可以加

  [p in "loginId" | "loginPwd" | "age"]: string; //  []叫索引器
  /**
   * 等价于
   * loginId:string
   * loginPwd:string
   * age:string
   */
};
const u: Obj = {
  age: "1",
  loginId: "a",
  loginPwd: "aa",
};
// u.abc = '123'
// 只能加"loginId" | "loginPwd" | "age"中的一个
u.age = "1";
```

用 keyof 简化

```typescript
interface User {
  loginId: string;
  loginPwd: string;
  age: number;
}
// 类型演算：将User所有类型变成字符串，得到一个新类型
type Obj = {
  [p in keyof User]: string;
};
const u: Obj = {
  age: "1",
  loginId: "a",
  loginPwd: "aa",
};
u.age = "1";
```

```typescript
interface User {
  loginId: string;
  loginPwd: string;
  age: number;
}
type Obj = {
  [p in keyof User]: User[p]; //不改变User里面的的类型，直接取出来附上
};
const u: Obj = {
  age: 1,
  loginId: "a",
  loginPwd: "aa",
};
u.age = 1;
```

```typescript
type Obj = {
  readonly [p in keyof User]: User[p]; //类型不变，全部变成只读
};
```

配合泛型：强大了

```typescript
import { type } from "os";

interface User {
  loginId: string;
  loginpwd: string;
}

interface Article {
  title: string;
  publishDate: Date;
}
//将User的所有属性值类型变成字符串，得到一个新类型
type String<T> = {
  [p in keyof T]: string;
};

type Readonly<T> = {
  readonly [p in keyof T]: T[p];
};

type Partial<T> = {
  [p in keyof T]?: T[p];
};

const u: String<Article> = {
  title: "Sfsdf",
  publishDate: "sdf",
};
```

### TS 中预设的类型演算

```typescript
Partial<T>; // 将类型T中的成员变为可选

Required<T>; // 将类型T中的成员变为必填

Readonly<T>; // 将类型T中的成员变为只读

Exclude<T, U>; // 从T中剔除可以赋值给U的类型。

Extract<T, U>; // 提取T中可以赋值给U的类型。

NonNullable<T>; // 从T中剔除null和undefined。

ReturnType<T>; // 获取函数返回值类型。

InstanceType<T>; // 获取构造函数类型的实例类型。
```

用法：

```typescript
interface User {
  age: number;
  name: string;
}
let u: Partial<User>;
u = {
  age: 23,
};
```

```typescript
// let u: Exclude<"a" | "b" | "c" | "d", "b" | "c">

type T = "男" | "女" | null | undefined;
type NEWT = Exclude<T, null | undefined>;

type func = () => number;
type returnType = ReturnType<func>; //传入的是函数类型

function sum(a: number, b: number) {
  return a + b;
}
let a: ReturnType<typeof sum>; //传入的是函数类型
```

## 声明文件

> 概述、编写、发布

### 概述

1. 什么是声明文件？

以`.d.ts`结尾的文件

2. 声明文件有什么作用？

**为 JS 代码提供类型声明**

3. 声明文件的位置

- 放置到 tsconfig.json 配置中包含的目录中
- 放置到 node_modules/@types 文件夹中
- 手动配置
- 与 JS 代码所在目录相同，并且文件名也相同的文件。用 ts 代码书写的工程发布之后的格式。

### 编写声明文件

> 手动编写   自动生成

- **自动生成**

工程是使用 ts 开发的，发布（编译）之后，是 js 文件，发布的是 js 文件。

**如果发布的文件，需要其他开发者使用**，可以**使用声明文件**，来描述发布结果中的类型。

配置`tsconfig.json`中的`declaration:true`即可

- 手动编写

1.  对已有库，它是使用 js 书写而成，并且更改该库的代码为 ts 成本较高，可以手动编写声明文件
2.  对一些第三方库，它们使用 js 书写而成，并且这些第三方库没有提供声明文件，可以手动编写声明文件。

**全局声明**

声明一些全局的对象、属性、变量

> namespace: 表示命名空间，可以将其认为是一个对象，命名空间中的内容，必须通过`命名空间.成员名`访问

**模块声明**

**三斜线指令**

在一个声明文件中，包含另一个声明文件

### 发布

1. 当前工程使用 ts 开发

编译完成后，将编译结果所在文件夹直接发布到 npm 上即可

2. 为其他第三方库开发的声明文件

发布到@types/\*\*中。

1） 进入 github 的开源项目：[https://github.com/DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)

2） fork 到自己的开源库中

3） 从自己的开源库中克隆到本地

4） 本地新建分支（例如：mylodash4.3），在新分支中进行声明文件的开发

```
在types目录中新建文件夹，在新的文件夹中开发声明文件
```

5） push 分支到你的开源库

6） 到官方的开源库中，提交 pull request

7） 等待官方管理员审核（1 天）

审核通过之后，会将你的分支代码合并到主分支，然后发布到 npm。

之后，就可以通过命令`npm install @types/你发布的库名`
