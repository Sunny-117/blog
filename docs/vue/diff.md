# Vue2 diff 算法原理

## `diff`的时机

当组件创建时，以及依赖的属性或数据变化时，会运行一个函数，该函数会做两件事：

- 运行`_render`生成一棵新的虚拟 dom 树（vnode tree）
- 运行`_update`，传入虚拟 dom 树的根节点，对新旧两棵树进行对比，最终完成对真实 dom 的更新

核心代码如下：

```javascript
// vue构造函数
function Vue() {
  // ... 其他代码
  var updateComponent = () => {
    this._update(this._render());
  };
  new Watcher(updateComponent);
  // ... 其他代码
}
```

`diff`就发生在`_update`函数的运行过程中

## `_update`函数在干什么

`_update`函数接收到一个`vnode`参数，这就是**新**生成的虚拟 dom 树
同时，`_update`函数通过当前组件的`_vnode`属性，拿到**旧**的虚拟 dom 树
`_update`函数首先会给组件的`_vnode`属性重新赋值，让它指向新树

```javascript
function update(vnode) {
  // vnode:新
  // this._vnode:旧
  var oldVnode = this._vnode;
  this._vnode = vnode; //虚拟dom其实在这一步就已经更新了，所以对比的木得是更新真实DOM
}
```

![](../public/vue/2023-02-01-14-07-17.png)

然后会判断旧树是否存在：

### 不存在

说明这是第一次加载组件，于是通过内部的`patch`函数，直接遍历新树，为每个节点生成真实 DOM，挂载到每个节点的`elm`属性上

```javascript
function update(vnode) {
  // vnode: 新
  // this._vnode: 旧
  var oldVnode = this._vnode;
  this._vnode = vnode;
  // 对比的目的：更新真实dom
  if (!oldVnode) {
    this.__patch__(this.$el, vnode); //el：元素位置
  }
}
```

![](../public/vue/2023-02-01-14-11-21.png)

### 存在

说明之前已经渲染过该组件，于是通过内部的`patch`函数，对新旧两棵树进行对比，以达到下面两个目标：

- **完成对所有真实 dom 的最小化处理**
- **让新树的节点对应合适的真实 dom**

![](../public/vue/2023-02-01-14-11-32.png)

## `patch`函数的对比流程

术语解释：

1. 「**相同**」：是指两个虚拟节点的标签类型、`key`值均相同，但`input`元素还要看`type`属性

```javascript
/**
 * 什么叫「相同」是指两个虚拟节点的标签类型、`key`值均相同，但`input`元素还要看`type`属性
 *
 * <h1>asdfdf</h1>        <h1>asdfasfdf</h1>    相同
 *
 * <h1 key="1">adsfasdf</h1>   <h1 key="2">fdgdf</h1> 不同
 *
 * <input type="text" />    <input type="radio" /> 不同
 *
 * abc        bcd  相同
 *
 * {
 *  tag: undefined,
 *  key: undefined,
 *  text: "abc"
 * }
 *
 * {
 *  tag: undefined,
 *  key: undefined,
 *  text: "bcd"
 * }
 */

// 这里的判断相同使用到的是sameVnode函数：源码
function sameVnode(a, b) {
  return (
    a.key === b.key &&
    ((a.tag === b.tag &&
      a.isComment === b.isComment &&
      isDef(a.data) === isDef(b.data) &&
      sameInputType(a, b)) ||
      (isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)))
  );
}
```

2. 「**新建元素**」：是指根据一个虚拟节点提供的信息，创建一个真实 dom 元素，同时挂载到虚拟节点的`elm`属性上
3. 「**销毁元素**」：是指：`vnode.elm.remove()`
4. 「**更新**」：是指对两个虚拟节点进行对比更新，它**仅发生**在两个虚拟节点「相同」的情况下。具体过程稍后描述。
5. 「**对比子节点**」：是指对两个虚拟节点的子节点进行对比，具体过程稍后描述(**深度优先**)

## 详细流程：

### **根节点比较**

![](../public/vue/2023-02-01-14-11-46.png)

`patch`函数首先对根节点进行比较

如果两个节点：

- 「相同」，进入「更新」流程
  1. 将旧节点的真实 dom 赋值到新节点：`newVnode.elm = oldVnode.elm`
  2. **对比新节点和旧节点的属性**，有变化的更新到真实 dom 中
  3. 当前两个节点处理完毕，开始「对比子节点」
- 不「相同」 （**直接看成旧树不存在**）
  1. 新节点**递归**「新建元素」
  2. 旧节点「销毁元素」

### **「对比子节点」**

在「对比子节点」时，vue 一切的出发点，都是为了：

- **尽量啥也别做**
- 不行的话，**尽量仅改动元素属性**
- 还不行的话，尽量移动元素，而不是删除和创建元素
- 还不行的话，删除和创建元素

> 流程

- 对比旧树和新树的头指针，一样就进入更新流程(递归)新旧相连，对比有没有属性变化，对比子节点(递归)

- 两个头指针往后移动，如果不一样，就比较尾指针，尾指针一样，**递归**。

- 两个尾指针往前移动，再次比较头指针，还是不一样，尾指针也不一样，就比较旧树的头和新树的尾，一样的话，连接，复用真实都 dom，更新属性，再把真实 dom 的位置移动到旧树的尾指针后

- 新指针的尾指针往前移动，旧指针的头指针往后移动，**头头不同，尾尾不同，两边的头尾不同，则以新树的头为基准，看一下在旧树里面存不存在，存在则复用，真实 dom 的位置调到前面。**

- 继续，头头不同，尾尾不同，头尾相同，同理交换，交换后把真实 dom 移动到头指针前面。

- 继续，都不相同了，找 8 在旧树里面存不存在，不存在就新建。继续移动，头指针>尾指针，循环结束。

- **销毁**旧树剩下的对应的**真实 dom**。

## 对开发的影响：

### 加 key

> 为什么要 key？如果不加，会把所有子元素直接改动，浪费效率；如果加上，变成了指针，dom 移动(没有改动真实 dom 内部)，对真实 dom 几乎没有改动

```html
<div id="app" style="width: 500px; margin: 0 auto; line-height: 3">
  <div>
    <a href="" @click.prevent="accoutLogin=true">账号登录</a>
    <span>|</span>
    <a href="" @click.prevent="accoutLogin=false">手机号登录</a>
  </div>
  <!-- 根据accoutLogin是否显示，如果没有key，默认key:undefined,新旧树的div没变，进入里面对比，里面也相同，会导致文本框里的内容不消失 -->
  <div v-if="accoutLogin" key="1">
    <label>账号</label>
    <input type="text" />
  </div>
  <div v-else key="2">
    <label>手机号</label>
    <input type="text" />
  </div>
</div>
```

## 总结

当组件创建和更新时，vue 均会执行内部的 update 函数，该函数使用 render 函数生成的虚拟 dom 树，将新旧两树进行对比，找到差异点，最终更新到真实 dom

对比差异的过程叫 diff，vue 在内部通过一个叫 patch 的函数完成该过程

在对比时，vue 采用**深度优先、同层比较**的方式进行比对。

在判断两个节点是否相同时，vue 是通过**虚拟节点的 key 和 tag**来进行判断的

**具体来说**

- 首先对根节点进行对比，如果相同则将旧节点关联的真实 dom 的**引用**挂到新节点上，然后根据需要更新属性到真实 dom
- 然后再对比其子节点数组；如果不相同，则按照新节点的信息递归创建所有真实 dom，同时挂到对应虚拟节点上，然后移除掉旧的 dom。

- 在对比其子节点数组时，vue 对每个子节点数组使用了两个指针，分别指向头尾，然后不断向中间靠拢来进行对比，这样做的目的是**尽量复用真实 dom，尽量少的销毁和创建真实 dom**。如果发现相同，则进入和根节点一样的对比流程，如果发现不同，则移动真实 dom 到合适的位置。

这样一直递归的遍历下去，直到整棵树完成对比。
