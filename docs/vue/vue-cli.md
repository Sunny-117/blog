# vue-cli 到底帮我们做了什么

## vue-cli 中的工程化

1.  vue.js：vue-cli 工程的核心，主要特点是双向数据绑定和组件系统。
2.  vue-router：vue 官方推荐使用的路由框架。
3.  vuex：专为 Vue.js 应用项目开发的状态管理器，主要用于维护 vue 组件间共用的一些 变量 和 方法。
4.  axios（或者 fetch、ajax）：用于发起 GET 、或 POST 等 http 请求，基于 Promise 设计。
5.  vux 等：一个专为 vue 设计的移动端 UI 组件库。
6.  webpack：模块加载和 vue-cli 工程打包器。
7.  eslint：代码规范工具

## **_vue-cli_ 工程常用的 _npm_ 命令有哪些？**

下载 node_modules 资源包的命令：npm install

启动 vue-cli 开发环境的 npm 命令：npm run dev

vue-cli 生成 生产环境部署资源 的 npm 命令：npm run build

用于查看 vue-cli 生产环境部署资源文件大小的 npm 命令：npm run build --report
