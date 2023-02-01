# 这一定是你见过最全的性能优化方法论

:::danger
写作中
:::

## Webpack

## Vue

### **如何实现 _vue_ 项目中的性能优化？**

> **编码阶段**
>
> - 尽量减少 _data_ 中的数据，_data_ 中的数据都会增加 _getter_ 和 _setter_，会收集对应的 _watcher_
> - _v-if_ 和 _v-for_ 不能连用
> - 如果需要使用 _v-for_ 给每项元素绑定事件时使用事件代理
> - _SPA_ 页面采用 _keep-alive_ 缓存组件
> - 在更多的情况下，使用 _v-if_ 替代 _v-show_
> - _key_ 保证唯一
> - 使用路由懒加载、异步组件
> - 防抖、节流
> - 第三方模块按需导入
> - 长列表滚动到可视区域动态加载
> - 图片懒加载

> **_SEO_ 优化**
>
> - 预渲染
> - 服务端渲染 _SSR_

> **打包优化**
>
> - 压缩代码
> - _Tree Shaking/Scope Hoisting_
> - 使用 _cdn_ 加载第三方模块
> - 多线程打包 _happypack_
> - _splitChunks_ 抽离公共文件
> - _sourceMap_ 优化

> **用户体验**
>
> - 骨架屏
> - _PWA_

> 还可以使用缓存(客户端缓存、服务端缓存)优化、服务端开启 _gzip_ 压缩等。

### **_vue_ 中的 _spa_ 应用如何优化首屏加载速度?**

> 优化首屏加载可以从这几个方面开始：
>
> - 请求优化：CDN 将第三方的类库放到 CDN 上，能够大幅度减少生产环境中的项目体积，另外 CDN 能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。
> - 缓存：将长时间不会改变的第三方类库或者静态资源设置为强缓存，将 max-age 设置为一个非常长的时间，再将访问路径加上哈希达到哈希值变了以后保证获取到最新资源，好的缓存策略有助于减轻服务器的压力，并且显著的提升用户的体验
> - gzip：开启 gzip 压缩，通常开启 gzip 压缩能够有效的缩小传输资源的大小。
> - http2：如果系统首屏同一时间需要加载的静态资源非常多，但是浏览器对同域名的 tcp 连接数量是有限制的(chrome 为 6 个)超过规定数量的 tcp 连接，则必须要等到之前的请求收到响应后才能继续发送，而 http2 则可以在多个 tcp 连接中并发多个请求没有限制，在一些网络较差的环境开启 http2 性能提升尤为明显。
> - 懒加载：当 url 匹配到相应的路径时，通过 import 动态加载页面组件，这样首屏的代码量会大幅减少，webpack 会把动态加载的页面组件分离成单独的一个 chunk.js 文件
> - 预渲染：由于浏览器在渲染出页面之前，需要先加载和解析相应的 html、css 和 js 文件，为此会有一段白屏的时间，可以添加 loading，或者骨架屏幕尽可能的减少白屏对用户的影响体积优化
> - 合理使用第三方库：对于一些第三方 ui 框架、类库，尽量使用按需加载，减少打包体积
> - 使用可视化工具分析打包后的模块体积：webpack-bundle- analyzer 这个插件在每次打包后能够更加直观的分析打包后模块的体积，再对其中比较大的模块进行优化
> - 提高代码使用率：利用代码分割，将脚本中无需立即调用的代码在代码构建时转变为异步加载的过程
> - 封装：构建良好的项目架构，按照项目需求就行全局组件，插件，过滤器，指令，utils 等做一 些公共封装，可以有效减少我们的代码量，而且更容易维护资源优化
> - 图片懒加载：使用图片懒加载可以优化同一时间减少 http 请求开销，避免显示图片导致的画面抖动，提高用户体验
> - 使用 svg 图标：相对于用一张图片来表示图标，svg 拥有更好的图片质量，体积更小，并且不需要开启额外的 http 请求
> - 压缩图片：可以使用 image-webpack-loader，在用户肉眼分辨不清的情况下一定程度上压缩图片

## React

# 性能优化

shouldComponentUpdate 提供了两个参数 nextProps 和 nextState，表示下一次 props 和一次 state 的值，当函数返回 false 时候，render()方法不执行，组件也就不会渲染，返回 true 时，组件照常重渲染。此方法就是拿当前 props 中值和下一次 props 中的值进行对比，数据相等时，返回 false，反之返回 true。

需要注意，在进行新旧对比的时候，是**浅对比，**也就是说如果比较的数据时引用数据类型，只要数据的引用的地址没变，即使内容变了，也会被判定为 true。

面对这个问题，可以使用如下方法进行解决： （1）使用 setState 改变数据之前，先采用 ES6 中 assgin 进行拷贝，但是 assgin 只深拷贝的数据的第一层，所以说不是最完美的解决办法：

```javascript
const o2 = Object.assign({}, this.state.obj);
o2.student.count = "00000";
this.setState({
  obj: o2,
});
```

（2）使用 JSON.parse(JSON.stringfy())进行深拷贝，但是遇到数据为 undefined 和函数时就会错。

```javascript
const o2 = JSON.parse(JSON.stringify(this.state.obj));
o2.student.count = "00000";
this.setState({
  obj: o2,
});
```

**React 如何判断什么时候重新渲染组件？**

组件状态的改变可以因为`props`的改变，或者直接通过`setState`方法改变。组件获得新的状态，然后 React 决定是否应该重新渲染组件。只要组件的 state 发生变化，React 就会对组件进行重新渲染。这是因为 React 中的`shouldComponentUpdate`方法默认返回`true`，这就是导致每次更新都重新渲染的原因。

当 React 将要渲染组件时会执行`shouldComponentUpdate`方法来看它是否返回`true`（组件应该更新，也就是重新渲染）。所以需要重写`shouldComponentUpdate`方法让它根据情况返回`true`或者`false`来告诉 React 什么时候重新渲染什么时候跳过重新渲染。

**避免不必要的 render**

React 基于虚拟 DOM 和高效 Diff 算法的完美配合，实现了对 DOM 最小粒度的更新。大多数情况下，React 对 DOM 的渲染效率足以业务日常。但在个别复杂业务场景下，性能问题依然会困扰我们。此时需要采取一些措施来提升运行性能，其很重要的一个方向，就是避免不必要的渲染（Render）。这里提下优化的点：

- **shouldComponentUpdate 和 PureComponent**

在 React 类组件中，可以利用 shouldComponentUpdate 或者 PureComponent 来减少因父组件更新而触发子组件的 render，从而达到目的。shouldComponentUpdate 来决定是否组件是否重新渲染，如果不希望组件重新渲染，返回 false 即可。

- **利用高阶组件**

在函数组件中，并没有 shouldComponentUpdate 这个生命周期，可以利用高阶组件，封装一个类似 PureComponet 的功能

- **使用 React.memo**

React.memo 是 React 16.6 新的一个 API，用来缓存组件的渲染，避免不必要的更新，其实也是一个高阶组件，与 PureComponent 十分类似，但不同的是， React.memo 只能用于函数组件。
