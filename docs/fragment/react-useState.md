# react 函数组件中使用 useState 改变值后立刻获取最新值

## 为什么说 redux 和 react-hooks 有些渊源？

redux 是基于发布订阅模式，在内部实现一个状态，然后加一些约定和限制，外部不可以直接改变这个状态，只能通过 redux 提供的一个代理方法去触发这个状态的改变，使用者可以通过 redux 提供的订阅方法订阅事件，当状态改变的时候，redux 帮助我们发布这个事件，使得各个订阅者获得最新状态，是不是很简单，大道至简～

下面提供了个简版的 redux 代码

```js
/**
 *
 * @param {*} reducer 处理状态方法
 * @param {*} preloadState 初始状态
 */
function createStore(reducer, preloadState) {
  /** 存储状态 */
  let state = preloadState;

  /** 存储事件 */
  const listeners = [];

  /** 获取状态方法，返回state */
  const getState = () => {
    return state;
  };

  /**
   * 订阅事件，将事件存储到listeners中
   * @param {*} listener 事件
   */
  const subscribe = (listener) => {
    listeners.push(listener);
  };

  /**
   * 派发action，发布事件
   * @param {*} action 动作
   */
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  /** 状态机 */
  const store = {
    getState,
    subscribe,
    dispatch,
  };

  return store;
}

export default createStore;
```

为什么说 react-hooks 跟 redux 有渊源，因为 Dan 总把 redux 的这种思想带到了 react-hooks 中，通过创建一个公共 hookStates 来存储所有的 hooks，通过添加一个索引 hookIndex 来顺序执行每一个 hook，所以 react-hooks 规定 hooks 不能使用在 if 语句和 for 语句中，来保持 hooks 按顺序执行，在 react-hooks 中有一个叫 useReducer 的 hooks，正是按 redux 的这个思想实现的，而我们常用的 useState 只是 useReducer 的一个语法糖，有人可能会说这个 hookStates 会不会很大，所有的 hooks 都存在里边，毕竟一个项目中有那么多组件，我说的只是简单的实现原理，我们知道 react 在 16 的几个版本之后就加入了 fiber 的概念，在 react 内部实现中，会把每个组件的 hookStates 存放到 fiber 节点上，来维护各个节点的状态，react 每次 render 之后都会把 hookIndex 置为 0，来保证下次 hooks 执行是从第一个开始执行，每个 hooks 执行完也会把 hookIndex++，下面是 useReducer 的简单实现：

```js
/** @param hookStates 存储所有hooks */
const hookStates = [];

/** @param hookIndex 索引 */
let hookIndex = 0;

/**
 *
 * useReducer
 * @param {*} reducer 状态处理函数
 * @param {*} initialState 初始状态，可以传入函数实现懒加载
 * @returns
 */
function useReducer(reducer, initialState) {
  hookStates[hookIndex] =
    hookStates[hookIndex] || typeof initialState === "function"
      ? initialState()
      : initialState;

  /**
   *
   * dispatch
   * @param {*} action 动作
   * @returns
   */
  const dispatch = (action) => {
    hookStates[hookIndex] = reducer
      ? reducer(hookStates[hookIndex], action)
      : action;
    /** React内部方法实现重新render */
    scheduleUpdate();
  };
  return [hookStates[hookIndex++], dispatch];
}
```

前文说过 useState 是 useReducer 的语法糖，所以下面是 useState 的实现

```js
/**
 *
 * useState 直接将reducer传为null，调用useReducer并返回
 * @param {*} initialState 初始化状态
 * @returns
 */
function useState(initialState) {
  return useReducer(null, initialState);
}
```

## 如何实现 useState 改变值之后立刻获取最新的状态？

react-hooks 的思想其实是同步逻辑，但是在 react 的合成事件中状态更新是异步的，看一下下面这个场景:

```jsx
function App() {
  const [state, setstate] = useState(0);

  const setT = () => {
    setstate(2);
    func();
  };

  const func = () => {
    console.log(state);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={setT}>set 2</button>
      </header>
    </div>
  );
}
```

当我们点击 set 2 按钮时，控制台打印的还是上一次的值 0，而不是最新的 2

因为在 react 合成事件中改变状态是异步的，出于减少 render 次数，react 会收集所有状态变更，然后比对优化，最后做一次变更，在代码中可以看出，func 的调用和 setstate 在同一个宏任务中，这是 react 还没有 render，所以直接使用 state 获取的肯定是上一次闭包里的值 0

有的人可能会说，直接将最新的值当作参数传递给 func 不就行了吗，对，这也是一种解决办法，但是有时不只是一个状态，可能要传递的参数很多，再有也是出于对 react-hooks 的深入研究，所以我选择通过自定义 hooks 实现在 useState 改变值之后立刻获取到最新的值，我们先看下实现的效果，代码变更如下：

## 如何实现 useSyncCallback？

```js
// param: callback为回调函数
// 用法 const newFunc = useSyncCallback(yourCallback)
import { useEffect, useState, useCallback } from "react";

const useSyncCallback = (callback) => {
  const [proxyState, setProxyState] = useState({ current: false });

  const Func = useCallback(() => {
    setProxyState({ current: true });
  }, [proxyState]);

  useEffect(() => {
    if (proxyState.current === true) setProxyState({ current: false });
  }, [proxyState]);

  useEffect(() => {
    proxyState.current && callback();
  });

  return Func;
};

export default useSyncCallback;
```

在这里还需要介绍一个知识点 useEffect，useEffect 会在每次函数式组件 render 之后执行，可以通过传递第二个参数，配置依赖项，当依赖项变更 useEffect 才会更新，如果第二个参数传递一个空数组[],那么 useEffect 就会只执行一次，react-hooks 正是使用 useEffect 来模拟 componentDidMount 和 componentDidUpdate 两个生命周期，也可以通过在 useEffect 中 return 一个函数模拟 componentWillUnmount，那么 **useEffect 是如何实现在 render 之后调用的呢**，原理就是在 useEffect hooks 中会封装一个宏任务，然后把传进来的回调函数放到宏任务中去执行，下面实现了一个简版的 useEffect：

```js
/** @param hookStates 存储所有hooks */
const hookStates = [];

/** @param hookIndex 索引 */
let hookIndex = 0;

/**
 *
 * useReducer
 * @param {*} callback 副作用函数
 * @param {*} dependencies 依赖项
 * @returns
 */
function useEffect(callback, dependencies) {
  /** 判断当前索引下hookStates是否存在值 */
  if (hookStates[hookIndex]) {
    /** 如果存在就取出，并结构出destroyFunc销毁函数，和上一次依赖项 */
    const [destroyFunc, lastDep] = hookStates[hookIndex];
    /** 判断当前依赖项中的值和上次依赖项中的值有没有变化 */
    const isSame =
      dependencies &&
      dependencies.every((dep, index) => dep === lastDep[index]);
    if (isSame) {
      /** 如果没有变化就把索引加一，hooks向后遍历 */
      hookIndex++;
    } else {
      /** 如果有变化，并且存在销毁函数，就先调用销毁函数 */
      destroyFunc && destroyFunc();
      /** 创建一个新的宏任务，调用callback获取最新的销毁函数，并将销毁函数和依赖项存入hookStates中 */
      setTimeout(() => {
        const destroyFunction = callback();
        hookStates[hookIndex++] = [destroyFunction, dependencies];
      });
    }
  } else {
    /** 如果hookStates中不存在，证明是首次执行，直接创建一个宏任务，调用callback获取最新的销毁函数，并将销毁函数和依赖项存入hookStates中 */
    setTimeout(() => {
      const destroyFunction = callback();
      hookStates[hookIndex++] = [destroyFunction, dependencies];
    });
  }
}
```

接下来我们就来使用 useEffect 实现我们想要的结果，因为 useEffect 是在 react 组件 render 之后才会执行，所以在 useEffect 获取的状态一定是最新的，所以利用这一点，把我们写的函数放到 useEffect 执行，函数里获取的状态就一定是最新的

```js
useEffect(() => {
  proxyState.current && callback();
});
```

首先，在 useSyncCallback 中创建一个标示 proxyState，初始的时候会把 proxyState 的 current 值赋成 false,在 callback 执行之前会先判断 current 是否为 true，如果为 true 就允许 callback 执行，若果为 false，就跳过不执行，因为 useEffect 在组件 render 之后，只要依赖项有变化就会执行，所以我们无法掌控我们的函数执行，在 useSyncCallback 中创建一个新的函数 Func，并返回，通过这个 Func 来模拟函数调用，

```js
const [proxyState, setProxyState] = useState({ current: false });
```

在这个函数中我们要做的就是变更 prxoyState 的 current 值为 true，来使得让 callback 被调用的条件成立，同时触发 react 组件 render 这样内部的 useEffect 就会执行，随后调用 callback 实现我们想要的效果。
