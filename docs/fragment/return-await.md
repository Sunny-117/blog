# 思考为什么不要使用 return await

一句话概括：**因为 async 函数的返回值一定为 promise 包裹，所以即使你 return await promise，await 出来的值依旧要包裹一层 promise，所以 await 等于白 await 了**

[stackoverflow](https://stackoverflow.com/questions/44806135/why-no-return-await-vs-const-x-await)

在 ESLint 中有一条规则 no-return-await 。下面的代码会触发该条规则校验不通过：

```js
async function foo() {
  return await bar();
}
```

这条规则的解释是， async function 的返回值总是封装在 Promise.resolve 中 ， return await 实际上并没有做任何事情，只是在 Promise resolve 或 reject 之前增加了额外的时间。

## Promise.resolve

Promise.resolve() 作用是将给定的参数转换为 Promise 对象

```js
Promise.resolve("foo");
// 等价于
new Promise((resolve) => resolve("foo"));
```

那么其实上面的问题所在就是 Promise.resolve() 的参数情况：《 ECMAScript 6 入门 》的 [Promise.resolve()](https://es6.ruanyifeng.com/#docs/promise#Promise-resolve)

## 问题分析

函数 foo() 是一个 async function ，会返回一个 Promise 对象，这个 Promise 对象其实是将函数内 return 语句后面的值使用 Promise.resolve 封装后返回。所以，执行 foo() 之后，我们明确知道得到的结果是一个 Promise 对象，并且在 foo() 的外部我们还会以某种方式比如 await 来继续使用这个结果。
另外，我们知道 await 命令后面如果是一个 Promise 对象，则返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。所以函数内 return 后的 await 的作用就是获取 bar() 的执行结果。
如此一来， async function 中使用 return await 相当于先获取结果然后又将结果变成 Promise 实例。
无论 return await 后面跟的是不是 Promise 对象，那么我们在函数外面都会得到一个 Promise 对象，所以函数内 return 后面的 await 就显得多余了。

> 虽然上面的写法不推荐使用，但是并不会产生运行错误，只是会造成性能上的损失。唯一影响，可能是其他开发者看到后，会笑话你基础不扎实吧。

## 推荐写法

首先，如果 async function 没有 return 语句的话，默认返回 undefined ，在 Devtool 中测试如下：

```js
async function foo() {}
foo();
// Promise {<fulfilled>: undefined}
//  [[PromiseState]]: "fulfilled"
//  [[PromiseResult]]: undefined
```

既然 return await 中的 await 是多余的，那么最直接的推荐写法就是去掉 await ：

```js
async function foo() {
  return bar();
}
```

无论 bar() 执行结果是一个 Promise 还是一个普通值，我们将它交给 foo 函数外面的程序去处理。如果非要在 foo 函数中求得 bar() 的执行结果，那么也可以像下面这样写：

```js
async function foo() {
  const x = await bar();
  return x;
}
```

但是我觉得这完全只是为了规避 ESLint 的报错而写的一种障眼法，实际它 和 return await bar() 一样 没有任何好处。

## return await promiseValue 与 return promiseValue 的比较

返回值隐式的传递给 Promise.resolve ，并不意味着 return await promiseValue; 和 return promiseValue; 在功能上相同。 return foo; 和 return await foo; ，有一些细微的差异：

- return foo; 不管 foo 是 promise 还是 rejects 都将会直接返回 foo
- 相反地，如果 foo 是一个 Promise ， return await foo; 将等待 foo 执行(resolve)或拒绝(reject)，如果是拒绝，将会在返回前抛出异常

```js
function bar() {
  throw new Error("报错了！");
}

async function foo() {
  try {
    return await bar();
  } catch (error) {
    console.log("知道了");
  }
}
foo();
// 知道了
// Promise {<fulfilled>: undefined}

async function foo2() {
  try {
    return bar();
  } catch (error) {
    console.log("我不知道");
  }
}
foo2();
// undefined
```

如果想要在调试的堆栈中得到 bar() 抛出的错误信息，那么此时应该使用 return await 。
