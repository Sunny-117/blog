# Vue3 数据响应原理

- Vue3.x 响应式数据原理是什么？
- Proxy 只会代理对象的第一层，那么 Vue3 又是怎样处理这个问题的呢？
- 监测数组的时候可能触发多次 get/set，那么如何防止触发多次呢？

## **_Vue3.x_ 响应式数据原理是什么？**

在 _Vue 2_ 中，响应式原理就是使用的 _Object.defineProperty_ 来实现的。但是在 _Vue 3.0_ 中采用了 _Proxy_，抛弃了 _Object.defineProperty_ 方法。

究其原因，主要是以下几点：

- _Object.defineProperty_ 无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应
- _Object.defineProperty_ 只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。_Proxy_ 可以劫持整个对象，并返回一个新的对象。
- _Proxy_ 不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。
- _Proxy_ 有多达 _13_ 种拦截方法
- *Proxy*作为新标准将受到浏览器厂商重点持续的性能优化

## **_Proxy_ 只会代理对象的第一层，那么 _Vue3_ 又是怎样处理这个问题的呢？**

判断当前 _Reflect.get_ 的返回值是否为 _Object_，如果是则再通过 _reactive_ 方法做代理， 这样就实现了深度观测。

## **监测数组的时候可能触发多次 _get/set_，那么如何防止触发多次呢？**

我们可以判断 _key_ 是否为当前被代理对象 _target_ 自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行 _trigger_。

## 源码实现


## ReactivityApi

> reactivity api: [https://v3.vuejs.org/api/reactivity-api](https://v3.vuejs.org/api/reactivity-api)

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
