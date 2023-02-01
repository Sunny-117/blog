# 选择器

## 1.关系型选择器模式(不常用)

> E+F:下一个满足条件的兄弟元素节点

```html
<div>div</div>
<p>1</p>
<p>2</p>
<p>3</p>
<p>4</p>
```

```css
div + p {
  /*选择div兄弟下一个兄弟节点，叫p*/
  background-color: red;
}
```

> E~F:下一堆满足条件的兄弟元素节点

```html
<div>div</div>
<span class="demo">234</span>
<p class="demo">1</p>
<p>2</p>
<p>3</p>
```

```css
div ~ p {
  background-color: green;
}
```

## 2.属性选择器(不常用)

复习属性选择器：

```css
<div class="demo" data="a" > data</div > <div > </div > div[data] {
  background-color: red;
}
```

### 1.小破浪

属性名是 data，属性值里面有独立 a 的元素

```html
<div data="a">1</div>
<div data="b">2</div>
<div data="a b">3</div>
<div data="aa b c">4</div>
```

```css
div[data~="a"] {
  background-color: red;
}
/*1,3变色*/
```

### 2.小竖线

以 a 开头或者以 a-开头

```css
div[class|="a"] {
  background-color: red;
}
```

```html
<div class="a">1</div>
<div class="a-test">2</div>
<div class="b-test">3</div>
```

### 3.^以...开头，$以...结尾，\*存在

```css
div[class$="a"] {
  background-color: red;
}
```

```html
<div class="a">1</div>
<div class="a-test">2</div>
<div class="b-test">4</div>
```

## 3.伪元素选择器(不常用)

before,after 一个两个冒号都可，但是接下来的两个必须两个冒号

### 1.placeholder

```css
<input type="text" placeholder="请输入用户名" > input::placeholder {
  color: green; /*只能改变字体颜色*/
}
```

### 2.selection

```html
<div>成哥很帅</div>
<div>邓哥也很帅</div>
```

```css
div:nth-of-type(1)::selection {
  /*只能用这三种属性*/
  /*color*/
  /*background-color: */
  /*text-shadow: 阴影*/
  text-shadow: 3px 5px black;
  color: #fff;
  background-color: #fcc;
  /*实现选中变色*/
}
div:nth-of-type(2)::selection {
  color: yellow;
  background-color: green;
}
```

```css
user-select: none 不让选中;
```

DEMO

```html
<!DOCTYPE html>
<html lang="en">
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <style>
    span::selection {
      background-color: green;
      color: yellow;
    }
  </style>
  <body>
    名下痴汉tid梦，也从大家的视线中消失了。<span>老</span>dengxu是一位非Two将打败过dengxu作为自己的主要战绩吹了很久。
    后来dengxu海归追梦，也从大家的视线中消失了。<span>邓</span>dengxu是一位非常有实大家的视线中消失了。<span>虚</span>dengxu是一位非常有实
    <span>弱</span>名下痴汉tidesof
  </body>
</html>
```

DEMO

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      p {
        display: inline-block;
        width: 200px;
        border: 1px solid #000;
      }
      p::first-letter {
        font-size: 30px;
      }
      p::first-line {
        color: green;
      }
    </style>
  </head>
  <body>
    <p>沙拉酱擦参考手册是空的充电口穿梭在考虑到开始做看大V南京市的计算机</p>
    <input type="text" name="a" readonly /><span>dg</span>
    <input type="text" name="a" read-write /><span>ds</span>
  </body>
</html>
```

## 4.伪类选择器

### 1.not(s)

案例

```html
<div class="demo">1</div>
<div class="demo">2</div>
<div class="test">3</div>
<div>4</div>
```

```css
div:not([class]) {
  background-color: red;
}
```

实际开发类似需求----移动端列表页：除了最后一个都要加上一条横线

```css
*{
    margin: 0;
    padding: 0;
}
ul{
    width: 300px;
    border:1px solid #999;
}
li{
    height: 50px;
    margin: 0 5px;
    /*border-bottom: 1px solid black;*/
}
li:not(:last-of-type){
    border-bottom: 1px solid black;
}
<ul>
<li>content</li>
<li>content</li>
<li>content</li>
<li>content</li>
<li>content</li>
<li>content</li>
<li>content</li>
</ul>
```

### 2.root 和 html 地位相等

区別：

1.root:根标签选择器   html xml

2.html：根标签

3.root 包含 html

用法：

```css
:root{background-color}
```

### 3.target

含义

被标记成锚点之后--location.hash=×××

案例：可点击创造锚点

```html
<a href="#box1">box1</a>
<a href="#box2">box2</a>
<div id="box1">1</div>
<div id="box2">2</div>
```

```css
div:target {
  border: 1px solid red;
}
```

DEMO

```html
<!DOCTYPE html>
<html>
    <head>
        <title>finish js</title>
        <style>
            *{
                padding: 0;
                margin: 0;
                list-style: none;
            }
            body{
                height: 2000px;
            }
            a{
                position: fixed;
                top:0;
            }
            .item{
                position: absolute;
                top:1000px;
                width: 100px;
                height: 100px;
                background: red;
            }
            #item1{
                top:500px;
            }
            #item2{
                top:1000px;
            }
            #item3{
                top:1500px;
            }
            .item:target{
                background: green;
            }

        </style>
    </head>
    <body>
        <a href="#item1" style="left:200px">click1</a>
        <a href="#item2" style="left:300px">click2</a>
        <a href="#item3" style="left:400px">click3</a>
        <div id="item1" class="item">1</div>
        <div id="item2" class="item">2</div>
        <div id="item3" class="item">3</div>
    </body>
</html
```

> 小项目：三个 a 标签控制页面背景颜色

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /*实现div=屏幕的高度	*/
      :root,
      body {
        margin: 0;
        padding: 0;
        height: 100%;
      }
      #red,
      #green,
      #gray {
        height: 100%;
        width: 100%;
      }
      #red {
        background-color: #f20;
      }
      #green {
        background-color: green;
      }
      #gray {
        background-color: gray;
      }
      div[id]:not(:target) {
        display: none;
      }
      div.button-wrapper {
        position: absolute;
        width: 600px;
        top: 400px;
      }
      div.button-wrapper a {
        text-decoration: none;
        color: #fff;
        background-color: #fcc;
        font-size: 30px;
        border-radius: 3px;
        margin: 0 10px;
      }
    </style>
  </head>
  <body>
    <div class="button-wrapper">
      <a href="#red" class="bgred">red</a>
      <a href="#green" class="bggreen">green</a>
      <a href="#gray" class="bggray">gray</a>
    </div>
    <div id="red"></div>
    <div id="green"></div>
    <div id="gray"></div>
  </body>
</html>
```

## 4.其他伪类选择器（此部分都考虑其他元素的影响）

受其他元素的影响，父子级，不出常用

### 1.first-child

```html
<div>
  <p>1</p>
  <p>2</p>
  <p>3</p>
</div>
```

```css
/*伪类选择器是被选择元素的状态*/
p:first-child {
  background-color: red;
}
```

```html
<p>1</p>
<div>
  <p>1</p>
  <p>2</p>
  <p>3</p>
</div>
```

是不是 first-child，不只看是 p 里面的第一个，要看父级下面的第一个

```html
<div>
  <span>0</span>
  <p>1</p>
  <p>2</p>
  <p>3</p>
</div>
```

### 2.last-child

```html
<div>
  <p>1</p>
  <p>2</p>
  <p>3</p>
</div>
<p>4</p>
<!-- last-child:只要是最后一个儿子，就可，即14 -->
```

### 3.only-child

```css
span:only-child {
  background-color: aqua;
}
div:only-child {
  background-color: blueviolet;
}
```

```html
<div>
  <span>0</span>
  <p>1</p>
</div>
```

DEMO

```html
nth-child(n)<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /*实现div=屏幕的高度	*/
      :root,
      body {
        margin: 0;
        padding: 0;
        height: 100%;
      }
      #red,
      #green,
      #gray {
        height: 100%;
        width: 100%;
      }
      #red {
        background-color: #f20;
      }
      #green {
        background-color: green;
      }
      #gray {
        background-color: gray;
      }
      div[id]:not(:target) {
        display: none;
      }
      div.button-wrapper {
        position: absolute;
        width: 600px;
        top: 400px;
      }
      div.button-wrapper a {
        text-decoration: none;
        color: #fff;
        background-color: #fcc;
        font-size: 30px;
        border-radius: 3px;
        margin: 0 10px;
      }
    </style>
  </head>
  <body>
    <div class="button-wrapper">
      <a href="#red" class="bgred">red</a>
      <a href="#green" class="bggreen">green</a>
      <a href="#gray" class="bggray">gray</a>
    </div>
    <div id="red"></div>
    <div id="green"></div>
    <div id="gray"></div>
  </body>
</html>
```

### 4.nth-child()

CSS 从 1 开始,n 是从 0 开始   odd 奇数 even 偶数

```css
p:nth-child(2n) {
  background-color: blueviolet;
}
```

```html
<div>
  <p>1</p>
  <p>2</p>
  <p>3</p>
  <p>4</p>
  <p>5</p>
</div>
```

### 5.nth-last-child(n)

倒着数

## 5.其他伪类选择器（不受其他影响）

不受其他影响,常用

### 1.first-of-type

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
</ul>
<li>1</li>
```

```css
li:first-of-type {
  background-color: aqua;
}
```

这一类型里面是的第一个

### 2.last-of-type

### 3.only-of-type

```html
<div>
  <span>0</span>
  <p>1</p>
  <!-- <p>2</p>不是特有的了 -->
</div>
```

```css
p:only-of-type {
  background-color: aqua;
}
```

### 4.nth-of-type(n)常用

```html
<div>
  <span>0</span
  ><!-- 注意这一行 -->
  <p>1</p>
  <p>2</p>
  <p>3</p>
  <p>4</p>
  <p>5</p>
  <!-- <p>2</p>不是特有的了 -->
</div>
```

```css
p:nth-of-type(n+2){从第二个开始查
    background-color: aqua;
}
```

### 5.nth-of-last-type(n)

与前一个相反

## 6.剩下的伪类选择器

### 1.empty:必须元素是空的，才叫 empty

```html
<div><span>123</span></div>
<div></div>
<div>234</div>
<div><!--sda--></div>
<!--注释也算节点-->
```

```css
div:empty {
  border: 1px solid black;
  height: 100px;
}
```

### 2.checked

```html
<label> 一个小惊喜<input type="checkbox" /><span></span> </label>
```

```css
input:checked {
  width: 200px;
  height: 200px;
}
```

DEMO 处理简单交互

```html
<style>
  input:checked + span {
    background-color: green;
  }
  input:checked + span::after {
    content: "隔壁老王 电话xxx，请务必小心刑事";
    color: #fff;
  }
</style>
<label>
  一个小惊喜
  <input type="checkbox" />
  <span></span>
</label>
```

### 3.enable

```html
<input type="text" /> <input type="text" disabled />
```

```css
input:enabled {
  background: green;
}
input:disabled {
  border: 1px solid #f20;
  background-color: #fcc;
  box-shadow: 1px 2px 3px #f20;
}
```

### 4.disable

### 5.read-only

```css
input:read-only{
    color:chartreuse;
}
<input type="text">
<input type="text" readonly value="你只能瞅着，干不了别的">
```

### 6.read-write

作业

选项卡

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        padding: 0;
        margin: 0;
        list-style: none;
      }
      .wrapper {
        position: relative;
        width: 400px;
        height: 400px;
        border: 1px solid black;
        text-align: center;
        margin: 0 auto; /*居中*/
      }
      .wrapper input {
        width: 30px;
        height: 30px;
      }
      /*.wrapper div和.wrapper实现三个小圆点在一行展示，块级元素。*/
      /*.wrapper div相对于.wrapper定位：top,left*/
      .wrapper div {
        position: absolute;
        top: 30px;
        left: 0;
        width: 400px;
        height: 370px;
        display: none; /*先都是none,选中那个那个变成block*/
        text-align: center;
        line-height: 370px;
        font-size: 30px;
        color: #fff;
      }
      .wrapper div:nth-of-type(1) {
        background-color: red;
      }
      .wrapper div:nth-of-type(2) {
        background-color: green;
      }
      .wrapper div:nth-of-type(3) {
        background-color: blue;
      }
      input:checked + div {
        /*input:checked + div{     不要有空格，否则错误*/
        display: block;
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <input type="radio" name="a" checked />
      <div>a</div>
      <input type="radio" name="a" />
      <div>b</div>
      <input type="radio" name="a" />
      <div>c</div>
    </div>
  </body>
</html>
```

手风琴

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>原生js手风琴特效</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      ul,
      li {
        list-style: none;
      }
      .box {
        width: 1050px;
        height: 300px;
        margin: 100px auto;
        overflow: hidden;
      }
      .accordion li {
        float: left;
        width: 100px;
        height: 300px;
        color: #000;
        font-size: 20px;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <ul class="accordion">
        <li style="background: #f99;">1</li>
        <li style="background: #9ff;">2</li>
        <li style="background: #f9f;">3</li>
        <li style="background: #9f9;">4</li>
        <li style="background: blue;">5</li>
        <li style="width:450px;background: yellow;">6</li>
      </ul>
    </div>
    <script>
      function accordion() {
        var oBox = document.querySelector(".box");
        var accordion = oBox.querySelector(".accordion");
        var oList = accordion.getElementsByTagName("li");
        var i = 0;
        var timer = null;
        //console.log(oList.length);
        for (var i = 0; i < oList.length; i++) {
          oList[i].index = i;
          oList[i].onmouseover = function () {
            var index = this.index;
            if (timer) {
              clearInterval(timer);
            }
            timer = setInterval(function () {
              var iWidth = oBox.offsetWidth; //盒子的总宽度
              //console.log(iWidth); 1050
              for (var i = 0; i < oList.length; i++) {
                if (index != oList[i].index) {
                  //设定速度
                  var speed = (100 - oList[i].offsetWidth) / 5;
                  speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                  oList[i].style.width = oList[i].offsetWidth + speed + "px";
                  iWidth -= oList[i].offsetWidth;
                }
                oList[index].style.width = iWidth + "px";
              }
            }, 30);
          };
        }
      }
      accordion();
    </script>
  </body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style type="text/css">
      * {
        margin: 0;
        padding: 0;
        font-size: 12px;
        list-style: none;
      }

      .menu {
        margin: 50px auto;
        width: 210px;
        border: 1px solid #ccc;
      }

      .menu p {
        height: 25px;
        line-height: 25px;
        background: #eee;
        font-weight: bold;
        border-bottom: 1px solid #ccc;
        text-indent: 20px;
        cursor: pointer;
      }

      .menu div ul {
        display: none;
      }

      .menu li {
        height: 24px;
        line-height: 24px;
        text-indent: 20px;
      }
    </style>
    <script type="text/javascript">
      window.onload = function () {
        var menu = document.getElementById("menu");
        var ps = menu.getElementsByTagName("p");
        var uls = menu.getElementsByTagName("ul");
        for (var i in ps) {
          ps[i].id = i;
          ps[i].onclick = function () {
            var u = uls[this.id];
            if (u.style.display == "block") {
              u.style.display = "none";
            } else {
              u.style.display = "block";
            }
          };
        }
      };
    </script>
  </head>

  <body>
    <div class="menu" id="menu">
      <div>
        <p>Web前端</p>
        <ul style="display:block">
          <li>JavaScript</li>
          <li>DIV+CSS</li>
          <li>JQuary</li>
        </ul>
      </div>
      <div>
        <p>后台脚本</p>
        <ul>
          <li>PHP</li>
          <li>ASP.net</li>
          <li>JSP</li>
        </ul>
      </div>
      <div>
        <p>前端框架</p>
        <ul>
          <li>Extjs</li>
          <li>Esspress</li>
          <li>YUI</li>
        </ul>
      </div>
    </div>
  </body>
</html>
```
