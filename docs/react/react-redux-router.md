# react-redux

- React: 组件化的 UI 界面处理方案
- React-Router: 根据地址匹配路由，最终渲染不同的组件
- Redux：处理数据以及数据变化的方案（主要用于处理共享数据）

> 如果一个组件，仅用于渲染一个 UI 界面，而没有状态（通常是一个函数组件），该组件叫做**展示组件**
> 如果一个组件，仅用于提供数据，没有任何属于自己的 UI 界面，则该组件叫做**容器组件**，容器组件纯粹是为了给其他组件提供数据。

react-redux 库：链接 redux 和 react

- Provider 组件：没有任何 UI 界面，该组件的作用，是将 redux 的仓库放到一个上下文中。
- connect：高阶组件，用于链接仓库和组件的
  - 细节一：如果对返回的容器组件加上额外的属性，则这些属性会直接传递到展示组件
  - 第一个参数：mapStateToProps:
    - 参数 1：整个仓库的状态
    - 参数 2：使用者传递的属性对象
  - 第二个参数：
    - 情况 1：传递一个函数 mapDispatchToProps
      - 参数 1：dispatch 函数
      - 参数 2：使用者传递的属性对象
      - 函数返回的对象会作为属性传递到展示组件中（作为事件处理函数存在）
    - 情况 2：传递一个对象，对象的每个属性是一个 action 创建函数，当事件触发时，会自动的 dispatch 函数返回的 action
  - 细节二：如果不传递第二个参数，通过 connect 连接的组件，会自动得到一个属性：dispatch，使得组件有能力自行触发 action，但是，不推荐这样做。

知识

> 1. chrome 插件：redux-devtools
> 2. 使用 npm 安装第三方库：redux-devtools-extension

# redux 和 router 的结合（connected-react-router）

> 希望把路由信息放进仓库统一管理的时候才需要这个库

用于将 redux 和 react-router 进行结合

本质上，router 中的某些数据可能会跟数据仓库中的数据进行联动

该组件会将下面的路由数据和仓库保持同步

1. action：它不是 redux 的 action，它表示当前路由跳转的方式（PUSH、POP、REPLACE）
2. location：它记录了当前的地址信息

该库中的内容：

## connectRouter

这是一个函数，调用它，会返回一个用于管理仓库中路由信息的 reducer，该函数需要传递一个参数，参数是一个 history 对象。该对象，可以使用第三方库 history 得到。

## routerMiddleware

该函数会返回一个 redux 中间件，用于拦截一些特殊的 action

## ConnectedRouter

这是一个组件，用于向上下文提供一个 history 对象和其他的路由信息（与 react-router 提供的信息一致）

之所以需要新制作一个组件，是因为该库必须保证整个过程使用的是同一个 history 对象

## 一些 action 创建函数

- push
- replace
