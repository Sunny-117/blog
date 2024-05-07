# 主题切换

**思路：**

前端主题切换，其实就是切换 css

而且，css 中变换最大的，就是颜色相关的属性，图片，icon....

## 前端工程中样式切换的解决方案

**1、css 变量 + css 样式【data-set [data-name='dark']】class='dark'**

```javascript
.primary{

  --vt-c-bg:#fff;
}

.dark{
  --vt-c-bg:#000
}

可以使用js，点击某个按钮之后，切换根元素的css样式，样式切换之后，意味着css变量的值改变了
.layer{
  background-color:var(--vt-c-bg);
}
```

css 变量，是当我们点击某个按钮的时候做切换，可能如果变换比较大内容较多，会出现白屏的情况

**2、css 预处理器(scss,less,styuls...) + css 样式 [data-set]**

就是使用 css 预处理器强大的预编译功能，简单来说，就是把 css 先写好

```javascript
html.primary .layer{
  color:#fff
}

html.dark .layer{
  color:#000
}
html.primary .container{}

html.dark .container{}

html.primary .link:hover{}
html.dark .link:hover{}
```

css 预编译器，一开始，把所有的主题样式涉及到的内容全部写好，当切换的时候，就直接切换了

这种的方式，可能牺牲的是，一开始的白屏时间

## 通过 css 变量实现主题切换及工程化处理

### 使用持久化存储

**1、安装 pinia 和持久化插件**

```js
npm install pinia pinia-plugin-persistedstate
```

**2、创建 pinia**

```javascript
//stores/index.ts
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

// pinia persist
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
```

**3、main.ts 中引用**

```javascript
import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
// pinia store
import pinia from "@/stores";

createApp(App).use(pinia).mount("#app");
```

**4、设置 pinia 持久化配置**

```javascript
// config/piniaPersist.ts
import { PersistedStateOptions } from "pinia-plugin-persistedstate";

/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {Array} paths 需要持久化的 state name
 * @return persist
 * */
const piniaPersistConfig = (key: string, paths?: string[]) => {
  const persist: PersistedStateOptions = {
    key,
    storage: localStorage,
    // storage: sessionStorage,
    paths,
  };
  return persist;
};

export default piniaPersistConfig;
```

**5、创建 global.ts**

```javascript
import { defineStore } from "pinia";
import piniaPersistConfig from "@/config/piniaPersist";
import { GlobalState, ObjToKeyValArray } from "@/stores/interface";

export const useGlobalStore = defineStore({
  id: "dy-global",
  // 修改默认值之后，需清除 localStorage 数据
  state: (): GlobalState => ({
    // 深色模式
    isDark: false,
  }),
  persist: piniaPersistConfig("dy-global"),
});
```

**6、设置 actions 统一的的函数**

```diff
import { defineStore } from "pinia";
import piniaPersistConfig from "@/config/piniaPersist";
import { GlobalState,ObjToKeyValArray } from "@/stores/interface";

export const useGlobalStore = defineStore({
  id: "dy-global",
  // 修改默认值之后，需清除 localStorage 数据
  state: ():GlobalState => ({
    // 深色模式
    isDark: false,
  }),
+  actions: {
+    // Set GlobalState
+    setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
+      this.$patch({ [args[0]]: args[1] });
+    }
+  },
  persist: piniaPersistConfig("dy-global")
});
```

**7、setGlobalState 函数参数的设定**

```javascript
export interface GlobalState {
  isDark: boolean;
}
export type ObjToKeyValArray<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];
```

**8、修改 useTheme**

```javascript
import { useGlobalStore } from "@/stores/modules/global";
import { storeToRefs } from "pinia";

export const useTheme = () => {

  const globalStore = useGlobalStore();
  const { isDark } = storeToRefs(globalStore);

  const switchTheme = (init?: Boolean) => {
    if (!init) {
      globalStore.setGlobalState("isDark", !isDark.value);
    }
    const html = document.documentElement as HTMLElement;
    console.log(isDark.value)
    if (isDark.value) html.setAttribute("class", "dark");
    else html.setAttribute("class", "primary");
  }

  const initTheme = () => {
    switchTheme(true);
  };


  return {
    switchTheme,
    initTheme
  }
}
```

**9、界面调用**

```javascript
import { useTheme } from "@/hooks/useTheme";
const { initTheme, switchTheme } = useTheme();

initTheme();

const modeSwitch = () => {
  // const theme = document.documentElement.className
  // document.documentElement.className = theme === 'primary' ? 'dark' : 'primary'
  switchTheme();
};
```

## 跟随系统主题

首先，使用[媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme)，可以实现跟随系统主题的效果,其实只有**light**和**dark**两种颜色

```javascript
body{
  margin: 0;
  padding: 0;
}

.container{
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: auto;
  transition:color .5s, background-color .5s;
  color:#000;
  background-color:#fff;
}
.layout{
  display: flex;
  justify-content: center;
}

.layer{
  width: 300px;
  height: 300px;
  padding: 8px;
  margin: 10px;
  border:1px solid #000;
}
@media (prefers-color-scheme: dark) {
  .container{
    color:#fff;
    background-color:#000;
  }
  .layer{
    border:1px solid #fff;
  }
}
```

我们可以通过[api - window.matchMedia](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/matchMedia)，来获取**当前系统主题是深色还是浅色**

```javascript
window.matchMedia("(prefers-color-scheme: dark)");
```

有了这个 API，我们完全就没必要修改之前的 css 代码，直接 js 判断

```javascript
const media = window.matchMedia("(prefers-color-scheme: dark)");

const followSystem = () => {
  if (media.matches) {
    document.documentElement.className = "dark";
  } else {
    document.documentElement.className = "primary";
  }
};

followSystem();

media.addEventListener("change", followSystem);
```

直接在 vue3 项目中处理，添加界面系统主题图标，点击激活图标，表示激活跟随系统主题

**1、添加图标**

```html
<button>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    role="img"
  >
    <circle cx="8" cy="8" r="7.25" stroke="#5B5B66" stroke-width="1.5" />
    <mask
      id="a"
      style="mask-type:alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="16"
      height="16"
    >
      <circle
        cx="8"
        cy="8"
        r="7.25"
        fill="#5B5B66"
        stroke="#5B5B66"
        stroke-width="1.5"
      />
    </mask>
    <g mask="url(#a)">
      <path fill="#5B5B66" d="M0 0h8v16H0z" />
    </g>
  </svg>
</button>

css .os-default{ background-color: transparent; border: none; padding: 0; color:
var(--main-color); display: flex; justify-content: center; align-items: center;
width: 20px; height: 20px; } .os-default-active{ background-color: transparent;
border: 1px dotted var(--main-color); padding: 0px; color: var(--main-color);
display: flex; justify-content: center; align-items: center; width: 20px;
height: 20px; }
```

**2、仓库添加属性**

```diff
export const useGlobalStore = defineStore({
  id: "dy-global",
  state: () => ({
    // 深色模式
    isDark: false,
+    // 系统颜色是否被激活
+    osThemeActive: false
  }),
  getters: {},
  actions: {
    // Set GlobalState
    setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
      this.$patch({ [args[0]]: args[1] });
    }
  },
  persist: piniaPersistConfig("dy-global")
});
```

添加了属性，就必须修改 GlobalState 的 ts 配置

```diff
export interface GlobalState {
  isDark: boolean;
+  osThemeActive: boolean;
}
export type ObjToKeyValArray<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];
```

**3、点击修改 css 样式**

```javascript
import { useTheme } from '@/hooks/useTheme'
import { useGlobalStore } from "@/stores/modules/global";

const globalStore = useGlobalStore();

const {initTheme,switchTheme,activeOSTheme} = useTheme();

initTheme();

const modeSwitch = () => {
  switchTheme()
}

const osThemeSwitch = () => {
  activeOSTheme();
}

//html
<button :class="globalStore.osThemeActive ? 'os-default-active' : 'os-default'">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" role="img" @click="osThemeSwitch">
	......省略
  </svg>
</button>
```

**4、修改 useTheme.ts**

```javascript
import { useGlobalStore } from "@/stores/modules/global";
import { storeToRefs } from "pinia";
import { watchEffect } from "vue";

const media = window.matchMedia('(prefers-color-scheme: dark)');

export const useTheme = () => {
  const globalStore = useGlobalStore();
  const { isDark,osThemeActive } = storeToRefs(globalStore);

  const switchTheme = (init?: Boolean) => {
    //init参数为true时，表示是初始化页面或者直接跟随系统主题
    //这个时候不需要手动切换明暗主题，也不需要将跟随系统主题设置为false
    if (!init) {
      globalStore.setGlobalState("isDark", !isDark.value);
      //如果是直接点击切换明暗主题，那么跟随系统主题激活切换为false
      globalStore.setGlobalState("osThemeActive", false);
    }
    const html = document.documentElement as HTMLElement;

    if (isDark.value) html.setAttribute("class", "dark");
    else html.setAttribute("class", "primary");
  }


  //点击激活需要改变osThemeActive的值
  const activeOSTheme = () => {
    globalStore.setGlobalState("osThemeActive", !osThemeActive.value);
    followSystem();
  }

  const followSystem = () => {
    const isOsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //跟随系统主题设置明暗
    globalStore.setGlobalState("isDark", isOsDark);
    switchTheme(true);
  }

  watchEffect(() => {
    //系统主题切换，需要监听change事件
    if (osThemeActive.value) {
      media.addEventListener('change', followSystem);
    }
    else {
      media.removeEventListener('change', followSystem);
    }
  })

  const initTheme = () => {
    switchTheme(true);
  };

  return {
    switchTheme,
    initTheme,
    activeOSTheme
  }
}
```

> 所有源码均在：https://github.com/Sunny-117/blog/tree/main/code/theme-switch
