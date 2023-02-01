# Vue 生命周期

## 创建 vue 实例和创建组件的流程基本一致

1. 首先做一些初始化的操作，主要是设置一些私有属性到实例中
2. **运行生命周期钩子函数**`beforeCreate`
3. 进入注入流程：处理属性、computed、methods、data、provide、inject，最后使用代理模式将它们挂载到实例中

data 为例：

```javascript
function Vue(options) {
  var data = options.data();
  observe(data); // 变成响应式数据
  var methods = options.methods; //直接赋值
  Object.defineProperty(this, "a", {
    get() {
      return data.a;
    },
    set(val) {
      data.a = val;
    },
  });

  Object.entries(methods).forEach(([methodName, fn]) => {
    this[methodName] = fn.bind(this); //拿到每一个methods
    // bind绑定，使得在vue里，this始终指向vue实例
  });

  var updateComponent = () => {
    this._update(this._render());
  };

  new Watcher(updateComponent);
}

new Vue(vnode.componentOptions);
```

4. **运行生命周期钩子函数**`created`
5. 渲染：生成`render`函数：如果有配置，直接使用配置的`render`，如果没有，使用运行时编译器，把模板编译为`render`
6. **运行生命周期钩子函数**`beforeMount`
7. 创建一个`Watcher`，传入一个函数`updateComponent`，该函数会运行`render`，把得到的`vnode`再传入`_update`函数执行。
   在执行`render`函数的过程中，会收集所有依赖，将来依赖变化时会重新运行`updateComponent`函数
   在执行`_update`函数的过程中，触发`patch`函数，由于目前没有旧树，因此直接为当前的虚拟 dom 树的每一个普通节点生成 elm 属性，即真实 dom。
   如果遇到创建一个组件的 vnode，则会进入组件实例化流程，该流程和创建 vue 实例流程基本相同，递归，最终会把创建好的组件实例挂载 vnode 的`componentInstance`属性中，以便复用。
8. **运行生命周期钩子函数**`mounted`

:::tip Vue 父子组件挂载顺序
![](../public/vue/2023-02-01-14-30-58.png)
:::

## 重渲染？

1. 数据变化后，所有依赖该数据的`Watcher`均会重新运行，这里仅考虑`updateComponent`函数对应的`Watcher`
2. `Watcher`会被调度器放到`nextTick`中运行，也就是微队列中，这样是为了避免多个依赖的数据同时改变后被多次执行
3. 运行生命周期钩子函数`beforeUpdate`
4. `updateComponent`函数重新执行

- 在执行`render`函数的过程中，会去掉之前的依赖，重新收集所有依赖，将来依赖变化时会重新运行`updateComponent`函数
- 在执行`_update`函数的过程中，触发`patch`函数。
- 新旧两棵树进行对比。
- 普通`html`节点的对比会导致真实节点被创建、删除、移动、更新
- 组件节点的对比会导致组件被创建、删除、移动、更新
- 当新组件需要创建时，进入实例化流程
- 当旧组件需要删除时，会调用旧组件的`$destroy`方法删除组件，该方法会先触发生命周期钩子函数`beforeDestroy`，然后递归调用子组件的`$destroy`方法，然后触发生命周期钩子函数- `destroyed`
- 当组件属性更新时，相当于组件的`updateComponent`函数被重新触发执行，进入重渲染流程，和本节相同。

5. **运行生命周期钩子函数**`updated`

:::tip Vue 父子组件重新渲染顺序
![](../public/vue/2023-02-01-14-26-02.png)
:::

## 总体流程

![](../public/vue/2023-02-01-14-22-04.png)
