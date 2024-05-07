# 如何让 var [a, b] = {a: 1, b: 2} 解构赋值成功？

在 JavaScript 中，解构赋值语法的左侧是一个数组，而右侧则应该是一个具有迭代器接口的对象（如数组、Map、Set 等）。因此，将对象 {a: 1, b: 2} 解构赋值给 [a, b] 会导致语法错误

我们首先来看看报错是什么样的：

> var [a, b] = {a: 1, b: 2}
> TypeError: {(intermediate value)(intermediate value)} is not iterable

这个错误是个类型错误，并且是对象有问题，因为对象是一个不具备迭代器属性的数据结构。所以我们可以知道，这个面试题就是考验我们对于迭代器属性的认识，我们再来个场景加深下理解。

```js
let arr = [1, 2, 3];
let obj = {
  a: 1,
  b: 2,
  c: 3,
};
for (let item of arr) {
  console.log(item);
}
for (let item of obj) {
  console.log(item);
}
```

我们知道 for of 只能遍历具有迭代器属性的，在遍历数组的时候会打印出 `1 2 3` ，遍历对象时会报这样的一个错误 `TypeError: obj is not iterable`。
我们可以在最下面发现，数组原型上有 Symbol.iterator 这样一个属性，这个属性显然是从 Array 身上继承到的，并且这个属性的值是一个函数体，如果我们调用一下这个函数体会怎么样？我们打印来看看

```js
console.log(arr.__proto__[Symbol.iterator]());
// Object [Array Iterator] {}
```

最重要的点来了 🔥🔥🔥🔥

它返回的是一个对象类型，并且是一个迭代器对象！！！所以一个可迭代对象的基本结构是这样的：

```js
interable
{
    [Symbol.iterator]: function () {
        return 迭代器 (可通过next()就能读取到值)
    }
}
```

我们可以得出只要一个数据结构身上，具有 [Symbol.iterator] 这样一个属性，且值是一个函数体，可以返回一个迭代器的话，我们就称这个数据结构是可迭代的。
这时候我们回到面试题之中，面试官要我们让 var [a, b] = {a: 1, b: 2} 这个等式成立，那么有了上面的铺垫，我们可以知道，我们接下来的操作就是：人为的为对象打造一个迭代器出来，也就是让对象的隐式原型可以继承到迭代器属性，我们可以先这样做：

```js
Object.prototype[Symbol.iterator] = function () {};

var [a, b] = { a: 1, b: 2 };
console.log(a, b);
```

这样的话，报错就改变了，变成：

> TypeError: Result of the Symbol.iterator method is not an object

接下来，我们知道 var [a, b] = [1, 2] 这是肯定没有问题的，所以我们可以将对象身上的迭代器，打造成和数组身上的迭代器（ arr[Symbol.iterator] ）一样，代码如下：

```js
Object.prototype[Symbol.iterator] = function () {
  // 使用 Object.values(this) 方法获取对象的所有值，并返回这些值的迭代器对象
  return Object.values(this)[Symbol.iterator]();
};
```

这段代码是将 Object.prototype 上的 [Symbol.iterator] 方法重新定义为一个新的函数。新的函数通过调用 Object.values(this) 方法获取对象的所有值，并返回这些值的迭代器对象。
通过这个代码，我们可以使得任何 JavaScript 对象都具有了迭代能力。例如，对于一个对象 obj ，我们可以直接使用 for...of 循环或者 ... 操作符来遍历它的所有值。
