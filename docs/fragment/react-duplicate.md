# 解决 npm link 本地代码后 react 库存在多份实例的问题

## 非法 Hook 调用错误

在调试本地组件库代码时，link 到主项目时报错了如下错误

```
Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app See https://fb.me/react-invalid-hook-call for tips about how to debug and fix this problem.
```

但是将代码发布到本地仓库后，install 下来是不会有问题的。

## 报错原因

React 官方文档上解释了这个原因。

> 为了使 Hook 正常工作，你应用代码中的 react 依赖以及 react-dom 的 package 内部使用的 react 依赖，必须解析为同一个模块。

也就是说，在你的应用里找到了两份 react 实例，并且 react-dom 中引用的 react 实例与直接 import 的 react 实例不是同一份。对应到我报错的场景里，就是 link 到本地组件库时，组件库中 import 了一份 react-dom, 而这一份 react-dom 引用的 react 实例，是本地组件库中安装的 react 实例。而非主应用中安装的那一份 react 实例。

## 为什么 npm install 没有问题，npm link 有问题

npm install 在安装依赖的时候，会合并相同依赖，安装在最外层的 node_modules 中。所以只有一份依赖。而 npm link 是直接引用本地目录，本地目录的 node_modules 会和主项目的 node_modules 同时存在两份相同的引用。

## 怎么解决这个问题

要解决这个问题，就需要将组件库 react-dom 依赖的 react 指向主项目 node_modules 中安装的那一份 react 实例。我们可以通过两种方式来完成这个操作。

### 使用 link 的方式将组件库的 react 依赖指向到主项目的 react 依赖

```shell
cd [PACKAGE]
npm link [PROJECT]/node_modules/react
```

### 使用 alias 为 Nodejs 指定 react 加载目录

```js
// /build/wepack.base.config.js
const config = {
  alias: {
    react: path.join(__dirname, "../node_modules/react"),
  },
};
```
