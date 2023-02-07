# 那些年，被问烂了的 Vuejs 面试题

## **说一下 _v-if_ 与 _v-show_ 的区别**

> - 共同点：都是动态显示 _DOM_ 元素
> - 区别点:
>   - 手段
>     _v-if_ 是动态的向 _DOM_ 树内添加或者删除 _DOM_ 元素
>     _v-show_ 是通过设置 _DOM_ 元素的 _display_ 样式属性控制显隐
>   - 编译过程
>     _v-if_   切换有一个局部编译/卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件
>     _v-show_ 只是简单的基于 _css_ 切换
>   - 编译条件
>     _v-if_   是惰性的，如果初始条件为假，则什么也不做。只有在条件第一次变为真时才开始局部编译
>     _v-show_ 是在任何条件下(首次条件是否为真)都被编译，然后被缓存，而且 _DOM_ 元素保留
>   - 性能消耗
>     _v-if_   有更高的切换消耗
>     _v-show_ 有更高的初始渲染消耗
>   - 使用场景
>     _v-if_   适合运营条件不大可能改变
>     _v-show_ 适合频繁切换

## **如何让 _CSS_ 值在当前的组件中起作用**

> 在 _vue_ 文件中的 _style_ 标签上，有一个特殊的属性：_scoped_。当一个 style 标签拥有 _scoped_ 属性时，它的 _CSS_ 样式就只能作用于当前的组件，也就是说，该样式只能适用于当前组件元素。通过该属性，可以使得组件之间的样式不互相污染。如果一个项目中的所有 _style_ 标签全部加上了 _scoped_，相当于实现了样式的模块化。
>
> **_scoped_ 的实现原理**
>
> _vue_ 中的 _scoped_ 属性的效果主要通过 _PostCSS_ 转译实现的。_PostCSS_ 给一个组件中的所有 _DOM_ 添加了一个独一无二的动态属性，然后，给 _CSS_ 选择器额外添加一个对应的属性选择器来选择该组件中 _DOM_，这种做法使得样式只作用于含有该属性的 _DOM_，即组件内部 _DOM_。
>
> 例如：
>
> 转译前

```javascript
<template>
  <div class="example">hi</div>
</template>

<style scoped>
.example {
  color: red;
}
</style>
```

> 转译后：

```javascript
<template>
  <div class="example" data-v-5558831a>hi</div>
</template>

<style>
.example[data-v-5558831a] {
  color: red;
}
</style>
```

## **MVVM**的优缺点?

优点:

- 分离视图（View）和模型（Model），降低代码耦合，提⾼视图或者逻辑的重⽤性: ⽐如视图（View）可以独⽴于 Model 变化和修改，⼀个 ViewModel 可以绑定不同的"View"上，当 View 变化的时候 Model 不可以不变，当 Model 变化的时候 View 也可以不变。你可以把⼀些视图逻辑放在⼀个 ViewModel ⾥⾯，让很多 view 重⽤这段视图逻辑
- 提⾼可测试性: ViewModel 的存在可以帮助开发者更好地编写测试代码
- ⾃动更新 dom: 利⽤双向绑定,数据更新后视图⾃动更新,让开发者从繁琐的⼿动 dom 中解放

缺点:

- Bug 很难被调试: 因为使⽤双向绑定的模式，当你看到界⾯异常了，有可能是你 View 的代码有 Bug，也可能是 Model 的代码有问题。数据绑定使得⼀个位置的 Bug 被快速传递到别的位置，要定位原始出问题的地⽅就变得不那么容易了。另外，数据绑定的声明是指令式地写在 View 的模版当中的，这些内容是没办法去打断点 debug 的
- ⼀个⼤的模块中 model 也会很⼤，虽然使⽤⽅便了也很容易保证了数据的⼀致性，当时⻓期持有，不释放内存就造成了花费更多的内存
- 对于⼤型的图形应⽤程序，视图状态较多，ViewModel 的构建和维护的成本都会⽐较⾼。

## MVVM、MVC、MVP 的区别

MVC、MVP 和 MVVM 是三种常见的软件架构设计模式，主要通过分离关注点的方式来组织代码结构，优化开发效率。

在开发单页面应用时，往往一个路由页面对应了一个脚本文件，所有的页面逻辑都在一个脚本文件里。页面的渲染、数据的获取，对用户事件的响应所有的应用逻辑都混合在一起，这样在开发简单项目时，可能看不出什么问题，如果项目变得复杂，那么整个文件就会变得冗长、混乱，这样对项目开发和后期的项目维护是非常不利的。

**（1）MVC**

MVC 通过分离 Model、View 和 Controller 的方式来组织代码结构。其中 View 负责页面的显示逻辑，Model 负责存储页面的业务数据，以及对相应数据的操作。并且 View 和 Model 应用了观察者模式，当 Model 层发生改变的时候它会通知有关 View 层更新页面。Controller 层是 View 层和 Model 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，Controller 中的事件触发器就开始工作了，通过调用 Model 层，来完成对 Model 的修改，然后 Model 层再去通知 View 层更新。

（2）MVVM

MVVM 分为 Model、View、ViewModel：

- Model 代表数据模型，数据和业务逻辑都在 Model 层中定义；
- View 代表 UI 视图，负责数据的展示；
- ViewModel 负责监听 Model 中数据的改变并且控制视图的更新，处理用户交互操作；

Model 和 View 并无直接关联，而是通过 ViewModel 来进行联系的，Model 和 ViewModel 之间有着双向数据绑定的联系。因此当 Model 中的数据改变时会触发 View 层的刷新，View 中由于用户交互操作而改变的数据也会在 Model 中同步。

这种模式实现了 Model 和 View 的数据自动同步，因此开发者只需要专注于数据的维护操作即可，而不需要自己操作 DOM。

**（3）MVP**

MVP 模式与 MVC 唯一不同的在于 Presenter 和 Controller。在 MVC 模式中使用观察者模式，来实现当 Model 层数据发生变化的时候，通知 View 层的更新。这样 View 层和 Model 层耦合在一起，当项目逻辑变得复杂的时候，可能会造成代码的混乱，并且可能会对代码的复用性造成一些问题。MVP 的模式通过使用 Presenter 来实现对 View 层和 Model 层的解耦。MVC 中的 Controller 只知道 Model 的接口，因此它没有办法控制 View 层的更新，MVP 模式中，View 层的接口暴露给了 Presenter 因此可以在 Presenter 中将 Model 的变化和 View 的变化绑定在一起，以此来实现 View 和 Model 的同步更新。这样就实现了对 View 和 Model 的解耦，Presenter 还包含了其他的响应逻辑。

## **谈一谈对 MVVM 的理解？**

> - _MVVM_ 是 _Model-View-ViewModel_ 的缩写。_MVVM_ 是一种设计思想。
> - _Model_ 层代表数据模型，也可以在 _Model_ 中定义数据修改和操作的业务逻辑;
> - _View_ 代表 _UI_ 组件，它负责将数据模型转化成 _UI_ 展现出来，_View_ 是一个同步 _View_ 和 _Model_ 的对象
> - 在 _MVVM_ 架构下，_View_ 和 _Model_ 之间并没有直接的联系，而是通过 _ViewModel_ 进行交互， _Model_ 和 _ViewModel_ 之间的交互是双向的， 因此 _View_ 数据的变化会同步到 _Model_ 中，而 _Model_ 数据的变化也会立即反应到 _View_ 上。
> - 对 _ViewModel_ 通过双向数据绑定把 _View_ 层和 _Model_ 层连接了起来，而 _View_ 和 _Model_ 之间的 同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作 _DOM_，不需要关注数据状态的同步问题，复杂的数据状态维护完全由 _MVVM_ 来统一管理。

## **_Vue_ 中如何进行组件的使用？_Vue_ 如何实现全局组件的注册？**

> 要使用组件，首先需要使用 _import_ 来引入组件，然后在 _components_ 属性中注册组件，之后就可以在模板中使用组件了。
>
> 可以使用 _Vue.component_ 方法来实现全局组件的注册。

## **_Vue_ 组件的 _data_ 为什么必须是函数**

> 组件中的 _data_ 写成一个函数，数据以函数返回值形式定义。这样每复用一次组件，就会返回一份新的 _data_，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。而单纯的写成对象形式，就使得所有组件实例共用了一份 _data_，就会造成一个变了全都会变的结果。

## **_vue_ 如何快速定位那个组件出现性能问题的**

> ⽤ _timeline_ ⼯具。 通过 _timeline_ 来查看每个函数的调⽤时常，定位出哪个函数的问题，从⽽能判断哪个组件出了问题。

## **_scoped_ 是如何实现样式穿透的？**

> 首先说一下什么场景下需要 _scoped_ 样式穿透。
>
> 在很多项目中，会出现这么一种情况，即：引用了第三方组件，需要在组件中局部修改第三方组件的样式，而又不想去除 _scoped_ 属性造成组件之间的样式污染。此时只能通过特殊的方式，穿透 _scoped_。
>
> 有三种常用的方法来实现样式穿透。
>
> **方法一**
>
> 使用 _::v-deep_ 操作符( >>> 的别名)
>
> 如果希望 _scoped_ 样式中的一个选择器能够作用得“更深”，例如影响子组件，可以使用 >>> 操作符：
>
> 上述代码将会编译成：
>
> 后面的类名没有 _data_ 属性，所以能选到子组件里面的类名。
>
> 有些像 _Sass_ 之类的预处理器无法正确解析 >>>，所以需要使用 _::v-deep_ 操作符来代替。
>
> **方法二**
>
> 定义一个含有 _scoped_ 属性的 _style_ 标签之外，再定义一个不含有 _scoped_ 属性的 _style_ 标签，即在一个 _vue_ 组件中定义一个全局的 _style_ 标签，一个含有作用域的 _style_ 标签：
>
> 此时，我们只需要将修改第三方样式的 _css_ 写在第一个 _style_ 中即可。
>
> **方法三**
>
> 上面的方法一需要单独书写一个不含有 _scoped_ 属性的 _style_ 标签，可能会造成全局样式的污染。
>
> 更推荐的方式是在组件的外层 _DOM_ 上添加唯一的 _class_ 来区分不同组件，在书写样式时就可以正常针对针对这部分 _DOM_ 书写样式。

```javascript
<style scoped>.a >>> .b {/* ... */}</style>
```

```javascript
.a[data-v-f3f3eg9] .b { /* ... */ }
```

```javascript
<style>
/* global styles */
</style>

<style scoped>
/* local styles */
</style>
```

## **说一下 _ref_ 的作用是什么？**

> _ref_ 的作用是被用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 _$refs_ 对象上。其特点是：
>
> - 如果在普通的 _DOM_ 元素上使用，引用指向的就是 _DOM_ 元素
> - 如果用在子组件上，引用就指向组件实例

> 所以常见的使用场景有：
>
> 1. 基本用法，本页面获取 _DOM_ 元素
> 2. 获取子组件中的 _data_
> 3. 调用子组件中的方法

## **说一下你知道的 _vue_ 修饰符都有哪些？**

> 在 _vue_ 中修饰符可以分为 _3_ 类：
>
> - 事件修饰符
> - 按键修饰符
> - 表单修饰符

> **事件修饰符**
>
> 在事件处理程序中调用 _event.preventDefault_ 或 _event.stopPropagation_ 方法是非常常见的需求。尽管可以在 _methods_ 中轻松实现这点，但更好的方式是：_methods_ 只有纯粹的数据逻辑，而不是去处理 _DOM_ 事件细节。
>
> 为了解决这个问题，_vue_ 为 _v-on_ 提供了事件修饰符。通过由点 _._ 表示的指令后缀来调用修饰符。
>
> 常见的事件修饰符如下：
>
> - _.stop_：阻止冒泡。
> - _.prevent_：阻止默认事件。
> - _.capture_：使用事件捕获模式。
> - _.self_：只在当前元素本身触发。
> - _.once_：只触发一次。
> - _.passive_：默认行为将会立即触发。

> **按键修饰符**
>
> 除了事件修饰符以外，在 _vue_ 中还提供了有鼠标修饰符，键值修饰符，系统修饰符等功能。
>
> - ._left_：左键
> - ._right_：右键
> - ._middle_：滚轮
> - ._enter_：回车
> - ._tab_：制表键
> - ._delete_：捕获 “删除” 和 “退格” 键
> - ._esc_：返回
> - ._space_：空格
> - ._up_：上
> - ._down_：下
> - ._left_：左
> - ._right_：右
> - ._ctrl_：_ctrl_ 键
> - ._alt_：_alt_ 键
> - ._shift_：_shift_ 键
> - ._meta_：_meta_ 键

> **表单修饰符**
>
> _vue_ 同样也为表单控件也提供了修饰符，常见的有 _.lazy_、_.number_ 和 _.trim_。
>
> - ._lazy_：在文本框失去焦点时才会渲染
> - ._number_：将文本框中所输入的内容转换为 number 类型
> - ._trim_：可以自动过滤输入首尾的空格

## **_Vue.extend_ 和 _Vue.component_ 的区别是什么？**

> _Vue.extend_ 用于创建一个基于 _Vue_ 构造函数的“子类”，其参数应为一个包含组件选项的对象。
>
> _Vue.component_ 用来注册全局组件。

## **移动端如何实现一个比较友好的 _header_ 组件**

> _Header_ 一般分为左、中、右三个部分，分为三个区域来设计，中间为主标题，每个页面的标题肯定不同，所以可以通过 *vue props*的方式做成可配置对外进行暴露，左侧大部分页面可能都是回退按钮，但是样式和内容不尽相同，右侧一般都是具有功能性的操作按钮，所以左右两侧可以通过 _vue slot_ 插槽的方式对外暴露以实现多样化，同时也可以提供 _default slot_ 默认插槽来统一页面风格。

## **既然 _Vue_ 通过数据劫持可以精准探测数据变化，为什么还需要虚拟 _DOM_ 进行 _diff_ 监测差异 ？**

> 现代前端框架有两种方式侦测变化，一种是 _pull_，一种是 _push_。
>
> **_pull_**
>
> 其代表为 _React_，我们可以回忆一下 _React_ 是如何侦测到变化的。
>
> 我们通常会用 _setState API_ 显式更新,然后 _React_ 会进行一层层的 _Virtual Dom Diff_ 操作找出差异，然后 _Patch_ 到 _DOM_ 上，_React_ 从一开始就不知道到底是哪发生了变化,只是知道「有变化了」,然后再进行比较暴力的 _Diff_ 操作查找「哪发生变化了」，另外一个代表就是 _Angular_ 的脏检查操作。
>
> **_push_**
>
> _Vue_ 的响应式系统则是 _push_ 的代表，当 _Vue_ 程序初始化的时候就会对数据 _data_ 进行依赖的收集，一但数据发生变化，响应式系统就会立刻得知，因此 _Vue_ 是一开始就知道是「在哪发生变化了」
>
> 但是这又会产生一个问题，通常绑定一个数据就需要一个 _Watcher_，一但我们的绑定细粒度过高就会产生大量的 _Watcher_，这会带来内存以及依赖追踪的开销，而细粒度过低会无法精准侦测变化，因此 _Vue_ 的设计是选择中等细粒度的方案，在组件级别进行 _push_ 侦测的方式，也就是那套响应式系统。
>
> 通常我们会第一时间侦测到发生变化的组件,然后在组件内部进行 _Virtual Dom Diff_ 获取更加具体的差异，而 _Virtual Dom Diff_ 则是 _pull_ 操作，_Vue_ 是 _push + pull_ 结合的方式进行变化侦测的。

## **_Vue_ 为什么没有类似于 _React_ 中 _shouldComponentUpdate_ 的生命周期？**

> 根本原因是 _Vue_ 与 _React_ 的变化侦测方式有所不同
>
> _React_ 是 _pull_ 的方式侦测变化，当 _React_ 知道发生变化后，会使用 _Virtual Dom Diff_ 进行差异检测,但是很多组件实际上是肯定不会发生变化的，这个时候需要用 _shouldComponentUpdate_ 进行手动操作来减少 _diff_，从而提高程序整体的性能。
>
> _Vue_ 是 _pull+push_ 的方式侦测变化的，在一开始就知道那个组件发生了变化，因此在 _push_ 的阶段并不需要手动控制 _diff_，而组件内部采用的 _diff_ 方式实际上是可以引入类似于 _shouldComponentUpdate_ 相关生命周期的，但是通常合理大小的组件不会有过量的 _diff_，手动优化的价值有限，因此目前 _Vue_ 并没有考虑引入 _shouldComponentUpdate_ 这种手动优化的生命周期。

## **说一下你对 _vue_ 事件绑定原理的理解？**

> _vue_ 中的事件绑定是有两种，一种是原生的事件绑定，另一种是组件的事件绑定。
>
> 原生的事件绑定在普通元素上是通过 @click _ 进行绑定，在组件上是通过 @click.native 进行绑定，组件中的 \_nativeOn_ 是等价于 on 的。组件的事件绑定的 @click 是 vue 中自定义的 $on 方法来实现的，必须有 $emit 才可以触发。
>
> **原生事件绑定原理**
>
> 在 runtime 下的 patch.js 中 createPatchFunction 执行了之后再赋值给 patch。
>
> createPatchFunction 方法有两个参数，分别是 nodeOps 存放操作 dom 节点的方法和 modules，modules 是有两个数组拼接起来的，modules 拼接完的数组中有一个元素就是 events，事件添加就发生在这里。
>
> events 元素关联的就是 events.js 文件，在 events 中有一个 updateDOMListeners 方法，在 events 文件的结尾导出了一个对象，然后对象有一个属性叫做 create，这个属性关联的就是 updateDOMListeners 方法。
>
> 在执行 createPatchFunction 方法时，就会将这两个参数传入，在 createPatchFunction 方法中接收了一个参数 backend，在该方法中一开始进行 backend 的解构，就是上面的 nodeOps 和 modules 参数，解构完之后进入 for 循环。
>
> 在 createPatchFunction 开头定义了一个 cbs 对象。for 循环遍历一个叫 hooks 的数组。hooks 是文件一开头定义的一个数组，其中包括有 create，for 循环就是在 cbs 上定义一系列和 hooks 元素相同的属性，然后键值是一个数组，然后数组内容是 modules 里面的一些内容。这时就把 events 文件中导出来的 create 属性放在了 cbs 上。
>
> 当我们进入首次渲染的时候，会执行到 patch 函数里面的 createElm 方法，这个方法中就会调用 invokeCreateHooks 函数，用来处理事件系统，这里就是真正准备进行原生事件绑定的入口。invokeCreateHooks 方法中，遍历了 cbs.create 数组里面的内容。然后把 cbs.create 里面的函数全部都执行一次，在 cbs.create 其中一个函数就是 updateDOMListeners。
>
> updateDOMListeners 就是用来添加事件的方法，在这方法中会根据 vnode 判断是否有定义一个点击事件。如果没有点击事件就 return。有的话就继续执行，给 on 进行赋值，然后进行一些赋值操作，将 vnode.elm 赋值给 target，elm 这个属性就是指向 vnode 所对应的真实 dom 节点，这里就是把我们要绑定事件的 dom 结点进行缓存，接下来执行 updateListeners 方法。在接下来执行 updateListeners 方法中调用了一个 add 的方法，然后在 app 方法中通过原生 addEventListener 把事件绑定到 dom 上。
>
> **组件事件绑定原理**
>
> 在组件实例初始化会调用 initMixin 方法中的 Vue.prototype.\_init，在 init 函数中，会通过 initInternalComponent 方法初始化组件信息，将自定义的组件事件放到\_parentListeners 上，下来就会调用 initEvents 来初始化组件事件，在 initEvents 中会实例上添加一个 \_event 对象，用于保存自定义事件，然后获取到 父组件给 子组件绑定的自定义事件，也就是刚才在初始化组件信息的时候将自定义的组件事件放在了\_parentListeners 上，这时候 vm.$options.\_parentListeners 就是自定义的事件。
>
> 最后进行判断，如果有自定义的组件事件就执行 updateComponentListeners 方法进行事件绑定，在 updateComponentListeners 方法中会调用 updateListeners 方法，并传传一个 add 方法进行执行，这个 add 方法里就是$on 方法。

## **_delete_ 和 _Vue.delete_ 删除数组的区别是什么？**

> _delete_ 只是被删除的元素变成了 _empty/undefined_ 其他的元素的键值还是不变。
> _Vue.delete_ 是直接将元素从数组中完全删除，改变了数组其他元素的键值。

## **_v-on_ 可以实现监听多个方法么？**

> 可以监听多个方法。关于监听多个方法提供了几种不同的写法：
>
> 示例代码如下：

```html
写法一：
<div v-on="{ 事件类型: 事件处理函数, 事件类型: 事件处理函数 }"></div>
写法二：
<div @事件类型="“事件处理函数”" @事件类型="“事件处理函数”"></div>
写法三：在一个事件里面书写多个事件处理函数
<div @事件类型="“事件处理函数1，事件处理函数2”"></div>
写法四：在事件处理函数内部调用其他的函数
```

```html
<template>
  <div>
    <!-- v-on在vue2.x中测试,以下两种均可-->
    <button v-on="{ mouseenter: onEnter, mouseleave: onLeave }">
      鼠标进来1
    </button>
    <button @mouseenter="onEnter" @mouseleave="onLeave">鼠标进来2</button>

    <!-- 一个事件绑定多个函数，按顺序执行，这里分隔函数可以用逗号也可以用分号-->
    <button @click="a(), b()">点我ab</button>
    <button @click="one()">点我onetwothree</button>
  </div>
</template>
<script>
  export default {
    methods: {
      //这里是es6对象里函数写法
      a() {
        console.log("a");
      },
      b() {
        console.log("b");
      },
      one() {
        console.log("one");
        this.two();
        this.three();
      },
      two() {
        console.log("two");
      },
      three() {
        console.log("three");
      },
      onEnter() {
        console.log("mouse enter");
      },
      onLeave() {
        console.log("mouse leave");
      },
    },
  };
</script>
```

## **_vue_ 的数据为什么频繁变化但只会更新一次？**

> 这是因为 _vue_ 的 _DOM_ 更新是一个异步操作，在数据更新后会首先被 _set_ 钩子监听到，但是不会马上执行 _DOM_ 更新，而是在下一轮循环中执行更新。
>
> 具体实现是 _vue_ 中实现了一个 _queue_ 队列用于存放本次事件循环中的所有 _watcher_ 更新，并且同一个 _watcher_ 的更新只会被推入队列一次，并在本轮事件循环的微任务执行结束后执行此更新(_UI Render_ 阶段)，这就是 _DOM_ 只会更新一次的原因。
>
> 这种在缓冲时去除重复数据对于避免不必要的计算和 _DOM_ 操作是非常重要的。然后，在下一个的事件循环“_tick_”中，_vue_ 刷新队列并执行实际 (已去重的) 工作。_vue_ 在内部对异步队列尝试使用原生的 _Promise.then、MutationObserver_   和 _setImmediate_，如果执行环境不支持，则会采用 _setTimeout(fn, 0)_ 代替。

## **插槽与作用域插槽的区别是什么？**

> 插槽的作用是子组件提供了可替换模板，父组件可以更换模板的内容。
>
> 作用域插槽给了子组件将数据返给父组件的能力，子组件一样可以复用，同时父组件也可以重新组织内容和样式。

## **_vue_ 中相同逻辑如何进行抽离？**

> 可以使用 _vue_ 里面的混入（_mixin_）技术。混入（_mixin_）提供了一种非常灵活的方式，来将 _vue_ 中相同的业务逻辑进行抽离。
>
> 例如：
>
> - 在 _data_ 中有很多是公用数据
> - 引用封装好的组件也都是一样的
> - _methods、watch、computed_ 中也都有大量的重复代码

> 当然这个时候可以将所有的代码重复去写来实现功能，但是我们并不不推荐使用这种方式，无论是工作量、工作效率和后期维护来说都是不建议的，这个时候 _mixin_ 就可以大展身手了。
>
> 一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。说白了就是给每个生命周期，函数等等中间加入一些公共逻辑。
>
> **混入技术特点**
>
> - 当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。比如，数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
> - 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
> - 值为对象的选项，例如 _methods、components_ 和 _directives_，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

## 说一说自定义指令有哪些生命周期？

> 自定义指令的生命周期，有 5 个事件钩子，可以设置指令在某一个事件发生时的具体行为：
>
> - bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
> - inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
> - update: 被绑定元素所在的模板更新时调用，而不论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新（详细的钩子函数参数见下）。
> - componentUpdated: 被绑定元素所在模板完成一次更新周期时调用。
> - unbind: 只调用一次， 指令与元素解绑时调用。

> 钩子函数的参数 (包括 el，binding，vnode，oldVnode)
>
> - el: 指令所绑定的元素，可以用来直接操作 DOM 。
> - binding: 一个对象，包含以下属性：name: 指令名、value: 指令的绑定值、oldValue: 指令绑定的前一个值、expression: 绑定值的字符串形式、arg: 传给指令的参数、modifiers: 一个包含修饰符的对象。
> - vnode: Vue 编译生成的虚拟节点。
> - oldVnode: 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

## _vue_ 为什么采用异步渲染

> 因为如果不采用异步更新，那么每次更新数据都会对当前组件进行重新渲染；所以为了性能考虑，_Vue_ 会在本轮数据更新后，再去异步更新视图。
>
> 异步渲染的原理：
>
> 1. 调用 _notify( )_ 方法，通知 _watcher_ 进行更新操作
> 2. 依次调用 watcher 的 update 方法
> 3. 对 watcher 进行去重操作（通过 id）放到队列里
> 4. 执行完后异步清空这个队列，nextTick（flushSchedulerQueue）进行批量更新操作

## 组件中写 _name_ 选项有哪些好处

> 1. 可以通过名字找到对应的组件（ 递归组件：组件自身调用自身 ）
> 2. 可以通过 _name_ 属性实现缓存功能（_keep-alive_）
> 3. 可以通过 _name_ 来识别组件（跨级组件通信时非常重要）
> 4. 使用 _vue-devtools_ 调试工具里显示的组见名称是由 _vue_ 中组件 _name_ 决定的

## 过滤器的作用，如何实现一个过滤器

根据过滤器的名称，过滤器是用来过滤数据的，在 Vue 中使用 filters 来过滤数据，filters 不会修改数据，而是过滤数据，改变用户看到的输出（计算属性 computed ，方法 methods 都是通过修改数据来处理数据格式的输出显示）。

**使用场景：**

- 需要格式化数据的情况，比如需要处理时间、价格等数据格式的输出 / 显示。
- 比如后端返回一个 **年月日的日期字符串**，前端需要展示为 **多少天前** 的数据格式，此时就可以用 fliters 过滤器来处理数据。

过滤器是一个函数，它会把表达式中的值始终当作函数的第一个参数。过滤器用在**插值表达式 \***_**{{ }} 和 v-bind\***_** 表达式** 中，然后放在操作符“ | ”后面进行指示。

例如，在显示金额，给商品价格添加单位：

```vue
<li>商品价格：{{item.price | filterPrice}}</li>
filters: { filterPrice (price) { return price ? ('￥' + price) : '--' } }
```

## 如何保存页面的当前的状态

既然是要保持页面的状态（其实也就是组件的状态），那么会出现以下两种情况：

- 前组件会被卸载
- 前组件不会被卸载

那么可以按照这两种情况分别得到以下方法：

**组件会被卸载：**

**（1）将状态存储在 LocalStorage / SessionStorage**

只需要在组件即将被销毁的生命周期 componentWillUnmount （react）中在 LocalStorage / SessionStorage 中把当前组件的 state 通过 JSON.stringify() 储存下来就可以了。在这里面需要注意的是组件更新状态的时机。

比如从 B 组件跳转到 A 组件的时候，A 组件需要更新自身的状态。但是如果从别的组件跳转到 B 组件的时候，实际上是希望 B 组件重新渲染的，也就是不要从 Storage 中读取信息。所以需要在 Storage 中的状态加入一个 flag 属性，用来控制 A 组件是否读取 Storage 中的状态。
**优点：**

- 兼容性好，不需要额外库或工具。
- 简单快捷，基本可以满足大部分需求。

**缺点：**

- 状态通过 JSON 方法储存（相当于深拷贝），如果状态中有特殊情况（比如 Date 对象、Regexp 对象等）的时候会得到字符串而不是原来的值。（具体参考用 JSON 深拷贝的缺点）
- 如果 B 组件后退或者下一页跳转并不是前组件，那么 flag 判断会失效，导致从其他页面进入 A 组件页面时 A 组件会重新读取 Storage，会造成很奇怪的现象

**（2）路由传值**

通过 react-router 的 Link 组件的 prop —— to 可以实现路由间传递参数的效果。
在这里需要用到 state 参数，在 B 组件中通过 history.location.state 就可以拿到 state 值，保存它。返回 A 组件时再次携带 state 达到路由状态保持的效果。
**优点：**

- 简单快捷，不会污染 LocalStorage / SessionStorage。
- 可以传递 Date、RegExp 等特殊对象（不用担心 JSON.stringify / parse 的不足）

**缺点：**

- 如果 A 组件可以跳转至多个组件，那么在每一个跳转组件内都要写相同的逻辑。

**组件不会被卸载：**

**（1）单页面渲染**

要切换的组件作为子组件全屏渲染，父组件中正常储存页面状态。

**优点：**

- 代码量少
- 不需要考虑状态传递过程中的错误

**缺点：**

- 增加 A 组件维护成本
- 需要传入额外的 prop 到 B 组件
- 无法利用路由定位页面

除此之外，在 Vue 中，还可以是用 keep-alive 来缓存页面，当组件在 keep-alive 内被切换时组件的**activated、deactivated**这两个生命周期钩子函数会被执行 被包裹在 keep-alive 中的组件的状态将会被保留：

```vue
<keep-alive>
	<router-view v-if="$route.meta.keepAlive"></router-view>
</kepp-alive>
```

router.js

```javascript
{
  path: '/',
  name: 'xxx',
  component: ()=>import('../src/views/xxx.vue'),
  meta:{
    keepAlive: true // 需要被缓存
  }
},
```

## 常见的事件修饰符及其作用

- .stop：等同于 JavaScript 中的 event.stopPropagation() ，防止事件冒泡；
- .prevent ：等同于 JavaScript 中的 event.preventDefault() ，防止执行预设的行为（如果事件可取消，则取消该事件，而不停止事件的进一步传播）；
- .capture ：与事件冒泡的方向相反，事件捕获由外到内；
- .self ：只会触发自己范围内的事件，不包含子元素；
- .once ：只会触发一次。

## v-if、v-show、v-html 的原理

- v-if 会调用 addIfCondition 方法，生成 vnode 的时候会忽略对应节点，render 的时候就不会渲染；
- v-show 会生成 vnode，render 的时候也会渲染成真实节点，只是在 render 过程中会在节点的属性中修改 show 属性值，也就是常说的 display；
- v-html 会先移除节点下的所有节点，调用 html 方法，通过 addProp 添加 innerHTML 属性，归根结底还是设置 innerHTML 为 v-html 的值。

v-if 能够控制是否生成 vnode，也就间接控制了是否生成对应的 dom。当 v-if 为 true 时，会生成对应的 vnode，并生成对应的 dom 元素；当其为 false 时，不会生成对应的 vnode，自然不会生成任何的 dom 元素。
v-show 始终会生成 vnode，也就间接导致了始终生成 dom。它只是控制 dom 的 display 属性，当 v-show 为 true 时，不做任何处理；当其为 false 时，生成的 dom 的 display 属性为 none。
使用 v-if 可以有效的减少树的节点和渲染量，但也会导致树的不稳定；而使用 v-show 可以保持树的稳定，但不能减少树的节点和渲染量。
因此，在实际开发中，显示状态变化频繁的情况下应该使用 v-show，以保持树的稳定；显示状态变化较少时应该使用 v-if，以减少树的节点和渲染量。

## data 为什么是一个函数而不是对象

JavaScript 中的对象是引用类型的数据，当多个实例引用同一个对象时，只要一个实例对这个对象进行操作，其他实例中的数据也会发生变化。
而在 Vue 中，更多的是想要复用组件，那就需要每个组件都有自己的数据，这样组件之间才不会相互干扰。
所以组件的数据不能写成对象的形式，而是要写成函数的形式。数据以函数返回值的形式定义，这样当每次复用组件的时候，就会返回一个新的 data，也就是说每个组件都有自己的私有数据空间，**它们各自维护自己的数据，不会干扰其他组件的正常运行。**

## Vue 中封装的数组方法有哪些，其如何实现页面更新

在 Vue 中，对响应式处理利用的是 Object.defineProperty 对数据进行拦截，而这个方法并不能监听到数组内部变化，数组长度变化，数组的截取变化等，所以需要对这些操作进行 hack，让 Vue 能监听到其中的变化。
push()
pop()
shift()
unshift ()
splice()
sort()
reverse()
那 Vue 是如何实现让这些数组方法实现元素的实时更新的呢，下面是 Vue 中对这些方法的封装：

```javascript
// 缓存数组原型
const arrayProto = Array.prototype;
// 实现 arrayMethods.__proto__ === Array.prototype
export const arrayMethods = Object.create(arrayProto);
// 需要进行功能拓展的方法
const methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // 缓存原生数组方法
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args) {
    // 执行并缓存原生数组功能
    const result = original.apply(this, args);
    // 响应式处理
    const ob = this.__ob__;
    let inserted;
    switch (method) {
      // push、unshift会新增索引，所以要手动observer
      case "push":
      case "unshift":
        inserted = args;
        break;
      // splice方法，如果传入了第三个参数，也会有索引加入，也要手动observer。
      case "splice":
        inserted = args.slice(2);
        break;
    }
    //
    if (inserted) ob.observeArray(inserted); // 获取插入的值，并设置响应式监听
    // notify change
    ob.dep.notify(); // 通知依赖更新
    // 返回原生数组方法的执行结果
    return result;
  });
});
```

简单来说就是，重写了数组中的那些原生方法，首先获取到这个数组的**ob**，也就是它的 Observer 对象，如果有新的值，就调用 observeArray 继续对新的值观察变化（也就是通过 target proto == arrayMethods 来改变了数组实例的型），然后手动调用 notify，通知渲染 watcher，执行 update。

## Vue 单页应用与多页应用的区别

**概念：**

- SPA 单页面应用（SinglePage Web Application），指只有一个主页面的应用，一开始只需要加载一次 js、css 等相关资源。所有内容都包含在主页面，对每一个功能模块组件化。单页应用跳转，就是切换相关组件，仅仅刷新局部资源。
- MPA 多页面应用 （MultiPage Application），指有多个独立页面的应用，每个页面必须重复加载 js、css 等相关资源。多页应用跳转，需要整页资源刷新。

## Vue data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？

不会立即同步执行重新渲染。Vue 实现响应式并不是数据发生变化之后 DOM 立即变化，而是按一定的策略进行 DOM 的更新。Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化， Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。
如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环 tick 中，Vue 刷新队列并执行实际（已去重的）工作。

## 简述 mixin、extends 的覆盖逻辑

**（1）mixin 和 extends** mixin 和 extends 均是用于合并、拓展组件的，两者均通过 mergeOptions 方法实现合并。

- mixins 接收一个混入对象的数组，其中混入对象可以像正常的实例对象一样包含实例选项，这些选项会被合并到最终的选项中。Mixin 钩子按照传入顺序依次调用，并在调用组件自身的钩子之前被调用。
- extends 主要是为了便于扩展单文件组件，接收一个对象或构造函数。

**（2）mergeOptions 的执行过程**

- 规范化选项（normalizeProps、normalizelnject、normalizeDirectives)
- 对未合并的选项，进行判断

```javascript
if (!child._base) {
  if (child.extends) {
    parent = mergeOptions(parent, child.extends, vm);
  }
  if (child.mixins) {
    for (let i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
}
```

- 合并处理。根据一个通用 Vue 实例所包含的选项进行分类逐一判断合并，如 props、data、 methods、watch、computed、生命周期等，将合并结果存储在新定义的 options 对象里。
- 返回合并结果 options。

## assets 和 static 的区别

**相同点：** assets 和 static 两个都是存放静态资源文件。项目中所需要的资源文件图片，字体图标，样式文件等都可以放在这两个文件下，这是相同点

**不相同点：** assets 中存放的静态资源文件在项目打包时，也就是运行 npm run build 时会将 assets 中放置的静态资源文件进行打包上传，所谓打包简单点可以理解为压缩体积，代码格式化。而压缩后的静态资源文件最终也都会放置在 static 文件中跟着 index.html 一同上传至服务器。static 中放置的静态资源文件就不会要走打包压缩格式化等流程，而是直接进入打包好的目录，直接上传至服务器。因为避免了压缩直接进行上传，在打包时会提高一定的效率，但是 static 中的资源文件由于没有进行压缩等操作，所以文件的体积也就相对于 assets 中打包后的文件提交较大点。在服务器中就会占据更大的空间。

**建议：** 将项目中 template 需要的样式文件 js 文件等都可以放置在 assets 中，走打包这一流程。减少体积。而项目中引入的第三方的资源文件如 iconfoont.css 等文件可以放置在 static 中，因为这些引入的第三方文件已经经过处理，不再需要处理，直接上传。

## delete 和 Vue.delete 删除数组的区别

- delete 只是被删除的元素变成了 empty/undefined 其他的元素的键值还是不变。
- Vue.delete 直接删除了数组 改变了数组的键值。

## 什么是 mixin ？

- Mixin 使我们能够为 Vue 组件编写可插拔和可重用的功能。
- 如果希望在多个组件之间重用一组组件选项，例如生命周期 hook、 方法等，则可以将其编写为 mixin，并在组件中简单的引用它。
- 然后将 mixin 的内容合并到组件中。如果你要在 mixin 中定义生命周期 hook，那么它在执行时将优化于组件自已的 hook。

## template 和 jsx 的有什么分别？

对于 runtime 来说，只需要保证组件存在 render 函数即可，而有了预编译之后，只需要保证构建过程中生成 render 函数就可以。在 webpack 中，使用 vue-loader 编译.vue 文件，内部依赖的 vue-template-compiler 模块，在 webpack 构建过程中，将 template 预编译成 render 函数。与 react 类似，在添加了 jsx 的语法糖解析器 babel-plugin-transform-vue-jsx 之后，就可以直接手写 render 函数。
所以，template 和 jsx 的都是 render 的一种表现形式，不同的是：JSX 相对于 template 而言，具有更高的灵活性，在复杂的组件中，更具有优势，而 template 虽然显得有些呆滞。但是 template 在代码结构上更符合视图与逻辑分离的习惯，更简单、更直观、更好维护。

## vue 初始化页面闪动问题

使用 vue 开发时，在 vue 初始化之前，由于 div 是不归 vue 管的，所以我们写的代码在还没有解析的情况下会容易出现花屏现象，看到类似于{{message}}的字样，虽然一般情况下这个时间很短暂，但是还是有必要让解决这个问题的。
首先：在 css 里加上以下代码：

```javascript
[v-cloak] {    display: none;}
```

如果没有彻底解决问题，则在根元素加上 style="display: none;" :style="{display: 'block'}"

## extend 有什么作用

这个 API 很少用到，作用是扩展组件生成一个构造器，通常会与 $mount 一起使用。

```javascript
// 创建组件构造器
let Component = Vue.extend({ template: "<div>test</div>" });
// 挂载到 #app 上new Component().$mount('#app')// 除了上面的方式，还可以用来扩展已有的组件let SuperComponent = Vue.extend(Component)new SuperComponent({    created() {        console.log(1)    }})
new SuperComponent().$mount("#app");
```

## mixin 和 mixins 区别

mixin 用于全局混入，会影响到每个组件实例，通常插件都是这样做初始化的。

```javascript
Vue.mixin({
  beforeCreate() {        // ...逻辑        // 这种方式会影响到每个组件的 beforeCreate 钩子函数    }})
```

虽然文档不建议在应用中直接使用 mixin，但是如果不滥用的话也是很有帮助的，比如可以全局混入封装好的 ajax 或者一些工具函数等等。

mixins 应该是最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 mixins 混入代码，比如上拉下拉加载数据这种逻辑等等。 另外需要注意的是 mixins 混入的钩子函数会先于组件内的钩子函数执行，并且在遇到同名选项的时候也会有选择性的进行合并。

## 内置组件 Transition

> 官网详细文档：[https://cn.vuejs.org/v2/guide/transitions.html](https://cn.vuejs.org/v2/guide/transitions.html)

**时机**

`Transition`组件会监控`slot`中**唯一根元素**的出现和消失，并会在其出现和消失时应用过渡效果
`Transition`不生成任何元素，只是为了生成过渡效果
具体的监听内容是：

- 它会对新旧两个虚拟节点进行对比，如果旧节点被销毁，则应用消失效果，如果新节点是新增的，则应用进入效果
- 如果不是上述情况，则它会对比新旧节点，观察其`v-show`是否变化，`true->false`应用消失效果，`false->true`应用进入效果

**流程**

> 类名规则：
>
> 1. 如果`transition`上没有定义`name`，则类名为`v-xxxx`
> 2. 如果`transition`上定义了`name`，则类名为`${name}-xxxx`
> 3. 如果指定了类名，直接使用指定的类名

> 指定类名见：[自定义过渡类名](https://cn.vuejs.org/v2/guide/transitions.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%BF%87%E6%B8%A1%E7%9A%84%E7%B1%BB%E5%90%8D)

**1. 进入效果**

**2. 消失效果**

## 过渡组

`Transision`可以监控其内部的**单个 dom 元素**的出现和消失，并为其附加样式

如果要监控一个 dom 列表，就需要使用`TransitionGroup`组件

它会对列表的新增元素应用**进入效果**，删除元素应用**消失效果**，对被移动的元素应用`v-move`样式

> 被移动的元素之所以能够实现过渡效果，是因为`TransisionGroup`内部使用了 Flip 过渡方案
