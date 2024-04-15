# vue nextTick 实现原理，必拿下!

## 为什么会有 nextTick 这个东西的存在?

因为 vue 采用的 异步更新策略 ，当监听到数据发生变化的时候不会立即去更新 DOM，而是开启一个任务队列，并缓存在同一事件循环中发生的所有数据变更。

这种做法带来的好处就是可以将多次数据更新合并成一次，减少操作 DOM 的次数，如果不采用这种方法，假设数据改变 100 次就要去更新 100 次 DOM，而频繁的 DOM 更新是很耗性能的。

## nextTick 的作用？

nextTick 接收一个回调函数作为参数，并将这个回调函数延迟到 DOM 更新后才执行；想要操作 基于最新数据生成的 DOM 时，就将这个操作放在 nextTick 的回调中；

## nextTick 实现原理

将传入的回调函数包装成异步任务，异步任务又分微任务和宏任务，为了尽快执行所以优先选择微任务；
nextTick 提供了四种异步方法 Promise.then、MutationObserver、setImmediate、setTimeout(fn,0)

## 源码解读

源码位置 `core/util/next-tick`

源码并不复杂，三个函数，60 几行代码，沉下心去看！

```ts
import { noop } from "shared/util";
import { handleError } from "./error";
import { isIE, isIOS, isNative } from "./env";

//  noop 表示一个无操作空函数，用作函数默认值，防止传入 undefined 导致报错
//  handleError 错误处理函数
//  isIE, isIOS, isNative 环境判断函数，
//  isNative 判断某个属性或方法是否原生支持，如果不支持或通过第三方实现支持都会返回 false

export let isUsingMicroTask = false; // 标记 nextTick 最终是否以微任务执行

const callbacks = []; // 存放调用 nextTick 时传入的回调函数
let pending = false; // 标记是否已经向任务队列中添加了一个任务，如果已经添加了就不能再添加了
// 当向任务队列中添加了任务时，将 pending 置为 true，当任务被执行时将 pending 置为 false

// 声明 nextTick 函数，接收一个回调函数和一个执行上下文作为参数
// 回调的 this 自动绑定到调用它的实例上
export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve;
  // 将传入的回调函数存放到数组中，后面会遍历执行其中的回调
  callbacks.push(() => {
    if (cb) {
      // 对传入的回调进行 try catch 错误捕获
      try {
        cb.call(ctx);
      } catch (e) {
        // 进行统一的错误处理
        handleError(e, ctx, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  // 如果当前没有在 pending 的回调，
  // 就执行 timeFunc 函数选择当前环境优先支持的异步方法
  if (!pending) {
    pending = true;
    timerFunc();
  }

  // 如果没有传入回调，并且当前环境支持 promise，就返回一个 promise
  // 在返回的这个 promise.then 中 DOM 已经更新好了，
  if (!cb && typeof Promise !== "undefined") {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}

// 判断当前环境优先支持的异步方法，优先选择微任务
// 优先级：Promise---> MutationObserver---> setImmediate---> setTimeout
// setTimeout 可能产生一个 4ms 的延迟，而 setImmediate 会在主线程执行完后立刻执行
// setImmediate 在 IE10 和 node 中支持

// 当在同一轮事件循环中多次调用 nextTick 时 ,timerFunc 只会执行一次

let timerFunc;
// 判断当前环境是否原生支持 promise
if (typeof Promise !== "undefined" && isNative(Promise)) {
  // 支持 promise
  const p = Promise.resolve();
  timerFunc = () => {
    // 用 promise.then 把 flushCallbacks 函数包裹成一个异步微任务
    p.then(flushCallbacks);
    if (isIOS) setTimeout(noop);
  };
  // 标记当前 nextTick 使用的微任务
  isUsingMicroTask = true;

  // 如果不支持 promise，就判断是否支持 MutationObserver
  // 不是IE环境，并且原生支持 MutationObserver，那也是一个微任务
} else if (
  !isIE &&
  typeof MutationObserver !== "undefined" &&
  (isNative(MutationObserver) ||
    MutationObserver.toString() === "[object MutationObserverConstructor]")
) {
  let counter = 1;
  // new 一个 MutationObserver 类
  const observer = new MutationObserver(flushCallbacks);
  // 创建一个文本节点
  const textNode = document.createTextNode(String(counter));
  // 监听这个文本节点，当数据发生变化就执行 flushCallbacks
  observer.observe(textNode, { characterData: true });
  timerFunc = () => {
    counter = (counter + 1) % 2;
    textNode.data = String(counter); // 数据更新
  };
  isUsingMicroTask = true; // 标记当前 nextTick 使用的微任务

  // 判断当前环境是否原生支持 setImmediate
} else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
  timerFunc = () => {
    setImmediate(flushCallbacks);
  };
} else {
  // 以上三种都不支持就选择 setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}

// 如果多次调用 nextTick，会依次执行上面的方法，将 nextTick 的回调放在 callbacks 数组中
// 最后通过 flushCallbacks 函数遍历 callbacks 数组的拷贝并执行其中的回调
function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0); // 拷贝一份 callbacks
  callbacks.length = 0; // 清空 callbacks
  for (let i = 0; i < copies.length; i++) {
    // 遍历执行传入的回调
    copies[i]();
  }
}

// 为什么要拷贝一份 callbacks

// 用 callbacks.slice(0) 将 callbacks 拷贝出来一份，
// 是因为考虑到在 nextTick 回调中可能还会调用 nextTick 的情况,
// 如果在 nextTick 回调中又调用了一次 nextTick，则又会向 callbacks 中添加回调，
// 而 nextTick 回调中的 nextTick 应该放在下一轮执行，
// 否则就可能出现一直循环的情况，
// 所以需要将 callbacks 复制一份出来然后清空，再遍历备份列表执行回调
```
