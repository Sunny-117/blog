# 如何在 ES5 环境下实现一个 const ？

## 属性描述符

[详解](https://sunny-117.github.io/blog/js/%E4%BB%A3%E7%90%86%E4%B8%8E%E5%8F%8D%E5%B0%84.html)

## const 实现原理

由于 ES5 环境没有 block 的概念，所以是无法百分百实现 const，只能是挂载到某个对象下，要么是全局的 window，要么就是自定义一个 object 来当容器

```js
var __const = function __const(data, value) {
  window.data = value; // 把要定义的data挂载到window下，并赋值value
  Object.defineProperty(window, data, {
    // 利用Object.defineProperty的能力劫持当前对象，并修改其属性描述符
    enumerable: false,
    configurable: false,
    get: function () {
      return value;
    },
    set: function (data) {
      if (data !== value) {
        // 当要对当前属性进行赋值时，则抛出错误！
        throw new TypeError("Assignment to constant variable.");
      } else {
        return value;
      }
    },
  });
};
__const("a", 10);
console.log(a);
delete a;
console.log(a);
for (let item in window) {
  // 因为const定义的属性在global下也是不存在的，所以用到了enumerable: false来模拟这一功能
  if (item === "a") {
    // 因为不可枚举，所以不执行
    console.log(window[item]);
  }
}
a = 20; // 报错
```
