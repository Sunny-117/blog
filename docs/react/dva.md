# dva

:::danger
已经不维护了，仅供学习
:::

> 官方网站：[https://dvajs.com](https://dvajs.com)
> dva 不仅仅是一个第三方库，更是一个框架，它主要整合了 redux 的相关内容，让我们处理数据更加容易，实际上，dva 依赖了很多：react、react-router、redux、redux-saga、react-redux、connected-react-router 等。

# dva 的使用

1.  dva 默认导出一个函数，通过调用该函数，可以得到一个 dva 对象
2.  dva 对象.router：路由方法，传入一个函数，该函数返回一个 React 节点，将来，应用程序启动后，会自动渲染该节点。
3.  dva 对象.start: 该方法用于启动 dva 应用程序，可以认为启动的就是 react 程序，该函数传入一个选择器，用于选中页面中的某个 dom 元素，react 会将内容渲染到该元素内部。
4.  dva 对象.model: 该方法用于定义一个模型，该模型可以理解为 redux 的 action、reducer、redux-saga 副作用处理的整合，整合成一个对象，将该对象传入 model 方法即可。
5.  namespace：命名空间，该属性是一个字符串，字符串的值，会被作为仓库中的属性保存
6.  state：该模型的默认状态
7.  reducers: 该属性配置为一个对象，对象中的每个方法就是一个 reducer，dva 约定，方法的名字，就是匹配的 action 类型
8.  effects: 处理副作用，底层是使用 redux-saga 实现的，该属性配置为一个对象，对象中的每隔方法均处理一个副作用，方法的名字，就是匹配的 action 类型。
    1. 函数的参数 1：action
    2. 参数 2：封装好的 saga/effects 对象
9.  subscriptions：配置为一个对象，该对象中可以写任意数量任意名称的属性，每个属性是一个函数，这些函数会在模型加入到仓库中后立即运行。
10. 在 dva 中同步路由到仓库
11. 在调用 dva 函数时，配置 history 对象
12. 使用 ConnectedRouter 提供路由上下文
13. 配置：
14. history：同步到仓库的 history 对象
15. initialState：创建 redux 仓库时，使用的默认状态
16. onError: 当仓库的运行发生错误的时候，运行的函数
17. onAction: 可以配置 redux 中间件
    1. 传入一个中间件对象
    2. 传入一个中间件数组
18. onStateChange: 当仓库中的状态发生变化时运行的函数
19. onReducer：对模型中的 reducer 的进一步封装
20. onEffect：类似于对模型中的 effect 的进一步封装
21. extraReducers：用于配置额外的 reducer，它是一个对象，对象的每一个属性是一个方法，每个方法就是一个需要合并的 reducer，方法名即属性名。
22. extraEnhancers: 它是用于封装 createStore 函数的，dva 会将原来的仓库创建函数作为参数传递，返回一个新的用于创建仓库的函数。函数必须放置到数组中。

# dva 插件

通过`dva对象.use(插件)`，来使用插件，插件本质上就是一个对象，该对象与配置对象相同，dva 会在启动时，将传递的插件对象混合到配置中。

## dva-loading

该插件会在仓库中加入一个状态，名称为 loading，它是一个对象，其中有以下属性

- global：全局是否正在处理副作用（加载），只要有任何一个模型在处理副作用，则该属性为 true
- models：一个对象，对象中的属性名以及属性的值，表示哪个对应的模型是否在处理副作用中（加载中）
- effects：一个对象，对象中的属性名以及属性的值，表示是哪个 action 触发了副作用
