# React Hooks 实现倒计时及避坑

## 正确示例 1

```jsx
import { useState, useEffect } from "react";

// 入参是一个时间段，比如6000s，不是具体的过期时间点，因为考虑到用户可能会修改电脑的时间，这样在获取当前时间的时候就会产生误差
export const CountDown = ({ countDown = 4 }) => {
  let cd = countDown;
  let timer = null;

  const [time, setTime] = useState("");

  const handleData = () => {
    if (cd <= 0) {
      setTime("到时间啦");
      return timer && clearTimeout(timer);
    }
    const d = parseInt(cd / (24 * 60 * 60) + "");
    const h = parseInt(((cd / (60 * 60)) % 24) + "");
    const m = parseInt(((cd / 60) % 60) + "");
    const s = parseInt((cd % 60) + "");
    setTime(`倒计时: ${d}天${h}时${m}分${s}秒`);
    cd--;
    timer = setTimeout(() => {
      handleData();
    }, 1000);
  };

  useEffect(() => {
    handleData();
    return () => {
      timer && clearTimeout(timer);
    };
  }, []);

  return <div>{time}</div>;
};
export default CountDown;
```

## 正确示例 2

```jsx
import { useState, useEffect, useRef } from "react";

const CountDown = ({ countDown }) => {
  const cd = useRef(countDown);
  const timer = useRef(null);

  const [time, setTime] = useState("");

  const dealData = () => {
    if (cd.current <= 0) {
      setTime("");
      return timer.current && clearTimeout(timer.current);
    }
    const d = parseInt(cd.current / (24 * 60 * 60) + "");
    const h = parseInt(((cd.current / (60 * 60)) % 24) + "");
    const m = parseInt(((cd.current / 60) % 60) + "");
    const s = parseInt((cd.current % 60) + "");
    setTime(`倒计时: ${d}天${h}时${m}分${s}秒`);
    cd.current--;
    timer.current = setTimeout(() => {
      dealData();
    }, 1000);
  };

  useEffect(() => {
    dealData();
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  }, []);

  return <div>{time}</div>;
};

export default CountDown;
```

## 错误示例

```jsx
import { useState, useEffect } from "react";

const CountDown = ({ countDown = 5 }) => {
  let [cd, setCd] = useState(countDown);
  let timer = null;

  const [time, setTime] = useState("");

  const dealData = () => {
    if (cd <= 0) {
      setTime("");
      return timer && clearTimeout(timer);
    }
    const d = parseInt(cd / (24 * 60 * 60) + "");
    const h = parseInt(((cd / (60 * 60)) % 24) + "");
    const m = parseInt(((cd / 60) % 60) + "");
    const s = parseInt((cd % 60) + "");
    setTime(`倒计时: ${d}天${h}时${m}分${s}秒`);
    setCd(cd--); // 应该是setCd(cd - 1)
    timer = setTimeout(() => {
      dealData();
    }, 1000);
  };

  useEffect(() => {
    dealData();
    return () => {
      timer && clearTimeout(timer);
    };
  }, []);

  return <div>{time}</div>;
};

export default CountDown;
```

## 错误示例会出现的问题

- cd 在 useEffect 中始终是初始值；
- 在 DOM 元素上，会出现先是初始值，然后从初始值减 1 ，之后就不会在变化

## 原因

- 因为 useEffect 的第二个参数是 [] ，所以 re-render (更新渲染)的时候不会重新执行 effect 函数，所以 cd 在 useEffect 中始终是初始值；
- 因为 useEffect 第一次执行的时候即初始化的时候利用 setCd(cd--) 重新对 cd 赋值，所以会触发视图重新渲染一次；
- 如果 useEffect 没有第二个参数 [] ，既没有依赖，那么就相当于 didMount 和 DidUpdate 两个生命周期的合集，所以更新的时候会重新执行 useEffect 【注意】： useEffect 的第一个参数是一个匿名函数，匿名函数执行完会立即被销毁，所以在组件重新更新的时候，会重新调用匿名函数，并获取更改后的 cd 值

## 解决方案

如上示例 1 ， 2 ，因为方式 1 打破了 React 纯函数的规则，所以更加建议方式 2

:::tip
第一段代码使用了普通的变量 cd 和 timer，它们被定义在组件函数的顶层。这意味着每次组件函数被调用时，都会重新创建新的 cd 和 timer，而不是保留它们的状态。这样做违反了 React 纯函数组件的规则，因为它引入了外部的状态管理。

第二段代码使用了 useRef 来创建了 cd 和 timer 这两个变量的引用。这意味着它们会被保存在组件的生命周期之外，并且在组件的多次渲染之间保持不变。因此，即使组件函数被重新调用，这些引用的值也会保持不变。这样做遵守了 React 纯函数组件的规则，因为它不引入外部状态管理。

因此，第二段代码符合 React 纯函数组件的规则，而第一段代码打破了这些规则。
:::

【注意】

- 在倒计时为 0 的时候一定要销毁倒计时
- 在组件销毁的时候一定要手动销毁倒计时，否则即使跳转到其他页面，倒计时依旧在进行
