# 如何取消 Fetch 请求

JavaScript 的 promise 一直是该语言的一大胜利——它们引发了异步编程的革命，极大地改善了 Web 性能。原生 promise 的一个缺点是，到目前为止，还没有可以取消 fetch 的真正方法。 JavaScript 规范中添加了新的 AbortController ，允许开发人员使用信号中止一个或多个 fetch 调用。
以下是取消 fetch 调用的工作流程：

- 创建一个 AbortController 实例
- 该实例具有 signal 属性
- 将 signal 传递给 fetch option 的 signal
- 调用 AbortController 的 abort 属性来取消所有使用该信号的 fetch。

以下是取消 Fetch 请求的基本步骤：

```js
const controller = new AbortController();
const { signal } = controller;

fetch("http://localhost:8000", { signal })
  .then((response) => {
    console.log(`Request 1 is complete!`);
  })
  .catch((e) => {
    console.warn(`Fetch 1 error: ${e.message}`);
  });

// Abort request
controller.abort();
```

在 abort 调用时发生 AbortError ，因此你可以通过比较错误名称来侦听 catch 中的中止操作。

```js
catch(e => {
    if(e.name === "AbortError") {
        // We know it's been canceled!
    }
});
```

将相同的信号传递给多个 fetch 调用将会取消该信号的所有请求：

```js
const controller = new AbortController();
const { signal } = controller;

fetch("http://localhost:8000", { signal })
  .then((response) => {
    console.log(`Request 1 is complete!`);
  })
  .catch((e) => {
    console.warn(`Fetch 1 error: ${e.message}`);
  });

fetch("http://localhost:8000", { signal })
  .then((response) => {
    console.log(`Request 2 is complete!`);
  })
  .catch((e) => {
    console.warn(`Fetch 2 error: ${e.message}`);
  });

// Wait 2 seconds to abort both requests
setTimeout(() => controller.abort(), 2000);
```

杰克·阿奇博尔德（Jack Archibald）在他的文章 [Abortable fetch](https://developer.chrome.com/blog/abortable-fetch?hl=zh-cn) 中，详细介绍了一个很好的应用，它能够用于创建可中止的 Fetch，而无需所有样板

```js
function abortableFetch(request, opts) {
  const controller = new AbortController();
  const signal = controller.signal;

  return {
    abort: () => controller.abort(),
    ready: fetch(request, { ...opts, signal }),
  };
}
```

说实话，我对取消 Fetch 的方法并不感到兴奋。在理想的世界中，通过 Fetch 返回的 Promise 中的 .cancel() 会很酷，但是也会带来一些问题。无论如何，我为能够取消 Fetch 调用而感到高兴，你也应该如此！

## [[译] 如何取消你的 Promise？](https://juejin.cn/post/6844903533393772557)
