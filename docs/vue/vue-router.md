# VueRouter 路由从使用到源码

## 源码实现

先看我写的 [mini-router](https://github.com/Sunny-117/mini-anything)，后续会补充文章

## **Vue 的路由实现原理**

### **解释 _hash_ 模式和 _history_ 模式的实现原理**

`#` 后面 _hash_ 值的变化，不会导致浏览器向服务器发出请求，浏览器不发出请求，就不会刷新页面；通过监听 _hashchange_ 事件可以知道 _hash_ 发生了哪些变化，然后根据 _hash_ 变化来实现更新页面部分内容的操作。

_history_ 模式的实现，主要是 _HTML5_ 标准发布的两个 _API_，_pushState_ 和 _replaceState_，这两个 _API_ 可以在改变 _URL_，但是不会发送请求。这样就可以监听 _url_ 变化来实现更新页面部分内容的操作。

两种模式的区别：

- 首先是在 _URL_ 的展示上，_hash_ 模式有“#”，_history_ 模式没有
- 刷新页面时，_hash_ 模式可以正常加载到 _hash_ 值对应的页面，而 _history_ 没有处理的话，会返回 _404_，一般需要后端将所有页面都配置重定向到首页路由
- 在兼容性上，_hash_ 可以支持低版本浏览器和 _IE_

### router 和*route* 的区别

> _$route_ 对象表示当前的路由信息，包含了当前 _URL_ 解析得到的信息。包含当前的路径，参数，_query_ 对象等。
>
> - _$route.path_：字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"。
> - _$route.params_： 一个 key/value 对象，包含了 动态片段 和 全匹配片段，如果没有路由参数，就是一个空对象。
> - ![](https://g.yuque.com/gr/latex?route.query*%EF%BC%9A%E4%B8%80%E4%B8%AA%20key%2Fvalue%20%E5%AF%B9%E8%B1%A1%EF%BC%8C%E8%A1%A8%E7%A4%BA%20URL%20%E6%9F%A5%E8%AF%A2%E5%8F%82%E6%95%B0%E3%80%82%E4%BE%8B%E5%A6%82%E5%AF%B9%E4%BA%8E%E8%B7%AF%E5%BE%84%20*%2Ffoo%3Fuser%3D1*%EF%BC%8C%E5%88%99%E6%9C%89%20*#card=math&code=route.query%2A%EF%BC%9A%E4%B8%80%E4%B8%AA%20key%2Fvalue%20%E5%AF%B9%E8%B1%A1%EF%BC%8C%E8%A1%A8%E7%A4%BA%20URL%20%E6%9F%A5%E8%AF%A2%E5%8F%82%E6%95%B0%E3%80%82%E4%BE%8B%E5%A6%82%E5%AF%B9%E4%BA%8E%E8%B7%AF%E5%BE%84%20%2A%2Ffoo%3Fuser%3D1%2A%EF%BC%8C%E5%88%99%E6%9C%89%20%2A&id=BwfPx)_route.query.user == 1_，如果没有查询参数，则是个空对象。
> - _$route.hash_：当前路由的 hash 值 (不带 #) ，如果没有 _hash_ 值，则为空字符串。
> - _$route.fullPath_：完成解析后的 _URL_，包含查询参数和 _hash_ 的完整路径。
> - _$route.matched_：数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。
> - _$route.name_：当前路径名字
> - _$route.meta_：路由元信息

> _$route_ 对象出现在多个地方:
>
> - 组件内的 _this.$route_ 和 _route watcher_ 回调（监测变化处理）
> - _router.match(location)_ 的返回值
> - _scrollBehavior_ 方法的参数
> - 导航钩子的参数，例如 _router.beforeEach_ 导航守卫的钩子函数中，_to_ 和 _from_ 都是这个路由信息对象。

> _$router_ 对象是全局路由的实例，是 _router_ 构造方法的实例。
>
> _$router_ 对象常用的方法有：
>
> - _push_：向 _history_ 栈添加一个新的记录
> - _go_：页面路由跳转前进或者后退
> - _replace_：替换当前的页面，不会向 _history_ 栈添加一个新的记录

> **_vueRouter_ 有哪几种导航守卫？**
>
> - 全局前置/钩子：_beforeEach、beforeR-esolve、afterEach_
> - 路由独享的守卫：_beforeEnter_
> - 组件内的守卫：_beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave_

> **解释一下 _vueRouter_ 的完整的导航解析流程是什么**
>
> 一次完整的导航解析流程如下：
>
> 1. 导航被触发。
> 2. 在失活的组件里调用离开守卫。
> 3. 调用全局的 _beforeEach_ 守卫。
> 4. 在重用的组件里调用 _beforeRouteUpdate_ 守卫（_2.2+_）。
> 5. 在路由配置里调用 _beforeEnter_。
> 6. 解析异步路由组件。
> 7. 在被激活的组件里调用 _beforeRouteEnter_。
> 8. 调用全局的 _beforeResolve_ 守卫（_2.5+_）。
> 9. 导航被确认。
> 10. 调用全局的 _afterEach_ 钩子。
> 11. 触发 _DOM_ 更新。
> 12. 用创建好的实例调用 _beforeRouteEnter_ 守卫中传给 _next_ 的回调函数。

## **如何监听 _pushstate_ 和 _replacestate_ 的变化呢？**

> _History.replaceState_ 和 _pushState_ 不会触发 _popstate_ 事件，所以我们可以通过在方法中创建一个新的全局事件来实现  *pushstate* 和 _replacestate_ 变化的监听。
>
> 具体做法为：
>
> 这样就创建了 _2_ 个全新的事件，事件名为 _pushState_ 和 _replaceState_，我们就可以在全局监听：
>
> 这样就可以监听到 _pushState_ 和 _replaceState_ 行为。

```javascript
var _wr = function (type) {
  var orig = history[type];
  return function () {
    var rv = orig.apply(this, arguments);
    var e = new Event(type);
    e.arguments = arguments;
    window.dispatchEvent(e);
    return rv;
  };
};
history.pushState = _wr("pushState");
history.replaceState = _wr("replaceState");
```

```javascript
window.addEventListener("replaceState", function (e) {
  console.log("THEY DID IT AGAIN! replaceState 111111");
});
window.addEventListener("pushState", function (e) {
  console.log("THEY DID IT AGAIN! pushState 2222222");
});
```

## 路由模式

路由模式决定了：

1. 路由从哪里获取访问路径
2. 路由如何改变访问路径

`vue-router`提供了三种路由模式：

1. hash：默认值。路由从浏览器地址栏中的 hash 部分获取路径，改变路径也是改变的 hash 部分。该模式兼容性最好。
2. history：路由从浏览器地址栏的`location.pathname`中获取路径，改变路径使用的 H5 的`history api`。该模式可以让地址栏最友好，但是需要浏览器支持`history api`
3. abstract：路由从内存中获取路径，改变路径也只是改动内存中的值。这种模式通常应用到非浏览器环境中。

> 每一次刷新页面

请求 inde.html
请求各种.js
请求各种.css
执行 Js
创建 vue 应用
渲染全部组件树
挂载到指定的 div 中

> 不刷新

执行一段 JS 代码：切换某个区域的组件
以上，所以推荐单页面应用

## Vue-Router 的懒加载如何实现

非懒加载：

```javascript
import List from "@/components/list.vue";
const router = new VueRouter({
  routes: [{ path: "/list", component: List }],
});
```

（1）方案一(常用)：使用箭头函数+import 动态加载

```javascript
const List = () => import("@/components/list.vue");
const router = new VueRouter({
  routes: [{ path: "/list", component: List }],
});
```

（2）方案二：使用箭头函数+require 动态加载

```javascript
const router = new Router({
  routes: [
    {
      path: "/list",
      component: (resolve) => require(["@/components/list"], resolve),
    },
  ],
});
```

（3）方案三：使用 webpack 的 require.ensure 技术，也可以实现按需加载。 这种情况下，多个路由指定相同的 chunkName，会合并打包成一个 js 文件。

```javascript
// r就是resolve
const List = r => require.ensure([], () => r(require('@/components/list')), 'list');
// 路由也是正常的写法  这种是官方推荐的写的 按模块划分懒加载
const router = new Router({
  routes: [
  {
    path: '/list',
    component: List,
    name: 'list'
  }
 ]
}))
```

## 如何获取页面的 hash 变化

**（1）监听$route 的变化**

```javascript
// 监听,当路由发生变化的时候执行
watch: {
  $route: {
    handler: function(val, oldVal){
      console.log(val);
    },
    // 深度观察监听
    deep: true
  }
},

```

**（2）window.location.hash 读取#值** window.location.hash 的值可读可写，读取来判断状态是否改变，写入时可以在不重载网页的前提下，添加一条历史访问记录。

## `$route 和$router` 的区别

- $route 是“路由信息对象”，包括 path，params，hash，query，fullPath，matched，name 等路由信息参数
- $router 是“路由实例”对象包括了路由的跳转方法，钩子函数等。

## 如何定义动态路由？如何获取传过来的动态参数？

**（1）param 方式**

- 配置路由格式：`/router/:id`
- 传递的方式：在 path 后面跟上对应的值
- 传递后形成的路径：`/router/123`

1）路由定义

```javascript
//在APP.vue中
<router-link :to="'/user/'+userId" replace>用户</router-link>

//在index.js
{
   path: '/user/:userid',
   component: User,
},

```

2）路由跳转

```javascript
// 方法1：
<router-link :to="{ name: 'users', params: { uname: wade }}">按钮</router-link

// 方法2：
this.$router.push({name:'users',params:{uname:wade}})

// 方法3：
this.$router.push('/user/' + wade)
```

3）参数获取 通过 `$route.params.userid` 获取传递的值

**（2）query 方式**

- 配置路由格式：`/router`，也就是普通配置
- 传递的方式：对象中使用 query 的 key 作为传递方式
- 传递后形成的路径：`/route?id=123`

1）路由定义

```javascript
//方式1：直接在router-link 标签上以对象的形式
<router-link :to="{path:'/profile',query:{name:'why',age:28,height:188}}">档案</router-link>

// 方式2：写成按钮以点击事件形式
<button @click='profileClick'>我的</button>

profileClick(){
  this.$router.push({
    path: "/profile",
    query: {
        name: "kobi",
        age: "28",
        height: 198
    }
  });
}

```

2）跳转方法

```javascript
// 方法1：
<router-link :to="{ name: 'users', query: { uname: james }}">按钮</router-link>

// 方法2：
this.$router.push({ name: 'users', query:{ uname:james }})

// 方法3：
<router-link :to="{ path: '/user', query: { uname:james }}">按钮</router-link>

// 方法4：
this.$router.push({ path: '/user', query:{ uname:james }})

// 方法5：
this.$router.push('/user?uname=' + jsmes)

```

3）获取参数

```javascript
通过$route.query 获取传递的值
```

## Vue-router 路由钩子在生命周期的体现

### 一、Vue-Router 导航守卫

有的时候，需要通过路由来进行一些操作，比如最常见的登录权限验证，当用户满足条件时，才让其进入导航，否则就取消跳转，并跳到登录页面让其登录。 为此有很多种方法可以植入路由的导航过程：全局的，单个路由独享的，或者组件级的

1. 全局路由钩子

vue-router 全局有三个路由钩子;

- router.beforeEach 全局前置守卫 进入路由之前
- router.beforeResolve 全局解析守卫（2.5.0+）在 beforeRouteEnter 调用之后调用
- router.afterEach 全局后置钩子 进入路由之后

具体使用 ∶

- beforeEach（判断是否登录了，没登录就跳转到登录页）

```javascript
router.beforeEach((to, from, next) => {
  let ifInfo = Vue.prototype.$common.getSession("userData"); // 判断是否登录的存储信息
  if (!ifInfo) {
    // sessionStorage里没有储存user信息
    if (to.path == "/") {
      //如果是登录页面路径，就直接next()
      next();
    } else {
      //不然就跳转到登录
      Message.warning("请重新登录！");
      window.location.href = Vue.prototype.$loginUrl;
    }
  } else {
    return next();
  }
});
```

- afterEach （跳转之后滚动条回到顶部）

```javascript
router.afterEach((to, from) => {
  // 跳转之后滚动条回到顶部
  window.scrollTo(0, 0);
});
```

1. 单个路由独享钩子

**beforeEnter** 如果不想全局配置守卫的话，可以为某些路由单独配置守卫，有三个参数 ∶ to、from、next

```javascript
export default [
  {
    path: "/",
    name: "login",
    component: login,
    beforeEnter: (to, from, next) => {
      console.log("即将进入登录页面");
      next();
    },
  },
];
```

1. 组件内钩子

beforeRouteUpdate、beforeRouteEnter、beforeRouteLeave

这三个钩子都有三个参数 ∶to、from、next

- beforeRouteEnter∶ 进入组件前触发
- beforeRouteUpdate∶ 当前地址改变并且改组件被复用时触发，举例来说，带有动态参数的路径 foo/∶id，在 /foo/1 和 /foo/2 之间跳转的时候，由于会渲染同样的 foa 组件，这个钩子在这种情况下就会被调用
- beforeRouteLeave∶ 离开组件被调用

注意点，beforeRouteEnter 组件内还访问不到 this，因为该守卫执行前组件实例还没有被创建，需要传一个回调给 next 来访问，例如：

```javascript
beforeRouteEnter(to, from, next) {
    next(target => {
        if (from.path == '/classProcess') {
            target.isFromProcess = true
        }
    })
}

```

### 二、Vue 路由钩子在生命周期函数的体现

1. 完整的路由导航解析流程（不包括其他生命周期）

- 触发进入其他路由。
- 调用要离开路由的组件守卫 beforeRouteLeave
- 调用局前置守卫 ∶ beforeEach
- 在重用的组件里调用 beforeRouteUpdate
- 调用路由独享守卫 beforeEnter。
- 解析异步路由组件。
- 在将要进入的路由组件中调用 beforeRouteEnter
- 调用全局解析守卫 beforeResolve
- 导航被确认。
- 调用全局后置钩子的 afterEach 钩子。
- 触发 DOM 更新（mounted）。
- 执行 beforeRouteEnter 守卫中传给 next 的回调函数

1. 触发钩子的完整顺序

路由导航、keep-alive、和组件生命周期钩子结合起来的，触发顺序，假设是从 a 组件离开，第一次进入 b 组件 ∶

- beforeRouteLeave：路由组件的组件离开路由前钩子，可取消路由离开。
- beforeEach：路由全局前置守卫，可用于登录验证、全局路由 loading 等。
- beforeEnter：路由独享守卫
- beforeRouteEnter：路由组件的组件进入路由前钩子。
- beforeResolve：路由全局解析守卫
- afterEach：路由全局后置钩子
- beforeCreate：组件生命周期，不能访问 tAis。
- created;组件生命周期，可以访问 tAis，不能访问 dom。
- beforeMount：组件生命周期
- deactivated：离开缓存组件 a，或者触发 a 的 beforeDestroy 和 destroyed 组件销毁钩子。
- mounted：访问/操作 dom。
- activated：进入缓存组件，进入 a 的嵌套子组件（如果有的话）。
- 执行 beforeRouteEnter 回调函数 next。

1. 导航行为被触发到导航完成的整个过程

- 导航行为被触发，此时导航未被确认。
- 在失活的组件里调用离开守卫 beforeRouteLeave。
- 调用全局的 beforeEach 守卫。
- 在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
- 在路由配置里调用 beforeEnteY。
- 解析异步路由组件（如果有）。
- 在被激活的组件里调用 beforeRouteEnter。
- 调用全局的 beforeResolve 守卫（2.5+），标示解析阶段完成。
- 导航被确认。
- 调用全局的 afterEach 钩子。
- 非重用组件，开始组件实例的生命周期：beforeCreate&created、beforeMount&mounted
- 触发 DOM 更新。
- 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。
- 导航完成

## Vue-router 跳转和 location.href 有什么区别

- 使用 `location.href= /url`来跳转，简单方便，但是刷新了页面；
- 使用 `history.pushState( /url )` ，无刷新页面，静态跳转；
- 引进 router ，然后使用 `router.push( /url )` 来跳转，使用了 `diff` 算法，实现了按需加载，减少了 dom 的消耗。其实使用 router 跳转和使用 `history.pushState()` 没什么差别的，因为 vue-router 就是用了 `history.pushState()` ，尤其是在 history 模式下。

## params 和 query 的区别

**用法**：query 要用 path 来引入，params 要用 name 来引入，接收参数都是类似的，分别是 `this.$route.query.name` 和 `this.$route.params.name` 。

**url 地址显示**：query 更加类似于 ajax 中 get 传参，params 则类似于 post，说的再简单一点，前者在浏览器地址栏中显示参数，后者则不显示

**注意**：query 刷新不会丢失 query 里面的数据 params 刷新会丢失 params 里面的数据。

## Vue-router 导航守卫有哪些

- 全局前置/钩子：beforeEach、beforeResolve、afterEach
- 路由独享的守卫：beforeEnter
- 组件内的守卫：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave
