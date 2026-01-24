# 1.概述
1. ECMAScript、JavaScript、NodeJs，它们的区别是什么？  
ECMAScript：简称ES，是一个语言标准（循环、判断、变量、数组等数据类型）  
JavaScript：运行在浏览器端的语言，该语言使用ES标准。 ES + web api = JavaScript  
NodeJs：运行在服务器端的语言，该语言使用ES标准。 ES + node api = JavaScript  
无论JavaScript，还是NodeJs，它们都是ES的超集（super set即包含但是还有自己的东西）

# 2.块级绑定
## 2-1声明变量的问题
使用var声明变量

1. 允许重复的变量声明：导致数据被覆盖
2. 变量提升：怪异的数据访问、闭包问题  
怪异数据访问
3. 全局变量挂载到全局对象：全局对象成员污染问题，即容易覆盖window已有成员



## 2-2使用let声明变量
ES6不仅引入let关键字用于解决变量声明的问题，同时引入了块级作用域的概念

块级作用域：代码执行时遇到花括号，会创建一个块级作用域，花括号结束，销毁块级作用域

声明变量的问题

1. 全局变量挂载到全局对象：全局对象成员污染问题  
let声明的变量不会挂载到全局对象



2. 允许重复的变量声明：导致数据被覆盖  
let声明的变量，不允许当前作用域范围内重复声明
3. 允许在不同作用域使用
4. 变量提升：怪异的数据访问、闭包问题  
使用let不会有变量提升，因此，不能在定义let变量之前使用它

底层实现上，let 声明的变量实际上也会有提升，但是，提升后会将其放入到“暂时性死区”，如果访问的变量位于暂时性死区，则会报错：“Cannot access 'a' before initialization”。当代码运行到该变量的声明语句时，会将其从暂时性死区中移除。  
在循环中，用 let 声明的循环变量，会特殊处理，每次进入循环体，都会开启一个新的作用域，并且将循环变量绑定到该作用域（每次循环，使用的是一个全新的循环变量）  
在循环中使用 let 声明的循环变量，在循环结束后会销毁

块级作用域演示

```javascript
let a = 123; //全局作用域定义a
{
    let a = 456; //块级作用域定义a
    console.log(a); //使用的是块级作用域中的a
}
console.log(a)
//在块级作用域中用let定义的变量，在作用域外不能访问。(里面能用外面,外面不能用里面)
```

## 2-3 使用const声明变量
const和let完全相同，仅在于用const声明的变量，必须在声明时赋值，而且不可以重新赋值(赋相同的值也不行),即常量。

实际上，在开发中，应该尽量使用 const 来声明变量，以保证变量的值不会随意篡改，原因如下：

1. 根据经验，开发中的很多变量，都是不会更改，也不应该更改的。



2. 后续的很多框架或者是第三方 JS 库，都要求数据不可变，使用常量可以一定程度上保证这一点。

注意的细节：

1. 常量不可变，是指声明的常量的内存空间不可变，并不保证内存空间中的地址指向的其他空间不可变。



2. 常量的命名  
1.特殊的常量：该常量从字面意义上，一定是不可变的，比如圆周率、月地距地或其他一些绝不可能变化的配置。通常，该常量的名称**全部使用大写**，多个单词之间用下划线分割

普通的常量：使用和之前一样的命名即可

3. 在 for 循环中，循环变量不可以使用常量,for in 循环可以用常量

# 3.字符串和正则表达式
## 3-1更好的Unicode支持
早期，由于存储空间宝贵，Unicode 使用 16 位二进制来存储文字。我们将一个 16 位的二进制编码叫做一个码元（Code Unit）。

后来，由于技术的发展，Unicode 对文字编码进行了扩展，将某些文字扩展到了 32 位（占用两个码元），并且，将某个文字对应的二进制数字叫做码点（Code Point）。

ES6 为了解决这个困扰，为字符串提供了方法：codePointAt，根据字符串码元的位置得到其码点。

同时，ES6 为正则表达式添加了一个 flag: u，如果添加了该配置，则匹配时，使用码点匹配

```javascript
const text = "𠮷"; //占用了2个码元（32位）

console.log("字符串长度：", text.length);//2
console.log("使用正则测试：", /^.$/.test(text));//false正则不能匹配
console.log("使用正则测试：", /^.$/u.test(text));//true匹配码点
console.log("得到第一个码元：", text.charCodeAt(0));
console.log("得到第二个码元：", text.charCodeAt(1));

//𠮷：\ud842\udfb7 
console.log("得到第一个码点：", text.codePointAt(0));
console.log("得到第二个码点：", text.codePointAt(1));
```

判断字符串char，是32位，还是16位

```javascript
function is32bit(char, i) {
    //如果码点大于了16位二进制的最大值，则其是32位的
    return char.codePointAt(i) > 0xffff;
}
```

得到一个字符串码点的真实长度

```javascript
function getLengthOfCodePoint(str) {
    var len = 0;
    for (let i = 0; i < str.length; i++) {
        //i在索引码元
        if (is32bit(str, i)) {
            //当前字符串，在i这个位置，占用了两个码元
            i++;
        }
        len++;
    }
    return len;
}

console.log("𠮷是否是32位的：", is32bit("𠮷", 0))
console.log("ab𠮷ab的码点长度：", getLengthOfCodePoint("ab𠮷ab"))
```

## 3-2更多的字符串API
以下均为字符串的实例（原型）方法

includes判断字符串中是否包含指定的子字符串

startsWith判断字符串中是否以指定的字符串开始

endsWith判断字符串中是否以指定的字符串结尾

repeat将字符串重复指定的次数，然后返回一个新字符串。

```javascript
const text = "成哥是狠人";

console.log("是否包含“狠”：", text.includes("狠"));
console.log("是否包含“狠”：", text.includes("狠",3));//下标3开始查找
console.log("是否以“成哥”开头：", text.startsWith("成哥"));
console.log("是否以“狠人”结尾：", text.endsWith("狠人"));
console.log("重复4次：", text.repeat(4));
```

## 3-3【拓展】	正则中的粘连标记
标记名：y

含义：匹配时，完全按照正则对象中的lastIndex位置开始匹配，并且匹配的位置必须在lastIndex位置。

```javascript
const text = "Hello World!!!";
const reg = /W\w+/y;//W开头，任意单词字符一次或多次
reg.lastIndex = 3;
console.log("reg.lastIndex:", reg.lastIndex);
console.log(reg.test(text));
```

## 3-4 模板字符串
ES6 之前处理字符串繁琐的两个方面：

1. 多行字符串

写法一

```javascript
var test = "邓哥喜欢秋葵\
邓哥也喜欢韭菜";
```

写法二

```javascript
var test = [
    "邓哥喜欢秋葵",
    "邓哥也喜欢韭菜"
].join("\n");
```

以上，多行字符串的处理比较繁琐



2. 字符串拼接

在 ES6 中，提供了**模板字符串**的书写，可以非常方便的换行和拼接，要做的，仅仅是将字符串的开始或结尾改为 `符号

```javascript
var test =`邓哥喜欢秋葵
邓哥喜欢韭菜`;
```

如果要在字符串中拼接 js 表达式，只需要在模板字符串中使用`${JS 表达式}

```javascript
var love1 = "秋葵";
var love2 = "香菜";
var text = `邓哥喜欢${love1}
邓哥也喜欢${love2}
表达式可以是任何有意义的数据${1 + 3 * 2 / 0.5}
表达式是可以嵌套的：${`表达式中的模板字符串${love1 + love2}`}
\n\n
奥布瓦的发顺丰
在模板字符串中使用\${ JS表达式 } 可以进行插值
`;
console.log(text);
```

## 3-5【拓展】模板字符串标记
```javascript
var love1 = "秋葵";
var love2 = "香菜";
var text = myTag`邓哥喜欢${love1}，邓哥也喜欢${love2}。`;
```

相当于

```javascript
text = myTag(["邓哥喜欢", "，邓哥也喜欢", "。"], "秋葵", "香菜")
```

模拟模板字符串功能

```shell
function myTag(parts) {
    const values = Array.prototype.slice.apply(arguments).slice(1);
    // parts.length = value.length + 1
    let str = "";
    for (let i = 0; i < values.length; i++) {
        str += `${parts[i]}：${values[i]}`;
        if (i === values.length - 1) {
            str += parts[i + 1];
        }
    }
    return str;
}
console.log(text);
```

String.raw

```shell
var text = String.raw`abc\t\nbcd`;//告诉他没有特殊字符，完全打印
console.log(text);
```



演示



```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>

    <body>
        <p>
            <textarea id="txt"></textarea>多行文本框	
            <button id="btn">设置div的内容</button>
        </p>
        <div id="container"></div>
        <script>
            const container = document.getElementById("container");
            const txt = document.getElementById("txt");
            const btn = document.getElementById("btn");

            btn.onclick = function () {
                container.innerHTML = safe`<p>
${txt.value}
<!--这里的safe是为了防止用户传入恶意的代码-->
            </p>
<h1>
${txt.value}
            </h1>
`;
            }
            function safe(parts) {
                const values = Array.prototype.slice.apply(arguments).slice(1);
                let str = "";
                for (let i = 0; i < values.length; i++) {
                    const v = values[i].replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    str += parts[i] + v;
                    if (i === values.length - 1) {
                        str += parts[i + 1];
                    }
                }
                return str;
            }
        </script>
    </body>

</html>
```



总结



在模板字符串书写之前，可以加上标记:



```shell
标记名`模板字符串`;
```

标记是一个函数，函数参数如下：



1. 参数 1：被插值分割的字符串数组
2. 后续参数：所有的插值



# 4.函数
## 4-1参数默认值


使用

原来的写法

```shell
function sum(){
    b = b === undefined && 1;
    c = c === undefined && 2;
    return a+b+c;
}
console.log(sum(10));
```



在书写形参时，直接给形参赋值，附的值即为默认值



这样一来，当调用函数时，如果没有给对应的参数赋值（给它的值是 undefined），则会自动使用默认值。



```shell
function sum(a,b=1,c=2){
    return a+b+c;
}
console.log(sum(10));//相当于console.log(sum(10,undefined,undefined))
console.log(sum(11,null,undefined));//就不对了，null为0
console.log(sum(1,undefined,5))//1+1+5=7
```



演示



```shell
// 面试题
function getContainer() {
    console.log("abc");//问abc运行几次-------------------2次，因为两次都用了默认值
    return document.getElementById("container");
}

/**
 * 创建一个元素
 * @param {*} name 元素的名称 
 * @param {*} container 元素的父元素
 * @param {*} content 元素的内容 
 */
function createElement(name = "div", container = getContainer(), content = "") {
    const ele = document.createElement(name)
    if (content) {
        ele.innerHTML = content;
    }
    container.appendChild(ele);
}
createElement(undefined, undefined, "手动阀手动阀十分")//调用一次
createElement(undefined, undefined, "234242342424")//调用一次
createElement(undefined, document.getElementById("container"), "234242342424")//传值了，不调用了
```



[扩展]对 arguments 的影响

只要给函数加上参数默认值，该函数会自动变量**严格模式下的规则：arguments 和形参脱离**



```shell
function test(a, b) {
console.log("arugments", arguments[0], arguments[1]);//两个形参 	1 2
console.log("a:", a, "b:", b);//1 2
a = 3;
console.log("arugments", arguments[0], arguments[1]);// 3 2
console.log("a:", a, "b:", b);// 3 2
}
test(1, 2);
// 当加上参数默认值
function test(a, b=1) {
console.log("arugments", arguments[0], arguments[1]);//两个形参 	1 2
console.log("a:", a, "b:", b);//1 2
a = 3;
console.log("arugments", arguments[0], arguments[1]);// 3 2
console.log("a:", a, "b:", b);// 3 2
}
test(1, 2);
```



[扩展]留意暂时性死区



形参和 ES6 中的 let 或 const 声明一样，具有作用域，并且根据参数的声明顺序，存在暂时性死区。



```shell
function test(a, b=a) {
    console.log(a, b);//都有值，不会用参数默认值，1,2
}
test(1, 2);

function test(a, b=a) {
    console.log(a, b);//参数默认值：1,1
}
test(1);

function test(a = b, b) {
    console.log(a, b);/没有使用参数默认值：1,2
}
test(1, 2);

function test(a = b, b) {
    console.log(a, b);//Cannot access 'b' before initialization
}
test(undefined, 2);
```



## 4-2剩余参数


旧方法



```shell
function sum(args){
    let sum = 0;
    for(let i = 0; i < args.length; i++){
        sum += args[i];
    }
    return sum; 
}
console.log(sum([1]));//必须传数组
```



升级



```javascript
function sum(){
    let sum = 0;
    for(let i = 0; i < arguments.length; i++){
        sum += arguments[i];
    }
    return sum;
}
console.log(sum(1));//必须传数组
```



arguments 的缺陷：



1. 如果和形参配合使用，容易导致混乱
2. 从语义上，使用 arguments 获取参数，由于形参缺失，无法从函数定义上理解函数的真实意图



ES6 的剩余参数专门用于收集末尾的所有参数，将其放置到一个形参数组中。



语法:



```javascript
function (...形参名){
}
```



**细节**



1. 一个函数，仅能出现一个剩余参数
2. 一个函数，如果有剩余参数，剩余参数必须是最后一个参数



演示1



```javascript
function sum(...args) {
    //args收集了所有的参数，形成的一个数组
    let sum = 0;
    for (let i = 0; i < args.length; i++) {
        sum += args[i];
    }
    return sum;
}
console.log(sum())
console.log(sum(1))
console.log(sum(1, 2))
console.log(sum(1, 2, 3))
```



演示2



```javascript
function test(...args1, ...args2) {
    console.log(args1)
    console.log(args2)
}
test(1, 32, 46, 7, 34);
```



演示3



```javascript
function test(a, b, ...args) {
}
test(1, 32, 46, 7, 34);
```



## 4-3展开运算符


使用方式：



```javascript
...要展开的东西
```



对所有数字求和



```javascript
function sum(...args) {
    let sum = 0;
    for (let i = 0; i < args.length; i++) {
        sum += args[i];
    }
    return sum;
}
```



获取一个指定长度的随机数组成的数组



```javascript
function getRandomNumbers(length) {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(Math.random());
    }
    return arr;
}
const numbers = getRandomNumbers(10);
//希望将数组的每一项展开，依次作为参数传递，而不是把整个数组作为一个参数传递
// 这就要用到展开运算符
// sum(numbers) 这是传了一个参数
console.log(sum(...numbers))//相当于传递了10个参数
console.log(sum(1, 3, ...numbers, 3, 5))
```



展开数组：克隆



```javascript
const arr1 = [3, 67, 8, 5];

//克隆arr1数组到arr2

// const arr2 = [0, ...arr1, 1];相加别的数
const arr2 = [...arr1];

console.log(arr2, arr1 === arr2)//false
```



展开对象：浅克隆



```javascript
const obj1 = {
    name: "成哥",
    age: 18,
    love: "邓嫂",
    address: {
        country: "中国",
        province: "黑龙江",
        city: "哈尔滨"
    }
}
// 浅克隆到obj2
const obj2 = {
    ...obj1,
    name: "邓哥"//邓哥可以覆盖
};
console.log(obj2)
console.log(obj1.address === obj2.address)//true
```



深克隆



```javascript
const obj1 = {
    name: "成哥",
    age: 18,
    loves: ["邓嫂", "成嫂1", "成嫂2"],
    address: {
        country: "中国",
        province: "黑龙江",
        city: "哈尔滨"
    }
}
// 深克隆到obj2
const obj2 = {
    ...obj1,
    name: "邓哥",
    address: {//address深克隆
        ...obj1.address
    },
    loves: [...obj1.loves, "成嫂3"]//浅克隆
};
console.log(obj2)
console.log(obj1.loves === obj2.loves)
console.log(obj1.address === obj2.address)
```



## 4-4剩余参数和展开运算符练习


maxmin



```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>

    <body>
        <div>
            <p><input type="number" name="" id="" value="0"></p>
            <p><input type="number" name="" id="" value="0"></p>
            <p><input type="number" name="" id="" value="0"></p>
            <p><input type="number" name="" id="" value="0"></p>
            <p><input type="number" name="" id="" value="0"></p>
            <p><input type="number" name="" id="" value="0"></p>
            <p><input type="number" name="" id="" value="0"></p>
            <p><input type="number" name="" id="" value="0"></p>
            <p><input type="number" name="" id="" value="0"></p>
            <p><input type="number" name="" id="" value="0"></p>
        </div>
        <p>
            <button>计算</button>
        </p>
        <p>
        <h2>最大值：<span id="spanmax"></span></h2>
        <h2>最小值：<span id="spanmin"></span></h2>
        </p>
    <script>
        function getValues() {
            const numbers = [];
            const inps = document.querySelectorAll("input")
            for (let i = 0; i < inps.length; i++) {
                numbers.push(+inps[i].value)//+表示转换成数字
            }
            return numbers;
        }

        const btn = document.querySelector("button")

        btn.onclick = function () {
            const numbers = getValues(); //得到文本框中的所有数字形成的数组
            spanmax.innerText = Math.max(...numbers)
            spanmin.innerText = Math.min(...numbers)
            //老方法spanmax.innerText =Math.max.apply(null,numbers);this绑定null
        }
    </script>
    </body>
</html>
```



curry



```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>

  <body>
    <script>
      function cal(a, b, c, d) {
        return a + b * c - d;
      }
      //curry：柯里化，用户固定某个函数的前面的参数，得到一个新的函数，新的函数调用时，接收剩余的参数
      function curry(func, ...args) {//后面不管几个
        return function (...subArgs) {//新的函数也不知道几个
          const allArgs = [...args, ...subArgs];
          if (allArgs.length >= func.length) {
            //参数够了
            return func(...allArgs);
          } else {
            //参数不够，继续固定
            return curry(func, ...allArgs);
          }
        }
      }

      const newCal = curry(cal, 1, 2)

      console.log(newCal(3, 4)) // 1+2*3-4
      console.log(newCal(4, 5)) // 1+2*4-5
      console.log(newCal(5, 6)) // 1+2*5-6
      console.log(newCal(6, 7)) // 1+2*6-7

      const newCal2 = newCal(8)

      console.log(newCal2(9)); // 1+2*8-9
    </script>
  </body>

</html>
```



demo



```javascript
function test(a, b, c) {
    console.log(a, b, c);
}
test(2, 6, 7);
const arr = ["asf", "Gfh", "111"];
//以前apply
test(...arr);
```



## 4-5 明确函数的双重用途


ES6提供了一个特殊的API，可以使用该API在函数内部，判断该函数是否使用了new来调用



```javascript
new.target 
//该表达式，得到的是：如果没有使用new来调用函数，则返回undefined
//如果使用new调用函数，则得到的是new关键字后面的函数本身
```



普通函数与构造函数的使用



```javascript
function Person(firstName, lastName) {
    // 判断是否是使用new的方式来调用的函数
    // 过去的判断方式
    // if (!(this instanceof Person)) {
    //     throw new Error("该函数没有使用new来调用")
    // }
    if (new.target === undefined) {
        throw new Error("该函数没有使用new来调用")
    }
    this.firstName = firstName;
    this.lastName = lastName;
    this.fullName = `${firstName} ${lastName}`;
}
const p1 = new Person("袁", "进");//构造函数 有效
console.log(p1)

const p2 = Person("袁", "进");//直接调用 无效
console.log(p2);
// 强行绑定this会绕开过去的判断方式
const p3 = Person.call(p1, "袁", "进")
console.log(p3);
```



## 4-6箭头函数


回顾：this 指向

1. 通过对象调用函数，this 指向对象
2. 直接调用函数，this 指向全局对象
3. 如果通过 new 调用函数，this 指向新创建的对象
4. 如果通过 apply、call、bind 调用函数，this 指向指定的数据
5. 如果是 DOM 事件函数，this 指向事件源

常见问题



```html
<!DOCTYPE html>
<head>
  <title></title>
</head>
<body>  

  <script>
    const obj = {
      count: 0,
      start: function () {
        // obj调用的，所以this->obj
        console.log(this)// obj对象，这里this没问题
        setInterval(function(){
          console.log(this);//这里的this出了问题，JS引擎内部调用，直接调用的，this全局window
          // this.count++;undefined++==NAN
          // console.log(this.count);
        },1000)
      },
      regEvent: function(){
        window.onclick = function(){
          console.log(this.count);//事件，this指向事件源window	
        }
      }
    }
    obj.start();
    obj.regEvent();
  </script>
</body>
</html>
```



解决方案：闭包



```html
<!DOCTYPE html>
<head>
    <title></title>

</head>
<body>

    <script>
        const obj = {
            count: 0,
            start: function () {
                // this->obj
                var _this = this;
                setInterval(function(){
                    console.log(this);
                    _this.count++;
                    console.log(_this.count);
                },1000)
            },
            regEvent: function(){
                var _this = this;
                window.onclick = function(){
                    console.log(_this.count);
                }
            }

        }
        obj.start();
        obj.regEvent();

    </script>
</body>
</html>
```



使用语法



箭头函数是一个**函数表达式**，理论上，任何使用函数表达式的场景都可以使用箭头函数



完整语法：



```javascript
(参数1, 参数2, ...)=>{
    //函数体
}
```



上述代码简化成



```javascript
const obj = {
  count: 0,
  start: function () {
    setInterval(() => {
      this.count++;
      console.log(this.count);
    }, 1000)
  },
  regEvent: function () {
    window.onclick = () => {
      console.log(this.count);
    }
  },
  print: function () {
    console.log(this)
    console.log(this.count)
  }
}

// obj.start();
// obj.regEvent();
obj.print();
//不过，问题也随之解决了
//原因：箭头函数的函数体中的 this，取决于箭头函数定义的位置的 this 指向，而与如何调用无关
```



如果参数只有一个，可以省略小括号



```javascript
(参数) => {};
```



```javascript
const print = num => {
    console.log("给我的数字是：", num)
}
print(2);
```



如果箭头函数只有一条返回语句，可以省略大括号，和 return 关键字



```javascript
(参数) => 返回值;
```



> 判断一个数是不是奇数
>



```javascript
const isOdd = function (num) {
    return num % 2 !== 0;
}
```



优化



```javascript
const isOdd = (num) => {
    return num % 2 !== 0;
}
```



优化



```javascript
const isOdd = num => num % 2 !== 0;

console.log(isOdd(3))
console.log(isOdd(4))
```



注意细节



-箭头函数的函数体中的 this，**取决于箭头函数定义的位置的 this 指向**，而与如何调用无关



- 箭头函数中，不存在 this、arguments、new.target，如果使用了，则使用的是函数外层的对应的 this、arguments、new.target



箭头函数没有原型，所以箭头函数不能作用构造函数使用



应用场景



1. 临时性使用的函数，并不会刻意调用它，比如：
    1. 事件处理函数
    2. 异步处理函数(定时器函数)
    3. 其他临时性的函数
2. 为了绑定外层 this 的函数
3. 在不影响其他代码的情况下，保持代码的简洁，最常见的，数组方法中的回调函数



小现象



```javascript
const obj = {
  count : 0,
  print : function (){
    console.log(this);
    console.log(this.count);
  }
  // 相当于
  // print : this,
  // this没有在函数里面，就是window;
}
const print = obj.print;
print();//window undefined
```



箭头函数能解决吗



```javascript
const obj = {
    count : 0,
    print :() =>{
        console.log(this);
        console.log(this.count);
    }
}
const print = obj.print;
// console.log(print());//还是undefined
```



这种问题通常不解决，开发中都是遇到函数里面套函数出现this指向问题，没有这种问题



**对象的属性不用箭头函数**



演示



```javascript
const sum = (a, b) => {
    return {
        a: a,
        b: b,
        sum: a + b
    }
};
console.log(sum(3, 5))
```



优化



```javascript
const sum = (a, b) => ({
    a: a,
    b: b,
    sum: a + b
});
console.log(sum(3, 5))
```



演示



```javascript
const func = () => {
    console.log(this)//window
}
```



演示



```javascript
const func = () => {
    console.log(this)//自己没有this,只能从外面找，是window
    console.log(arguments)//也没有arguments
}

const obj = {
    method:func
}
obj.method(234);
```



演示：面试题



```javascript
const func = () => {
    console.log(this)
}

const obj = {
    method: function () {
        const func = () => {
            console.log(this)//箭头函数没有this，往外看，function的this，this由obj调用，就是obj
            console.log(arguments)//箭头函数没有arguments,往外看，传的是234	 
        }
        func()
    }
}
obj.method(234);
```



演示  在不影响其他代码的情况下，保持代码的简洁，最常见的，数组方法中的回调函数



```javascript
const numbers = [3, 7, 78, 3, 5, 345];
//以前的方法const result = numbers.map(function(num){return num*2})
const result = numbers.filter(num => num % 2 !== 0).map(num => num * 2).reduce((a, b) => a + b)
console.log(result);
```



# 5.对象
## 5-1新增的对象字面量语法


1. 成员速写  
如果对象字面量初始化时，成员的名称来自于一个变量，并且和变量的名称相同，则可以进行简写

```javascript
function createUser(loginId, loginPwd, nickName){
  return {
    loginId : loginId,
    loginPwd : loginPwd,
    nickName : nickName,
    id : Math.random()
  }
}
console.log(createUser("abc"),"13","aaa")
```

1. 成员速写

```html
function createUser(loginId, loginPwd, nickName){
	return {
		loginId,
		loginPwd,
		nickName,
		id : Math.random()
	}
}
console.log(createUser("abc"),"13","aaa")
```

演示



```javascript
function createUser(loginId, loginPwd, nickName) {
  const sayHello = function () {//这里不能用箭头函数，没有this，就调用外面的window了
    console.log("loginId", this.loginId, "nickname", this.nickName)
  }
  return {
    loginId,
    loginPwd,
    nickName,
    sayHello,
    id: Math.random()
  }
}
const u = createUser("abc", "123", "aaa");
u.sayHello();
```

2. 方法速写  
对象字面初始化时，方法可以省略冒号和function关键字

```javascript
const user = {
  name: "姬成",
  age: 100,
  sayHello : function(){
    console.log(this.name, this.age)
  }
}
user.sayHello();
```



```html
const user = {
    name: "姬成",
    age: 100,
    sayHello(){
        console.log(this.name, this.age)
    }
}
user.sayHello();
```

3. 计算属性名  
有的时候，初始化对象时，某些属性名可能来自于某个表达式的值，在ES6，可以使用中括号来表示该属性名是通过计算得到的。

```javascript
const prop1 = "name2";
const prop2 = "age2";
const prop3 = "sayHello2";
// 以前必须user[prop1] = '姬成'
const user = {
    [prop1]: "姬成",
    [prop2]: 100,
    [prop3](){
        console.log(this[prop1], this[prop2])
    }
}
user[prop3]();
```





## 5-2Object的新增API


> Object是函数（构造函数）
>

1. Object.is  
用于判断两个数据是否相等，基本上跟严格相等（===）是一致的，除了以下两点：

	(1)NaN 和 NaN相等

	(2)+0 和-0 不相等



```html
console.log(NaN === NaN); // false
console.log(+0 === -0);  // true

console.log(Object.is(NaN, NaN))// true
console.log(Object.is(+0, -0))// false
```



2. Object.assign 后面覆盖前面  
用于混合对象



```html
const obj1 = {
    a: 123,
    b: 456,
    c: "abc"
}

const obj2 = {
    a: 789,
    d: "kkk"
}
```



```javascript
/*
想这样
{
    a: 789,
    b: 456,
    c: "abc",
    d: "kkk"
}
*/
```



ES7做法：



```html
const obj = {
    ...obj1,
    ...obj2 //后面覆盖前面
}
console.log(obj);
```



Object.assign做法：



将obj2的数据，覆盖到obj1，并且会对obj1产生改动，然后返回obj1。对obj1改动了



```html
const obj = Object.assign(obj1, obj2);
```



防止产生影响



```html
const obj = Object.assign({}, obj1, obj2);// 只改动了{}，没有改动obj1,obj2
```



3. Object.getOwnPropertyNames 的枚举顺序  
Object.getOwnPropertyNames 方法之前就存在，只不过，官方没有明确要求，对属性的顺序如何排序，如何排序，完全由浏览器厂商决定。

ES6 规定了该方法返回的数组的排序方式如下：

先排数字，并按照升序排序

再排其他，按照书写顺序排序



```html
const obj = {
    d: 1,
    b: 2,
    a: 3,
    0: 6,
    5: 2,
    4: 1
}
const props = Object.getOwnPropertyNames(obj)//返回字符串数组
console.log(props)
```



4. Object.setPrototypeOf

该函数用于设置某个对象的隐式原型

比如： Object.setPrototypeOf(obj1, obj2)，

相当于： `obj1.__proto__ = obj2`

演示

```javascript
const obj1 = {
  a: 1
}
const obj2 = {
  b: 2
}

// obj1.__proto__ = obj2

Object.setPrototypeOf(obj1, obj2)

console.log(obj1)
```



## 5-3面向对象简介


面向对象：一种编程思想，跟具体的语言

对比面向过程：

- 面向过程：思考的切入点是功能的步骤

- 面向对象：思考的切入点是对象的划分

【大象装冰箱】

面向过程（小工程）

```html
//1. 冰箱门打开
function openFrige(){
}
openFrige();
//2. 大象装进去
function elephantIn(){
}
elephantIn();
//3. 冰箱门关上
function closeFrige(){
}
closeFrige();
```



面向对象（大型工程）



```html
/**
 * 大象
 */
function Elephant() {

}
/**
 * 冰箱
 */
function Frige() {
}
Frige.prototype.openDoor = function () {
}
Frige.prototype.closeDoor = function () {
}
Frige.prototype.join = function(something){
    this.openDoor();
    //装东西

    this.closeDoor();
}
//1. 冰箱门打开
// var frig = new Frige();
// frig.openDoor();
// //2. 大象装进去
// var ele = new Elephant();
// frig.join(ele);
// //3. 冰箱门关上
// frig.closeDoor();
var frig = new Frige();
frig.join(new Elephant());
```



## 5-4类：构造函数的语法糖


**传统的构造函数的问题**

1. 属性和原型方法定义分离，降低了可读性
2. 原型成员可以被枚举，但是不希望枚举
3. 默认情况下，构造函数仍然可以被当作普通函数使用

面向对象中，将下面对一个对象的所有成员的定义，统称为类

```javascript
//构造函数  构造器
function Animal(type, name, age, sex) {
  this.type = type;
  this.name = name;
  this.age = age;
  this.sex = sex;
}
// 中间存在1万行代码
//定义实例方法（原型方法）
Animal.prototype.print = function () {
  console.log(`【种类】：${this.type}`);
  console.log(`【名字】：${this.name}`);
  console.log(`【年龄】：${this.age}`);
  console.log(`【性别】：${this.sex}`);
}

const a = new Animal("狗", "旺财", 3, "男");
a.print();
for (const prop in a) {//枚举
  console.log(prop)// 也把print（原型上的东西也遍历出来了，这是不希望的）
}
```



**类的特点**

1. 类声明不会被提升，与 let 和 const 一样，存在暂时性死区
2. 类中的所有代码均在严格模式下执行
3. 类的所有方法都是不可枚举的
4. 类的所有方法都无法被当作构造函数使用
5. 类的构造器必须使用 new 来调用

```javascript
class Animal {
  constructor(type, name, age, sex) {
    this.type = type;
    this.name = name;
    this.age = age;
    this.sex = sex;
  }
  print() {
    console.log(`【种类】：${this.type}`);
    console.log(`【名字】：${this.name}`);
    console.log(`【年龄】：${this.age}`);
    console.log(`【性别】：${this.sex}`);
  }
}

const a = new Animal("狗", "旺财", 3, "男");
const a = Animal("狗", "旺财", 3, "男");//error不能当普通函数调用
const p = new a.print();//error   类的所有方法都无法被当作构造函数使用
a.print();
console.log(a);

for (const prop in a) {
  console.log(prop)//不会遍历原形了
}
```



## 5-5类的其他书写方式


1. 可计算的成员名



```javascript
const printName = "print";

class Animal {
  constructor(type, name, age, sex) {
    this.type = type;
    this.name = name;
    this.age = age;
    this.sex = sex;
  }

  [printName]() {
    console.log(`【种类】：${this.type}`);
    console.log(`【名字】：${this.name}`);
    console.log(`【年龄】：${this.age}`);
    console.log(`【性别】：${this.sex}`);
  }
}

const a = new Animal("狗", "旺财", 3, "男");
a[printName]();
```



2. getter和setter  
Object.defineProperty 可定义某个对象成员属性的读取和设置  
使用getter和setter控制的属性，不在原型上

对年龄限制：

```javascript
const printName = "print";

class Animal {
  constructor(age) {
    this.setAge(age);
    this.sex = sex;
  }
  getAge() {
    return this._age + "岁";
  }
  setAge(age) {
    if (age < 0) {
      age = 0;
    }
    else if (age > 1000) {
      age = 1000;
    }
    this._age = age;
  }

  [printName]() {
    console.log(`【年龄】：${this.age}`);
  }
}
var a = new Animal("狗", "旺财", 3, "男");
```

升级

```javascript
const printName = "print";

class Animal {
  constructor(type, name, age, sex) {
    this.type = type;
    this.name = name;
    this.age = age;
    this.sex = sex;
  }
  //创建一个age属性，并给它加上getter，读取该属性时，会运行该函数
  get age() {// 不能给参数
    return this._age + "岁";
  }
  //创建一个age属性，并给它加上setter，给该属性赋值时，会运行该函数
  set age(age) {
    if (typeof age !== "number") {
      throw new TypeError("age property must be a number");
    }
    if (age < 0) {
      age = 0;
    }
    else if (age > 1000) {
      age = 1000;
    }
    this._age = age;
  }

  [printName]() {
    console.log(`【种类】：${this.type}`);
    console.log(`【名字】：${this.name}`);
    console.log(`【年龄】：${this.age}`);
    console.log(`【性别】：${this.sex}`);
  }
}
var a = new Animal("狗", "旺财", 3, "男");
```



3. 静态成员  
构造函数本身的成员。Animal.abc  
使用static关键字定义的成员即<font style="color:#F5222D;">静态成员</font>

<font style="color:#F5222D;">函数本身也是对象</font>

象棋demo：不需要创建旗子也知道宽高。宽高不应该作为实例属性

```javascript
class Chess {
  constructor(name) {
    this.name = name;
  }
  static width = 50;
	static height = 50;
	static method() {
	}
}
console.log(Chess.width);
console.log(Chess.height);
Chess.method();
```



4. 字段初始化器（ES7）



```javascript
class Test {
  static a = 1;// a在Test.a里面
// a = 1;
b = 2;//实例成员
c = 3;
constructor() {
  // 相当于
  // b = 2;
  // c = 3;
  this.d = this.b + this.c;
  // d=5	
}
}
const t = new Test();
console.log(t)
```



注意：

**<font style="color:#F5222D;">1). 使用static的字段初始化器，添加的是静态成员</font>**

**<font style="color:#F5222D;">	2). 没有使用static的字段初始化器，添加的成员位于对象上</font>**

**<font style="color:#F5222D;">3). 箭头函数在字段初始化器位置上，指向当前对象</font>**

```javascript
class Test {
  // 这里相当于a = 123;
  constructor() {
    this.a = 123;
  }
  print(){
    console.log(this.a)
  }
}
const t = new Test();
t.print()//123
```

为了绑定方法里面的this，让this始终指向当前对象，防止有人这样做

```javascript
class Test {
  constructor() {
    this.a = 123;
  }
  print(){
    console.log(this.a)// 严格模式this->undefined
  }
}
const t = new Test();
const p = t.print();
p();// this--> undefiend
```

利用字段初始化器，print赋值为一个箭头函数。**<font style="color:#F5222D;">箭头函数在字段初始化器位置上，指向当前对象</font>**

```javascript
class Test {
  constructor() {
    this.a = 123;
  }
  print = () => {
    console.log(this.a)// this指向当前对象。因为字段初始化器相当于在构造函数前写上this.print=()=>{console.log(this.a)}
  }
}

const t = new Test();
const p = t.print;
p();//123
```

现在的print不在原形上了，现在在对象上

```javascript
class Test {
  constructor() {
    this.a = 123;
  }
  print = () => {
    console.log(this.a)
  }
}

const t1 = new Test();
const t2 = new Test();
console.log(t1.print === t2.print);// false 每一个对象有一个自己的print
```



5. 类表达式

```javascript
const A = class { //匿名类，类表达式
  a = 1;
b = 2;
}

const a = new A();
console.log(a)
```



5. [扩展]装饰器（ES7）(Decorator)

还没成为正式标准，<font style="background-color:#FADB14;">浏览器不支持</font>

<font style="color:#F5222D;">横切关注点</font>

装饰器的本质是一个函数



```javascript
class Test {
  @Obsolete// 标记已过期
  print() {
    console.log("print方法")
  }
}
function Obsolete(target, methodName, descriptor) {// 装饰器的本质是一个函数
  // 分别会输出：
  // function Test
  // print
  // { value: function print(){}, ... }
  // console.log(target, methodName, descriptor);
  const oldFunc = descriptor.value
  descriptor.value = function (...args) {
    console.warn(`${methodName}方法已过时`);
    oldFunc.apply(this, args);
  }
}
```

## 5-6类的继承
如果两个类 A 和 B，如果可以描述为：B 是 A，则，A 和 B 形成继承关系

如果 B 是 A，则：

1. B 继承自 A
2. A 派生 B
3. B 是 A 的子类
4. A 是 B 的父类

**<font style="color:#F5222D;">如果 A 是 B 的父类，则 B 会自动拥有 A 中的所有实例成员。</font>**

这样狗里面没有print，要实现继承，必须Dog_prototype--->Animal prototype

老方法：

```javascript
function Animal(type, name, age, sex) {
    this.type = type;
    this.name = name;
    this.age = age;
    this.sex = sex;
}
Animal.prototype.print = function () {
    console.log(`【种类】：${this.type}`);
    console.log(`【名字】：${this.name}`);
    console.log(`【年龄】：${this.age}`);
    console.log(`【性别】：${this.sex}`);
}

// 以前
function Dog(name, age, sex) {
    //借用父类的构造函数
    Animal.call(this, "犬类", name, age, sex);
}
Object.setPrototypeOf(Dog.prototype, Animal.prototype);
// 把Dog.prototype的隐式原形设置成Animal.prototype的
const d = new Dog("旺财", 3, "公");
d.print();
console.log(d);
```



新的关键字：

- extends：继承，用于类的定义

- super

- 直接当作函数调用，表示父类构造函数

- <font style="color:#F5222D;">如果当作对象使用，则表示父类的原型</font>

注意：ES6 要求，如果定义了 constructor，并且该类是子类，则必须在 constructor 的第一行手动调用父类的构造函数

如果子类不写 constructor，则会有默认的构造器，该构造器需要的参数和父类一致，并且自动调用父类构造器



```javascript
class Animal {
    constructor(type, name, age, sex) {
        this.type = type;
        this.name = name;
        this.age = age;
        this.sex = sex;
    }
    print() {
        console.log(`【种类】：${this.type}`);
        console.log(`【名字】：${this.name}`);
        console.log(`【年龄】：${this.age}`);
        console.log(`【性别】：${this.sex}`);
    }
    jiao() {
        throw new Error("动物怎么叫的？");
    }
}
class Dog extends Animal {//翻译:狗继承自animal
    constructor(name, age, sex) {
        super("犬类", name, age, sex);// Animal，就不用Animal.call了
        this.loves = "吃骨头"; // 子类特有的属性，父类不知道
    }
    print() {
        super.print(); //其他模块想调用父类的print
        //自己特有的代码
        console.log(`【爱好】：${this.loves}`);
    }
    jiao() {//同名方法，会覆盖父类
        console.log("旺旺！");
    }
}
const d = new Dog("旺财", 3, "公");
d.print();
console.log(d)// 原形
d.jiao();
```



【冷知识】



+ 用 JS 制作抽象类
+ 抽象类：一般是父类，不能通过该类创建对象
+ 正常情况下，this 的指向，this 始终指向<font style="color:#F5222D;">具体</font>的类的对象



```javascript
class Animal {
  constructor(type, name, age, sex) {
    if (new.target === Animal) {
      throw new TypeError("你不能直接创建Animal的对象，应该通过子类创建")
    }
    this.type = type;
    this.name = name;
    this.age = age;
    this.sex = sex;
  }
  print() {
    console.log(`【种类】：${this.type}`);
    console.log(`【名字】：${this.name}`);
    console.log(`【年龄】：${this.age}`);
    console.log(`【性别】：${this.sex}`);
  }
  jiao() {
    throw new Error("动物怎么叫的？");
  }
}
class Dog extends Animal {
  constructor(name, age, sex) {
    super("犬类", name, age, sex);
    // 子类特有的属性
    this.loves = "吃骨头";
  }
  print() {
    //调用父类的print
    super.print();
    //自己特有的代码
    console.log(`【爱好】：${this.loves}`);
  }
  //同名方法，会覆盖父类
  jiao() {
    console.log("旺旺！");
  }
}
//下面的代码逻辑有误
const a = new Dog("旺财", 3, "公")
a.print();
```



es5和es6继承方式的区别

ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加

到this.上(Parent.apply(this)) .

ES6的继承机制完全不同，实质上是先创建父类的实例对象this (所以必

须先调用父类的super()方法)，然后再用子类的构造函数修改this。

ES5的继承时通过原型或构造函数机制来实现。

ES6通过class关键字定义类，里面有构造方法，类之间通过extends关

键字实现继承。

子类必须在constructor方法中调用super方法，否则新建实例报错。因

为子类没有自己的this对象，而是继承了父类的this对象,然后对其进行加工。

如果不调用supe

per

方法，子类得不到this对象。

注意super

关键字指代父类的实例，即父类的this 对象。

注意:在子类构造函数中，调用super后，才可使用this 关键字，否则

报错。



# 6.解构
## 6-1对象解构
**什么是解构**

使用 ES6 的一种语法规则，将一个对象或数组的某个属性提取到某个变量中

解构不会对被解构的目标造成任何影响

```javascript
const user = {
    name: "kevin",
    age: 11,
    sex: "男",
    address: {
        province: "四川",
        city: "成都"
    }
}
// 以前
// let name, age, sex, address;
// name = user.name;
// age = user.age;
// sex = user.sex;
// address = user.address;
// 有了解构
写法1：
let name, age, sex, address, abc;
({ name, age, sex, address } = user);
写法2：
let {name,age,sex,address} = user; 
```



**在解构中使用默认值**



```javascript
{
    同名变量 = 默认值;//赋值
}
```



demo



```javascript
// 先定义5个变量，然后从对象中读取同名属性，放到变量中
let { name, age, sex, address, abc = 123 } = user
console.log(name, age, sex, address, abc)// 如果abc不赋值，就是undefined
```



**非同名属性解构**



```javascript
{
    属性名: 变量名;
}
```



demo



```javascript
const user = {
    name: "kevin",
    age: 11,
    sex: "男",
    address: {
        province: "四川",
        city: "成都"
    }
}
// 先定义4个变量：name、age、gender、address
// 再从对象user中读取同名属性赋值（其中gender读取的是sex属性）
let { name, age, sex: gender = 123, address } = user

console.log(name, age, gender, address)
```



深入解构



```javascript
const user = {
  name: "kevin",
  age: 11,    
  sex: "男",
  address: {
    province: "四川",
    city: "成都"
  }
}
//解构出user中的name、province
//定义两个变量name、province
//再解构
const { name, address: { province } } = user;
console.log(name, address, province)// address is not defined。对address进一步解构，不会当变量
```



## 6-2数组解构
**<font style="color:#F5222D;">数组本质是对象</font>**

对象大括号解构，数组中括号

演示1



```javascript
const numbers = ["a", "b", "c", "d"];
const {
    0: n1,
    1: n2
} = numbers;
console.log(n1, n2)
```



继续简化



```javascript
let n1, n2;
([n1, n2] = numbers);
```



等价于



```javascript
const [n1, n2] = numbers;
```



按需取值



```javascript
const numbers = ["a", "b", "c", "d"];
const [n1, , , n4, n5 = 123] = numbers;
console.log(n1, n4, n5)
```



带有嵌套:得到numbers下标为4的数组中的下标为2的数据，放到变量n中



```javascript
const numbers = ["a", "b", "c", "d", [1, 2, 3, 4]];
const [, , , , [, , n]] = numbers;
console.log(n)
```



得到numbers下标为4的数组的属性a，赋值给变量A



```javascript
const numbers = ["a", "b", "c", "d", {
    a: 1,
    b: 2
}];
// const [,,,,{a}] = numbers;
// const [, , , , { a: A }] = numbers;
const { a: A } = numbers[4];//把对象单独拿出来
console.log(A)
```



解构出name，然后，剩余的所有属性，放到一个新的对象中，变量名为obj



```javascript
const user = {
    name: "kevin",
    age: 11,
    sex: "男",
    address: {
        province: "四川",
        city: "成都"
    }
}
// name: kevin
// obj : {age:11, sex:"男", address:{...}}
const { name, ...obj } = user;
console.log(name, obj)
```



得到数组前两项，分别放到变量a和b中，然后剩余的所有数据放到数组nums



```javascript
const numbers = [324, 7, 23, 5, 3243];
const [a, b, ...nums] = numbers;
// 以前：const a = numbers[0], b = numbers[1], nums = numbers.slice(2);
console.log(a, b, nums);
```



交换两个变量



```javascript
let a = 1, b = 2;
[b, a] = [a, b]//右边数组，赋值，[1,2]; 左边解构
console.log(a, b)
```



试题



```javascript
const article = {
  title: "文章标题",
  content: "文章内容",
  comments: [{
    content: "评论1",
    user: {
      id: 1,
      name: "用户名1"
    }
  }, {
    content: "评论2",
    user: {
      id: 2,
      name: "用户名2"
    }
  }]
}
```



解构出第二条评论的用户名和评论内容



name:"用户名2"  content:"评论2"



写法1



```javascript
const {
  comments: [, {
    content,
    user: {
      name
    }
  }]
} = article;
console.log(content,name)
```



写法2

```javascript
const [, {
    content,
    user: {
        name
    }
}] = article.comments;//先把数组项取出来
console.log(content,name)
```

写法3

```javascript
const {
    content,
    user: {
        name
    }
} = article.comments[1]

console.log(content, name)
```

## 6-3参数解构
目前的问题：要写无数的user  .  太麻烦

```javascript
function print(user) {
    console.log(`姓名：${user.name}`)
    console.log(`年龄：${user.age}`)
    console.log(`性别：${user.sex}`)
    console.log(`身份：${user.address.province}`)
    console.log(`城市：${user.address.city}`)
}
const user = {
    name: "kevin",
    age: 11,
    sex: "男",
    address: {
        province: "四川",
        city: "成都"
    }
}
print(user)
```



直接解构



```javascript
function print({ name, age, sex, address: {
    province,
    city
} }) {
    console.log(`姓名：${name}`)
    console.log(`年龄：${age}`)
    console.log(`性别：${sex}`)
    console.log(`身份：${province}`)
    console.log(`城市：${city}`)
}

const user = {
    name: "kevin",
    age: 11,
    sex: "男",
    address: {
        province: "四川",
        city: "成都"
    }
}
print(user)
```



ajax默认值配置



```javascript
function ajax(options) {
  const defaultOptions = {//默认配置
    method: "get",//默认值
    url: "/"
  }
  const opt = {
    ...defaultOptions,
    ...options
  }
  console.log(opt)
}
ajax({
  url:"/abc",
  method:"post",//不传的话默认get
})
```



解构简化



```javascript
function ajax({
    method = "get",
    url = "/"
} = {}) {// 需要加上={}，参数默认值
    console.log(method, url)
}
ajax()//不传递则undefined无法解构，so需要加上={}，参数默认值
ajax({
    url:"/abc",
})
```

# 7.符号
## 7-1普通符号
符号是ES6新增的一个数据类型，它通过使用函数 `Symbol(符号描述)` 来创建



创建一个符号



```javascript
const syb1 = Symbol();
const syb2 = Symbol("abc");//描述信息
console.log(syb1, syb2);
```



英雄攻击实例：里面的随机数没必要展示在外面：大道至简



```javascript
const hero = {
    attack: 30,
    hp: 300,
    defence: 10,
    gongji() { //攻击
        //伤害：攻击力*随机数（0.8~1.1)
        const dmg = this.attack * this.getRandom(0.8, 1.1);
        console.log(dmg);
    },
    getRandom(min, max) { //根据最小值和最大值产生一个随机数,这个方法没必要展示
        return Math.random() * (max - min) + min;
    }
}
```



优化



```javascript
class Hero {
    constructor(attack, hp, defence) {
        this.attack = attack;
        this.hp = hp;
        this.defence = defence;
    }

    gongji() {
        //伤害：攻击力*随机数（0.8~1.1)
        const dmg = this.attack * this.getRandom(0.8, 1.1);
        console.log(dmg);
    }

    getRandom(min, max) { //根据最小值和最大值产生一个随机数
        return Math.random() * (max - min) + min;
    }
}
```





符号设计的初衷，是为了给对象设置**私有**属性

私有属性：只能在对象内部使用，外面无法使用

符号具有以下特点：



+ 没有字面量:（字面量是直接书写出来）
+ 使用 typeof 得到的类型是 symbol



```javascript
//创建一个符号
const syb1 = Symbol();
const syb2 = Symbol("abc");
console.log(syb1, syb2);
console.log(typeof syb1 === "symbol", typeof syb2 === "symbol")
```



+ **每次调用 Symbol 函数得到的符号永远不相等，无论符号名是否相同**



```javascript
//创建一个符号

const syb1 = Symbol("这是随便写的一个符号");//描述信息
const syb2 = Symbol("这是随便写的一个符号");

console.log(syb1, syb2);
console.log(syb1 === syb2)//false
```



+ 在符号之前，所有的属性名一定是字符串。符号可以作为对象的属性名存在，这种属性称之为符号属性



```javascript
const syb1 = Symbol("这是用于对象的一个属性");

const obj = {
    a: 1,
    b: 2,
    [syb1]: 3  //符号属性
}

console.log(obj);
```



1. 开发者可以通过精心的设计，让这些属性无法通过常规方式被外界访问



```javascript
const hero = (function () {
    const getRandom = Symbol();

    return {
        attack: 30,
        hp: 300,
        defence: 10,
        gongji() { //攻击
            //伤害：攻击力*随机数（0.8~1.1)
            const dmg = this.attack * this[getRandom](0.8, 1.1);
            console.log(dmg);
        },
        [getRandom](min, max) { //根据最小值和最大值产生一个随机数
            return Math.random() * (max - min) + min;
        }
    }
})()

console.log(hero);
```



类的写法



```javascript
const Hero = (() => {
    const getRandom = Symbol();

    return class {
        constructor(attack, hp, defence) {
            this.attack = attack;
            this.hp = hp;
            this.defence = defence;
        }

        gongji() {
            //伤害：攻击力*随机数（0.8~1.1)
            const dmg = this.attack * this[getRandom](0.8, 1.1);
            console.log(dmg);
        }

        [getRandom](min, max) { //根据最小值和最大值产生一个随机数
            return Math.random() * (max - min) + min;
        }
    }
})();

const h = new Hero(3, 6, 3);
console.log(h);
```



2. 符号属性是不能枚举的，因此在 for-in 循环中无法读取到符号属性，Object.keys 方法也无法读取到符号属性



```javascript
const syb = Symbol();
const obj = {
    [syb]: 1,
    a: 2,
    b: 3
}
for (const prop in obj) {
    console.log(prop)//只能输出a,b
}
console.log(Object.keys(obj))
console.log(Object.getOwnPropertyNames(obj))
//得到的是一个符号属性的数组
const sybs = Object.getOwnPropertySymbols(obj);
console.log(sybs, sybs[0] === syb)
```



3. Object.getOwnPropertyNames 尽管可以得到所有无法枚举的属性，但是仍然无法读取到符号属性
4. ES6 新增 Object.getOwnPropertySymbols 方法，可以读取符号



非常规方式读取符号



```javascript
const Hero = (() => {
    const getRandom = Symbol();

    return class {
        constructor(attack, hp, defence) {
            this.attack = attack;
            this.hp = hp;
            this.defence = defence;
        }

        gongji() {
            //伤害：攻击力*随机数（0.8~1.1)
            const dmg = this.attack * this[getRandom](0.8, 1.1);
            console.log(dmg);
        }

        [getRandom](min, max) { //根据最小值和最大值产生一个随机数
            return Math.random() * (max - min) + min;
        }
    }
})();

const h = new Hero(3, 6, 3);
const sybs = Object.getOwnPropertySymbols(Hero.prototype);
const prop = sybs[0];
console.log(h[prop](3, 5))
```



+ 符号无法被隐式转换，因此不能被用于数学运算、字符串拼接或其他隐式转换的场景，但符号可以显式的转换为字符串，通过 String 构造函数进行转换即可，console.log 之所以可以输出符号，是它在内部进行了显式转换



```javascript
const syb = Symbol();
console.log(syb*2);
console.log(syb+'2');
```



显示转换



```javascript
const syb = Symbol();
const str = String(syb);
console.log(str);
```



## 7-2共享符号


根据某个符号名称（符号描述）能够得到同一个符号



```javascript
Symbol.for("符号名/符号描述")  //获取共享符号
```



应用



```javascript
const syb1 = Symbol.for("abc");
const syb2 = Symbol.for("abc");
都不填符号或都填一样的都是true
console.log(syb1 === syb2)
const obj1 = {
    a: 1,
    b: 2,
    [syb1]: 3
}

const obj2 = {
    a: "a",
    b: "b",
    [syb2]: "c"
}

console.log(obj1, obj2);
```



应用



```javascript
const obj = {
    a: 1,
    b: 2,
    [Symbol.for("c")]: 3
}
console.log(obj[Symbol.for("c")]);
```



实现共享符号底层原理



```javascript
const SymbolFor = (() => {
    const global = {};//用于记录有哪些共享符号
    return function (name) {
        console.log(global)
        if (!global[name]) {
            global[name] = Symbol(name);
        }
        console.log(global);
        return global[name];
    }
})();

const syb1 = SymbolFor("abc");

const syb2 = SymbolFor("abc");

console.log(syb1 === syb2);
```



## 7-3知名**（公共、具名）**符号


知名符号是一些具有特殊含义的共享符号，通过 Symbol 的静态属性得到



ES6 延续了 ES5 的思想：减少魔法，暴露内部实现！



因此，ES6 用知名符号暴露了某些场景的内部实现



1. Symbol.hasInstance



该符号用于定义构造函数的静态成员，它将影响 instanceof 的判定



```javascript
obj instanceof A
//等效于
A[Symbol.hasInstance](obj) // Function.prototype[Symbol.hasInstance]
```



演示参与改动



```javascript
function A() {

}
Object.defineProperty(A, Symbol.hasInstance, {//更改A的Symbol.hasInstance属性
    value: function (obj) {
        return false;
    }
})
const obj = new A();
console.log(obj instanceof A);
//内部实现 console.log(A[Symbol.hasInstance](obj));
```



2. [扩展] Symbol.isConcatSpreadable



该知名符号会影响数组的 concat 方法



```javascript
const arr = [3];
const result = arr.concat(56, arr2)
/*两种可能*/
//  [3, 56, [5,6,7,8]]
//  [3, 56, 5, 6, 7, 8]结果是分割处理 
console.log(result)
```



要想不分割



```javascript
const arr = [3];
const arr2 = [5, 6, 7, 8];
arr2[Symbol.isConcatSpreadable] = false;
const result = arr.concat(56, arr2)
console.log(result)
```



以此，也可以应用到对象



```javascript
const arr = [1];
const obj = {
    0: 3,
    1: 4,
    length: 2,
    [Symbol.isConcatSpreadable]: true
}
const result = arr.concat(2, obj)
console.log(result)
```



3. [扩展] Symbol.toPrimitive



```javascript
var obj = {
  a:1,
  b:2
}
// 先调用valueOf后toString
console.log(obj.valueOf());//拿不到基本类型
console.log(obj.toString())//可以拿到基本类型
console.log(obj + 1)
```

更改内部实现

```javascript
var obj = {
  a:1,
  b:2
}
obj[Symbol.toPrimitive] = function () {
  return 2;
}
console.log(obj + 1)
```

该知名符号会影响类型转换的结果



```javascript
class Temperature {
    constructor(degree) {
        this.degree = degree;
    }

    [Symbol.toPrimitive](type) {
        if (type === "default") {
            return this.degree + "摄氏度";
        }
        else if (type === "number") {
            return this.degree;
        }
        else if (type === "string") {
            return this.degree + "℃";
        }
    }
}

const t = new Temperature(30);

console.log(t + "!");
console.log(t / 2);
console.log(String(t));
```



4. [扩展] Symbol.toStringTag



该知名符号会影响 Object.prototype.toString 的返回值



```javascript
class Person {
    [Symbol.toStringTag] = "Person"
}

const p = new Person();

const arr = [32424, 45654, 32]

console.log(Object.prototype.toString.apply(p));
console.log(Object.prototype.toString.apply(arr))
```



5. 其他知名符号



# 8. 异步处理
[https://sunny-117.github.io/blog/js/%E5%BC%82%E6%AD%A5%E5%A4%84%E7%90%86.html](https://sunny-117.github.io/blog/js/%E5%BC%82%E6%AD%A5%E5%A4%84%E7%90%86.html)



# 9.FetchApi
## 9-1. Fetch Api 概述
XMLHttpRequest的问题

1. 所有的功能全部集中在同一个对象上，容易书写出混乱不易维护的代码
2. 采用传统的事件驱动模式，无法适配新的 Promise Api

Fetch Api 的特点

1. 并非取代 AJAX，而是对 AJAX 传统 API 的改进
2. 精细的功能分割：头部信息、请求信息、响应信息等均分布到不同的对象，更利于处理各种复杂的 AJAX 场景
3. 使用 Promise Api，更利于异步代码的书写
4. <font style="color:#F5222D;">Fetch Api 并非 ES6 的内容，属于 HTML5 新增的 Web Api</font>
5. 需要掌握网络通信的知识

## 9-2基本使用


使用 `fetch` 函数即可立即向服务器发送网络请求

参数

该函数有两个参数：

1. 必填，字符串，请求地址
2. 选填，对象，请求配置

• method：字符串，请求方法，默认值 GET

• headers：对象，请求头信息

• body: 请求体的内容，必须匹配请求头中的 Content-Type

• mode：字符串，请求模式

• cors：默认值，配置为该值，会在请求头中加入 origin 和 referer。默认允许跨域

• no-cors：配置为该值，不会在请求头中加入 origin 和 referer，跨域的时候可能会出现问题

• same-origin：指示请求必须在同一个域中发生，如果请求其他域，则会报错

• credentials: 如何携带凭据（cookie）

• omit：默认值，不携带 cookie

• same-origin：请求同源地址时携带 cookie

• include：请求任何地址都携带 cookie

• cache：配置缓存模式

• default: 表示 fetch 请求之前将检查下 http 的缓存.

• no-store: 表示 fetch 请求将完全忽略 http 缓存的存在. 这意味着请求之前将不再检查下 http 的缓存, 拿到响应后, 它也不会更新 http 缓存.

• no-cache: 如果存在缓存, 那么 fetch 将发送一个条件查询 request 和一个正常的 request, 拿到响应后, 它会更新 http 缓存.

• reload: 表示 fetch 请求之前将忽略 http 缓存的存在, 但是请求拿到响应后, 它将主动更新 http 缓存.

• force-cache: 表示 fetch 请求不顾一切的依赖缓存, 即使缓存过期了, 它依然从缓存中读取. 除非没有任何缓存, 那么它将发送一个正常的 request.

• only-if-cached: 表示 fetch 请求不顾一切的依赖缓存, 即使缓存过期了, 它依然从缓存中读取. 如果没有缓存, 它将抛出网络错误(该设置只在 mode 为”same-origin”时有效).

返回值

ajax是靠回调函数；xhr是靠readStateChange

<font style="color:#F5222D;">fetch 函数返回一个 Promise 对象</font>

• 当收到服务器的<font style="background-color:#FADB14;">返回结果后（只要是有结果就行，不管成功还是失败）</font>，Promise 进入 resolved 状态，状态数据为 Response 对象

• 当网络发生错误（或其他导致无法完成交互的错误）时，Promise 进入 rejected 状态，状态数据为错误信息

拿到所有省份数据

```javascript
async function getPromises() {
  const url = "http://101.132.72.36:5100/api/local";
  //GET请求数据在地址栏里面，POST请求数据在请求体里面
  const config = {
    method: "GET",
    headers: {
     "Content-Type": "application/json"//这里写了json格式，body里面就要用json格式(HTTP协议规定)
      a: 1，//也可以自定义
    }
  }
  try {
    const resp = await fetch(url, config)
    // console.log(resp)
    const result = await resp.text()// 解析成文本
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}
getPromises()
```

简化一下

```javascript
async function getPromises() {
  const url = "http://101.132.72.36:5100/api/local";
  const resp = await fetch(url)
  const result = await resp.text()
  console.log(result)
}
getPromises()
```

• ok：boolean，当响应消息码在 200~299 之间时为 true，其他为 false

• status：number，响应的状态码

• text()：用于处理文本格式的 Ajax 响应。它从响应中获取文本流，将其读完，然后返回一个被解决为 string 对象的 Promise。（异步的）

• blob()：用于处理二进制文件格式（比如图片或者电子表格）的 Ajax 响应。它读取文件的原始数据，一旦读取完整个文件，就返回一个被解决为 blob 对象的 Promise。

• json()：用于处理 JSON 格式的 Ajax 的响应。它将 JSON 数据流转换为一个被解决为 JavaScript 对象的 promise。

• redirect()：可以用于重定向到另一个 URL。它会创建一个新的 Promise，以解决来自重定向的 URL 的响应。

## 9-3Request 对象
<font style="color:rgb(36, 41, 46);">除了使用基本的fetch方法，还可以通过创建一个Request对象来完成请求（实际上，fetch的内部会帮你创建一个Request对象）</font>

```javascript
new Request(url地址, 配置)
```

<font style="color:rgb(36, 41, 46);">注意点：尽量保证每次请求都是一个新的Request对象</font>

```javascript
let req;
function getRequestInfo() {//得到request对象
  if (!req) {//没有的话，创建一个
    const url = "http://101.132.72.36:5100/api/local";
    req = new Request(url, {});
    console.log(req);
  }
  // 尽量保证每次请求都是一个新的Request对象
  return req.clone(); //克隆一个全新的request对象，配置一致
}
async function getProvinces() {
  const resp = await fetch(getRequestInfo())
  const result = await resp.json();
  console.log(result)
}
```

## 9-4 Response对象
```javascript
let req;
function getRequestInfo() {
  if (!req) {
    const url = "http://101.132.72.36:5100/api/local";
    req = new Request(url, {});
    console.log(req);
  }
  return req.clone(); //克隆一个全新的request对象，配置一致
}
async function getProvinces() {
  // const resp = await fetch(getRequestInfo()) 请求服务器
  // 模拟服务器相应结果：测试用的数据用Response构建
  const resp = new Response(`[
{"id":1, "name":"北京"},
{"id":2, "name":"天津"}
]`, {// 配置
    ok: true,
    status: 200
  })
  const result = await getJSON(resp);
  console.log(result)
}
async function getJSON(resp) {
  const json = await resp.json();
  return json;
}
```

## 9-5 Headers对象
<font style="color:rgb(51, 51, 51);">在Request和Response对象内部，会将传递的请求头对象，转换为Headers</font>

<font style="color:rgb(51, 51, 51);">Headers对象中的方法：</font>

+ <font style="color:rgb(51, 51, 51);">has(key)：检查请求头中是否存在指定的key值</font>
+ <font style="color:rgb(51, 51, 51);">get(key): 得到请求头中对应的key值</font>
+ <font style="color:rgb(51, 51, 51);">set(key, value)：修改对应的键值对。不存在就会新增</font>
+ <font style="color:rgb(51, 51, 51);">append(key, value)：添加对应的键值对。如果添加的一样，就会逗号分隔成两个值</font>
+ <font style="color:rgb(51, 51, 51);">keys(): 得到所有的请求头键的集合</font>
+ <font style="color:rgb(51, 51, 51);">values(): 得到所有的请求头中的值的集合</font>
+ <font style="color:rgb(51, 51, 51);">entries(): 得到所有请求头中的键值对的集合</font>

```javascript
let req;

function getCommonHeaders() {
  return new Headers({
    a: 1,
    b: 2
  })
}
function printHeaders(headers) {
  const datas = headers.entries();
  for (const pair of datas) {
    console.log(`key: ${pair[0]}，value: ${pair[1]}`);
  }
}

function getRequestInfo() {
  if (!req) {
    const url = "http://101.132.72.36:5100/api/local";
    const headers = getCommonHeaders();
    headers.set("a", 3)
    req = new Request(url, {
      headers
    });
    printHeaders(headers);
  }
  return req.clone(); 
}

async function getProvinces() {	
  const resp = await fetch(getRequestInfo())
  printHeaders(resp.headers);
  const result = await getJSON(resp);
  console.log(result)
}

async function getJSON(resp) {
  const json = await resp.json();
  return json;
}
```

## 9-6 文件上传
<font style="color:rgb(51, 51, 51);">流程：</font>

1. <font style="color:rgb(51, 51, 51);">客户端将文件数据发送给服务器</font>
2. <font style="color:rgb(51, 51, 51);">服务器保存上传的文件数据到服务器端</font>
3. <font style="color:rgb(51, 51, 51);">服务器响应给客户端一个文件访问地址</font>

<font style="color:rgb(119, 119, 119);">测试地址：</font>[http://101.132.72.36:5100/api/upload](http://101.132.72.36:5100/api/upload)

<font style="color:rgb(119, 119, 119);">键的名称（表单域名称）：imagefile</font>

<font style="color:rgb(51, 51, 51);">请求方法：</font><font style="color:#F5222D;">POST</font>

<font style="color:rgb(51, 51, 51);">请求的表单格式：multipart/form-data	</font>

<font style="color:rgb(51, 51, 51);">请求体中必须包含一个键值对，键的名称是服务器要求的名称，值是文件数据</font>

<font style="color:rgb(119, 119, 119);">HTML5中，JS仍然无法随意的获取文件数据，但是可以获取到input元素中，被用户选中的文件数据</font>

<font style="color:rgb(119, 119, 119);">自己创建请求体很麻烦，所以可以利用HTML5提供的FormData构造函数来创建请求体</font>

```html
<img src="" alt="" id="imgAvatar">
<input type="file" id="avatar">
<button>上传</button>
<script>
  async function upload() {
    const inp = document.getElementById("avatar");
    if (inp.files.length === 0) {
      alert("请选择要上传的文件");
      return;
    }
    const formData = new FormData(); //构建请求体
    formData.append("imagefile", inp.files[0]);
    const url = "http://101.132.72.36:5100/api/upload"
    const resp = await fetch(url, {
      method: "POST",
      body: formData //自动修改请求头，自动完成了headers:{"Content-Type":"multipart/form-data"}
    });
    const result = await resp.json();
    return result;
  }

  document.querySelector("button").onclick = async function () {
    const result = await upload();
    console.log(result)
    const img = document.getElementById("imgAvatar")
    img.src = result.path;
  }
</script>
```

文件保存的地址：

<!-- 这是一张图片，ocr 内容为：Performance Console Elements Memory Network Security Lighthouse Application JavaScri Sources Disablecache Nothrottling Preservelog Hasblockedcookies DocWsManifestOther HidedataURLsAll Media Font XHR csSImg Filter JS 180ms 200ms 20ms 100ms 40ms 120ms 60ms 160ms 140ms 80ms xHeaders lnitiator Timing Response Name Preview ["path":"http://imagesyuanjin.te njin.tech/FmRAdm3qoG6B-oeKZ5oz_Rzi upload -->
![](https://cdn.nlark.com/yuque/0/2021/png/758572/1619001506137-e543142b-6691-49de-a797-ff87ec7e1cf4.png)





# 10.迭代器和生成器
[https://sunny-117.github.io/blog/js/%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%92%8C%E7%94%9F%E6%88%90%E5%99%A8.html](https://sunny-117.github.io/blog/js/%E8%BF%AD%E4%BB%A3%E5%99%A8%E5%92%8C%E7%94%9F%E6%88%90%E5%99%A8.html)

# 11.更多的集合类型
## 11-1. set集合
> 一直以来，JS只能使用数组和对象来保存多个数据，缺乏像其他语言那样拥有丰富的集合类型。因此，ES6新增了两种集合类型（set 和 map），用于在不同的场景中发挥作用。
>

**set用于存放不重复的数据**

1. 如何创建set集合

```javascript
new Set(); //创建一个没有任何内容的set集合
new Set(iterable); //创建一个具有初始内容的set集合，内容来自于可迭代对象每一次迭代的结果
```

演示

```javascript
const set1 = new Set();
console.log(set1);
const set2 = new Set([1, 2, 3, 3, 4, 4, 5, 6]);//简单的数组去重
console.log(set2);
const s2 = new Set("asdfasfasf");//会把字符串转成string对象，string对象可迭代
console.log(s2);
```

2. 如何对set集合进行后续操作
+ add(数据): 添加一个数据到set集合末尾，如果数据已存在，则不进行任何操作
    - set使用Object.is的方式判断两个数据是否相同，<font style="color:#F5222D;">但是</font>，针对+0和-0，set认为是相等
    - Object.is(+0,-0)----false
+ has(数据): 判断set中是否存在对应的数据
+ delete(数据)：删除匹配的数据，返回是否删除成功
+ clear()：清空整个set集合
+ size: 获取set集合中的元素数量，只读属性，无法重新赋值
3. 如何与数组进行相互转换

```javascript
const s = new Set([x,x,x,x,x]);
// set本身也是一个可迭代对象，每次迭代的结果就是每一项的值
const arr = [...s];
```

数组去重、字符串去重

```javascript
const arr = [45, 7, 2, 2, 34, 46, 6, 57, 8, 55, 6, 46];
const result = [...new Set(arr)];
console.log(result);
const str = "asf23sdfgsdgfsafasdfasfasfasfsafsagfdsfg";
const s = [...new Set(str)].join("");// 转成数组后转成字符串
console.log(s);
```

> 现有字符串”aaabbbcccdddeefggaa”，转换成连续不重复的字符串例如：abcdefga。（用正则写满分，其他方法酌情给分）（10分）
>

```javascript
var reg = /(\w)\1*/g
var str = "aaabbbcccdddeefggaa";
console.log(str.replace(reg, '$1'))
```

4. 如何遍历

1). 使用for-of循环

```javascript
const s1 = new Set();
for (const item of s1) {
  console.log(item)
}
```

2). 使用set中的实例方法forEach

```javascript
s1.forEach((item, index, s) => {
  console.log(item, index, s);
})
console.log(s1);
console.log("总数为：", s1.size);
```

注意：set集合中不存在下标，<font style="color:#F5222D;">因此forEach中的回调的第二个参数和第一个参数是一致的，均表示set中的每一项</font>

## 11-2. set应用
```javascript
// 两个数组的并集、交集、差集 （不能出现重复项），得到的结果是一个新数组
const arr1 = [33, 22, 55, 33, 11, 33, 5];
const arr2 = [22, 55, 77, 88, 88, 99, 99];
```

并集

        去掉各自里面重复的和他们合起来重复的

```javascript
// 写法1
const s = new Set(arr1.concat(arr2));// 连起来在去重
const result = [...s];
console.log(result);
// 写法2
const result = [...new Set(arr1.concat(arr2))];
console.log('并集', result);
// 写法3
console.log("并集", [...new Set([...arr1, ...arr2])]);
```

<font style="color:#88846f;">交集</font>

```javascript
const s1 = new Set(arr1);
const s2 = new Set(arr2);
// 方法1
// [...s1].filter(item => {
//     return s2.has(item);
// })
// 方法2
// [...s1].filter(item => {
//     return arr2.indexOf(item) >= 0
// })
// 方法3
// const cross = [...new Set(arr1)].filter(item => arr2.indexOf(item) >= 0);
// console.log("交集", cross)
```

差集

```javascript
// console.log("差集", [...new Set([...arr1, ...arr2])].filter(item => arr1.indexOf(item) >= 0 && arr2.indexOf(item) < 0 || arr2.indexOf(item) >= 0 && arr1.indexOf(item) < 0))
console.log("差集", [...new Set([...arr1, ...arr2])].filter(item => cross.indexOf(item) < 0))//交集里面没有的
```



## 11-4. map集合
键值对（key value pair）数据集合的特点：<font style="color:#F5222D;">键不可重复</font>

map集合专门用于存储多个键值对数据。

在map出现之前，我们使用的是对象的方式来存储键值对，键是属性名，值是属性值。

使用对象存储有以下问题：

1. 键名只能是字符串（或符号）
2. 获取数据的数量不方便
3. 键名容易跟原型上的名称冲突
4. 如何创建map

```javascript
new Map(); //创建一个空的map
new Map(iterable); //创建一个具有初始内容的map，初始内容来自于可迭代对象每一次迭代的结果，但是，它要求每一次迭代的结果必须是一个长度为2的数组，数组第一项表示键，数组的第二项表示值
```

```javascript
const mp1 = new Map([["a", 3], ["b", 4], ["c", 5]]);
```

2. 如何进行后续操作
+ size：只读属性，获取当前map中键的数量
+ set(键, 值)：设置一个键值对，键和值可以是任何类型
    - 如果键不存在，则添加一项
    - 如果键已存在，则修改它的值,覆盖
    - 比较键的方式和set相同
+ get(键): 根据一个键得到对应的值
+ has(键)：判断某个键是否存在
+ delete(键)：删除指定的键
+ clear(): 清空map

```javascript
const mp1 = new Map([["a", 3], ["b", 4], ["c", 5]]);
console.log("总数：", mp1.size);
console.log("get('a')", mp1.get("a"));
console.log("has('a')", mp1.has("a"));
```



```javascript
这是两个，因为对象-地址
mp1.set({}, 232);
mp1.set({}, 111);
要想是一个
var obj = {}
mp1.set(obj, 6456);
mp1.set(obj, 111);
```

3. 和数组互相转换

和set一样

```javascript
const mp = new Map([
  ["a", 3],
  ["c", 10],
  ["b", 4],
  ["c", 5]
]);
const result = [...mp]
console.log(result);
```

4. 遍历
+ for-of，每次迭代得到的是一个长度为2的数组
+ forEach，通过回调函数遍历
    - 参数1：每一项的值
    - 参数2：每一项的键
    - 参数3：map本身

```javascript
// for (const [key, value] of mp) {
//     console.log(key, value)
// }
mp.forEach((value, key, mp) => {
  console.log(value, key, mp)
})
```



## 11-6. [扩展]WeakSet和WeakMap
### WeakSet
```javascript
let obj = {
 	name:"yj",
  age:18
}
const set  = new Set();
set.add(obj);
obj = null;//请问此时set里面的对象还在吗？？在。
console.log(obj)
```

使用该集合，可以实现和set一样的功能，不同的是：

1. **它内部存储的对象地址****<font style="color:#F5222D;">不会影响垃圾回收</font>**

```javascript
let obj = {
  name: "yj",
  age: 18
};
const set = new WeakSet();
set.add(obj);
obj = null;
console.log(set);
```

2. 只能添加对象
3. 不能遍历（不是可迭代的对象）、没有size属性、没有forEach方法

```javascript
let obj = {
  name: "yj",
  age: 18
};
let obj2 = obj;
const set = new WeakSet();
set.add(obj);

obj = null;
//obj2 = null;
console.log(set)
```

### WeakMap
```html
<ul>
  <!-- { id:"1", name:"姓名1" } -->
  <li>1</li>
  <!-- { id:"2", name:"姓名2" } -->
  <li>2</li>
  <!-- { id:"3", name:"姓名3" } -->
  <li>3</li>
</ul>
<script>
  const wmap = new WeakMap();
  let lis = document.querySelectorAll("li");
  for (const li of lis) {
    wmap.set(li, {
      id: li.innerHTML,
      name: `姓名${li.innerHTML}`
    });
  }
  lis[0].remove();
  lis = null;
  console.log(wmap);
</script>
```

类似于map的集合，不同的是：

1. **它的键存储的地址不会影响垃圾回收**
2. 它的键只能是对象
3. 不能遍历（不是可迭代的对象）、没有size属性、没有forEach方法

# 12. 代理与反射
[https://sunny-117.github.io/blog/](https://sunny-117.github.io/blog/)

# 13. 增强的数组功能
## 13-1. 新增的数组API
### 静态方法
+ Array.of(...args): 使用指定的数组项创建一个新数组

```javascript
const arr = Array.of(1,2,3,4,5);
const arr = new Array(1,2,3,4,5)
// 作用一样为什么要出新的API呢？主要为了解决只有一个参数的时候
```

+ Array.from(arg): 通过给定的<font style="color:#F5222D;">类数组</font> 或 可迭代对象 创建一个新的数组。

之前类数组转换成数组：Array.prototype.slice.call(divs, 0)

```html
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
<script>
  const divs = document.querySelectorAll("div")// 类数组，原形不是Array，不是Array构造出来的
  const result = Array.from(divs)
  console.log(result);
</script>
```

### 实例方法
+ find(callback): 用于查找满足条件的<font style="color:#F5222D;">第一个元素</font>
+ findIndex(callback)：用于查找满足条件的第一个元素的<font style="color:#F5222D;">下标</font>

```javascript
const arr = [
  {
    name: "a",
    id: 1
  },
  {
    name: "b",
    id: 2
  },
  {
    name: "c",
    id: 3
  },
  {
    name: "d",
    id: 4
  },
  {
    name: "e",
    id: 5
  },
  {
    name: "f",
    id: 6
  },
  {
    name: "g",
    id: 7
  }
]

//找到id为5的对象
const result = arr.find(item => {
  if(item.id === 5)	return true;
  else return false
})
简写
const result = arr.find(item => item.id === 5)
const resultIndex = arr.findIndex(item => item.id === 5)

console.log(result, resultIndex);
```

+ fill(data)：用指定的数据填充满数组所有的内容

```javascript
// 创建了一个长度为100的数组，数组的每一项是"abc"
const arr = new Array(100);
arr.fill("abc");
```

+ copyWithin(target, start?, end?): 在数组内部完成复制

```javascript
const arr = [1, 2, 3, 4, 5, 6];
//从下标2开始，改变数组的数据，数据来自于下标0位置开始
// arr.copyWithin(2); // [1, 2, 1, 2, 3, 4]
// arr.copyWithin(2, 1); // [1, 2, 2, 3, 4, 5]第二个参数：从哪个位置复制数据
// arr.copyWithin(2, 1, 3); // [1, 2, 2, 3, 5, 6]第三个参数在哪个位置复制停止
console.log(arr)
```

+ includes(data)：判断数组中是否包含某个值，使用Object.is匹配

```javascript
const arr = [45, 21, 356, 66 , 6, NaN, 723, 54];

console.log(arr.indexOf(66) >= 0)
console.log(arr.includes(NaN));
```

## 13-2. [扩展]类型化数组
### 数字存储的前置知识
1. 计算机必须使用<font style="color:#F5222D;">固定的位数</font>来存储数字，无论存储的数字是大是小，在内存中占用的空间是固定的。
2. n位的无符号整数能表示的数字是2^n个，取值范围是：0 ~ 2^n - 1
3. n位的有符号整数能表示的数字是2<sup>n个，取值范围是：-2</sup>(n-1) ~ 2^(n-1) - 1
4. 浮点数表示法可以用于表示整数和小数，目前分为两种标准：
    1. 32位浮点数：又称为单精度浮点数，它用1位表示符号，8位表示阶码，23位表示尾数
    2. 64位浮点数：又称为双精度浮点数，它用1位表示符号，11位表示阶码，52位表示尾数
5. JS中的所有数字，均使用双精度浮点数保存

### 类型化数组
类型化数组：用于优化多个数字的存储

具体分为：

+ Int8Array： 8位有符号整数（-128 ~ 127）
+ Uint8Array： 8位无符号整数（0 ~ 255）
+ Int16Array: ...
+ Uint16Array: ...
+ Int32Array: ...
+ Uint32Array: ...
+ Float32Array:
+ Float64Array
1. 如何创建数组



```javascript
new 数组构造函数(长度)

数组构造函数.of(元素...)

数组构造函数.from(可迭代对象)

new 数组构造函数(其他类型化数组)
```



2. 得到长度



```javascript
数组.length   //得到元素数量
数组.byteLength //得到占用的字节数
```



3. 其他的用法跟普通数组一致，但是：
+ 不能增加和删除数据，类型化数组的长度固定
+ 一些返回数组的方法，返回的数组是同类型化的新数组

```javascript
// const arr = new Int32Array(10);
const arr = Uint8Array.of(12, 5, 6, 7);
console.log(arr);
// console.log(arr.length);
// console.log(arr.byteLength);
```



```javascript
const arr1 = Int32Array.of(35111, 7, 3, 11);

const arr2 = new Int8Array(arr1);

console.log(arr1 === arr2);
console.log(arr1, arr2);
```



```javascript
const arr = Int8Array.of(125, 7, 3, 11);
const arr2 = arr.map(item => item * 2)
console.log(arr2);

// arr[1] = 100;
// console.log(arr);
// console.log(arr[1])
// for (const item of arr) {
//     console.log(item)
// }

// arr[4] = 1000; //增加无效
// delete arr[0]; //删除无效
// console.log(arr)
```

## 13-3. [扩展]ArrayBuffer
### ArrayBuffer


ArrayBuffer：一个对象，用于存储一块固定内存大小的数据。



```javascript
new ArrayBuffer(字节数)
```



可以通过属性`byteLength`得到字节数，可以通过方法`slice`得到新的ArrayBuffer

```javascript
//创建了一个用于存储10个字节的内存空间
const bf = new ArrayBuffer(10);
const bf2 = bf.slice(3, 5);//起始的字节数，结束的字节数，不填默认赋值旧数组
console.log(bf, bf2);
```

### 读写ArrayBuffer
1. 使用DataView

通常会在需要混用多种存储格式时使用DataView

2. 使用类型化数组

实际上，每一个类型化数组都对应一个ArrayBuffer，如果没有手动指定ArrayBuffer，类型化数组创建时，会新建一个ArrayBuffer

```javascript
//创建了一个用于存储10个字节的内存空间
const bf = new ArrayBuffer(10);
const view = new DataView(bf, 3, 4);// 偏移量3，操作4
// console.log(view);
view.setInt16(1, 3);// 设置
console.log(view);
console.log(view.getInt16(1));// 读取数据
```

类型化数组

```javascript
const bf = new ArrayBuffer(10); //10个字节的内存
const arr1 = new Int8Array(bf);
const arr2 = new Int16Array(bf);
console.log(arr1 === arr2);// 类型化数组不一样
console.log(arr1.buffer === arr2.buffer);// 操作的内存空间一样
// 操作
arr1[0] = 10;
console.log(arr1)
console.log(arr2);
```

```javascript
const bf = new ArrayBuffer(10); //10个字节的内存
const arr = new Int16Array(bf);
arr[0] = 2344; //操作了两个字节
console.log(arr);
```

## 13-4. [扩展]制作黑白图片
```javascript
async function test() {
      const resp = await fetch("./img/liao.jpg");
      // console.log(resp);
      const blob = await resp.blob(); // 图片数据是二进制格式，文件信息,要用blob访问
      // console.log(blob);
      const bf = await blob.arrayBuffer();
      // console.log(bf);
      const arr = new Int8Array(bf, 3, 2); //可以设置处理
      console.log(arr);
    }
    test();
```



```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>

  <body>
    <div style="display: flex">
      <img src="./img/liao.jpg" alt="" />
      <button onclick="change()">转换</button>
      <canvas width="100" height="117"></canvas>
    </div>

    <script>
      /*
       * 画布中的1个图像是由多个像素点组成，每个像素点拥有4个数据：红、绿、蓝、alpha
       * 把一个图像变成黑白，只需要将图像的每个像素点设置成为红绿蓝的平均数即可
       */

      function change() {
        const img = document.querySelector("img");
        const cvs = document.querySelector("canvas");
        const ctx = cvs.getContext("2d");
        ctx.drawImage(img, 0, 0);
        //得到画布某一个区域的图像信息
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        console.log(imageData);
        // // 150 100 50  平均值100-> 都设置成100
        for (let i = 0; i < imageData.data.length; i += 4) {
          //   //循环一个像素点
          const r = imageData.data[i];
          const g = imageData.data[i + 1];
          const b = imageData.data[i + 2];
          const avg = (r + g + b) / 3; // 平均
          imageData.data[i] =
            imageData.data[i + 1] =
            imageData.data[i + 2] =
              avg;
        }
        // //将图像数据设置到画布
        ctx.putImageData(imageData, 0, 0);
      }
    </script>
  </body>
</html>

```



# ECMAScript++
1. **Math.pow —— ES2015**

**2. Object.entries Object.values —— ES2015**

**3. ES2019新增数组API**  
Array.prototype.flat  
该函数可以将某个数组拍扁  
Array.prototype.flatMap

示例1：利用flatMap在map期间去掉一些数据

```javascript
const arr = [1, 2, 3, 4, 5];

/*
    [
        {number:1, doubleNumber: 2},
        {number:3, doubleNumber: 6},
        {number:5, doubleNumber: 10},
    ]
*/
```

写法1

```javascript
const arr = [1, 2, 3, 4, 5];
var newArr = [];
for(const item of arr){
  if(item % 2 !== 0){
    newArr.push({
      number:item,
      doubleNum:item*2
    })
  }
}
console.log(newArr)
```

写法2：先筛选后映射

```javascript
var result = arr
.filter((it) => it % 2 === 1)
.map((it) => ({number:it, doubleNumber:it*2}));
console.log(result);
```

不建议的方法3

```javascript
var result  = arr
.map((it) => (it%2===1?{number:it,doubleNumber:it*2}:[]))
.flat();	
console.log(result);
//等价于
var result  = arr.flatMap((it) => it%2===1?{number:it,doubleNumber:it*2}:[])
console.log(result);
```

  
示例2：利用flatMap分割一个单词数组

```javascript
const arr = [
  "Yestoday is a History",
  "Tomorrow is a Mystery",
  "Today is a Gift",
  "That's why we call it the Present"
];
/*
    ["Yestoday", "is", "a", "History", "Tomorrow", ...]
*/
```

写法1：  


```javascript
const arr = [
    "Yestoday is a History",
    "Tomorrow is a Mystery",
    "Today is a Gift",
    "That's why we call it the Present"
];
var result = arr.map((it) => it.split(" "));
//console.log(result);
var result = arr.map((it) => it.split(" ")).flat();
console.log(result)
// 等价于
var result = arr.flatMap((it) => it.split(""));
```

  
Object.fromEntries

```javascript
Object.fromEntries(iterable)
```

它接收一个可迭代对象，该对象每次迭代必须返回一个包含两项数据的数组（参考map），该函数会将第一项作为对象的属性名，第二项作为对象的属性值

```javascript
const arr = [["a", 1], ["b", 2]]
Object.fromEntries(arr); // {a:1, b:2}
```

示例：

```javascript
function localMoneyFomat(obj){
  //略
}

var obj = {
  name:"xxx",
  balance: 199.8, //余额
  taken: 3000 //消费
}
localMoneyFomat(obj); // {name:"xxx", balance:"￥199.8", taken: "￥3000"}
```

答案

```javascript
function localMoneyFomat(obj){
  var result =  Object.entries(obj)// 变成数组
  console.log(result)
  var result =  Object.entries(obj).map(it => typeof it[1] === "number"?[it[0], `￥${it[1]}`]:it)
  console.log(result)
}

var obj = {
  name:"xxx",
  balance: 199.8, //余额
  taken: 3000 //消费
}
localMoneyFomat(obj); // {name:"xxx", balance:"￥199.8", taken: "￥3000"}
```

解构的方法：

```javascript
function localMoneyFomat(obj){
  var result =  Object.entries(obj).map(([k, v]) => typeof v === 'number'?[k,`￥${v}`]:[k,v])
  return Object.fromEntries(result)
  console.log(result)
}
```

<font style="color:rgb(51, 51, 51);">String.prototype.trimStart</font>

<font style="color:rgb(51, 51, 51);">同</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">trimLeft</font><font style="color:rgb(51, 51, 51);">，去掉字符串左边的空格</font>

```javascript
var str = "   abc   ";
console.log(str.length);
var str1 = str.trimStart();
console.log(str1)
```

<font style="color:rgb(51, 51, 51);">String.prototype.trimEnd</font>

<font style="color:rgb(51, 51, 51);">同</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">trimRight</font><font style="color:rgb(51, 51, 51);">，去掉字符串右边的空格</font>

# ES2020
以前的问题



```javascript
var person = {
    info:{
        addr:{
            province:"黑龙江",
            city:"哈尔滨",
        },
    },
}
// 如果这是对象是ajax远程获取的,不知道里面是不是空
console.log(person.info.addr.city);
// person可能是NUll，person.info可能是null,person.info.addr可能是null
```



以前的解决方案：



```javascript
console.log(person && person.info && person.addr && person.info.addr.city);
```



**<font style="color:rgb(51, 51, 51);">可选链操作符（Optional Chaining）</font>**

```javascript
person?.addr?.province
```

<font style="color:rgb(51, 51, 51);">通过可选链</font>

```javascript
console.log(person?.info?.addr?.city);
```

**<font style="color:rgb(51, 51, 51);">空位合并操作符（Nullish coalescing Operator）</font>**

```javascript
a ?? b 
// 等同于
a === undefined || a === null ? b : a // a没有东西就取b，有东西就取a
```

<font style="color:rgb(51, 51, 51);">应用</font>

```javascript
function method(option) {
  var a = option.a || 3;
  console.log(a);
}
method({
  a: 1,
  // a:null/undefined/0
  b: 2,
  c: 3
})
```

<font style="color:rgb(51, 51, 51);">此方法有bug，当a:0</font>

```javascript
function isDef(vaule) {
    return value === undefined || value === null;
}
function method(option) {
    var a = isDef(option.a) || 3;
    console.log(a);
}
```

<font style="color:rgb(51, 51, 51);">优化</font>

```javascript
function method(option) {
  var a = option.a ?? 3;
  console.log(a);
}
method({
  a: 1,
  // a:null/undefined/0
  b: 2,
  c: 3
})
```

**<font style="color:rgb(51, 51, 51);"></font>**

+ **<font style="color:rgb(51, 51, 51);">BigInt</font>**<font style="color:rgb(51, 51, 51);">新的数据类型（值类型，基本类型）</font>

> <font style="color:rgb(119, 119, 119);">复习数据类型typeof返回：String Number undefined  object Boolean function symbol </font>
>

```javascript
// 第8种类型
const a = Number.MAX_SAFE_INTEGER * Number.MAX_SAFE_INTEGER; 
// Number.MAX_SAFE_INTEGER最大安全整数
// => 8.112963841460666e+31精读丢失了
const b = BigInt(Number.MAX_SAFE_INTEGER) * BigInt(Number.MAX_SAFE_INTEGER);
// => 81129638414606663681390495662081n
typeof b // => bigint
a + b // error: Cannot mix BigInt and other types
```

+ **<font style="color:rgb(51, 51, 51);">globalThis</font>**<font style="color:rgb(51, 51, 51);">永远指向全局对象</font>

# <font style="color:rgb(51, 51, 51);">ES2021</font>
+ <font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">String.prototype.replaceAll</font>

<font style="color:rgb(51, 51, 51);">替换字符串中所有的匹配字符</font>



上层工具：bit.dev研究一下



2.  var、let、const之间的区别？ 
    - 作用域
    - 重复声明
    - 是否会挂载到window
    - 定义前访问（暂时性死区 TDZ）
    - 语义

 

3.  ES6中的`class`和传统的构造函数有什么区别？ 
    - 是否必须使用`new`调用
    - 严格模式
    - 原型上的方法是否可被枚举
    - **原型上**的方法是否能使用`new`调用

 

```javascript
class A {
  method1() {}
  method2() {}//不可枚举
}

// new A.prototype.method1();不能new
function B() {}
B.prototype.m1 = function () {};//可枚举
B.prototype.m2 = function () {};

// console.log(Object.keys(B.prototype));
new B.prototype.m1();//可以new 
```

4.  箭头函数和普通的函数表达式有什么区别？ 
    - `this`指向
    - `arugments`
    - 不能使用`new`

 

```javascript
function m() {
  var m2 = () => {
    console.log(arguments.length);//箭头函数没有arguments  5
  };

  m2(1, 2, 3);
}
m(1, 2, 3, 4, 5);
```

下面Set结构，打印出的size值是多少  

```javascript
let s = new Set();
s.add([1]);   
s.add([1]);//字面量   这是两个数组
console.log(s.size);
```



