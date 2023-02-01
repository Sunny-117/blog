# 探索 v-model 原理

`v-model`即可以作用于表单元素，又可作用于自定义组件，无论是哪一种情况，它都是一个语法糖，最终会生成一个属性和一个事件

**当其作用于表单元素时**，`vue`会**根据作用的表单元素类型而生成合适的属性和事件**。例如，作用于普通文本框的时候，它会生成`value`属性和`input`事件，而当其作用于单选框或多选框时，它会生成`checked`属性和`change`事件。

`v-model`也可作用于自定义组件，**当其作用于自定义组件时**，默认情况下，它会生成一个`value`属性和`input`事件。

```html
<Comp v-model="data" />
<!-- 等效于 -->
<Comp :value="data" @input="data=$event" />
```

开发者可以通过组件的`model`配置来改变生成的属性和事件

```javascript
// Comp
const Comp = {
  model: {
    prop: "number", // 默认为 value
    event: "change", // 默认为 input
  },
  // ...
};
```

```html
<Comp v-model="data" />
<!-- 等效于 -->
<Comp :number="data" @change="data=$event" />
```

## 总结

首先要对数据进行劫持监听，所以我们需要设置一个监听器 _Observer_，用来监听所有属性。如果属性发上变化了，就需要告诉订阅者 _Watcher_ 看是否需要更新。

因为订阅者是有很多个，所以我们需要有一个消息订阅器 _Dep_ 来专门收集这些订阅者，然后在监听器 _Observer_ 和订阅者 _Watcher_ 之间进行统一管理的。

接着，我们还需要有一个指令解析器 _Compile_，对每个节点元素进行扫描和解析，将相关指令对应初始化成一个订阅者 _Watcher_，并替换模板数据或者绑定相应的函数，此时当订阅者 _Watcher_ 接收到相应属性的变化，就会执行对应的更新函数，从而更新视图。

因此接下去我们执行以下 _3_ 个步骤，实现数据的双向绑定：

1.  实现一个监听器 _Observer_，用来劫持并监听所有属性，如果有变动的，就通知订阅者。

2.  实现一个订阅者 _Watcher_，可以收到属性的变化通知并执行相应的函数，从而更新视图。

3.  实现一个解析器 _Compile_，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。

![](https://img-blog.csdnimg.cn/img_convert/717034f25ee385b09e9dee53b2988cae.png#id=bgTeC&originHeight=530&originWidth=720&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
