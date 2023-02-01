# HTML5

## 大纲

### 新增的属性

- placeholder
- Calendar, date, time, email, url, search
- ContentEditable
- Draggable
- Hidden
- Content-menu
- Data-Val(自定义属性)

### 新增的标签

- 语义化标签
- canvas
- svg
- Audio(声音播放)
- Video(视频播放)

### API

- 移动端网页开发一般指的是 h5
- 定位（需要地理位置的功能）
- 重力感应（手机里面的陀螺仪（微信摇一摇，赛车转弯））
- request-animation-frame（动画优化）
- History 历史界面（控制当前页面的历史记录）
- LocalStorage（本地存储，电脑/浏览器关闭都会保留）；SessionStorage，（会话存储：窗口关闭就消失）。 都是存储信息（比如历史最高记录）
- WebSocket（在线聊天，聊天室）
- FileReader(文件读取，预览图)
- WebWoker（文件的异步，提升性能，提升交互体验）
- Fetch（传说中要替代 AJAX 的东西）

## 属性篇\_input 新增 type

### 1.placeholder

```html
<input type="text" placeholder="用户名/手机/邮箱" />
<input type="password" placeholder="请输入密码" />
```

### 2.input 新增 type

以前学的

```html
<input type="radio" />
<input type="checkbox" />
<input type="file" />
```

input 新增 type

```html
<form>
  <!-- Calendar类 -->
  <input type="date" /><!-- 不常用原因之一：chrome支持，Safari,IE不支持 -->
  <input type="time" /><!-- 不常用原因之一：chrome支持，Safari,IE不支持 -->
  <input
    type="week"
  /><!-- 第几周  不常用原因之一：chrome支持，Safari,IE不支持 -->
  <input
    type="datetime-local"
  /><!-- 不常用原因之一：chrome支持，Safari,IE不支持 -->
  <br />
  <input
    type="number"
  /><!-- 限制输入，仅数字可以。不常用原因之一：chrome支持，Safari,IE不支持-->
  <input
    type="email"
  /><!-- 邮箱格式 不常用原因之一：chrome，火狐支持，Safari,IE不支持-->
  <input
    type="color"
  /><!-- 颜色选择器 不常用原因之一：chrome支持，Safari,IE不支持-->
  <input
    type="range"
    min="1"
    max="100"
    name="range"
  /><!-- chrome,Safar支持 ，火狐，IE不支持-->
  <input
    type="search"
    name="search"
  /><!-- 自动提示历史搜索.chrome支持,Safar支持一点,IE不支持 -->
  <input type="url" /><!-- chrome，火狐支持,Safar,IE不支持 -->

  <input type="submit" />
</form>
```

## ContentEditable

```html
<div>Panda</div>
```

想修改内容
原生方法：增加点击事件修改
新方法

```html
<div contenteditable="true">Panda</div>
```

默认值 false,没有兼容性问题,可以继承(包裹的子元素),可以覆盖(后来设置的覆盖前面设置的)
常见误区：

```html
<div contenteditable="true">
  <span contenteditable="false">姓名：</span>Panda<br />
  <span contenteditable="false">姓别：</span>男<br />
  <!-- 会导致删除br等标签 -->
</div>
```

总结：实战开发可用属性:contenteditable, placeholder

## 标签篇\_语义化标签

全是 div，只是语义化

```html
<header></header>
<footer></footer>
<nav></nav>
<article></article>
<!--文章，可以直接被引用拿走的-->
<section></section>
<!--段落结构，一般section放在article里面-->
<aside></aside>
<!--侧边栏-->
```

## audio 与 video 播放器

```html
<audio src="" controls></audio> <video src="" controls></video>
```

以上：太丑，不同浏览器不统一

## 视频播放器

加载不出来[https://blog.csdn.net/qq_40340478/article/details/108309492](https://blog.csdn.net/qq_40340478/article/details/108309492)

只有 http 协议中视频资源带有 Content-Range 属性，才能设置时间进行跳转

```html
var express = require("express"); var app = new express();
app.use(express.static('./')); app.listen(12306); // 如果不能改变进度条
就用第36节的黑科技 访问127.0.0.1：12306/test.html
```

## geolocation

```html
<script>
  // 获取地理信息
  // 一些系统，不支持这个功能
  // GPS定位。台式机几乎都没有GPS，笔记本大多数没有GPS，智能手机几乎都有GPS
  // 网络定位 来粗略估计地理位置
  window.navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log("======"); //成功的回调函数
      console.log(position);
    },
    function () {
      //失败的回调函数
      console.log("++++++");
    }
  );
  //可以访问的方式：https协议，file协议，http协议下不能获取
  // 经度最大值180，纬度最大值90
</script>
```

https 还是不能访问：

1. 谷歌浏览器打开谷歌地图，无法定位
2. 利用翻墙可以实现

## 四行写个服务器

手机访问电脑
sever.js
npm init
npm i express

```css
var express = require('express');
var app = new express();
app.use(express.static("./page"));
app.listen(12306);//端口号大于8000或者等于80
// 默认访问80端口，express默认访问index.html
想访问里面的hello.html
127.0.0.1:12306
127.0.0.1:12306/hello.html
```

[test.7z](https://www.yuque.com/attachments/yuque/0/2021/7z/758572/1617067665261-d6d3b643-13da-4ef6-a025-83d4c05424f1.7z?_lake_card=%7B%22src%22%3A%22https%3A%2F%2Fwww.yuque.com%2Fattachments%2Fyuque%2F0%2F2021%2F7z%2F758572%2F1617067665261-d6d3b643-13da-4ef6-a025-83d4c05424f1.7z%22%2C%22name%22%3A%22test.7z%22%2C%22size%22%3A343473%2C%22type%22%3A%22%22%2C%22ext%22%3A%227z%22%2C%22source%22%3A%22%22%2C%22status%22%3A%22done%22%2C%22mode%22%3A%22title%22%2C%22download%22%3Atrue%2C%22uid%22%3A%221617067631734-0%22%2C%22progress%22%3A%7B%22percent%22%3A99%7D%2C%22percent%22%3A0%2C%22id%22%3A%22LT1aO%22%2C%22card%22%3A%22file%22%7D)
命令框或者 vscode 客户端，进入项目路径，node server.js

## deviceorientation

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>document</title>
    <link rel="stylesheet" href="" />
  </head>
  <body>
    <div id="main"></div>
    <script>
      // 陀螺仪,只有支持陀螺仪的设备才支持体感
      // 苹果设备的页面只有在https协议下，才能使用这些接口
      // 11.1.X以及之前，可以使用。微信的浏览器

      // alpha:指北(指南针) [0,360) 当为0的时候指北。180指南
      // beta:平放的时候beta值为0。当手机立起来(短边接触桌面)，直立的时候beta为90；
      // gamma:平放的时候gamma值为零。手机立起来(长边接触桌面)，直立的时候gamma值为90

      window.addEventListener("deviceorientation", function (event) {
        // console.log(event);
        document.getElementById("main").innerHTML =
          "alpha:" +
          event.alpha +
          "<br/>" +
          "beta:" +
          event.beta +
          "<br/>" +
          "gamma:" +
          event.gamma;
      });
    </script>
  </body>
</html>
```

## 手机访问电脑

1.手机和电脑在同一个局域网下 2.获取电脑的 IP 地址
windows 获取 ip：终端输入 ipconfig 3.在手机上输入相应的 IP 和端口进行访问

## devicemotion

```html
<script>
  // 摇一摇
  window.addEventListener("devicemotion", function (event) {
    document.getElementById("main").innerHTML =
      event.accelertion.x +
      "<br/>" +
      event.accelertion.y +
      "<br/>" +
      event.accelertion.z;
    if (
      Math.abs(event.accelertion.x) > 9 ||
      Math.abs(event.accelertion.y) > 9 ||
      Math.abs(event.accelertion.z) > 9
    ) {
      alert("在晃");
    }
  });
</script>
```

## requestAnimationFrame

```javascript
/*
    function move(){
    	var square = document.getElementById("main");
    	if(square.offsetLeft > 700){
    		return;
    	}
    	square.style.left = square.offsetLeft + 20 +"px";  
    }
    setInterval(move, 10);
    */
// 屏幕刷新频率：每秒60次
// 如果变化一秒超过60次，就会有动画针会被丢掉

// 实现均匀移动,用requestAnimationFrame,是每秒60针
// 将计就计setInterval(move, 1000/60);会实现同样效果吗
// 1针少于1/60秒，requestAnimationFrame可以准时执行每一帧的
// requestAnimationFrame(move);//移动一次
var timer = null;
function move() {
  var square = document.getElementById("main");
  if (square.offsetLeft > 700) {
    cancelAnimationFrame(timer);
    return;
  }
  square.style.left = square.offsetLeft + 20 + "px";
  timer = requestAnimationFrame(move);
}
move();
// cancelAnimationFrame基本相当于clearTimeout
// requestAnimationFrame兼容性极差
```

兼容性极差还想使用咋办？

```javascript
window.cancelAnimationFrame = (function () {
  return (
    window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    function (id) {
      window.clearTimeOut(id);
    }
  );
})();

window.requestAnimationFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (id) {
      window.setTimeOut(id, 1000 / 60);
    }
  );
})();
```

## localStrorage

cookie:每次请求都有可能传送许多无用的信息到后端
localStroage:长期存放在浏览器，无论窗口是否关闭

```javascript
localStorage.name = "panda";
// localStroage.arr = [1, 2, 3];
// console.log(localStroage.arr);
// localStroage只能存储字符串，

要想存储数组;
localStorage.arr = JSON.stringify([1, 2, 3]);
// console.log(localStorage.arr);
console.log(JSON.parse(localStorage.arr));

localStorage.obj = JSON.stringify({
  name: "panda",
  age: 18,
});
console.log(JSON.parse(localStorage.obj));
```

sessionStroage:这次回话临时需要存储时的变量。每次窗口关闭的时候，seccionStroage 自动清空

```html
sessionStorage.name = "panda";
```

localStorage 与 cookie

1.localStorage 在发送请求的时候不会把数据发出去，cookie 会把所有数据带出去
   2.cookie 存储的内容比较(4k) ，localStroage 可以存放较多内容(5M)

另一种写法

```html
localStorage.setItem("name", "monkey"); localStorage.getItem("name");
localStorage.removeItem("name");
```

相同协议，相同域名，相同端口称为一个域

注意：

www.baidu.com不是一个域。
[http://www.baidu.com](http://www.baidu.com)  [https://www.baidu.com](https://www.baidu.com),是域。这是不同域

## history

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>document</title>
    <style type="text/css"></style>
    <script>
      // A -> B - C
      // 为了网页的性能，单页面操作
      var data = [
        {
          name: "HTML",
        },
        {
          name: "CSS",
        },
        {
          name: "JS",
        },
        {
          name: "panda",
        },
        {
          name: "dengge",
        },
      ];
      function search() {
        var value = document.getElementById("search").value;
        var result = data.filter(function (obj) {
          if (obj.name.indexOf(value) > -1) {
            return obj;
          }
        });
        render(result);
        history.pushState({ inpVal: value }, null, "#" + value);
      }
      function render(renderData) {
        var content = "";
        for (var i = 0; i < renderData.length; i++) {
          content += "<div>" + renderData[i].name + "</div>";
        }
        document.getElementById("main").innerHTML = content;
      }
      window.addEventListener("popstate", function (e) {
        // console.log(e);
        document.getElementById("search").value = e.state.inpVal
          ? e.state.inpVal
          : "";
        var value = document.getElementById("search").value;
        var result = data.filter(function (obj) {
          if (obj.name.indexOf(value) > -1) {
            return obj;
          }
        });
        render(result);
      });
      // 关于popstate和hashchange
      // 只要url变了，就会触发popstate
      // 锚点变了(hash值变了)，就会触发hashchange
      window.addEventListener("hashchange", function (e) {
        console.log(e);
      });
    </script>
  </head>

  <body>
    <input type="text" id="search" /><button onclick="search()">搜索</button>
    <div id="main"></div>
    <script>
      render(data);
    </script>
  </body>
</html>
```

## worker

```html
<script>
  // js都是单线程的
  // worker是多线程的, 真的多线程, 不是伪多线程
  // worker不能操作DOM,没有window对象,不能读取本地文件。可以发ajax,可以计算
  // 在worker中可以创建worker吗？
  // 在理论上可以，但是没有一款浏览器支持
  /*
        console.log("=======");
        console.log("=======");
        var a = 1000;
        var result = 0;
        for (var i = 0; i < a; i++) {
            result += i;
        }
        console.log(result);
        console.log("=======");
        console.log("=======");
        */
  // 后两个等号只有等待算完才执行

  var beginTime = Data.now();
  console.log("=======");
  console.log("=======");
  var a = 1000;
  var worker = new Worker("./worker.js");
  worker.postMessage({
    num: a,
  });
  worker.onmessage = function (e) {
    console.log(e.data);
  };
  console.log("=======");
  console.log("=======");
  var endTime = Data.now();
  console.log(endTime - beginTime);
  worker.terminate(); //停止
  this.close(); //自己停止
</script>
```

worker.js

```javascript
this.onmessage = function (e) {
  //接受消息
  // console.log(e);
  var result = 0;
  for (var i = 0; i < e.data.num; i++) {
    result += i;
  }
  this.postMessage(result);
};
```

worker.js 里面可以通过 importScripts("./index.js")引入外部 js 文件
