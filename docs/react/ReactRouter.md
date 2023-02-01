# ReactRouter

# React Router 概述

## 站点

无论是使用 Vue，还是 React，开发的单页应用程序，可能只是该站点的一部分（某一个功能块）
一个单页应用里，可能会划分为多个页面（几乎完全不同的页面效果）（组件）

如果要在单页应用中完成组件的切换，需要实现下面两个功能：

1. 根据不同的页面地址，展示不同的组件（核心）
2. 完成无刷新的地址切换

我们把实现了以上两个功能的插件，称之为路由

## React Router

1. react-router：路由核心库，包含诸多和路由功能相关的核心代码
2. react-router-dom：利用路由核心库，结合实际的页面，实现跟页面路由密切相关的功能

如果是在页面中实现路由，需要安装 react-router-dom 库

# 两种模式

路由：根据不同的页面地址，展示不同的组件

url 地址组成

例：[https://www.react.com:443/news/1-2-1.html?a=1&b=2#abcdefg](https://www.react.com:443/news/1-2-1.html?a=1&b=2#abcdefg)

1. 协议名(schema)：https
2. 主机名(host)：www.react.com
   1. ip 地址
   2. 预设值：localhost
   3. 域名
   4. 局域网中电脑名称
3. 端口号(port)：443
   1. 如果协议是 http，端口号是 80，则可以省略端口号
   2. 如果协议是 https，端口号是 443，则可以省略端口号
4. 路径(path)：/news/1-2-1.html
5. 地址参数(search、query)：?a=1&b=2
   1. 附带的数据
   2. 格式：属性名=属性值&属性名=属性值....
6. 哈希(hash、锚点)
   1. 附带的数据

## Hash Router 哈希路由

根据 url 地址中的哈希值来确定显示的组件

> 原因：hash 的变化，不会导致页面刷新
> 这种模式的兼容性最好

## Borswer History Router 浏览器历史记录路由

之前存在的 api：history.forward(), history.back(), history.go()
HTML5 出现后，新增了 History Api，从此以后，浏览器拥有了改变路径而不刷新页面的方式

History 表示浏览器的历史记录，它使用栈的方式存储。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/758572/1630852761503-b41ea24f-31bd-4df7-88c8-ff9269ebcc03.png#averageHue=%23fbe8dc&clientId=u93429593-fec4-4&errorMessage=unknown%20error&from=paste&height=253&id=u0b49fa97&name=image.png&originHeight=506&originWidth=501&originalType=binary&ratio=1&rotation=0&showTitle=false&size=31240&status=error&style=none&taskId=u3686e2b0-28c3-4cc6-b585-cbd613c5966&title=&width=250.5)

1. history.length：获取栈中数据量
2. history.pushState：向当前历史记录栈中加入一条新的记录
   1. 参数 1：附加的数据，自定义的数据，可以是任何类型
   2. 参数 2：页面标题，目前大部分浏览器不支持
   3. 参数 3：新的地址
3. history.replaceState：将当前指针指向的历史记录，替换为某个记录
   1. 参数 1：附加的数据，自定义的数据，可以是任何类型
   2. 参数 2：页面标题，目前大部分浏览器不支持
   3. 参数 3：新的地址

根据页面的路径决定渲染哪个组件，不是根据哈希了

# 路由组件

React-Router 为我们提供了两个重要组件

## Router 组件

它本身不做任何展示，仅提供路由模式配置，另外，该组件会产生一个上下文，上下文中会提供一些实用的对象和方法，供其他相关组件使用

1. HashRouter：该组件，使用 hash 模式匹配
2. BrowserRouter：该组件，使用 BrowserHistory 模式匹配

通常情况下，Router 组件只有一个，将该组件包裹整个页面

## Route 组件

根据不同的地址，展示不同的组件

重要属性：

1. path：匹配的路径
   1. 默认情况下，不区分大小写，可以设置 sensitive 属性为 true，来区分大小写
   2. 默认情况下，只匹配初始目录，如果要精确匹配，配置 exact 属性为 true
   3. 如果不写 path，则会匹配任意路径
2. component：匹配成功后要显示的组件
3. children：
   1. 传递 React 元素，无论是否匹配，一定会显示 children，并且会忽略 component 属性
   2. 传递一个函数，该函数有多个参数，这些参数来自于上下文，该函数返回 react 元素，则一定会显示返回的元素，并且忽略 component 属性.

Route 组件可以写到任意的地方，只要保证它是 Router 组件的后代元素

## Switch 组件

写到 Switch 组件中的 Route 组件，当匹配到第一个 Route 后，会立即停止匹配

由于 Switch 组件会循环所有子元素，然后让每个子元素去完成匹配，若匹配到，则渲染对应的组件，然后停止循环。因此，不能在 Switch 的子元素中使用除 Route 外的其他组件。

# 路由信息

Router 组件会创建一个上下文，并且，向上下文中注入一些信息

该上下文对开发者是隐藏的，Route 组件若匹配到了地址，则会将这些上下文中的信息作为属性传入对应的组件

## history

它并不是 window.history 对象，我们利用该对象无刷新跳转地址

**为什么没有直接使用 history 对象**

1. React-Router 中有两种模式：Hash、History，如果直接使用 window.history，只能支持一种模式。为了适配两种模式
2. 当使用 windows.history.pushState 方法时，没有办法收到任何通知，将导致 React 无法知晓地址发生了变化，结果导致无法重新渲染组件

- push：将某个新的地址入栈（历史记录栈）
  - 参数 1：新的地址
  - 参数 2：可选，附带的状态数据
- replace：将某个新的地址替换掉当前栈中的地址
- go: 与 window.history 一致
- forward: 与 window.history 一致
- back: 与 window.history 一致

## location

与 history.location 完全一致，是同一个对象，但是，与 window.location 不同

location 对象中记录了当前地址的相关信息

我们通常使用第三方库`query-string`，用于解析地址栏中的数据

## match

该对象中保存了，路由匹配的相关信息

- isExact：事实上，当前的路径和路由配置的路径是否是精确匹配的。和 exact 写没写无关
- params：获取路径规则中对应的数据

实际上，在书写 Route 组件的 path 属性时，可以书写一个`string pattern`（字符串正则）

react-router 使用了第三方库：Path-to-RegExp，该库的作用是，将一个字符串正则转换成一个真正的正则表达式。

**向某个页面传递数据的方式：**

1. 使用 state：在 push 页面时，加入 state
2. **利用 search：把数据填写到地址栏中的？后**
3. 利用 hash：把数据填写到 hash 后
4. **params：把数据填写到路径中**

## 非路由组件获取路由信息

某些组件，并没有直接放到 Route 中，而是嵌套在其他普通组件中，因此，它的 props 中没有路由信息，如果这些组件需要获取到路由信息，可以使用下面两种方式：

1. 将路由信息从父组件一层一层传递到子组件
2. 使用 react-router 提供的高阶组件 withRouter，包装要使用的组件，该高阶组件会返回一个新组件，新组件将向提供的组件注入路由信息。

# 其他组件

已学习：

- Router：BrowswerRouter、HashRouter
- Route
- Switch
- 高阶函数：withRouter

## Link

生成一个无刷新跳转的 a 元素

- to
  - 字符串：跳转的目标地址
  - 对象：
    - pathname：url 路径
    - search
    - hash
    - state：附加的状态信息
- replace：bool，表示是否是替换当前地址，默认是 false，是 push 跳转
- innerRef：可以将内部的 a 元素的 ref 附着在传递的对象或函数参数上
  - 函数
  - ref 对象

## NavLink

是一种特殊的 Link，Link 组件具备的功能，它都有

它具备的额外功能是：根据当前地址和链接地址，来决定该链接的样式

- activeClassName: 匹配时使用的类名
- activeStyle: 匹配时使用的内联样式
- exact: 是否精确匹配
- sensitive：匹配时是否区分大小写
- strict：是否严格匹配最后一个斜杠

## Redirect

重定向组件，当加载到该组件时，会自动跳转（无刷新）到另外一个地址

- to：跳转的地址
  - 字符串
  - 对象
- push: 默认为 false，表示跳转使用替换的方式，设置为 true 后，则使用 push 的方式跳转
- from：当匹配到 from 地址规则时才进行跳转
- exact: 是否精确匹配 from
- sensitive：from 匹配时是否区分大小写
- strict：from 是否严格匹配最后一个斜杠

> vue-router 和 React router

vue-router 是一个静态的配置
react-router v4 之前 静态的配置
现在 react-router 是动态的组件，灵活了

# 嵌套路由

# 导航守卫

导航守卫：当离开一个页面，进入另一个页面时，触发的事件

history 对象

- listen: 添加一个监听器，监听地址的变化，当地址发生变化时，会调用传递的函数
  - 参数：函数，运行时间点：发生在即将跳转到新页面时
    - 参数 1：location 对象，记录当前的地址信息
    - 参数 2：action，一个字符串，表示进入该地址的方式
      - POP：出栈 （指针移动）
        - 通过点击浏览器后退、前进
        - 调用 history.go
        - 调用 history.goBack
        - 调用 history.goForward
      - PUSH：入栈 （指针移动）
        - history.push
      - REPLACE：替换
        - history.replace
  - 返回结果：函数，可以调用该函数取消监听
- block：设置一个阻塞，并同时设置阻塞消息，当页面发生跳转时，会进入阻塞，并将阻塞消息传递到路由根组件的 getUserConfirmation 方法。
  - 返回一个回调函数，用于取消阻塞器

路由根组件

- getUserConfirmation
  - 参数：函数
    - 参数 1：阻塞消息
      - 字符串消息
      - 函数，函数的返回结果是一个字符串，用于表示阻塞消息
        - 参数 1：location 对象
        - 参数 2：action 值
    - 参数 2：回调函数，调用该函数并传递 true，则表示进入到新页面，否则，不做任何操作

# 常见应用 - 路由切换动画

第三方动画库：react-transition-group

CSSTransition：用于为内部的 DOM 元素添加类样式，通过 in 属性决定内部的 DOM 处于退出还是进入阶段。

# 滚动条复位

## 高阶组件

## 使用 useEffect

## 使用自定义的导航守卫

# 路由

### React-Router 的实现原理是什么？

客户端路由实现的思想：

- 基于 hash 的路由：通过监听
  事件，感知 hash 的变化 `hashchange`
  - 改变 hash 可以直接通过 location.hash=xxx
- 基于 H5 history 路由：
  - 改变 url 可以通过 history.pushState 和 resplaceState 等，会将 URL 压入堆栈，同时能够应用 `history.go()` 等 API
  - 监听 url 的变化可以通过自定义事件触发实现

**react-router 实现的思想：**

- 基于 `history` 库来实现上述不同的客户端路由实现思想，并且能够保存历史记录等，磨平浏览器差异，上层无感知
- 通过维护的列表，在每次 URL 发生变化的回收，通过配置的 路由路径，匹配到对应的 Component，并且 render

### 如何配置 React-Router 实现路由切换

**（1）使用**`<Route>` 组件

路由匹配是通过比较 `<Route>` 的 path 属性和当前地址的 pathname 来实现的。当一个 `<Route>` 匹配成功时，它将渲染其内容，当它不匹配时就会渲染 null。没有路径的 `<Route>` 将始终被匹配。

```javascript
// when location = { pathname: '/about' }
<Route path='/about' component={About}/> // renders <About/>
<Route path='/contact' component={Contact}/> // renders null
<Route component={Always}/> // renders <Always/>
```

（2）Switch 和 Route

`<Switch>` 用于将 `<Route>` 分组。

```javascript
<Switch>
  <Route exact path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
</Switch>
```

`<Switch>` 不是分组 `<Route>` 所必须的，但他通常很有用。 一个 `<Switch>` 会遍历其所有的子 `<Route>`元素，并仅渲染与当前地址匹配的第一个元素。

**（3）使用 **`<Link>、 <NavLink>、<Redirect>**` 组件

`<Link>` 组件来在你的应用程序中创建链接。无论你在何处渲染一个`<Link>` ，都会在应用程序的 HTML 中渲染锚（`<a>`）。

```javascript
<Link to="/">Home</Link>
// <a href='/'>Home</a>
```

是一种特殊类型的   当它的 to 属性与当前地址匹配时，可以将其定义为"活跃的"。

```javascript
// location = { pathname: '/react' }
<NavLink to="/react" activeClassName="hurray">
  React
</NavLink>;
// <a href='/react' className='hurray'>React</a>
```

当我们想强制导航时，可以渲染一个`<Redirect>`，当一个`<Redirect>`渲染时，它将使用它的 to 属性进行定向。

### React-Router 怎么设置重定向？

使用`<Redirect>`组件实现路由的重定向：

```jsx
<Switch>
  <Redirect from="/users/:id" to="/users/profile/:id" />
  <Route path="/users/profile/:id" component={Profile} />
</Switch>
```

当请求 `/users/:id` 被重定向去 `'/users/profile/:id'`：

- 属性 `from: string`：需要匹配的将要被重定向路径。
- 属性 `to: string`：重定向的 URL 字符串
- 属性 `to: object`：重定向的 location 对象
- 属性 `push: bool`：若为真，重定向操作将会把新地址加入到访问历史记录里面，并且无法回退到前面的页面。

### react-router 里的 Link 标签和 a 标签的区别

从最终渲染的 DOM 来看，这两者都是链接，都是 标签，区别是 ∶ `<Link>`是 react-router 里实现路由跳转的链接，一般配合`<Route>` 使用，react-router 接管了其默认的链接跳转行为，区别于传统的页面跳转，`<Link>` 的“跳转”行为只会触发相匹配的`<Route>`对应的页面内容更新，而不会刷新整个页面。

`<Link>`做了 3 件事情:

- 有 onclick 那就执行 onclick
- click 的时候阻止 a 标签默认事件
- 根据跳转 href(即是 to)，用 history (web 前端路由两种方式之一，history & hash)跳转，此时只是链接变了，并没有刷新页面而`<a>`标签就是普通的超链接了，用于从当前页面跳转到 href 指向的另一 个页面(非锚点情况)。

a 标签默认事件禁掉之后做了什么才实现了跳转?

```javascript
let domArr = document.getElementsByTagName('a')
[...domArr].forEach(item=>{
    item.addEventListener('click',function () {
        location.href = this.href
    })
})
```

### React-Router 如何获取 URL 的参数和历史对象？

**（1）获取 URL 的参数**

- **get 传值**

路由配置还是普通的配置，如：`'admin'`，传参方式如：`'admin?id='1111''`。通过`this.props.location.search`获取 url 获取到一个字符串`'?id='1111'` 可以用 url，qs，querystring，浏览器提供的 api URLSearchParams 对象或者自己封装的方法去解析出 id 的值。

- **动态路由传值**

路由需要配置成动态路由：如`path='/admin/:id'`，传参方式，如`'admin/111'`。通过`this.props.match.params.id` 取得 url 中的动态路由 id 部分的值，除此之外还可以通过`useParams（Hooks）`来获取

- **通过 query 或 state 传值**

传参方式如：在 Link 组件的 to 属性中可以传递对象`{pathname:'/admin',query:'111',state:'111'};`。通过`this.props.location.state`或`this.props.location.query`来获取即可，传递的参数可以是对象、数组等，但是存在缺点就是只要刷新页面，参数就会丢失。

**（2）获取历史对象**

- 如果 React >= 16.8 时可以使用 React Router 中提供的 Hooks

```javascript
import { useHistory } from "react-router-dom";
let history = useHistory();
```

2.使用 this.props.history 获取历史对象

```javascript
let history = this.props.history;
```

### React-Router 4 怎样在路由变化时重新渲染同一个组件？

当路由变化时，即组件的 props 发生了变化，会调用 componentWillReceiveProps 等生命周期钩子。那需要做的只是： 当路由改变时，根据路由，也去请求数据：

```javascript
class NewsList extends Component {
  componentDidMount () {
     this.fetchData(this.props.location);
  }

  fetchData(location) {
    const type = location.pathname.replace('/', '') || 'top'
    this.props.dispatch(fetchListData(type))
  }
  componentWillReceiveProps(nextProps) {
     if (nextProps.location.pathname != this.props.location.pathname) {
         this.fetchData(nextProps.location);
     }
  }
  render () {
    ...
  }
}

```

利用生命周期 componentWillReceiveProps，进行重新 render 的预处理操作。

### React-Router 的路由有几种模式？

React-Router 支持使用 hash（对应 HashRouter）和 browser（对应 BrowserRouter） 两种路由规则， react-router-dom 提供了 BrowserRouter 和 HashRouter 两个组件来实现应用的 UI 和 URL 同步：

- BrowserRouter 创建的 URL 格式：[xxx.com/path](https://link.juejin.cn?target=http%3A%2F%2Fxxx.com%2Fpath)
- HashRouter 创建的 URL 格式：[xxx.com/#/path](https://link.juejin.cn?target=http%3A%2F%2Fxxx.com%2F%23%2Fpath)

**（1）BrowserRouter**

它使用 HTML5 提供的 history API（pushState、replaceState 和 popstate 事件）来保持 UI 和 URL 的同步。由此可以看出，**BrowserRouter 是使用 HTML 5 的 history API 来控制路由跳转的：**

```javascript
<BrowserRouter
  basename={string}
  forceRefresh={bool}
  getUserConfirmation={func}
  keyLength={number}
/>;
```

**其中的属性如下：**

- basename 所有路由的基准 URL。basename 的正确格式是前面有一个前导斜杠，但不能有尾部斜杠；

```javascript
<BrowserRouter basename="/calendar">
  <Link to="/today" />
</BrowserRouter>;
```

等同于

```javascript
<a href="/calendar/today" />;
```

- forceRefresh 如果为 true，在导航的过程中整个页面将会刷新。一般情况下，只有在不支持 HTML5 history API 的浏览器中使用此功能；
- getUserConfirmation 用于确认导航的函数，默认使用 window.confirm。例如，当从 /a 导航至 /b 时，会使用默认的 confirm 函数弹出一个提示，用户点击确定后才进行导航，否则不做任何处理；

```javascript
// 这是默认的确认函数
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message);
  callback(allowTransition);
};
<BrowserRouter getUserConfirmation={getConfirmation} />;
```

> 需要配合`<Prompt>` 一起使用。

- KeyLength 用来设置 Location.Key 的长度。

**（2）HashRouter**

使用 URL 的 hash 部分（即 window.location.hash）来保持 UI 和 URL 的同步。由此可以看出，**HashRouter 是通过 URL 的 hash 属性来控制路由跳转的：**

```javascript
<HashRouter basename={string} getUserConfirmation={func} hashType={string} />;
```

**其参数如下**：

- basename, getUserConfirmation 和 `BrowserRouter` 功能一样；
- hashType window.location.hash 使用的 hash 类型，有如下几种：
  - slash - 后面跟一个斜杠，例如 #/ 和 #/sunshine/lollipops；
  - noslash - 后面没有斜杠，例如 # 和 #sunshine/lollipops；
  - hashbang - Google 风格的 ajax crawlable，例如 #!/ 和 #!/sunshine/lollipops。

### React-Router 4 的 Switch 有什么用？

Switch 通常被用来包裹 Route，用于渲染与路径匹配的第一个子 `<Route>` 或 `<Redirect>`，它里面不能放其他元素。

假如不加 `<Switch>` ：

```javascript
import { Route } from 'react-router-dom'

<Route path="/" component={Home}></Route>
<Route path="/login" component={Login}></Route>

```

Route 组件的 path 属性用于匹配路径，因为需要匹配 `/` 到 `Home`，匹配 `/login` 到 `Login`，所以需要两个 Route，但是不能这么写。这样写的话，当 URL 的 path 为 “/login” 时，`<Route path="/" />`和`<Route path="/login" />` 都会被匹配，因此页面会展示 Home 和 Login 两个组件。这时就需要借助 `<Switch>` 来做到只显示一个匹配组件：

```javascript
import { Switch, Route } from "react-router-dom";

<Switch>
  <Route path="/" component={Home}></Route>
  <Route path="/login" component={Login}></Route>
</Switch>;
```

此时，再访问 “/login” 路径时，却只显示了 Home 组件。这是就用到了 exact 属性，它的作用就是精确匹配路径，经常与`<Switch>` 联合使用。只有当 URL 和该 `<Route>` 的 path 属性完全一致的情况下才能匹配上：

```javascript
import { Switch, Route } from "react-router-dom";

<Switch>
  <Route exact path="/" component={Home}></Route>
  <Route exact path="/login" component={Login}></Route>
</Switch>;
```

## Redux

### 对 Redux 的理解，主要解决什么问题

React 是视图层框架。Redux 是一个用来管理数据状态和 UI 状态的 JavaScript 应用工具。随着 JavaScript 单页应用（SPA）开发日趋复杂， JavaScript 需要管理比任何时候都要多的 state（状态）， Redux 就是降低管理难度的。（Redux 支持 React、Angular、jQuery 甚至纯 JavaScript）

在 React 中，UI 以组件的形式来搭建，组件之间可以嵌套组合。但 React 中组件间通信的数据流是单向的，顶层组件可以通过 props 属性向下层组件传递数据，而下层组件不能向上层组件传递数据，兄弟组件之间同样不能。这样简单的单向数据流支撑起了 React 中的数据可控性。

当项目越来越大的时候，管理数据的事件或回调函数将越来越多，也将越来越不好管理。管理不断变化的 state 非常困难。如果一个 model 的变化会引起另一个 model 变化，那么当 view 变化时，就可能引起对应 model 以及另一个 model 的变化，依次地，可能会引起另一个 view 的变化。直至你搞不清楚到底发生了什么。state 在什么时候，由于什么原因，如何变化已然不受控制。 当系统变得错综复杂的时候，想重现问题或者添加新功能就会变得举步维艰。如果这还不够糟糕，考虑一些来自前端开发领域的新需求，如更新调优、服务端渲染、路由跳转前请求数据等。state 的管理在大项目中相当复杂。

Redux 提供了一个叫 store 的统一仓储库，组件通过 dispatch 将 state 直接传入 store，不用通过其他的组件。并且组件通过 subscribe 从 store 获取到 state 的改变。使用了 Redux，所有的组件都可以从 store 中获取到所需的 state，他们也能从 store 获取到 state 的改变。这比组件之间互相传递数据清晰明朗的多。

**主要解决的问题：** 单纯的 Redux 只是一个状态机，是没有 UI 呈现的，react- redux 作用是将 Redux 的状态机和 React 的 UI 呈现绑定在一起，当你 dispatch action 改变 state 的时候，会自动更新页面。

### Redux 原理及工作流程

（1）原理 Redux 源码主要分为以下几个模块文件

- compose.js 提供从右到左进行函数式编程
- createStore.js 提供作为生成唯一 store 的函数
- combineReducers.js 提供合并多个 reducer 的函数，保证 store 的唯一性
- bindActionCreators.js 可以让开发者在不直接接触 dispacth 的前提下进行更改 state 的操作
- applyMiddleware.js 这个方法通过中间件来增强 dispatch 的功能

```javascript
const actionTypes = {
    ADD: 'ADD',
    CHANGEINFO: 'CHANGEINFO',
}

const initState = {
    info: '初始化',
}

export default function initReducer(state=initState, action) {
    switch(action.type) {
        case actionTypes.CHANGEINFO:
            return {
                ...state,
                info: action.preload.info || '',
            }
        default:
            return { ...state };
    }
}

export default function createStore(reducer, initialState, middleFunc) {

    if (initialState && typeof initialState === 'function') {
        middleFunc = initialState;
        initialState = undefined;
    }

    let currentState = initialState;

    const listeners = [];

    if (middleFunc && typeof middleFunc === 'function') {
        // 封装dispatch
        return middleFunc(createStore)(reducer, initialState);
    }

    const getState = () => {
        return currentState;
    }

    const dispatch = (action) => {
        currentState = reducer(currentState, action);

        listeners.forEach(listener => {
            listener();
        })
    }

    const subscribe = (listener) => {
        listeners.push(listener);
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}

```

**（2）工作流程**

- const store= createStore（fn）生成数据;
- action: {type: Symble('action01), payload:'payload' }定义行为;
- dispatch 发起 action：store.dispatch(doSomething('action001'));
- reducer：处理 action，返回新的 state;

通俗点解释：

- 首先，用户（通过 View）发出 Action，发出方式就用到了 dispatch 方法
- 然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action，Reducer 会返回新的 State
- State—旦有变化，Store 就会调用监听函数，来更新 View

以 store 为核心，可以把它看成数据存储中心，但是他要更改数据的时候不能直接修改，数据修改更新的角色由 Reducers 来担任，store 只做存储，中间人，当 Reducers 的更新完成以后会通过 store 的订阅来通知 react component，组件把新的状态重新获取渲染，组件中也能主动发送 action，创建 action 后这个动作是不会执行的，所以要 dispatch 这个 action，让 store 通过 reducers 去做更新 React Component 就是 react 的每个组件。

### Redux 中异步的请求怎么处理

可以在 componentDidmount 中直接进⾏请求⽆须借助 redux。但是在⼀定规模的项⽬中,上述⽅法很难进⾏异步流的管理,通常情况下我们会借助 redux 的异步中间件进⾏异步处理。redux 异步流中间件其实有很多，当下主流的异步中间件有两种 redux-thunk、redux-saga。

**（1）使用 react-thunk 中间件**

**redux-thunk**优点:

- 体积⼩: redux-thunk 的实现⽅式很简单,只有不到 20 ⾏代码
- 使⽤简单: redux-thunk 没有引⼊像 redux-saga 或者 redux-observable 额外的范式,上⼿简单

**redux-thunk**缺陷:

- 样板代码过多: 与 redux 本身⼀样,通常⼀个请求需要⼤量的代码,⽽且很多都是重复性质的
- 耦合严重: 异步操作与 redux 的 action 偶合在⼀起,不⽅便管理
- 功能孱弱: 有⼀些实际开发中常⽤的功能需要⾃⼰进⾏封装

使用步骤：

- 配置中间件，在 store 的创建中配置

```javascript
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

// 设置调试工具
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
// 设置中间件
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducer, enhancer);

export default store;
```

- 添加一个返回函数的 actionCreator，将异步请求逻辑放在里面

```javascript
/**
  发送get请求，并生成相应action，更新store的函数
  @param url {string} 请求地址
  @param func {function} 真正需要生成的action对应的actionCreator
  @return {function} 
*/
// dispatch为自动接收的store.dispatch函数
export const getHttpAction = (url, func) => (dispatch) => {
  axios.get(url).then(function (res) {
    const action = func(res.data);
    dispatch(action);
  });
};
```

- 生成 action，并发送 action

```javascript
componentDidMount(){
    var action = getHttpAction('/getData', getInitTodoItemAction)
    // 发送函数类型的action时，该action的函数体会自动执行
    store.dispatch(action)
}

```

**（2）使用 redux-saga 中间件**

**redux-saga**优点:

- 异步解耦: 异步操作被被转移到单独 saga.js 中，不再是掺杂在 action.js 或 component.js 中
- action 摆脱 thunk function: dispatch 的参数依然是⼀个纯粹的 action (FSA)，⽽不是充满 “⿊魔法” thunk function
- 异常处理: 受益于 generator function 的 saga 实现，代码异常/请求失败 都可以直接通过 try/catch 语法直接捕获处理
- 功能强⼤: redux-saga 提供了⼤量的 Saga 辅助函数和 Effect 创建器供开发者使⽤,开发者⽆须封装或者简单封装即可使⽤
- 灵活: redux-saga 可以将多个 Saga 可以串⾏/并⾏组合起来,形成⼀个⾮常实⽤的异步 flow
- 易测试，提供了各种 case 的测试⽅案，包括 mock task，分⽀覆盖等等

**redux-saga**缺陷:

- 额外的学习成本: redux-saga 不仅在使⽤难以理解的 generator function,⽽且有数⼗个 API,学习成本远超 redux-thunk,最重要的是你的额外学习成本是只服务于这个库的,与 redux-observable 不同,redux-observable 虽然也有额外学习成本但是背后是 rxjs 和⼀整套思想
- 体积庞⼤: 体积略⼤,代码近 2000 ⾏，min 版 25KB 左右
- 功能过剩: 实际上并发控制等功能很难⽤到,但是我们依然需要引⼊这些代码
- ts ⽀持不友好: yield ⽆法返回 TS 类型

redux-saga 可以捕获 action，然后执行一个函数，那么可以把异步代码放在这个函数中，使用步骤如下：

- 配置中间件

```javascript
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
import createSagaMiddleware from "redux-saga";
import TodoListSaga from "./sagas";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;
const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(reducer, enhancer);
sagaMiddleware.run(TodoListSaga);

export default store;
```

- 将异步请求放在 sagas.js 中

```javascript
import { takeEvery, put } from "redux-saga/effects";
import { initTodoList } from "./actionCreator";
import { GET_INIT_ITEM } from "./actionTypes";
import axios from "axios";

function* func() {
  try {
    // 可以获取异步返回数据
    const res = yield axios.get("/getData");
    const action = initTodoList(res.data);
    // 将action发送到reducer
    yield put(action);
  } catch (e) {
    console.log("网络请求失败");
  }
}

function* mySaga() {
  // 自动捕获GET_INIT_ITEM类型的action，并执行func
  yield takeEvery(GET_INIT_ITEM, func);
}

export default mySaga;
```

- 发送 action

```javascript
componentDidMount(){
  const action = getInitTodoItemAction()
  store.dispatch(action)
}
```

### Redux 怎么实现属性传递，介绍下原理

react-redux 数据传输 ∶ view-->action-->reducer-->store-->view。看下点击事件的数据是如何通过 redux 传到 view 上：

- view 上的 AddClick 事件通过 mapDispatchToProps 把数据传到 action ---> click:()=>dispatch(ADD)
- action 的 ADD 传到 reducer 上
- reducer 传到 store 上 const store = createStore(reducer);
- store 再通过 mapStateToProps 映射穿到 view 上 text:State.text

代码示例 ∶

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
class App extends React.Component {
  render() {
    let { text, click, clickR } = this.props;
    return (
      <div>
        <div>数据:已有人{text}</div>
        <div onClick={click}>加人</div>
        <div onClick={clickR}>减人</div>
      </div>
    );
  }
}
const initialState = {
  text: 5,
};
const reducer = function (state, action) {
  switch (action.type) {
    case "ADD":
      return { text: state.text + 1 };
    case "REMOVE":
      return { text: state.text - 1 };
    default:
      return initialState;
  }
};

let ADD = {
  type: "ADD",
};
let Remove = {
  type: "REMOVE",
};

const store = createStore(reducer);

let mapStateToProps = function (state) {
  return {
    text: state.text,
  };
};

let mapDispatchToProps = function (dispatch) {
  return {
    click: () => dispatch(ADD),
    clickR: () => dispatch(Remove),
  };
};

const App1 = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <App1></App1>
  </Provider>,
  document.getElementById("root")
);
```

### Redux 中间件是什么？接受几个参数？柯里化函数两端的参数具体是什么？

Redux 的中间件提供的是位于 action 被发起之后，到达 reducer 之前的扩展点，换而言之，原本 view -→> action -> reducer -> store 的数据流加上中间件后变成了 view -> action -> middleware -> reducer -> store ，在这一环节可以做一些"副作用"的操作，如异步请求、打印日志等。

从`applyMiddleware`中可以看出 ∶

- redux 中间件接受一个对象作为参数，对象的参数上有两个字段 dispatch 和 getState，分别代表着 Redux Store 上的两个同名函数。
- 柯里化函数两端一个是 middewares，一个是 store.dispatch

### Redux 请求中间件如何处理并发

**使用 redux-Saga** redux-saga 是一个管理 redux 应用异步操作的中间件，用于代替 redux-thunk 的。它通过创建 Sagas 将所有异步操作逻辑存放在一个地方进行集中处理，以此将 react 中的同步操作与异步操作区分开来，以便于后期的管理与维护。 redux-saga 如何处理并发：

- **takeEvery**

可以让多个 saga 任务并行被 fork 执行。

```javascript
import { fork, take } from "redux-saga/effects";

const takeEvery = (pattern, saga, ...args) =>
  fork(function* () {
    while (true) {
      const action = yield take(pattern);
      yield fork(saga, ...args.concat(action));
    }
  });
```

- **takeLatest**

takeLatest 不允许多个 saga 任务并行地执行。一旦接收到新的发起的 action，它就会取消前面所有 fork 过的任务（如果这些任务还在执行的话）。 在处理 AJAX 请求的时候，如果只希望获取最后那个请求的响应， takeLatest 就会非常有用。

```javascript
import { cancel, fork, take } from "redux-saga/effects";

const takeLatest = (pattern, saga, ...args) =>
  fork(function* () {
    let lastTask;
    while (true) {
      const action = yield take(pattern);
      if (lastTask) {
        yield cancel(lastTask); // 如果任务已经结束，则 cancel 为空操作
      }
      lastTask = yield fork(saga, ...args.concat(action));
    }
  });
```

### Redux 状态管理器和变量挂载到 window 中有什么区别

两者都是存储数据以供后期使用。但是 Redux 状态更改可回溯——Time travel，数据多了的时候可以很清晰的知道改动在哪里发生，完整的提供了一套状态管理模式。

随着 JavaScript 单页应用开发日趋复杂，JavaScript 需要管理比任何时候都要多的 state （状态）。 这些 state 可能包括服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，也包括 UI 状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等等。

管理不断变化的 state 非常困难。如果一个 model 的变化会引起另一个 model 变化，那么当 view 变化时，就可能引起对应 model 以及另一个 model 的变化，依次地，可能会引起另一个 view 的变化。直至你搞不清楚到底发生了什么。state 在什么时候，由于什么原因，如何变化已然不受控制。 当系统变得错综复杂的时候，想重现问题或者添加新功能就会变得举步维艰。 如果这还不够糟糕，考虑一些来自前端开发领域的新需求，如更新调优、服务端渲染、路由跳转前请求数据等等。前端开发者正在经受前所未有的复杂性，难道就这么放弃了吗?当然不是。

这里的复杂性很大程度上来自于：我们总是将两个难以理清的概念混淆在一起：变化和异步。 可以称它们为曼妥思和可乐。如果把二者分开，能做的很好，但混到一起，就变得一团糟。一些库如 React 视图在视图层禁止异步和直接操作 DOM 来解决这个问题。美中不足的是，React 依旧把处理 state 中数据的问题留给了你。Redux 就是为了帮你解决这个问题。

### mobox 和 redux 有什么区别？

**（1）共同点**

- 为了解决状态管理混乱，无法有效同步的问题统一维护管理应用状态;
- 某一状态只有一个可信数据来源（通常命名为 store，指状态容器）;
- 操作更新状态方式统一，并且可控（通常以 action 方式提供更新状态的途径）;
- 支持将 store 与 React 组件连接，如 react-redux，mobx- react;

**（2）区别** Redux 更多的是遵循 Flux 模式的一种实现，是一个 JavaScript 库，它关注点主要是以下几方面 ∶

- Action∶ 一个 JavaScript 对象，描述动作相关信息，主要包含 type 属性和 payload 属性 ∶

```
o type∶ action 类型; o payload∶ 负载数据;
```

- Reducer∶ 定义应用状态如何响应不同动作（action），如何更新状态;
- Store∶ 管理 action 和 reducer 及其关系的对象，主要提供以下功能 ∶

```
o 维护应用状态并支持访问状态(getState());
o 支持监听action的分发，更新状态(dispatch(action));
o 支持订阅store的变更(subscribe(listener));
```

- 异步流 ∶ 由于 Redux 所有对 store 状态的变更，都应该通过 action 触发，异步任务（通常都是业务或获取数据任务）也不例外，而为了不将业务或数据相关的任务混入 React 组件中，就需要使用其他框架配合管理异步任务流程，如 redux-thunk，redux-saga 等;

Mobx 是一个透明函数响应式编程的状态管理库，它使得状态管理简单可伸缩 ∶

- Action∶ 定义改变状态的动作函数，包括如何变更状态;
- Store∶ 集中管理模块状态（State）和动作(action)
- Derivation（衍生）∶ 从应用状态中派生而出，且没有任何其他影响的数据

**对比总结：**

- redux 将数据保存在单一的 store 中，mobx 将数据保存在分散的多个 store 中
- redux 使用 plain object 保存数据，需要手动处理变化后的操作;mobx 适用 observable 保存数据，数据变化后自动处理响应的操作
- redux 使用不可变状态，这意味着状态是只读的，不能直接去修改它，而是应该返回一个新的状态，同时使用纯函数;mobx 中的状态是可变的，可以直接对其进行修改
- mobx 相对来说比较简单，在其中有很多的抽象，mobx 更多的使用面向对象的编程思维;redux 会比较复杂，因为其中的函数式编程思想掌握起来不是那么容易，同时需要借助一系列的中间件来处理异步和副作用
- mobx 中有更多的抽象和封装，调试会比较困难，同时结果也难以预测;而 redux 提供能够进行时间回溯的开发工具，同时其纯函数以及更少的抽象，让调试变得更加的容易

### Redux 和 Vuex 有什么区别，它们的共同思想

**（1）Redux 和 Vuex 区别**

- Vuex 改进了 Redux 中的 Action 和 Reducer 函数，以 mutations 变化函数取代 Reducer，无需 switch，只需在对应的 mutation 函数里改变 state 值即可
- Vuex 由于 Vue 自动重新渲染的特性，无需订阅重新渲染函数，只要生成新的 State 即可
- Vuex 数据流的顺序是 ∶View 调用 store.commit 提交对应的请求到 Store 中对应的 mutation 函数->store 改变（vue 检测到数据变化自动渲染）

通俗点理解就是，vuex 弱化 dispatch，通过 commit 进行 store 状态的一次更变；取消了 action 概念，不必传入特定的 action 形式进行指定变更；弱化 reducer，基于 commit 参数直接对数据进行转变，使得框架更加简易;

**（2）共同思想**

- 单—的数据源
- 变化可以预测

本质上 ∶ redux 与 vuex 都是对 mvvm 思想的服务，将数据从视图中抽离的一种方案。

### Redux 中间件是怎么拿到 store 和 action? 然后怎么处理?

redux 中间件本质就是一个函数柯里化。redux applyMiddleware Api 源码中每个 middleware 接受 2 个参数， Store 的 getState 函数和 dispatch 函数，分别获得 store 和 action，最终返回一个函数。该函数会被传入 next 的下一个 middleware 的 dispatch 方法，并返回一个接收 action 的新函数，这个函数可以直接调用 next（action），或者在其他需要的时刻调用，甚至根本不去调用它。调用链中最后一个 middleware 会接受真实的 store 的 dispatch 方法作为 next 参数，并借此结束调用链。所以，middleware 的函数签名是（{ getState，dispatch })=> next => action。

### Redux 中的 connect 有什么作用

connect 负责连接 React 和 Redux

**（1）获取 state**

connect 通过 context 获取 Provider 中的 store，通过`store.getState()` 获取整个 store tree 上所有 state

**（2）包装原组件**

将 state 和 action 通过 props 的方式传入到原组件内部 wrapWithConnect 返回—个 ReactComponent 对 象 Connect，Connect 重 新 render 外部传入的原组件 WrappedComponent ，并把 connect 中传入的 mapStateToProps，mapDispatchToProps 与组件上原有的 props 合并后，通过属性的方式传给 WrappedComponent

**（3）监听 store tree 变化**

connect 缓存了 store tree 中 state 的状态，通过当前 state 状态 和变更前 state 状态进行比较，从而确定是否调用 `this.setState()`方法触发 Connect 及其子组件的重新渲染
