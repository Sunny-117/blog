# vue 手写篇

## 实现一个迷你版的reactivity

```js
let activeEffect = undefined;
const targetMap = new WeakMap();

const effect = function (fn) {
    activeEffect = fn;
    fn();
}

const track = function (target, key) {
    const dep = targetMap.get(target) || new Map();
    const funcs = dep.get(key) || new Set();
    funcs.add(activeEffect);
    dep.set(key, funcs);
    targetMap.set(target, dep);
}

const trigger = function (target, key) {
    const dep = targetMap.get(target);
    if (dep && dep.get(key)) {
        dep.get(key).forEach(fn => fn());
    }
}

const reactive = function (target) {
    return new Proxy(target, {
        get(target, key, reciever) {
            track(target, key);
            return Reflect.get(target, key, reciever);
        },
        set(target, key, value, reciever) {
            Reflect.set(target, key, value, reciever);
            trigger(target, key);
        }
    });
}

const person = {
    firstName: 'Lu',
    lastName: 'xun',
    get name() {
        return this.firstName + this.lastName;
    }
}

const proxy = reactive(person);

effect(() => {
    console.log('effect1', proxy.name)
});
effect(() => {
    console.log('effect2', proxy.name)
});

proxy.firstName = 'Zhang';
```



## 实现一个observer方法——要监听的对象属性可配置

```js
// 实现一个observer方法——要监听的对象属性可配置
// https://juejin.cn/post/7114588899661316126
function observer(obj, path, cb) {
    path.forEach((key) => {
        let value = "";
        if (key) {
            const _key = key.split(".");
            if (_key.length > 1) {
                let tmp = obj;
                // 循环，为了取到属性值，不断地赋值给 tmp
                _key.forEach((k) => {
                    // 递归，对每一个层级都进行劫持，要不然无法监听到深层级的属性值变化
                    observer(tmp, [k], cb);
                    tmp = tmp[k];
                });
                value = tmp;
            } else {
                value = obj[key];
            }

            Object.defineProperty(obj, key, {
                get() {
                    return value;
                },
                set(newV) {
                    if (newV !== value) {
                        cb && cb(newV, value);
                        value = newV;
                    }
                },
            });
        }
    });
}

var o = {
    a: 1,
    b: 2,
    c: {
        x: 1,
        y: 2,
    },
};

observer(o, ['a', "c.x"], (v, prev) => {
    console.log("newV=", v, " oldV=", prev);
});

o.a = 2; // 2, 1
o.b = 3; // 不打印
o.c.x = 3; // 3, 1
o.c.y = 3; // 没有没监听，不打印
```


## 手写vue的patch方法

```js
//简单实现vue的更新方法，递归实现
function update(obj, key, value) {
    if (typeof obj !== 'object' || obj === null) {
        return;
    }
    // 递归遍历对象属性
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (typeof obj[prop] === 'object') {
                update(obj[prop], key, value); // 递归调用更新方法
            } else if (prop === key) {
                obj[prop] = value; // 更新属性值
            }
        }
    }
}

// 示例用法
const data = {
    name: 'John',
    age: 30,
    address: {
        city: 'New York',
        state: 'NY',
        country: 'USA'
    }
};

console.log('Before update:', data);
update(data, 'city', 'San Francisco');
console.log('After update:', data);
```

## 模板字符串解析

```js
let template = "我是{{name}}，年龄{{age}}，性别{{sex}}，子姓名:{{nest.subName}}";
let data = {
    name: "姓名1",
    age: 18,
    nest: {
        subName: '姓名1-1'
    }
};

function render(template, data) {
    return template.replace(/\{\{(.+?)\}\}/g, function (match, key) {
        const keys = key.split('.'); // Split the key by dot to handle nested properties
        let value = data;

        // Traverse the nested properties
        for (const k of keys) {
            value = value[k];
            if (value === undefined) {
                break; // Stop if any intermediate property is undefined
            }
        }

        return value !== undefined ? value : '';
    });
}

console.log(render(template, data));
// Output: 我是姓名1，年龄18，性别，子姓名:姓名1-1

```

## vue2发布订阅响应式实现

```js
function isObject(val) {
  return val !== null && !Array.isArray(val) && typeof val === "object";
}

function observe(obj) {
  if (!isObject(obj)) {
    return;
  }
  Object.keys(obj).forEach((key) => {
    var dep = new Dep();
    // 重新定义属性
    var internalValue = obj[key]; // 缓存该属性的值
    observe(internalValue); // 递归监听该属性
    Object.defineProperty(obj, key, {
      get() {
        dep.depend(); // 看一下，是哪个函数用到了我这个属性，将该函数记录下来
        return internalValue;
      },
      set(val) {
        observe(val);
        internalValue = val;
        dep.notify(); // 通知所有用到我这个属性的函数，全部重新运行
      },
    });
  });
}

function Dep() {
  this.subscribes = new Set(); // 用于记录依赖
}

Dep.prototype.depend = function () {
  if (activeUpdate) {
    this.subscribes.add(activeUpdate);
  }
};

Dep.prototype.notify = function () {
  this.subscribes.forEach((fn) => fn());
};

var activeUpdate = null; // 当前正在收集依赖的函数

function autorun(fn) {
  function updateWrapper() {// 防止后面的依赖收集不到，所以谈一层函数 
    activeUpdate = updateWrapper;
    fn(); // 该函数的运行期间，activeUpdate一定有值
    activeUpdate = null;
  }
  updateWrapper();
}

var state = {
  name: "monica",
  age: 18,
  addr: {
    province: "黑龙江",
    city: "哈尔滨",
  },
};

observe(state);

autorun(() => {
  state.age;
  state.name
  console.log('autorun')
});

state.age = 19;
state.name = "sunny-117";
// state.addr.province = "四川";
// state.addr.city = "成都";

// 设置没有的属性，删除属性监控不到，所以要用$set,$delete
```