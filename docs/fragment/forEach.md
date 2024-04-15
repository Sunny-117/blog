# 面试官问我 JS 中 forEach 能不能跳出循环

**forEach 是 不能使用任何手段跳出循环 的**！为什么呢？我们知道 forEach 接收一个函数，它一般有两个参数，第一个是循环的当前元素，第二个是该元素对应的下标，手动实现一下伪代码：

```js
Array.prototype.myForEach = function (fn) {
  for (let i = 0; i < this.length; i++) {
    fn(this[i], i, this);
  }
};
```

forEach 是不是真的这么实现我无从考究，但是以上这个简单的伪代码确实满足 forEach 的特性，而且也很明显就是不能跳出循环，因为根本没有办法操作到真正的 for 循环体。

后来经过查阅文档，发现官方对 forEach 的定义根本不是我认为的语法糖，它的标准说法是 forEach 为每个数组元素执行一次你所提供的函数。官方文档也有这么一段话：

> 除抛出异常之外，没有其他方法可以停止或中断循环。如果您需要这种行为，则该 forEach()方法是错误的工具。

使用抛出异常来跳出 foreach 循环

```js
let arr = [0, 1, "stop", 3, 4];
try {
  arr.forEach((element) => {
    if (element === "stop") {
      throw new Error("forEachBreak");
    }
    console.log(element); // 输出 0 1 后面不输出
  });
} catch (e) {
  console.log(e.message); // forEachBreak
}
```

那么可不可以认为，forEach 可以跳出循环，使用抛出异常就可以了？这点我认为仁者见仁智者见智吧，在 forEach 的设计中并没有中断循环的设计，而使用 try-catch 包裹时，当 循环体过大性能会随之下降 ，这是无法避免的，所以抛出异常可以作为一种中断 forEach 的手段，但并不是为解决 forEach 问题而存在的银弹。

再次回归到开头写的那段伪代码，对它进行一些优化，在真正的 for 循环中加入对传入函数的判断：

```js
// 为避免争议此处不再覆写原有forEach函数
Array.prototype.myForEach = function (fn) {
  for (let i = 0; i < this.length; i++) {
    let ret = fn(this[i], i, this);
    if (typeof ret !== "undefined" && (ret == null || ret == false)) break;
  }
};
```

这样的话就能根据 return 值来进行循环跳出啦：

```js
let arr = [0, 1, "stop", 3, 4];

arr.myForEach((x) => {
  if (x === "stop") return false;
  console.log(x); // 输出 0 1 后面不输出
});

// return即为continue：
arr.myForEach((x) => {
  if (x === "stop") return;
  console.log(x); // 0 1 3 4
});
```

文档中还提到 forEach 需要一个同步函数 ，也就是说在使用异步函数或 Promise 作为回调时会发生预期以外的结果，所以 forEach 还是需要慎用。

当然，用简单的 for 循环去完成一切事情也不失为一种办法， 代码首先是写给人看的，附带能在机器上运行的作用 ，forEach 在很多时候用起来更加顺手，但也务必在理解 JS 如何设计这些工具函数的前提下来编写我们的业务代码。

我们可以在遍历数组时使用 for..of.. ，在遍历对象时使用 for..in.. ，而官方也在 forEach 文档下列举了其它一些工具函数，这里不做过多展开：

```js
Array.prototype.find();
Array.prototype.findIndex();
Array.prototype.map();
Array.prototype.filter();
Array.prototype.every();
Array.prototype.some();
```

如何根据不同的业务场景，选择使用对应的工具函数来更有效地处理业务逻辑，才是我们真正应该思考的，或许这也是面试当中真正想考察的吧。
