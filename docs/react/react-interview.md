# 那些年，被问烂了的 React 面试题

## React 组件命名推荐的方式是哪个？

通过引用而不是使用来命名组件 displayName。

使用 displayName 命名组件：

```javascript
export default React.createClass({  displayName: 'TodoApp',  // ...})
```

React 推荐的方法：

```javascript
export default class TodoApp extends React.Component {  // ...}
```

## react 最新版本解决了什么问题，增加了哪些东西

React 16.x 的三大新特性 Time Slicing、Suspense、 hooks

- **Time Slicing（解决 CPU 速度问题**）使得在执行任务的期间可以随时暂停，跑去干别的事情，这个特性使得 react 能在性能极其差的机器跑时，仍然保持有良好的性能
- **Suspense （解决网络 IO 问题）** 和 lazy 配合，实现异步加载组件。 能暂停当前组件的渲染， 当完成某件事以后再继续渲染，解决从 react 出生到现在都存在的「异步副作用」的问题，而且解决得非的优雅，使用的是 T 异步但是同步的写法，这是最好的解决异步问题的方式
- 提供了一个**内置函数 componentDidCatch**，当有错误发生时，可以友好地展示 fallback 组件; 可以捕捉到它的子元素（包括嵌套子元素）抛出的异常; 可以复用错误组件。

**（1）React16.8** 加入 hooks，让 React 函数式组件更加灵活，hooks 之前，React 存在很多问题：

- 在组件间复用状态逻辑很难
- 复杂组件变得难以理解，高阶组件和函数组件的嵌套过深。
- class 组件的 this 指向问题
- 难以记忆的生命周期

hooks 很好的解决了上述问题，hooks 提供了很多方法

- useState 返回有状态值，以及更新这个状态值的函数
- useEffect 接受包含命令式，可能有副作用代码的函数。
- useContext 接受上下文对象（从 React.createContext 返回的值）并返回当前上下文值，
- useReducer useState 的替代方案。接受类型为 （state，action）=> newState 的 reducer，并返回与 dispatch 方法配对的当前状态。
- useCalLback 返回一个回忆的 memoized 版本，该版本仅在其中一个输入发生更改时才会更改。纯函数的输入输出确定性 o useMemo 纯的一个记忆函数 o useRef 返回一个可变的 ref 对象，其 Current 属性被初始化为传递的参数，返回的 ref 对象在组件的整个生命周期内保持不变。
- useImperativeMethods 自定义使用 ref 时公开给父组件的实例值
- useMutationEffect 更新兄弟组件之前，它在 React 执行其 DOM 改变的同一阶段同步触发
- useLayoutEffect DOM 改变后同步触发。使用它来从 DOM 读取布局并同步重新渲染

**（2）React16.9**

- 重命名 Unsafe 的生命周期方法。新的 UNSAFE\_前缀将有助于在代码 review 和 debug 期间，使这些有问题的字样更突出
- 废弃 javascrip:形式的 URL。以 javascript:开头的 URL 非常容易遭受攻击，造成安全漏洞。
- 废弃"Factory"组件。 工厂组件会导致 React 变大且变慢。
- act（）也支持异步函数，并且你可以在调用它时使用 await。
- 使用 <React.ProfiLer> 进行性能评估。在较大的应用中追踪性能回归可能会很方便

**（3）React16.13.0**

- 支持在渲染期间调用 setState，但仅适用于同一组件
- 可检测冲突的样式规则并记录警告
- 废弃 unstable_createPortal，使用 CreatePortal
- 将组件堆栈添加到其开发警告中，使开发人员能够隔离 bug 并调试其程序，这可以清楚地说明问题所在，并更快地定位和修复错误。

## react 实现一个全局的 dialog

## React 数据持久化有什么实践吗？

封装数据持久化组件：

```javascript
let storage = {
  // 增加
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  // 获取
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  // 删除
  remove(key) {
    localStorage.removeItem(key);
  },
};
export default Storage;
```

在 React 项目中，通过 redux 存储全局数据时，会有一个问题，如果用户刷新了网页，那么通过 redux 存储的全局数据就会被全部清空，比如登录信息等。这时就会有全局数据持久化存储的需求。首先想到的就是 localStorage，localStorage 是没有时间限制的数据存储，可以通过它来实现数据的持久化存储。

但是在已经使用 redux 来管理和存储全局数据的基础上，再去使用 localStorage 来读写数据，这样不仅是工作量巨大，还容易出错。那么有没有结合 redux 来达到持久数据存储功能的框架呢？当然，它就是**redux-persist**。redux-persist 会将 redux 的 store 中的数据缓存到浏览器的 localStorage 中。其使用步骤如下：

**（1）首先要安装 redux-persist：**

```javascript
npm i redux-persist
```

**（2）对于 reducer 和 action 的处理不变，只需修改 store 的生成代码，修改如下：**

```javascript
import { createStore } from "redux";
import reducers from "../reducers/index";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2, // 查看 'Merge Process' 部分的具体情况
};
const myPersistReducer = persistReducer(persistConfig, reducers);
const store = createStore(myPersistReducer);
export const persistor = persistStore(store);
export default store;
```

**（3）在 index.js 中，将 PersistGate 标签作为网页内容的父标签：**

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { persistor } from "./redux/store/store";
import { PersistGate } from "redux-persist/lib/integration/react";
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/*网页内容*/}
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
```

这就完成了通过 redux-persist 实现 React 持久化本地数据存储的简单应用。

## 对 React 和 Vue 的理解，它们的异同

**相似之处：**

- 都将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库
- 都有自己的构建工具，能让你得到一个根据最佳实践设置的项目模板。
- 都使用了 Virtual DOM（虚拟 DOM）提高重绘性能
- 都有 props 的概念，允许组件间的数据传递
- 都鼓励组件化应用，将应用分拆成一个个功能明确的模块，提高复用性

**不同之处：**

**1）数据流**

Vue 默认支持数据双向绑定，而 React 一直提倡单向数据流

**2）虚拟 DOM**

Vue2.x 开始引入"Virtual DOM"，消除了和 React 在这方面的差异，但是在具体的细节还是有各自的特点。

- Vue 宣称可以更快地计算出 Virtual DOM 的差异，这是由于它在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。
- 对于 React 而言，每当应用的状态被改变时，全部子组件都会重新渲染。当然，这可以通过 PureComponent/shouldComponentUpdate 这个生命周期方法来进行控制，但 Vue 将此视为默认的优化。

**3）组件化**

React 与 Vue 最大的不同是模板的编写。

- Vue 鼓励写近似常规 HTML 的模板。写起来很接近标准 HTML 元素，只是多了一些属性。
- React 推荐你所有的模板通用 JavaScript 的语法扩展——JSX 书写。

具体来讲：React 中 render 函数是支持闭包特性的，所以我们 import 的组件在 render 中可以直接调用。但是在 Vue 中，由于模板中使用的数据都必须挂在 this 上进行一次中转，所以 import 完组件之后，还需要在 components 中再声明下。

**4）监听数据变化的实现原理不同**

- Vue 通过 getter/setter 以及一些函数的劫持，能精确知道数据变化，不需要特别的优化就能达到很好的性能
- React 默认是通过比较引用的方式进行的，如果不优化（PureComponent/shouldComponentUpdate）可能导致大量不必要的 vDOM 的重新渲染。这是因为 Vue 使用的是可变数据，而 React 更强调数据的不可变。

**5）高阶组件**

react 可以通过高阶组件（Higher Order Components-- HOC）来扩展，而 vue 需要通过 mixins 来扩展。

原因高阶组件就是高阶函数，而 React 的组件本身就是纯粹的函数，所以高阶函数对 React 来说易如反掌。相反 Vue.js 使用 HTML 模板创建视图组件，这时模板无法有效的编译，因此 Vue 不采用 HOC 来实现。

**6）构建工具**

两者都有自己的构建工具

- React ==> Create React APP
- Vue ==> vue-cli

**7）跨平台**

- React ==> React Native
- Vue ==> Weex

## React 理念

**（1）编写简单直观的代码**

React 最大的价值不是高性能的虚拟 DOM、封装的事件机制、服务器端渲染，而是声明式的直观的编码方式。react 文档第一条就是声明式，React 使创建交互式 UI 变得轻而易举。为应用的每一个状态设计简洁的视图，当数据改变时 React 能有效地更新并正确地渲染组件。 以声明式编写 UI，可以让代码更加可靠，且方便调试。

**（2）简化可复用的组件**

React 框架里面使用了简化的组件模型，但更彻底地使用了组件化的概念。React 将整个 UI 上的每一个功能模块定义成组件，然后将小的组件通过组合或者嵌套的方式构成更大的组件。React 的组件具有如下的特性 ∶

- 可组合：简单组件可以组合为复杂的组件
- 可重用：每个组件都是独立的，可以被多个组件使用
- 可维护：和组件相关的逻辑和 UI 都封装在了组件的内部，方便维护
- 可测试：因为组件的独立性，测试组件就变得方便很多。

**（3) Virtual DOM**

真实页面对应一个 DOM 树。在传统页面的开发模式中，每次需要更新页面时，都要手动操作 DOM 来进行更新。 DOM 操作非常昂贵。在前端开发中，性能消耗最大的就是 DOM 操作，而且这部分代码会让整体项目的代码变得难 以维护。React 把真实 DOM 树转换成 JavaScript 对象树，也就是 Virtual DOM，每次数据更新后，重新计算 Virtual DOM，并和上一次生成的 Virtual DOM 做对比，对发生变化的部分做批量更新。React 也提供了直观的 shouldComponentUpdate 生命周期回调，来减少数据变化后不必要的 Virtual DOM 对比过程，以保证性能。

**（4）函数式编程**

React 把过去不断重复构建 UI 的过程抽象成了组件，且在给定参数的情况下约定渲染对应的 UI 界面。React 能充分利用很多函数式方法去减少冗余代码。此外，由于它本身就是简单函数，所以易于测试。

**（5）一次学习，随处编写**

无论现在正在使用什么技术栈，都可以随时引入 React 来开发新特性，而不需要重写现有代码。

React 还可以使用 Node 进行服务器渲染，或使用 React Native 开发原生移动应用。因为 React 组件可以映射为对应的原生控件。在输出的时候，是输出 Web DOM，还是 Android 控件，还是 iOS 控件，就由平台本身决定了。所以，react 很方便和其他平台集成

## React 中 props.children 和 React.Children 的区别

在 React 中，当涉及组件嵌套，在父组件中使用`props.children`把所有子组件显示出来。如下：

如果想把父组件中的属性传给所有的子组件，需要使用`React.Children`方法。

```jsx
// App
import React from "react";
import RadioOption from "./Comp";
//父组件用,props是指父组件的props
function renderChildren(props) {
  return React.Children.map(props.children, (child) => {
    if (child.type === RadioOption)
      return React.cloneElement(child, {
        //把父组件的props.name赋值给每个子组件
        name: props.name,
      });
    else return child;
  });
}
//父组件
function RadioGroup(props) {
  return <div>{renderChildren(props)}</div>;
}
function App() {
  return (
    <RadioGroup name="hello">
      <RadioOption label="选项一" value="1" />
      <RadioOption label="选项二" value="2" />
      <RadioOption label="选项三" value="3" />
    </RadioGroup>
  );
}
export { App };
```

```jsx
// Comp
function RadioOption(props) {
  return (
    <label>
      <input type="radio" value={props.value} name={props.name} />
      {props.label}
    </label>
  );
}

export default RadioOption;
```

以上，`React.Children.map`让我们对父组件的所有子组件又更灵活的控制。

## React 的严格模式如何使用，有什么用处？

`StrictMode` 是一个用来突出显示应用程序中潜在问题的工具。与 `Fragment` 一样，`StrictMode` 不会渲染任何可见的 UI。它为其后代元素触发额外的检查和警告。 可以为应用程序的任何部分启用严格模式。例如：

```jsx
import React from "react";
function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```

在上述的示例中，不会对 `Header` 和 `Footer` 组件运行严格模式检查。但是，`ComponentOne` 和 `ComponentTwo` 以及它们的所有后代元素都将进行检查。

`StrictMode` 目前有助于：

- 识别不安全的生命周期
- 关于使用过时字符串 ref API 的警告
- 关于使用废弃的 findDOMNode 方法的警告
- 检测意外的副作用
- 检测过时的 context API

## 在 React 中页面重新加载时怎样保留数据？

这个问题就设计到了**数据持久化，** 主要的实现方式有以下几种：

- **Redux：** 将页面的数据存储在 redux 中，在重新加载页面时，获取 Redux 中的数据；
- **data.js：** 使用 webpack 构建的项目，可以建一个文件，data.js，将数据保存 data.js 中，跳转页面后获取；
- **sessionStorge：** 在进入选择地址页面之前，componentWillUnMount 的时候，将数据存储到 sessionStorage 中，每次进入页面判断 sessionStorage 中有没有存储的那个值，有，则读取渲染数据；没有，则说明数据是初始化的状态。返回或进入除了选择地址以外的页面，清掉存储的 sessionStorage，保证下次进入是初始化的数据
- **history API：** History API 的 `pushState` 函数可以给历史记录关联一个任意的可序列化 `state`，所以可以在路由 `push` 的时候将当前页面的一些信息存到 `state` 中，下次返回到这个页面的时候就能从 `state` 里面取出离开前的数据重新渲染。react-router 直接可以支持。这个方法适合一些需要临时存储的场景。

## 同时引用这三个库 react.js、react-dom.js 和 babel.js 它们都有什么作用？

- react：包含 react 所必须的核心代码
- react-dom：react 渲染在不同平台所需要的核心代码
- babel：将 jsx 转换成 React 代码的工具

## React 必须使用 JSX 吗？

React 并不强制要求使用 JSX。当不想在构建环境中配置有关 JSX 编译时，不在 React 中使用 JSX 会更加方便;每个 JSX 元素只是调用 `React.createElement(component, props, ...children)` 的语法糖。因此，使用 JSX 可以完成的任何事情都可以通过纯 JavaScript 完成。

## 为什么使用 jsx 的组件中没有看到使用 react 却需要引入 react？

本质上来说 JSX 是`React.createElement(component, props, ...children)`方法的语法糖。在 React 17 之前，如果使用了 JSX，其实就是在使用 React， `babel` 会把组件转换为 `CreateElement` 形式。在 React 17 之后，就不再需要引入，因为 `babel` 已经可以帮我们自动引入 react。

## 在 React 中怎么使用 async/await？

async/await 是 ES7 标准中的新特性。如果是使用 React 官方的脚手架创建的项目，就可以直接使用。如果是在自己搭建的 webpack 配置的项目中使用，可能会遇到 **regeneratorRuntime is not defined** 的异常错误。那么我们就需要引入 babel，并在 babel 中配置使用 async/await。可以利用 babel 的 transform-async-to-module-method 插件来转换其成为浏览器支持的语法，虽然没有性能的提升，但对于代码编写体验要更好。

## React.Children.map 和 js 的 map 有什么区别？

JavaScript 中的 map 不会对为 null 或者 undefined 的数据进行处理，而 React.Children.map 中的 map 可以处理 React.Children 为 null 或者 undefined 的情况。

## 对 React SSR 的理解

服务端渲染是数据与模版组成的 html，即 HTML = 数据 ＋ 模版。将组件或页面通过服务器生成 html 字符串，再发送到浏览器，最后将静态标记"混合"为客户端上完全交互的应用程序。页面没使用服务渲染，当请求页面时，返回的 body 里为空，之后执行 js 将 html 结构注入到 body 里，结合 css 显示出来;

**SSR 的优势：**

- 对 SEO 友好
- 所有的模版、图片等资源都存在服务器端
- 一个 html 返回所有数据
- 减少 HTTP 请求
- 响应快、用户体验好、首屏渲染快

**1）更利于 SEO**

不同爬虫工作原理类似，只会爬取源码，不会执行网站的任何脚本使用了 React 或者其它 MVVM 框架之后，页面大多数 DOM 元素都是在客户端根据 js 动态生成，可供爬虫抓取分析的内容大大减少。另外，浏览器爬虫不会等待我们的数据完成之后再去抓取页面数据。服务端渲染返回给客户端的是已经获取了异步数据并执行 JavaScript 脚本的最终 HTML，网络爬中就可以抓取到完整页面的信息。

**2）更利于首屏渲染**

首屏的渲染是 node 发送过来的 html 字符串，并不依赖于 js 文件了，这就会使用户更快的看到页面的内容。尤其是针对大型单页应用，打包后文件体积比较大，普通客户端渲染加载所有所需文件时间较长，首页就会有一个很长的白屏等待时间。

**SSR 的局限：**

**1）服务端压力较大**

本来是通过客户端完成渲染，现在统一到服务端 node 服务去做。尤其是高并发访问的情况，会大量占用服务端 CPU 资源;

**2）开发条件受限**

在服务端渲染中，只会执行到 componentDidMount 之前的生命周期钩子，因此项目引用的第三方的库也不可用其它生命周期钩子，这对引用库的选择产生了很大的限制;

**3）学习成本相对较高** 除了对 webpack、MVVM 框架要熟悉，还需要掌握 node、 Koa2 等相关技术。相对于客户端渲染，项目构建、部署过程更加复杂。

**时间耗时比较：**

**1）数据请求**

由服务端请求首屏数据，而不是客户端请求首屏数据，这是"快"的一个主要原因。服务端在内网进行请求，数据响应速度快。客户端在不同网络环境进行数据请求，且外网 http 请求开销大，导致时间差

## 为什么 React 要用 JSX？

JSX 是一个 JavaScript 的语法扩展，或者说是一个类似于 XML 的 ECMAScript 语法扩展。它本身没有太多的语法定义，也不期望引入更多的标准。

而 JSX 更像是一种语法糖，通过类似 XML 的描述方式，描写函数对象。

通过对比，可以清晰地发现，代码变得更为简洁，而且代码结构层次更为清晰。

因为 React 需要将组件转化为虚拟 DOM 树，所以在编写代码时，实际上是在手写一棵结构树。而**XML 在树结构的描述上天生具有可读性强的优势。**

但这样可读性强的代码仅仅是给写程序的同学看的，实际上在运行的时候，会使用 Babel 插件将 JSX 语法的代码还原为 React.createElement 的代码。

**总结：** JSX 是一个 JavaScript 的语法扩展，结构类似 XML。JSX 主要用于声明 React 元素，但 React 中并不强制使用 JSX。即使使用了 JSX，也会在构建过程中，通过 Babel 插件编译为 React.createElement。所以 JSX 更像是 React.createElement 的一种语法糖。

React 团队并不想引入 JavaScript 本身以外的开发体系。而是希望通过合理的关注点分离保持组件开发的纯粹性。

## HOC 相比 mixins 有什么优点？

HOC 和 Vue 中的 mixins 作用是一致的，并且在早期 React 也是使用 mixins 的方式。但是在使用 class 的方式创建组件以后，mixins 的方式就不能使用了，并且其实 mixins 也是存在一些问题的，比如：

- 隐含了一些依赖，比如我在组件中写了某个 `state` 并且在 `mixin` 中使用了，就这存在了一个依赖关系。万一下次别人要移除它，就得去 `mixin` 中查找依赖
- 多个 `mixin` 中可能存在相同命名的函数，同时代码组件中也不能出现相同命名的函数，否则就是重写了，其实我一直觉得命名真的是一件麻烦事。。
- 雪球效应，虽然我一个组件还是使用着同一个 `mixin`，但是一个 `mixin` 会被多个组件使用，可能会存在需求使得 `mixin` 修改原本的函数或者新增更多的函数，这样可能就会产生一个维护成本

HOC 解决了这些问题，并且它们达成的效果也是一致的，同时也更加的政治正确（毕竟更加函数式了）。

## React 中的高阶组件运用了什么设计模式？

使用了装饰模式，高阶组件的运用：

```javascript
function withWindowWidth(BaseComponent) {
  class DerivedClass extends React.Component {
    state = {
      windowWidth: window.innerWidth,
    };
    onResize = () => {
      this.setState({
        windowWidth: window.innerWidth,
      });
    };
    componentDidMount() {
      window.addEventListener("resize", this.onResize);
    }
    componentWillUnmount() {
      window.removeEventListener("resize", this.onResize);
    }
    render() {
      return <BaseComponent {...this.props} {...this.state} />;
    }
  }
  return DerivedClass;
}
const MyComponent = (props) => {
  return <div>Window width is: {props.windowWidth}</div>;
};
export default withWindowWidth(MyComponent);
```

装饰模式的特点是不需要改变 被装饰对象 本身，而只是在外面套一个外壳接口。JavaScript 目前已经有了原生装饰器的提案，其用法如下：

```javascript
@testable
class MyTestableClass {}
```

## React.memo 作用及实现

```javascript
作用：为函数组件提供类似PureComponent的功能，调用方式
React.memo(Component, [isEqual])
其中isEqual方法的返回值与shouldComponentUpdate返回值相反
// 3种实现方式
// 函数式组件
function memo(Component, isEqual) {
  function MemoComponent(props) {
    const prevProps = React.useRef(props)
    React.useEffect(() => {
      prevProps.current = props
    })
    return React.useMemo(() => <Component {...props} />, [
      isEqual(prevProps.current, props),
    ])
  }
  return MemoComponent
}
// 使用PureComponent
function memo(Component, isEqual) {
  return class MemoComponent extends React.PureComponent {
    render() {
      return <Component {...this.props} />
    }
  }
}

// 使用shouldComponentUpdate
function memo(Component, isEqual) {
  return class MemoComponent extends React.Component {
    shouldComponentUpdate(prevProps) {
      return !isEqual(prevProps, this.props)
    }
    render() {
      return <Component {...this.props} />
    }
  }
}
```

## React 有哪些代码复用的方式？举一些实践的例子？

高阶组件，RenderProps，Hooks 等

[https://juejin.cn/post/6941546135827775525](https://juejin.cn/post/6941546135827775525)

## Redux 解决了什么问题？实现原理是什么？中间件的原理？

[https://juejin.cn/post/6844903857135304718#heading-40](https://juejin.cn/post/6844903857135304718#heading-40)

## react 受控组件

在 Ant Design 中，对 Input 输入框进行操作，如果是改变 defaultValue 会发现毫无作用。
这是因为 React 的 form 表单组件中的 defaultValue 一经传递值后，后续改变 defaultValue 都将不起作用，被忽略了。
具体来说这是一种 React 非受控组件，其状态是在 input 的 React 内部控制，不受调用者控制。
所以受控组件就是可以被 React 状态控制的组件。双向数据绑定就是受控组件，你可以为 form 中某个输入框添加 value 属性，然后控制它的一个改变。而非受控组件就是没有添加 value 属性的组件，你并不能对它的固定值进行操作。

## React 组件在多次 render 中， hooks 的调用顺序为什么要保持一致?

Hooks 通过链表存储，需要顺序访问
[https://juejin.cn/post/6944863057000529933](https://juejin.cn/post/6944863057000529933)

## 请比较 React hooks 与 React class component 性能的区别

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  });

 return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

class Counter extends Component {
  state = {
    count: 0
  };
  componentDidMount() {
    setTimeout(() => {
      console.log(`You clicked ${this.state.count} times`);
    }, 3000);
  }

  componentDidUpdate() {
    setTimeout(() => {
      console.log(`You clicked ${this.state.count} times`);
    }, 3000);
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({
          count: this.state.count + 1
        })}>
          Click me
        </button>
      </div>
    )
  }
}

1. 连续点击 Click me 5下， fc和class component 分别输出啥？ 为什么？
2. 如何修改class 让其输出 1，2，3，4，5？
3. 如何修改fc让其输出 5次5？

1. fc: 1,2,3,4,5 class: 5,5,5,5,5  (每次的count值)
2. componentDidUpdate() {
    const count = this.state.count;
    setTimeout(() => {
      console.log(`You clicked ${count} times`);
    }, 3000);
  }
3.  const latestCount = useRef(count);
    useEffect(() => {
      latestCount.current = count;
      setTimeout(() => {
        console.log(`You clicked ${latestCount.current} times`);
      }, 3000);
    });
```

## 请介绍 react diff 算法和策略

react 的 diff 算法和策略了解多少，为什么 react 的 diff 性能好，遵循什么样的策略可以把 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题

React 分别对 tree diff、component diff 以及 element diff 做了算法优化， 做了一些假设

1. Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计
2. 拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构
3. 对于同一层级的一组子节点，它们可以通过唯一 id 进行区分

tree diff：React 对树的算法进行了简洁明了的优化，即对树进行分层比较，两棵树只会对同一层次的节点进行比较 component diff：

a.如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。

b.如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。

c.对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff element diff： 允许开发者对同一层级的同组子节点，添加唯一 key 进行区分，减少增加和删除
详见：[https://zhuanlan.zhihu.com/p/20346379](https://zhuanlan.zhihu.com/p/20346379)

**要求：专门看过相关的介绍并可以入手在减少节点移动和减少重复渲染上做过努力,对 diff 算法有较深入的代码层面的了解，可得 3.5 分**

## 使用过哪些 Hooks，解决了什么问题？如何实现自定义 Hooks？Hooks 的实现原理？

[https://juejin.cn/post/6844903857135304718#heading-50](https://juejin.cn/post/6844903857135304718#heading-50)

## React 原理题： 多次调用 setState 会执行几次？我说只会更新一次，其中会有一个异步更新去重队列。（面试官又提起兴趣了）

## React 高阶组件、Render props、hooks 有什么区别，为什么要不断迭代

这三者是目前 react 解决代码复用的主要方式：

- 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。具体而言，高阶组件是参数为组件，返回值为新组件的函数。
- render props 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术，更具体的说，render prop 是一个用于告知组件需要渲染什么内容的函数 prop。
- 通常，render props 和高阶组件只渲染一个子节点。让 Hook 来服务这个使用场景更加简单。这两种模式仍有用武之地，（例如，一个虚拟滚动条组件或许会有一个 renderltem 属性，或是一个可见的容器组件或许会有它自己的 DOM 结构）。但在大部分场景下，Hook 足够了，并且能够帮助减少嵌套。

**（1）HOC** 官方解释 ∶

> 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

简言之，HOC 是一种组件的设计模式，HOC 接受一个组件和额外的参数（如果需要），返回一个新的组件。HOC 是纯函数，没有副作用。

```javascript
// hoc的定义
function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, props)
      };
    }
    // 一些通用的逻辑处理
    render() {
      // ... 并使用新数据渲染被包装的组件!
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };

// 使用
const BlogPostWithSubscription = withSubscription(BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id));

```

HOC 的优缺点 ∶

- 优点 ∶ 逻辑服用、不影响被包裹组件的内部逻辑。
- 缺点 ∶ hoc 传递给被包裹组件的 props 容易和被包裹后的组件重名，进而被覆盖

**（2）Render props** 官方解释 ∶

> "render prop"是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术

具有 render prop 的组件接受一个返回 React 元素的函数，将 render 的渲染逻辑注入到组件内部。在这里，"render"的命名可以是任何其他有效的标识符。

```javascript
// DataProvider组件内部的渲染逻辑如下
class DataProvider extends React.Components {
  state = {
    name: "Tom",
  };

  render() {
    return (
      <div>
        <p>共享数据组件自己内部的渲染逻辑</p>
        {this.props.render(this.state)}
      </div>
    );
  }
}

// 调用方式
<DataProvider render={(data) => <h1>Hello {data.name}</h1>} />;
```

由此可以看到，render props 的优缺点也很明显 ∶

- 优点：数据共享、代码复用，将组件内的 state 作为 props 传递给调用者，将渲染逻辑交给调用者。
- 缺点：无法在 return 语句外访问数据、嵌套写法不够优雅

**（3）Hooks** 官方解释 ∶

> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。通过自定义 hook，可以复用代码逻辑。

```javascript
// 自定义一个获取订阅数据的hook
function useSubscription() {
  const data = DataSource.getComments();
  return [data];
}
//
function CommentList(props) {
  const {data} = props;
  const [subData] = useSubscription();
    ...
}
// 使用
<CommentList data='hello' />

```

以上可以看出，hook 解决了 hoc 的 prop 覆盖的问题，同时使用的方式解决了 render props 的嵌套地狱的问题。hook 的优点如下 ∶

- 使用直观；
- 解决 hoc 的 prop 重名问题；
- 解决 render props 因共享数据 而出现嵌套地狱的问题；
- 能在 return 之外使用数据的问题。

需要注意的是：hook 只能在组件顶层使用，不可在分支语句中使用。

**总结 ∶** Hoc、render props 和 hook 都是为了解决代码复用的问题，但是 hoc 和 render props 都有特定的使用场景和明显的缺点。hook 是 react16.8 更新的新的 API，让组件逻辑复用更简洁明了，同时也解决了 hoc 和 render props 的一些缺点。

## React.Component 和 React.PureComponent 的区别

PureComponent 表示一个纯组件，可以用来优化 React 程序，减少 render 函数执行的次数，从而提高组件的性能。

在 React 中，当 prop 或者 state 发生变化时，可以通过在 shouldComponentUpdate 生命周期函数中执行 return false 来阻止页面的更新，从而减少不必要的 render 执行。React.PureComponent 会自动执行 shouldComponentUpdate。

不过，pureComponent 中的 shouldComponentUpdate() 进行的是**浅比较**，也就是说如果是引用数据类型的数据，只会比较不是同一个地址，而不会比较这个地址里面的数据是否一致。浅比较会忽略属性和或状态突变情况，其实也就是数据引用指针没有变化，而数据发生改变的时候 render 是不会执行的。如果需要重新渲染那么就需要重新开辟空间引用数据。PureComponent 一般会用在一些纯展示组件上。

使用 pureComponent 的**好处**：当组件更新时，如果组件的 props 或者 state 都没有改变，render 函数就不会触发。省去虚拟 DOM 的生成和对比过程，达到提升性能的目的。这是因为 react 自动做了一层浅比较。

## Component, Element, Instance 之间有什么区别和联系？

- **元素：** 一个元素`element`是一个普通对象(plain object)，描述了对于一个 DOM 节点或者其他组件`component`，你想让它在屏幕上呈现成什么样子。元素`element`可以在它的属性`props`中包含其他元素(译注:用于形成元素树)。创建一个 React 元素`element`成本很低。元素`element`创建之后是不可变的。
- **组件：** 一个组件`component`可以通过多种方式声明。可以是带有一个`render()`方法的类，简单点也可以定义为一个函数。这两种情况下，它都把属性`props`作为输入，把返回的一棵元素树作为输出。
- **实例：** 一个实例`instance`是你在所写的组件类`component class`中使用关键字`this`所指向的东西(译注:组件实例)。它用来存储本地状态和响应生命周期事件很有用。

函数式组件(`Functional component`)根本没有实例`instance`。类组件(`Class component`)有实例`instance`，但是永远也不需要直接创建一个组件的实例，因为 React 帮我们做了这些。

## React.createClass 和 extends Component 的区别有哪些？

React.createClass 和 extends Component 的 bai 区别主要在于：

**（1）语法区别**

- createClass 本质上是一个工厂函数，extends 的方式更加接近最新的 ES6 规范的 class 写法。两种方式在语法上的差别主要体现在方法的定义和静态属性的声明上。
- createClass 方式的方法定义使用逗号，隔开，因为 creatClass 本质上是一个函数，传递给它的是一个 Object；而 class 的方式定义方法时务必谨记不要使用逗号隔开，这是 ES6 class 的语法规范。

**（2）propType 和 getDefaultProps**

- React.createClass：通过 proTypes 对象和 getDefaultProps()方法来设置和获取 props.
- React.Component：通过设置两个属性 propTypes 和 defaultProps

**（3）状态的区别**

- React.createClass：通过 getInitialState()方法返回一个包含初始值的对象
- React.Component：通过 constructor 设置初始状态

**（4）this 区别**

- React.createClass：会正确绑定 this
- React.Component：由于使用了 ES6，这里会有些微不同，属性并不会自动绑定到 React 类的实例上。

**（5）Mixins**

- React.createClass：使用 React.createClass 的话，可以在创建组件时添加一个叫做 mixins 的属性，并将可供混合的类的集合以数组的形式赋给 mixins。
- 如果使用 ES6 的方式来创建组件，那么 `React mixins` 的特性将不能被使用了。

## React 高阶组件是什么，和普通组件有什么区别，适用什么场景

官方解释 ∶

> 高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

高阶组件（HOC）就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件，它只是一种组件的设计模式，这种设计模式是由 react 自身的组合性质必然产生的。我们将它们称为纯组件，因为它们可以接受任何动态提供的子组件，但它们不会修改或复制其输入组件中的任何行为。

```javascript
// hoc的定义
function withSubscription(WrappedComponent, selectData) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: selectData(DataSource, props)
      };
    }
    // 一些通用的逻辑处理
    render() {
      // ... 并使用新数据渲染被包装的组件!
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };

// 使用
const BlogPostWithSubscription = withSubscription(BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id));

```

**1）HOC 的优缺点**

- 优点 ∶ 逻辑服用、不影响被包裹组件的内部逻辑。
- 缺点 ∶hoc 传递给被包裹组件的 props 容易和被包裹后的组件重名，进而被覆盖

**2）适用场景**

- 代码复用，逻辑抽象
- 渲染劫持
- State 抽象和更改
- Props 更改

**3）具体应用例子**

- **权限控制：** 利用高阶组件的 **条件渲染** 特性可以对页面进行权限控制，权限控制一般分为两个维度：页面级别和 页面元素级别

```javascript
// HOC.js
function withAdminAuth(WrappedComponent) {
    return class extends React.Component {
        state = {
            isAdmin: false,
        }
        async UNSAFE_componentWillMount() {
            const currentRole = await getCurrentUserRole();
            this.setState({
                isAdmin: currentRole === 'Admin',
            });
        }
        render() {
            if (this.state.isAdmin) {
                return <WrappedComponent {...this.props} />;
            } else {
                return (<div>您没有权限查看该页面，请联系管理员！</div>);
            }
        }
    };
}

// pages/page-a.js
class PageA extends React.Component {
    constructor(props) {
        super(props);
        // something here...
    }
    UNSAFE_componentWillMount() {
        // fetching data
    }
    render() {
        // render page with data
    }
}
export default withAdminAuth(PageA);


// pages/page-b.js
class PageB extends React.Component {
    constructor(props) {
        super(props);
    // something here...
        }
    UNSAFE_componentWillMount() {
    // fetching data
    }
    render() {
    // render page with data
    }
}
export default withAdminAuth(PageB);

```

- **组件渲染性能追踪：** 借助父组件子组件生命周期规则捕获子组件的生命周期，可以方便的对某个组件的渲染时间进行记录 ∶

```javascript
class Home extends React.Component {
  render() {
    return <h1>Hello World.</h1>;
  }
}
function withTiming(WrappedComponent) {
  return class extends WrappedComponent {
    constructor(props) {
      super(props);
      this.start = 0;
      this.end = 0;
    }
    UNSAFE_componentWillMount() {
      super.componentWillMount && super.componentWillMount();
      this.start = Date.now();
    }
    componentDidMount() {
      super.componentDidMount && super.componentDidMount();
      this.end = Date.now();
      console.log(
        `${WrappedComponent.name} 组件渲染时间为 ${this.end - this.start} ms`
      );
    }
    render() {
      return super.render();
    }
  };
}

export default withTiming(Home);
```

注意：withTiming 是利用 反向继承 实现的一个高阶组件，功能是计算被包裹组件（这里是 Home 组件）的渲染时间。

- **页面复用**

```javascript
const withFetching = fetching => WrappedComponent => {
    return class extends React.Component {
        state = {
            data: [],
        }
        async UNSAFE_componentWillMount() {
            const data = await fetching();
            this.setState({
                data,
            });
        }
        render() {
            return <WrappedComponent data={this.state.data} {...this.props} />;
        }
    }
}

// pages/page-a.js
export default withFetching(fetching('science-fiction'))(MovieList);
// pages/page-b.js
export default withFetching(fetching('action'))(MovieList);
// pages/page-other.js
export default withFetching(fetching('some-other-type'))(MovieList);

```

## 哪些方法会触发 React 重新渲染？重新渲染 render 会做些什么？

**（1）哪些方法会触发 react 重新渲染?**

- **setState（）方法被调用**

setState 是 React 中最常用的命令，通常情况下，执行 setState 会触发 render。但是这里有个点值得关注，执行 setState 的时候不一定会重新渲染。当 setState 传入 null 时，并不会触发 render。

```javascript
class App extends React.Component {
  state = {
    a: 1,
  };

  render() {
    console.log("render");
    return (
      <React.Fragement>
        <p>{this.state.a}</p>
        <button
          onClick={() => {
            this.setState({ a: 1 }); // 这里并没有改变 a 的值
          }}
        >
          Click me
        </button>
        <button onClick={() => this.setState(null)}>setState null</button>
        <Child />
      </React.Fragement>
    );
  }
}
```

- **父组件重新渲染**

只要父组件重新渲染了，即使传入子组件的 props 未发生变化，那么子组件也会重新渲染，进而触发 render

**（2）重新渲染 render 会做些什么?**

- 会对新旧 VNode 进行对比，也就是我们所说的 Diff 算法。
- 对新旧两棵树进行一个深度优先遍历，这样每一个节点都会一个标记，在到深度遍历的时候，每遍历到一和个节点，就把该节点和新的节点树进行对比，如果有差异就放到一个对象里面
- 遍历差异对象，根据差异的类型，根据对应对规则更新 VNode

React 的处理 render 的基本思维模式是每次一有变动就会去重新渲染整个应用。在 Virtual DOM 没有出现之前，最简单的方法就是直接调用 innerHTML。Virtual DOM 厉害的地方并不是说它比直接操作 DOM 快，而是说不管数据怎么变，都会尽量以最小的代价去更新 DOM。React 将 render 函数返回的虚拟 DOM 树与老的进行比较，从而确定 DOM 要不要更新、怎么更新。当 DOM 树很大时，遍历两棵树进行各种比对还是相当耗性能的，特别是在顶层 setState 一个微小的修改，默认会去遍历整棵树。尽管 React 使用高度优化的 Diff 算法，但是这个过程仍然会损耗性能.

## React 声明组件有哪几种方法，有什么不同？

React 声明组件的三种方式：

- 函数式定义的`无状态组件`
- ES5 原生方式`React.createClass`定义的组件
- ES6 形式的`extends React.Component`定义的组件

**（1）无状态函数式组件** 它是为了创建纯展示组件，这种组件只负责根据传入的 props 来展示，不涉及到 state 状态的操作 组件不会被实例化，整体渲染性能得到提升，不能访问 this 对象，不能访问生命周期的方法

**（2）ES5 原生方式 React.createClass // RFC** React.createClass 会自绑定函数方法，导致不必要的性能开销，增加代码过时的可能性。

**（3）E6 继承形式 React.Component // RCC** 目前极为推荐的创建有状态组件的方式，最终会取代 React.createClass 形式；相对于 React.createClass 可以更好实现代码复用。

**无状态组件相对于于后者的区别：** 与无状态组件相比，React.createClass 和 React.Component 都是创建有状态的组件，这些组件是要被实例化的，并且可以访问组件的生命周期方法。

**React.createClass 与 React.Component 区别：**

**① 函数 this 自绑定**

- React.createClass 创建的组件，其每一个成员函数的 this 都有 React 自动绑定，函数中的 this 会被正确设置。
- React.Component 创建的组件，其成员函数不会自动绑定 this，需要开发者手动绑定，否则 this 不能获取当前组件实例对象。

**② 组件属性类型 propTypes 及其默认 props 属性 defaultProps 配置不同**

- React.createClass 在创建组件时，有关组件 props 的属性类型及组件默认的属性会作为组件实例的属性来配置，其中 defaultProps 是使用 getDefaultProps 的方法来获取默认组件属性的
- React.Component 在创建组件时配置这两个对应信息时，他们是作为组件类的属性，不是组件实例的属性，也就是所谓的类的静态属性来配置的。

**③ 组件初始状态 state 的配置不同**

- React.createClass 创建的组件，其状态 state 是通过 getInitialState 方法来配置组件相关的状态；
- React.Component 创建的组件，其状态 state 是在 constructor 中像初始化组件属性一样声明的。

## 对有状态组件和无状态组件的理解及使用场景

**（1）有状态组件**

**特点：**

- 是类组件
- 有继承
- 可以使用 this
- 可以使用 react 的生命周期
- 使用较多，容易频繁触发生命周期钩子函数，影响性能
- 内部使用 state，维护自身状态的变化，有状态组件根据外部组件传入的 props 和自身的 state 进行渲染。

**使用场景：**

- 需要使用到状态的。
- 需要使用状态操作组件的（无状态组件的也可以实现新版本 react hooks 也可实现）

**总结：** 类组件可以维护自身的状态变量，即组件的 state ，类组件还有不同的生命周期方法，可以让开发者能够在组件的不同阶段（挂载、更新、卸载），对组件做更多的控制。类组件则既可以充当无状态组件，也可以充当有状态组件。当一个类组件不需要管理自身状态时，也可称为无状态组件。

**（2）无状态组件** **特点：**

- 不依赖自身的状态 state
- 可以是类组件或者函数组件。
- 可以完全避免使用 this 关键字。（由于使用的是箭头函数事件无需绑定）
- 有更高的性能。当不需要使用生命周期钩子时，应该首先使用无状态函数组件
- 组件内部不维护 state ，只根据外部组件传入的 props 进行渲染的组件，当 props 改变时，组件重新渲染。

**使用场景：**

- 组件不需要管理 state，纯展示

**优点：**

- 简化代码、专注于 render
- 组件不需要被实例化，无生命周期，提升性能。 输出（渲染）只取决于输入（属性），无副作用
- 视图和数据的解耦分离

**缺点：**

- 无法使用 ref
- 无生命周期方法
- 无法控制组件的重渲染，因为无法使用 shouldComponentUpdate 方法，当组件接受到新的属性时则会重渲染

**总结：** 组件内部状态且与外部无关的组件，可以考虑用状态组件，这样状态树就不会过于复杂，易于理解和管理。当一个组件不需要管理自身状态时，也就是无状态组件，应该优先设计为函数组件。比如自定义的 `<Button/>`、 `<Input />` 等组件。

## 对 React 中 Fragment 的理解，它的使用场景是什么？

在 React 中，组件返回的元素只能有一个根元素。为了不添加多余的 DOM 节点，我们可以使用 Fragment 标签来包裹所有的元素，Fragment 标签不会渲染出任何元素。React 官方对 Fragment 的解释：

> React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点。

```javascript
import React, { Component, Fragment } from 'react'

// 一般形式
render() {
  return (
    <React.Fragment>
      <ChildA />
      <ChildB />
      <ChildC />
    </React.Fragment>
  );
}
// 也可以写成以下形式
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}

```

## React 如何获取组件对应的 DOM 元素？

可以用 ref 来获取某个子节点的实例，然后通过当前 class 组件实例的一些特定属性来直接获取子节点实例。ref 有三种实现方法:

- **字符串格式**：字符串格式，这是 React16 版本之前用得最多的，例如：`<p ref="info">span</p>`
- **函数格式**：ref 对应一个方法，该方法有一个参数，也就是对应的节点实例，例如：`<p ref={ele => this.info = ele}></p>`
- **createRef 方法**：React 16 提供的一个 API，使用 React.createRef()来实现

## React 中可以在 render 访问 refs 吗？为什么？

```javascript
<>
  <span id="name" ref={this.spanRef}>
    {this.state.title}
  </span>
  <span>{this.spanRef.current ? "有值" : "无值"}</span>
</>;
```

不可以，render 阶段 DOM 还没有生成，无法获取 DOM。DOM 的获取需要在 pre-commit 阶段和 commit 阶段：

## 对 React 的插槽(Portals)的理解，如何使用，有哪些使用场景

React 官方对 Portals 的定义：

> Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案

Portals 是 React 16 提供的官方解决方案，使得组件可以脱离父组件层级挂载在 DOM 树的任何位置。通俗来讲，就是我们 render 一个组件，但这个组件的 DOM 结构并不在本组件内。

Portals 语法如下：

```javascript
ReactDOM.createPortal(child, container);
```

- 第一个参数 child 是可渲染的 React 子项，比如元素，字符串或者片段等;
- 第二个参数 container 是一个 DOM 元素。

一般情况下，组件的 render 函数返回的元素会被挂载在它的父级组件上：

```javascript
import DemoComponent from './DemoComponent';
render() {
  // DemoComponent元素会被挂载在id为parent的div的元素上
  return (
    <div id="parent">
        <DemoComponent />
    </div>
  );
}

```

然而，有些元素需要被挂载在更高层级的位置。最典型的应用场景：当父组件具有`overflow: hidden`或者`z-index`的样式设置时，组件有可能被其他元素遮挡，这时就可以考虑要不要使用 Portal 使组件的挂载脱离父组件。例如：对话框，模态窗。

```javascript
import DemoComponent from './DemoComponent';
render() {
  // DemoComponent元素会被挂载在id为parent的div的元素上
  return (
    <div id="parent">
        <DemoComponent />
    </div>
  );
}

```

## 对 React-Intl 的理解，它的工作原理？

React-intl 是雅虎的语言国际化开源项目 FormatJS 的一部分，通过其提供的组件和 API 可以与 ReactJS 绑定。

React-intl 提供了两种使用方法，一种是引用 React 组件，另一种是直接调取 API，官方更加推荐在 React 项目中使用前者，只有在无法使用 React 组件的地方，才应该调用框架提供的 API。它提供了一系列的 React 组件，包括数字格式化、字符串格式化、日期格式化等。

在 React-intl 中，可以配置不同的语言包，他的工作原理就是根据需要，在语言包之间进行切换。

## React 中什么是受控组件和非控组件？

**（1）受控组件** 在使用表单来收集用户输入时，例如`<input><select><textearea>`等元素都要绑定一个 change 事件，当表单的状态发生变化，就会触发 onChange 事件，更新组件的 state。这种组件在 React 中被称为**受控组件**，在受控组件中，组件渲染出的状态与它的 value 或 checked 属性相对应，react 通过这种方式消除了组件的局部状态，使整个状态可控。react 官方推荐使用受控表单组件。

受控组件更新 state 的流程：

- 可以通过初始 state 中设置表单的默认值
- 每当表单的值发生变化时，调用 onChange 事件处理器
- 事件处理器通过事件对象 e 拿到改变后的状态，并更新组件的 state
- 一旦通过 setState 方法更新 state，就会触发视图的重新渲染，完成表单组件的更新

**受控组件缺陷：** 表单元素的值都是由 React 组件进行管理，当有多个输入框，或者多个这种组件时，如果想同时获取到全部的值就必须每个都要编写事件处理函数，这会让代码看着很臃肿，所以为了解决这种情况，出现了非受控组件。

**（2）非受控组件** 如果一个表单组件没有 value props（单选和复选按钮对应的是 checked props）时，就可以称为非受控组件。在非受控组件中，可以使用一个 ref 来从 DOM 获得表单值。而不是为每个状态更新编写一个事件处理程序。

React 官方的解释：

> 要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以使用 ref 来从 DOM 节点中获取表单数据。 因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。

例如，下面的代码在非受控组件中接收单个属性：

```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    alert("A name was submitted: " + this.input.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => (this.input = input)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

**总结：** 页面中所有输入类的 DOM 如果是现用现取的称为非受控组件，而通过 setState 将输入的值维护到了 state 中，需要时再从 state 中取出，这里的数据就受到了 state 的控制，称为受控组件。

## React 中 refs 的作用是什么？有哪些应用场景？

Refs 提供了一种方式，用于访问在 render 方法中创建的 React 元素或 DOM 节点。Refs 应该谨慎使用，如下场景使用 Refs 比较适合：

- 处理焦点、文本选择或者媒体的控制
- 触发必要的动画
- 集成第三方 DOM 库

Refs 是使用 `React.createRef()` 方法创建的，他通过 `ref` 属性附加到 React 元素上。要在整个组件中使用 Refs，需要将 `ref` 在构造函数中分配给其实例属性：

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

由于函数组件没有实例，因此不能在函数组件上直接使用 `ref`：

```javascript
function MyFunctionalComponent() {
  return <input />;
}
class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }
  render() {
    // 这将不会工作！
    return <MyFunctionalComponent ref={this.textInput} />;
  }
}
```

但可以通过闭合的帮助在函数组件内部进行使用 Refs：

```javascript
function CustomTextInput(props) {
  // 这里必须声明 textInput，这样 ref 回调才可以引用它
  let textInput = null;
  function handleClick() {
    textInput.focus();
  }
  return (
    <div>
      <input
        type="text"
        ref={(input) => {
          textInput = input;
        }}
      />
      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  );
}
```

**注意：**

- 不应该过度的使用 Refs
- 的返回值取决于节点的类型：
  - 当 `ref` 属性被用于一个普通的 HTML 元素时，`React.createRef()` 将接收底层 DOM 元素作为他的 `current` 属性以创建 `ref`。
  - 当 `ref` 属性被用于一个自定义的类组件时，`ref` 对象将接收该组件已挂载的实例作为他的 `current`。
- 当在父组件中需要访问子组件中的 `ref` 时可使用传递 Refs 或回调 Refs。

## React 组件的构造函数有什么作用？它是必须的吗？

构造函数主要用于两个目的：

- 通过将对象分配给 this.state 来初始化本地状态
- 将事件处理程序方法绑定到实例上

所以，当在 React class 中需要设置 state 的初始值或者绑定事件时，需要加上构造函数，官方 Demo：

```javascript
class LikeButton extends React.Component {
  constructor() {
    super();
    this.state = {
      liked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({ liked: !this.state.liked });
  }
  render() {
    const text = this.state.liked ? "liked" : "haven't liked";
    return (
      <div onClick={this.handleClick}>You {text} this. Click to toggle.</div>
    );
  }
}
ReactDOM.render(<LikeButton />, document.getElementById("example"));
```

构造函数用来新建父类的 this 对象；子类必须在 constructor 方法中调用 super 方法；否则新建实例时会报错；因为子类没有自己的 this 对象，而是继承父类的 this 对象，然后对其进行加工。如果不调用 super 方法；子类就得不到 this 对象。

**注意：**

- constructor () 必须配上 super(), 如果要在 constructor 内部使用 this.props 就要 传入 props , 否则不用
- JavaScript 中的 bind 每次都会返回一个新的函数, 为了性能等考虑, 尽量在 constructor 中绑定事件

## React.forwardRef 是什么？它有什么作用？

React.forwardRef 会创建一个 React 组件，这个组件能够将其接受的 ref 属性转发到其组件树下的另一个组件中。这种技术并不常见，但在以下两种场景中特别有用：

- 转发 refs 到 DOM 组件
- 在高阶组件中转发 refs

## 类组件与函数组件有什么异同？

**相同点：** 组件是 React 可复用的最小代码片段，它们会返回要在页面中渲染的 React 元素。也正因为组件是 React 的最小编码单位，所以无论是函数组件还是类组件，在使用方式和最终呈现效果上都是完全一致的。

我们甚至可以将一个类组件改写成函数组件，或者把函数组件改写成一个类组件（虽然并不推荐这种重构行为）。从使用者的角度而言，很难从使用体验上区分两者，而且在现代浏览器中，闭包和类的性能只在极端场景下才会有明显的差别。所以，基本可认为两者作为组件是完全一致的。

**不同点：**

- 它们在开发时的心智模型上却存在巨大的差异。类组件是基于面向对象编程的，它主打的是继承、生命周期等核心概念；而函数组件内核是函数式编程，主打的是 immutable、没有副作用、引用透明等特点。
- 之前，在使用场景上，如果存在需要使用生命周期的组件，那么主推类组件；设计模式上，如果需要使用继承，那么主推类组件。但现在由于 React Hooks 的推出，生命周期概念的淡出，函数组件可以完全取代类组件。其次继承并不是组件最佳的设计模式，官方更推崇“组合优于继承”的设计概念，所以类组件在这方面的优势也在淡出。
- 性能优化上，类组件主要依靠 shouldComponentUpdate 阻断渲染来提升性能，而函数组件依靠 React.memo 缓存渲染结果来提升性能。
- 从上手程度而言，类组件更容易上手，从未来趋势上看，由于 React Hooks 的推出，函数组件成了社区未来主推的方案。
- 类组件在未来时间切片与并发模式中，由于生命周期带来的复杂度，并不易于优化。而函数组件本身轻量简单，且在 Hooks 的基础上提供了比原先更细粒度的逻辑组织与复用，更能适应 React 的未来发展。

## React setState 调用的原理

- 首先调用了`setState` 入口函数，入口函数在这里就是充当一个分发器的角色，根据入参的不同，将其分发到不同的功能函数中去；

```javascript
ReactComponent.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, "setState");
  }
};
```

- `enqueueSetState` 方法将新的 `state` 放进组件的状态队列里，并调用 `enqueueUpdate` 来处理将要更新的实例对象；

```javascript
enqueueSetState: function (publicInstance, partialState) {
  // 根据 this 拿到对应的组件实例
  var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');
  // 这个 queue 对应的就是一个组件实例的 state 数组
  var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
  queue.push(partialState);
  //  enqueueUpdate 用来处理当前的组件实例
  enqueueUpdate(internalInstance);
}

```

- 在 `enqueueUpdate` 方法中引出了一个关键的对象——`batchingStrategy`，该对象所具备的`isBatchingUpdates` 属性直接决定了当下是要走更新流程，还是应该排队等待；如果轮到执行，就调用 `batchedUpdates` 方法来直接发起更新流程。由此可以推测，`batchingStrategy` 或许正是 React 内部专门用于管控批量更新的对象。

```javascript
function enqueueUpdate(component) {
  ensureInjected();
  // 注意这一句是问题的关键，isBatchingUpdates标识着当前是否处于批量创建/更新组件的阶段
  if (!batchingStrategy.isBatchingUpdates) {
    // 若当前没有处于批量创建/更新组件的阶段，则立即更新组件
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }
  // 否则，先把组件塞入 dirtyComponents 队列里，让它“再等等”
  dirtyComponents.push(component);
  if (component._updateBatchNumber == null) {
    component._updateBatchNumber = updateBatchNumber + 1;
  }
}
```

**注意：**`batchingStrategy` 对象可以理解为“锁管理器”。这里的“锁”，是指 React 全局唯一的 `isBatchingUpdates` 变量，`isBatchingUpdates` 的初始值是 `false`，意味着“当前并未进行任何批量更新操作”。每当 React 调用 `batchedUpdate` 去执行更新动作时，会先把这个锁给“锁上”（置为 `true`），表明“现在正处于批量更新过程中”。当锁被“锁上”的时候，任何需要更新的组件都只能暂时进入 `dirtyComponents` 里排队等候下一次的批量更新，而不能随意“插队”。此处体现的“任务锁”的思想，是 React 面对大量状态仍然能够实现有序分批处理的基石。

## React setState 调用之后发生了什么？是同步还是异步？

**（1）React 中 setState 后发生了什么**

在代码中调用 setState 函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发调和过程(Reconciliation)。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个 UI 界面。

在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

如果在短时间内频繁 setState。React 会将 state 的改变压入栈中，在合适的时机，批量更新 state 和视图，达到提高性能的效果。

**（2）setState 是同步还是异步的**

假如所有 setState 是同步的，意味着每执行一次 setState 时（有可能一个同步代码中，多次 setState），都重新 vnode diff + dom 修改，这对性能来说是极为不好的。如果是异步，则可以把一个同步代码中的多个 setState 合并成一次组件更新。所以默认是异步的，但是在一些情况下是同步的。

setState 并不是单纯同步/异步的，它的表现会因调用场景的不同而不同。在源码中，通过 isBatchingUpdates 来判断 setState 是先存进 state 队列还是直接更新，如果值为 true 则执行异步操作，为 false 则直接更新。

- **异步：** 在 React 可以控制的地方，就为 true，比如在 React 生命周期事件和合成事件中，都会走合并操作，延迟更新的策略。
- **同步：** 在 React 无法控制的地方，比如原生事件，具体就是在 addEventListener 、setTimeout、setInterval 等事件中，就只能同步更新。

一般认为，做异步设计是为了性能优化、减少渲染次数：

- `setState`设计为异步，可以显著的提升性能。如果每次调用 `setState`都进行一次更新，那么意味着`render`函数会被频繁调用，界面重新渲染，这样效率是很低的；最好的办法应该是获取到多个更新，之后进行批量更新；
- 如果同步更新了`state`，但是还没有执行`render`函数，那么`state`和`props`不能保持同步。`state`和`props`不能保持一致性，会在开发中产生很多的问题；

## React 中的 setState 批量更新的过程是什么？

调用 `setState` 时，组件的 `state` 并不会立即改变， `setState` 只是把要修改的 `state` 放入一个队列， `React` 会优化真正的执行时机，并出于性能原因，会将 `React` 事件处理程序中的多次`React` 事件处理程序中的多次 `setState` 的状态修改合并成一次状态修改。 最终更新只产生一次组件及其子组件的重新渲染，这对于大型应用程序中的性能提升至关重要。

```javascript
this.setState({
  count: this.state.count + 1    ===>    入队，[count+1的任务]
});
this.setState({
  count: this.state.count + 1    ===>    入队，[count+1的任务，count+1的任务]
});
                                          ↓
                                         合并 state，[count+1的任务]
                                          ↓
                                         执行 count+1的任务

```

需要注意的是，只要同步代码还在执行，“攒起来”这个动作就不会停止。（注：这里之所以多次 +1 最终只有一次生效，是因为在同一个方法中多次 setState 的合并动作不是单纯地将更新累加。比如这里对于相同属性的设置，React 只会为其保留最后一次的更新）。

## React 中有使用过 getDefaultProps 吗？它有什么作用？

通过实现组件的 getDefaultProps，对属性设置默认值（ES5 的写法）：

```javascript
var ShowTitle = React.createClass({
  getDefaultProps: function () {
    return {
      title: "React",
    };
  },
  render: function () {
    return <h1>{this.props.title}</h1>;
  },
});
```

## React 中 setState 的第二个参数作用是什么？

`setState` 的第二个参数是一个可选的回调函数。这个回调函数将在组件重新渲染后执行。等价于在 `componentDidUpdate` 生命周期内执行。通常建议使用 `componentDidUpdate` 来代替此方式。在这个回调函数中你可以拿到更新后 `state` 的值：

```javascript
this.setState({
    key1: newState1,
    key2: newState2,
    ...
}, callback) // 第二个参数是 state 更新完成后的回调函数

```

## React 中的 setState 和 replaceState 的区别是什么？

**（1）setState()** setState()用于设置状态对象，其语法如下：

```javascript
setState(object nextState[, function callback])

```

- nextState，将要设置的新状态，该状态会和当前的 state 合并
- callback，可选参数，回调函数。该函数会在 setState 设置成功，且组件重新渲染后调用。

合并 nextState 和当前 state，并重新渲染组件。setState 是 React 事件处理函数中和请求回调函数中触发 UI 更新的主要方法。

**（2）replaceState()** replaceState()方法与 setState()类似，但是方法只会保留 nextState 中状态，原 state 不在 nextState 中的状态都会被删除。其语法如下：

```javascript
replaceState(object nextState[, function callback])

```

- nextState，将要设置的新状态，该状态会替换当前的 state。
- callback，可选参数，回调函数。该函数会在 replaceState 设置成功，且组件重新渲染后调用。

**总结：** setState 是修改其中的部分状态，相当于 Object.assign，只是覆盖，不会减少原来的状态。而 replaceState 是完全替换原来的状态，相当于赋值，将原来的 state 替换为另一个对象，如果新状态属性减少，那么 state 中就没有这个状态了。

## 在 React 中组件的 this.state 和 setState 有什么区别？

this.state 通常是用来初始化 state 的，this.setState 是用来修改 state 值的。如果初始化了 state 之后再使用 this.state，之前的 state 会被覆盖掉，如果使用 this.setState，只会替换掉相应的 state 值。所以，如果想要修改 state 的值，就需要使用 setState，而不能直接修改 state，直接修改 state 之后页面是不会更新的。

## state 是怎么注入到组件的，从 reducer 到组件经历了什么样的过程

通过 connect 和 mapStateToProps 将 state 注入到组件中：

```javascript
import { connect } from "react-redux";
import { setVisibilityFilter } from "@/reducers/Todo/actions";
import Link from "@/containers/Todo/components/Link";

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setFilter: () => {
    dispatch(setVisibilityFilter(ownProps.filter));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);
```

上面代码中，active 就是注入到 Link 组件中的状态。 mapStateToProps（state，ownProps）中带有两个参数，含义是 ∶

- state-store 管理的全局状态对象，所有都组件状态数据都存储在该对象中。
- ownProps 组件通过 props 传入的参数。

**reducer 到组件经历的过程：**

- reducer 对 action 对象处理，更新组件状态，并将新的状态值返回 store。
- 通过 connect（mapStateToProps，mapDispatchToProps）（Component）对组件 Component 进行升级，此时将状态值从 store 取出并作为 props 参数传递到组件。

**高阶组件实现源码 ∶**

```javascript
import React from "react";
import PropTypes from "prop-types";

// 高阶组件 contect
export const connect =
  (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends React.Component {
      // 通过对context调用获取store
      static contextTypes = {
        store: PropTypes.object,
      };

      constructor() {
        super();
        this.state = {
          allProps: {},
        };
      }

      // 第一遍需初始化所有组件初始状态
      componentWillMount() {
        const store = this.context.store;
        this._updateProps();
        store.subscribe(() => this._updateProps()); // 加入_updateProps()至store里的监听事件列表
      }

      // 执行action后更新props，使组件可以更新至最新状态（类似于setState）
      _updateProps() {
        const store = this.context.store;
        let stateProps = mapStateToProps
          ? mapStateToProps(store.getState(), this.props)
          : {}; // 防止 mapStateToProps 没有传入
        let dispatchProps = mapDispatchToProps
          ? mapDispatchToProps(store.dispatch, this.props)
          : {
              dispatch: store.dispatch,
            }; // 防止 mapDispatchToProps 没有传入
        this.setState({
          allProps: {
            ...stateProps,
            ...dispatchProps,
            ...this.props,
          },
        });
      }

      render() {
        return <WrappedComponent {...this.state.allProps} />;
      }
    }
    return Connect;
  };
```

## React 组件的 state 和 props 有什么区别？

**（1）props**

props 是一个从外部传进组件的参数，主要作为就是从父组件向子组件传递数据，它具有可读性和不变性，只能通过外部组件主动传入新的 props 来重新渲染子组件，否则子组件的 props 以及展现形式不会改变。

**（2）state**

state 的主要作用是用于组件保存、控制以及修改自己的状态，它只能在 constructor 中初始化，它算是组件的私有属性，不可通过外部访问和修改，只能通过组件内部的 this.setState 来修改，修改 state 属性会导致组件的重新渲染。

**（3）区别**

- props 是传递给组件的（类似于函数的形参），而 state 是在组件内被组件自己管理的（类似于在一个函数内声明的变量）。
- props 是不可修改的，所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。
- state 是在组件中创建的，一般在 constructor 中初始化 state。state 是多变的、可以修改，每次 setState 都异步更新的。

## React 中的 props 为什么是只读的？

`this.props`是组件之间沟通的一个接口，原则上来讲，它只能从父组件流向子组件。React 具有浓重的函数式编程的思想。

提到函数式编程就要提一个概念：纯函数。它有几个特点：

- 给定相同的输入，总是返回相同的输出。
- 过程没有副作用。
- 不依赖外部状态。

`this.props`就是汲取了纯函数的思想。props 的不可以变性就保证的相同的输入，页面显示的内容是一样的，并且不会产生副作用

## 在 React 中组件的 props 改变时更新组件的有哪些方法？

在一个组件传入的 props 更新时重新渲染该组件常用的方法是在`componentWillReceiveProps`中将新的 props 更新到组件的 state 中（这种 state 被成为派生状态（Derived State）），从而实现重新渲染。React 16.3 中还引入了一个新的钩子函数`getDerivedStateFromProps`来专门实现这一需求。

**（1）componentWillReceiveProps（已废弃）**

在 react 的 componentWillReceiveProps(nextProps)生命周期中，可以在子组件的 render 函数执行前，通过 this.props 获取旧的属性，通过 nextProps 获取新的 props，对比两次 props 是否相同，从而更新子组件自己的 state。

这样的好处是，可以将数据请求放在这里进行执行，需要传的参数则从 componentWillReceiveProps(nextProps)中获取。而不必将所有的请求都放在父组件中。于是该请求只会在该组件渲染时才会发出，从而减轻请求负担。

**（2）getDerivedStateFromProps（16.3 引入）**

这个生命周期函数是为了替代`componentWillReceiveProps`存在的，所以在需要使用`componentWillReceiveProps`时，就可以考虑使用`getDerivedStateFromProps`来进行替代。

两者的参数是不相同的，而`getDerivedStateFromProps`是一个静态函数，也就是这个函数不能通过 this 访问到 class 的属性，也并不推荐直接访问属性。而是应该通过参数提供的 nextProps 以及 prevState 来进行判断，根据新传入的 props 来映射到 state。

需要注意的是，**如果 props 传入的内容不需要影响到你的 state，那么就需要返回一个 null**，这个返回值是必须的，所以尽量将其写到函数的末尾：

```javascript
static getDerivedStateFromProps(nextProps, prevState) {
    const {type} = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (type !== prevState.type) {
        return {
            type,
        };
    }
    // 否则，对于state不进行任何操作
    return null;
}

```

## React 中怎么检验 props？验证 props 的目的是什么？

**React**为我们提供了**PropTypes**以供验证使用。当我们向**Props**传入的数据无效（向 Props 传入的数据类型和验证的数据类型不符）就会在控制台发出警告信息。它可以避免随着应用越来越复杂从而出现的问题。并且，它还可以让程序变得更易读。

```javascript
import PropTypes from "prop-types";

class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

Greeting.propTypes = {
  name: PropTypes.string,
};
```

当然，如果项目汇中使用了 TypeScript，那么就可以不用 PropTypes 来校验，而使用 TypeScript 定义接口来校验 props。
