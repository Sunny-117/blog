# Vuejs 数据响应原理

## Vue2

[https://cn.vuejs.org/v2/guide/reactivity.html](https://cn.vuejs.org/v2/guide/reactivity.html)

![](../public/vue/2023-02-01-13-46-04.png)
通过 `Object.defineProperty` 遍历对象的每一个属性，把数据变成 `getter`,`setter`。读取属性 `getter`, 更改属性 `setter`。形成了响应式数据。组件 `render` 函数会生成虚拟 `DOM` 树，影响到界面。怎么让响应式数据和虚拟 `dom` 连接起来呢？`render` 运行的时候用到了响应式数据，于是收集了依赖，数据 变化，会通知 `watch`，`watch` 会重新运行 render 函数

**响应式数据的最终目标**，是当对象本身或对象属性发生变化时，将会运行一些函数，最常见的就是 render 函数。
在具体实现上，vue2 用到了**几个核心模块**：

1. Observer
2. Dep
3. Watcher
4. Scheduler

### Observer

Observer 要实现的目标非常简单，就是把一个普通的对象转换为响应式的对象

为了实现这一点，Observer 把对象的每个属性通过 Object.defineProperty 转换为带有 getter 和 setter 的属性，这样一来，当访问或设置属性时，vue 就有机会做一些别的事情。

![](../public/vue/2023-02-01-13-48-01.png)

Observer 是 vue 内部的构造器，我们可以通过 Vue 提供的静态方法 Vue.observable( object )间接的使用该功能。

```javascript
var obj = {
  a: 1,
  c: {
    d: 3,
  },
  f: [
    {
      a: 1,
      b: 2,
    },
    3,
  ],
};
Vue.observable(obj); //递归遍历
```

在组件生命周期中，数据响应式发生在 `beforeCreate` 之后，`created` 之前。

具体实现上，它会递归遍历对象的所有属性，以完成深度的属性转换。

由于遍历时只能遍历到对象的当前属性，因此无法监测到将来动态增加或删除的属性，因此 vue 提供了`$set`和`$delete` 两个实例方法，让开发者通过这两个实例方法对已有响应式对象添加或删除属性。

对于数组，vue 会更改它的隐式原型，之所以这样做，是因为 vue 需要监听那些可能改变数组内容的方法

![](../public/vue/2023-02-01-13-49-33.png)

所以如果直接给数组的某一项（下标）直接赋值，监控不到

总之，Observer 的目标，就是要让一个对象，它属性的读取、赋值，内部数组的变化都要能够被 vue 感知到。

### Dep

这里有两个问题没解决，就是读取属性时要做什么事，而属性变化时要做什么事，这个问题需要依靠 Dep 来解决。
Dep 的含义是 Dependency，表示依赖的意思。
Vue 会为响应式对象中的每个属性、对象本身、数组本身创建一个 Dep 实例，

```js
const obj = {
  //dep
  a: 1, //dep
  n: [1, 2, 3], //dep
  d: {
    //dep
    p: 1, //dep
  },
};
```

每个 Dep 实例都有能力做以下两件事：

- 记录依赖：是谁在用我

- 派发更新：我变了，我要通知那些用到我的人

当读取响应式对象的某个属性时，它会进行依赖收集：有人用到了我

当改变某个属性时，它会派发更新：那些用我的人听好了，我变了

![](../public/vue/2023-02-01-13-52-47.png)

举个例子：

![](../public/vue/2023-02-01-13-55-15.png)

### Watcher

这里又出现一个问题，就是 Dep 如何知道是谁在用我？要解决这个问题，需要依靠另一个东西，就是 Watcher。

当某个函数执行的过程中，用到了响应式数据，响应式数据是无法知道是哪个函数在用自己的
vue 通过一种巧妙的办法来解决这个问题
**我们不要直接执行函数，而是把函数交给一个叫做 watcher 的东西去执行**，watcher 是一个对象，每个这样的函数执行时都应该创建一个 watcher，通过 watcher 去执行
**watcher 会设置一个全局变量，让全局变量记录当前负责执行的 watcher 等于自己，然后再去执行函数，在函数的执行过程中，如果发生了依赖记录 dep.depend()，那么 Dep 就会把这个全局变量记录下来，表示有一个 watcher 用到了我这个属性**

```javascript
window.currentWatcher = this; //接下来执行我
render(); // -->get(){dep.depend()}//通过全局变量来收集
window.currentWatcher = null;
```

当 Dep 进行派发更新时，它会通知之前记录的所有 watcher：我变了

![](../public/vue/2023-02-01-13-56-31.png)

每一个 vue 组件实例，都至少对应一个 watcher，该 watcher 中记录了该组件的 render 函数。
watcher 首先会把 render 函数运行一次以**收集依赖**，于是**那些在 render 中用到的响应式数据就会记录这个 watcher。**
当**数据变化**时，**dep 就会通知该 watcher**，而 watcher 将重新运行 render 函数，从而让界面重新渲染同时重新记录当前的依赖。

### Scheduler

现在还剩下最后一个问题，就是 Dep 通知 watcher 之后，如果 watcher 执行重运行对应的函数，就有可能导致函数频繁运行，从而导致效率低下

试想，如果一个交给 watcher 的函数，它里面用到了属性 a、b、c、d，那么 a、b、c、d 属性都会记录依赖，于是下面的代码将触发 4 次更新：

```javascript
state.a = "new data";
state.b = "new data";
state.c = "new data";
state.d = "new data";
```

这样显然是不合适的，因此，watcher 收到派发更新的通知后，实际上不是立即执行对应函数，而是把自己交给一个叫**调度器**的东西

调度器维护一个执行队列，该队列同一个 watcher 仅会存在一次，队列中的 watcher 不是立即执行，它会通过一个叫做 nextTick 的工具方法，把这些需要执行的 watcher 放入到事件循环的微队列中，nextTick 的具体做法是通过 Promise 完成的

nextTick 通过 this.$nextTick 暴露给开发者

也就是说，**当响应式数据变化时，render 函数的执行是异步的，并且在微队列中**

### 总体流程

![](../public/vue/2023-02-01-13-58-47.png)

Vue.js 是采用**数据劫持**结合**发布者-订阅者模式**的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。主要分为以下几个步骤：

1. 需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化
2. compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图
3. Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:

   ① 在自身实例化时往属性订阅器(dep)里面添加自己

   ② 自身必须有一个 update()方法

   ③ 待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的回调，则功成身退。

4. MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果。


## Vue3 数据响应原理

_Vue 3.0_ 中采用了 _Proxy_，抛弃了 _Object.defineProperty_ 方法。

究其原因，主要是以下几点：

- _Object.defineProperty_ 无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应
- _Object.defineProperty_ 只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。_Proxy_ 可以劫持整个对象，并返回一个新的对象。
- _Proxy_ 不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。
- _Proxy_ 有多达 _13_ 种拦截方法
- *Proxy*作为新标准将受到浏览器厂商重点持续的性能优化

注意：

- **_Proxy_ 只会代理对象的第一层，那么 _Vue3_ 又是怎样处理这个问题的呢？**

判断当前 _Reflect.get_ 的返回值是否为 _Object_，如果是则再通过 _reactive_ 方法做代理， 这样就实现了深度观测。

- **监测数组的时候可能触发多次 _get/set_，那么如何防止触发多次呢？**

我们可以判断 _key_ 是否为当前被代理对象 _target_ 自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行 _trigger_。


## @vue/reactivity api

### 获取响应式数据

| API        | 传入                      | 返回             | 备注                                                                                                                                 |
| :--------- | ------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `reactive` | `plain-object`            | `对象代理`       | 深度代理对象中的所有成员                                                                                                             |
| `readonly` | `plain-object` or `proxy` | `对象代理`       | 只能读取代理对象中的成员，不可修改                                                                                                   |
| `ref`      | `any`                     | `{ value: ... }` | 对 value 的访问是响应式的<br />如果给 value 的值是一个对象，<br />则会通过`reactive`函数进行代理<br />如果已经是代理，则直接使用代理 |
| `computed` | `function`                | `{ value: ... }` | 当读取 value 值时，<br />会**根据情况**决定是否要运行函数                                                                            |

```javascript
// 想把{ a: 1, b: 2 }变成响应式
import { reactive, readonly, ref, computed } from "vue";
// 1. reactive
const state = reactive({ a: 1, b: 2 });
// window.state = state;
// 2. readonly
// 只读，不能set
/*
const imState = readonly({ a: 1, b: 2 });
window.imState = imState;
*/
/*
const imState = readonly(state);//代理套代理
window.imState = imState;
// imState -> state -> {a:3,b:2}

// 3. ref
const count = ref(0);//如果里面是对象，就会调用reactive；普通值就ref
console.log(count);
const count = ref(state);//已经是代理，就返回这个代理
console.log(count.value===state)
// 4. computed
*/
/* const sum = computed(() => {
    console.log("computed");
    return state.a + state.b;
})
console.log(sum.value);//当这句话运行的时候就会输出computed，但是只允许一次(有缓存)
当依赖数据a,b变了，就重新运行
 */
```

应用：

- 如果想要让一个对象变为响应式数据，可以使用`reactive`或`ref`
- 如果想要让一个对象的所有属性只读，使用`readonly`
- 如果想要让一个非对象数据变为响应式数据，使用`ref`
- 如果想要根据已知的响应式数据得到一个新的响应式数据，使用`computed`
- 总结：在 vue3 中，两种数据响应式格式：ref object 和 proxy

笔试题 1：下面的代码输出结果是什么？

```javascript
import { reactive, readonly, ref, computed } from "vue";

const state = reactive({
  firstName: "Xu Ming",
  lastName: "Deng",
});
const fullName = computed(() => {
  console.log("changed");
  return `${state.lastName}, ${state.firstName}`;
});
console.log("state ready");
console.log("fullname is", fullName.value);
console.log("fullname is", fullName.value); //计算属性有缓存
const imState = readonly(state);
console.log(imState === state); //false

const stateRef = ref(state);
console.log(stateRef.value === state); //如果已经是代理，则直接使用代理

state.firstName = "Cheng";
state.lastName = "Ji"; //改了数据，计算属性还是不允许，得等到用到.value的时候才运行

console.log(imState.firstName, imState.lastName);
console.log("fullname is", fullName.value);
console.log("fullname is", fullName.value);

const imState2 = readonly(stateRef);
console.log(imState2.value === stateRef.value); //代理有区别，一个可改一个不可改
```

笔试题 2：按照下面的要求完成函数

```javascript
function useUser() {
  // 在这里补全函数
  return {
    user, // 这是一个只读的用户对象，响应式数据，默认为一个空对象
    setUserName, // 这是一个函数，传入用户姓名，用于修改用户的名称
    setUserAge, // 这是一个函数，传入用户年龄，用户修改用户的年龄
  };
}
```

答案

```javascript
import { readonly, reactive } from "vue";

function useUser() {
  // 在这里补全函数
  const userOrigin = reactive({}); //原始的可以改
  const user = readonly(userOrigin); //只读了
  const setUserName = (name) => {
    //运用reactive巧妙的避开了只读不能改
    userOrigin.name = name; //通过原始来改
  };
  const setUserAge = (age) => {
    userOrigin.age = age;
  };
  return {
    user, // 这是一个只读的用户对象，响应式数据，默认为一个空对象
    setUserName, // 这是一个函数，传入用户姓名，用于修改用户的名称
    // 难点：只读了，咋改
    setUserAge, // 这是一个函数，传入用户年龄，用户修改用户的年龄
  };
}

const { user, setUserName, setUserAge } = useUser();

console.log(user);
setUserName("monica");
setUserAge(18);
console.log(user);
```

笔试题 3：响应式防抖

```javascript
function useDebounce(obj, duration) {
  // 在这里补全函数
  return {
    value, // 这里是一个只读对象，响应式数据，默认值为参数值
    setValue, // 这里是一个函数，传入一个新的对象，需要把新对象中的属性混合到原始对象中，混合操作需要在duration的时间中防抖
  };
}
```

答案

```javascript
import { reactive, readonly } from "vue";

function useDebounce(obj, duration) {
  // 在这里补全函数
  const valueOrigin = reactive(obj);
  const value = readonly(valueOrigin);
  let timer = null;
  const setValue = (newValue) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("值改变了");
      Object.entries(newValue).forEach(([k, v]) => {
        valueOrigin[k] = v;
      });
    }, duration);
  };
  return {
    value, // 这里是一个只读对象，响应式数据，默认值为参数值
    setValue, // 这里是一个函数，传入一个新的对象，需要把新对象中的属性混合到原始对象中，混合操作需要在duration的时间中防抖
  };
}

const { value, setValue } = useDebounce({ a: 1, b: 2 }, 5000);

window.value = value;
window.setValue = setValue;
```

### 监听数据变化

**watchEffect**

> **自动收集依赖，依赖改变时候自动收集**

```javascript
const stop = watchEffect(() => {
  // 该函数会立即执行，然后追中函数中用到的响应式数据，响应式数据变化后会再次执行
});

// 通过调用stop函数，会停止监听
stop(); // 停止监听
```

```javascript
import { reactive, ref, watchEffect } from "vue";

const state = reactive({ a: 1, b: 2 });
const count = ref(0);

watchEffect(() => {
  console.log(state.a, count.value); //都是响应式的
}); //watchEffect马上执行一次
// state.b++;//不变，因为不依赖b，不运行get
state.a++;
state.a++;
state.a++;
state.a++;
state.a++;
count.value++;
count.value++;
count.value++;
count.value++;
// 异步的，会进入微队列，数据改变完成后才运行，所以只会运行一次 6 4
```

**watch**

```javascript
import { reactive, ref, watch } from "vue";

const state = reactive({ a: 1, b: 2 });
const count = ref(0);

// eg1
// watch(state.a, (newValue, oldValue) => {//不会依赖，直接就把state.a读出来了
//   console.log('new', newValue, 'old', oldValue)
// })
// eg2
// watch(() => state.a, (newValue, oldValue) => {//函数是在watch里面调用，收集依赖
//   console.log('new', newValue, 'old', oldValue)
// })
// eg3
// watch([() => count.value], (newValue, oldValue) => {
//   console.log('new', newValue, 'old', oldValue)
// })
// eg4
// watch(count, (newValue, oldValue) => {//count可以直接这样写，因为count是对象。不能.value,如果.value就相当于给了0
//   console.log('new', newValue, 'old', oldValue)
// })
watch([() => state.a, count], () => {
  console.log("变化了");
});

count.value++;
state.a++;
```

```javascript
// 等效于vue2的$watch
// 不同于watchEffect  不会立即执行
// 监听单个数据的变化
const state = reactive({ count: 0 });
watch(
  () => state.count,
  (newValue, oldValue) => {
    // ...
  },
  options
);

const countRef = ref(0);
watch(
  countRef,
  (newValue, oldValue) => {
    // ...
  },
  options
);

// 监听多个数据的变化
watch([() => state.count, countRef], ([new1, new2], [old1, old2]) => {
  // ...
});
```

**注意：无论是**`watchEffect`**还是**`watch`**，当依赖项变化时，回调函数的运行都是异步的（微队列）**

应用：除非遇到下面的场景，否则均建议选择`watchEffect`

- 不希望回调函数一开始就执行
- 数据改变时，需要参考旧值
- 需要监控一些回调函数中不会用到的数据

```javascript
import { reactive, ref, watch } from "vue";

const state = reactive({ a: 1, b: 2 });
const count = ref(0);

watch([() => state.a, count], () => {
  //第二个参数：数据变化的时候运行回调函数
  console.log("变化了");
}); //不同于watchEffect,一开始不允许，要加上一个配置：{immediate:true}才会直接运行
count.value++;
state.a++;
```

笔试题: 下面的代码输出结果是什么？

```javascript
import { reactive, watchEffect, watch } from "vue";
const state = reactive({
  count: 0,
});
watchEffect(() => {
  //立即执行
  console.log("watchEffect", state.count); //自动收集依赖
});
watch(
  //不会立即执行
  () => state.count, //手动告诉他收集的依赖是state.count
  (count, oldCount) => {
    console.log("watch", count, oldCount);
  }
);
console.log("start");
setTimeout(() => {
  //宏队列
  console.log("time out");
  state.count++;
  state.count++; //这次为准
});
state.count++;
state.count++; //这两个++导致了watchEffect，watch检测到了变化，进入了微队列

console.log("end");
```

![](../public/vue/2023-02-01-15-25-57.png)

### 判断

| API          | 含义                                                                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isProxy`    | 判断某个数据是否是由`reactive`或`readonly`                                                                                                                         |
| `isReactive` | 判断某个数据是否是通过`reactive`创建的.详细:[https://v3.vuejs.org/api/basic-reactivity.html#isreactive](https://v3.vuejs.org/api/basic-reactivity.html#isreactive) |
| `isReadonly` | 判断某个数据是否是通过`readonly`创建的                                                                                                                             |
| `isRef`      | 判断某个数据是否是一个`ref`对象                                                                                                                                    |

### 转换

**unref**
等同于：`isRef(val) ? val.value : val`
应用：

```javascript
function useNewTodo(todos) {
  todos = unref(todos);
  // ...
}
```

**toRef**
得到一个响应式对象某个属性的 ref 格式

```javascript
const state = reactive({
  foo: 1,
  bar: 2,
});

const fooRef = toRef(state, "foo"); // fooRef: {value: ...}

fooRef.value++;
console.log(state.foo); // 2

state.foo++;
console.log(fooRef.value); // 3
```

**toRefs**
把一个响应式对象的所有属性转换为 ref 格式，然后包装到一个`plain-object`中返回

```javascript
const state = reactive({
  foo: 1,
  bar: 2,
});

const stateAsRefs = toRefs(state);
/*
stateAsRefs: not a proxy
{
  foo: { value: ... },
  bar: { value: ... }
}
*/
```

应用：

```javascript
setup(){
  const state1 = reactive({a:1, b:2});
  const state2 = reactive({c:3, d:4});
  return {
    ...state1, // lost reactivity 展开剂运算符让他失去了响应式
    ...state2 // lost reactivity
  }
}

setup(){
  const state1 = reactive({a:1, b:2});
  const state2 = reactive({c:3, d:4});
  return {
    ...toRefs(state1), // reactivity
    ...toRefs(state2) // reactivity
  }
}
// composition function
function usePos(){
  const pos = reactive({x:0, y:0});
  return pos;
}

setup(){
  const {x, y} = usePos(); // lost reactivity
  const {x, y} = toRefs(usePos()); // reactivity
}
```

### 降低心智负担

所有的`composition function`均以`ref`的结果返回，以保证`setup`函数的返回结果中不包含`reactive`或`readonly`直接产生的数据

```javascript
function usePos(){
  const pos = reactive({ x:0, y:0 });
  return toRefs(pos); //  {x: refObj, y: refObj}
}
function useBooks(){
  const books = ref([]);
  return {
    books // books is refObj
  }
}
function useLoginUser(){
  const user = readonly({
    isLogin: false,
    loginId: null
  });
  return toRefs(user); // { isLogin: refObj, loginId: refObj }  all ref is readonly
}

setup(){
  // 在setup函数中，尽量保证解构、展开出来的所有响应式数据均是ref
  return {
    ...usePos(),
    ...useBooks(),
    ...useLoginUser()
  }
}
```
