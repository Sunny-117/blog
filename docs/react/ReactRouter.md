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
