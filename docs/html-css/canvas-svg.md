# canvas 和 svg

## canvas 画线

```html
<canvas id="can" width="500px" height="300px"></canvas>
```

注意：只能在行间样式设置大小，不能通过 css

```javascript
var canvas = document.getElementById("can"); //画布
var ctx = canvas.getContext("2d"); //画笔
```

```javascript
ctx.moveTo(100, 100); //起点
ctx.lineTo(200, 100); //终点
ctx.stroke(); //画上去
ctx.closePath(); // 连续线，形成闭合
ctx.fill(); //填充
ctx.lineWidth = 10; // 设置线的粗细   写在哪，都相当于写在moveto的后面？？？？咋不管用
```

想实现一个细，一个粗

一个图形，一笔画出来的，只能一个粗细，想实现，必须开启新图像

```javascript
ctx.beginPath();
```

closePath()是图形闭合，不是一个图，不能闭合

## canvas 画矩形

```javascript
ctx.rect(100, 100, 150, 100);
ctx.stroke();
ctx.fill();
```

简化

```javascript
ctx.strokeRect(100, 100, 200, 100); //矩形
ctx.fillRect(100, 100, 200, 100); //填充矩形
```

## 小方块下落

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
      }

      canvas {
        width: 500px;
        height: 300px;
        border: 1px solid;
      }
    </style>
  </head>

  <body>
    <canvas id="can" width="500px" height="300px"></canvas>
    <!--  -->
    <script>
      var canvas = document.getElementById("can"); //画布
      var ctx = canvas.getContext("2d"); //画笔
      var height = 100;
      var timer = setInterval(function () {
        ctx.clearRect(0, 0, 500, 300); //橡皮擦功能，清屏
        ctx.strokeRect(100, height, 50, 50);
        height += 5; //每次画的新的，但是旧的没删除，所以要加上清屏
      }, 1000 / 30);
    </script>
  </body>
</html>
```

作业：自由落体

## canvas 画圆

```html
<script>
  var canvas = document.getElementById("can"); //画布
  var ctx = canvas.getContext("2d"); //画笔
  // 圆心(x,y)，半径(r)，弧度(起始弧度，结束弧度),方向
  ctx.arc(100, 100, 50, 0, Math.PI * 1.8, 0); //顺时针0;逆时针1
  ctx.lineTo(100, 100);
  ctx.closePath();
  ctx.stroke();
</script>
```

## 画圆角矩形

```html
<script>
  var canvas = document.getElementById("can"); //画布
  var ctx = canvas.getContext("2d"); //画笔
  // ABC为矩形端点
  // B(x,y),C(x,y),圆角大小(相当于border-radius)
  ctx.moveTo(100, 110);
  ctx.arcTo(100, 200, 200, 200, 10);
  ctx.arcTo(200, 200, 200, 100, 10);
  ctx.arcTo(200, 100, 100, 100, 10);
  ctx.arcTo(100, 100, 100, 200, 10);
  ctx.stroke();
</script>
```

## canvas 贝塞尔曲线

贝塞尔曲线

```javascript
var canvas = document.getElementById("can"); //画布
var ctx = canvas.getContext("2d"); //画笔
ctx.beginPath();
ctx.moveTo(100, 100);
// ctx.quadraticCurveTo(200, 200, 300, 100);二次
// ctx.quadraticCurveTo(200, 200, 300, 100, 400 200); 三次
ctx.stroke();
```

波浪

注意：初始化

```html
ctx.beginPath();
```

波浪 demo

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      canvas {
        width: 500px;
        height: 300px;
        border: 1px solid;
      }
    </style>
  </head>

  <body>
    <canvas id="can" width="500px" height="300px"></canvas>
    <!--  -->
    <script>
      var width = 500;
      var height = 300;
      var offset = 0;
      var num = 0;
      var canvas = document.getElementById("can"); //画布
      var ctx = canvas.getContext("2d"); //画笔
      setInterval(function () {
        ctx.clearRect(0, 0, 500, 300);
        ctx.beginPath();
        ctx.moveTo(0 + offset - 500, height / 2);
        ctx.quadraticCurveTo(
          width / 4 + offset - 500,
          height / 2 + Math.sin(num) * 120,
          width / 2 + offset - 500,
          height / 2
        );
        ctx.quadraticCurveTo(
          (width / 4) * 3 + offset - 500,
          height / 2 - Math.sin(num) * 120,
          width + offset - 500,
          height / 2
        );
        // 整体向左平移整个宽度形成完整的衔接
        ctx.moveTo(0 + offset, height / 2);
        ctx.quadraticCurveTo(
          width / 4 + offset,
          height / 2 + Math.sin(num) * 120,
          width / 2 + offset,
          height / 2
        );
        ctx.quadraticCurveTo(
          (width / 4) * 3 + offset,
          height / 2 - Math.sin(num) * 120,
          width + offset,
          height / 2
        );
        ctx.stroke();
        offset += 5;
        offset %= 500;
        num += 0.02;
      }, 1000 / 30);
    </script>
  </body>
</html>
```

## 坐标平移旋转与缩放

旋转平移

```html
<script>
  var canvas = document.getElementById("can"); //画布
  var ctx = canvas.getContext("2d"); //画笔
  ctx.beginPath();
  ctx.rotate(Math.PI / 6); //根据画布的原点进行旋转
  // 要想不根据画布原点,则translate坐标系平移
  // ctx.translate(100, 100);坐标原点在(100,100),此时配套旋转
  ctx.moveTo(0, 0);
  ctx.lineTo(100, 100);
  ctx.stroke();
</script>
```

缩放

```html
<script>
  var canvas = document.getElementById("can"); //画布
  var ctx = canvas.getContext("2d"); //画笔
  ctx.beginPath();
  ctx.scale(2, 2); //x乘以他的系数,y乘以他的系数
  ctx.strokeRect(100, 100, 100, 100);
</script>
```

## canvas 的 save 和 restore

不想让其他的受到之前设置的影响

```html
<script>
  var canvas = document.getElementById("can"); //画布
  var ctx = canvas.getContext("2d"); //画笔
  ctx.save(); //保存坐标系的平移数据，缩放数据，旋转数据
  ctx.beginPath();
  ctx.translate(100, 100);
  ctx.rotate(Math.PI / 4);
  ctx.strokeRect(0, 0, 100, 50);
  ctx.beginPath();
  ctx.restore(); //一旦restore，就恢复save时候的状态
  ctx.fillRect(100, 0, 100, 50);
</script>
```

## canvas 背景填充

```html
<script>
  var canvas = document.getElementById("can"); //画布
  var ctx = canvas.getContext("2d"); //画笔
  var img = new Image();
  img.src = "file:///C:/Users/f1981/Desktop/source/pic3.jpeg";
  img.onload = function () {
    //因为图片异步加载
    ctx.beginPath();
    ctx.translate(100, 100); //改变坐标系的位置
    var bg = ctx.createPattern(img, "no-repeat");
    // 图片填充，是以坐标系原点开始填充的
    // ctx.fillStyle = "blue";
    ctx.fillStyle = "bg";
    ctx.fillRect(0, 0, 200, 100);
  };
</script>
```

图片疑难问题
探索
open in live server 只能打开同目录下的 img

## 线性渐变

```html
<script>
  var canvas = document.getElementById("can");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  var bg = ctx.createLinearGradient(0, 0, 200, 200);
  bg.addColorStop(0, "white"); //数字为0-1之间
  // bg.addColorStop(0.5, "blue");
  bg.addColorStop(1, "black");
  ctx.fillStyle = bg;
  ctx.translate(100, 100); //起始点依旧是坐标系原点
  ctx.fillRect(0, 0, 200, 200);
</script>
```

## canvas 辐射渐变

```html
<script>
  var canvas = document.getElementById("can");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  // var bg = ctx.createRadialGradient(x1,y1,r1,x2,y2,r2);起始圆，结束圆
  var bg = ctx.createRadialGradient(100, 100, 0, 100, 100, 100);
  // var bg = ctx.createRadialGradient(100, 100, 100, 100, 100, 100);起始圆里面的颜色全是开始的颜色
  bg.addColorStop(0, "red");
  bg.addColorStop(0.5, "green");
  bg.addColorStop(1, "blue");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 200, 200);
</script>
```

## canvas 阴影

```html
<script>
  var canvas = document.getElementById("can");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.shadowColor = "blue";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 15;
  ctx.shadowOffsetY = 15;
  ctx.strokeRect(0, 0, 200, 200);
</script>
```

## canvas 渲染文字

```html
<script>
  var canvas = document.getElementById("can");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.strokeRect(0, 0, 200, 200);

  ctx.fillStyle = "red";
  ctx.font = "30px Georgia"; //对stroke和fill都起作用
  ctx.strokeText("panda", 200, 100); //文字描边
  ctx.fillText("monkey", 200, 250); //文字填充
</script>
```

## canvas 线端样式

```html
<script>
  var canvas = document.getElementById("can");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.lineWidth = 15;
  ctx.moveTo(100, 100);
  ctx.lineTo(200, 100);
  ctx.lineTo(100, 130);
  ctx.lineCap = "square"; //butt round
  ctx.lineJoin = "miter"; //线接触时候// round bevel miter(miterLimit)
  ctx.miterLimit = 5;
  ctx.stroke();
</script>
```

## SVG 画线与矩形

> svg 滤镜 [https://www.runoob.com/svg/svg-fegaussianblur.html](https://www.runoob.com/svg/svg-fegaussianblur.html) h5 考试题最后一题

**svg 与 canvas 区别**

svg:矢量图，放大不会失真，适合大面积的贴图，通常动画较少或者较简单，标签和 css 画

Canvas:适合用于小面积绘图，适合动画，js 画

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .line1 {
        stroke: black;
        stroke-width: 3px;
      }

      .line2 {
        stroke: red;
        stroke-width: 5px;
      }
    </style>
  </head>

  <body>
    <svg width="500px" height="300px" style="border:1px solid">
      <line x1="100" y1="100" x2="200" y2="100" class="line1"></line>
      <line x1="200" y1="100" x2="200" y2="200" class="line2"></line>
      <rect height="50" width="100" x="0" y="0"></rect>
      <!-- 所有闭合的图形，在svg中，默认都是天生充满并且画出来的 -->
      <rect height="50" width="100" x="0" y="0" rx="10" ry="20"></rect>
    </svg>
  </body>
</html>
```

## svg 画圈，椭圆，直线

```css
<style>
polyline {
    fill: transparent;
    stroke: blueviolet;
    stroke-width: 3px;
}
</style>
```

```html
<svg width="500px" height="300px" style="border:1px solid">
  <circle r="50" cx="50" cy="220"></circle>
  <!--圆-->
  <ellipse rx="100" ry="30" cx="400" cy="200"></ellipse>
  <!-- 椭圆 -->
  <polyline points="0 0, 50 50, 50 100,100 100,100 50"></polyline>
  <!-- 曲线:默认填充 -->
</svg>
```

## svg 画多边形和文本

```html
<polygon points="0 0, 50 50, 50 100,100 100,100 50"> </polygon
><!-- 与polylkine区别：多边形会自动首位相连 -->
<text x="300" y="50">邓哥身体好</text>
```

```css
polygon {
  fill: transparent;
  stroke: black;
  stroke-width: 3px;
}

text {
  stroke: blue;
  stroke-width: 3px;
}
```

## SVG 透明度与线条样式

透明

```css
stroke-opacity: 0.5; /* 边框半透明  */
fill-opacity: 0.3; /* 填充半透明 */
```

线条样式

```css
stroke-linecap: butt; /* （帽子）round square 都是额外加的长度*/
```

```css
stroke-linejoin: ; /* 两个线相交的时候 bevel round miter */
```

## SVG 的 path 标签

```html
<path d="M 100 100 L 200 100"></path>
<path d="M 100 100 L 200 100 L 200 200"></path
><!-- 默认有填充 -->
<path d="M 100 100 L 200 100 l 100 100"></path>
<!-- 以上：大写字母代表绝对位置，小写字母表示相对位置 -->
<path d="M 100 100 H 200 V 200"></path
><!-- H水平  V竖直 -->
<path d="M 100 100 H 200 V 200 z"></path
><!-- z表示闭合区间，不区分大小写 -->
```

```css
path {
  stroke: red;
  fill: transparent;
}
```

## path 画弧

```html
<path d="M 100 100 A 100 50 0 1 1 150 200"></path>
<!-- A代表圆弧指令，以M100 100为起点，150 200为终点 ，半径100，短半径50 ，旋转角度为0，1大圆弧，1顺时针 -->
```

## svg 线性渐变

```html
<svg width="500px" height="300px" style="border:1px solid">
  <defs>
    <!-- 定义一个渐变 -->
    <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="100%">
      <stop offset="0%" style="stop-color:rgb(255,255,0)"></stop>
      <stop offset="100%" style="stop-color:rgb(255,0,0)"></stop>
    </linearGradient>
  </defs>
  <rect x="100" y="100" height="100" width="200" style="fill:url(#bg1)"></rect>
</svg>
```

## svg 高斯模糊

```html
<svg width="500px" height="300px" style="border:1px solid">
  <defs>
    <!-- 定义一个渐变 -->
    <linearGradient id="bg1" x1="0" y1="0" x2="0" y2="100%">
      <stop offset="0%" style="stop-color:rgb(255,255,0)"></stop>
      <stop offset="100%" style="stop-color:rgb(255,0,0)"></stop>
    </linearGradient>
    <filter id="Gaussian">
      <feGaussianBlur in="SourceGraphic" stdDeviation="20"></feGaussianBlur>
    </filter>
  </defs>
  <rect
    x="100"
    y="100"
    height="100"
    width="200"
    style="fill:url(#bg1);filter:url(#Gaussian)"
  ></rect>
</svg>
```

## SVG 虚线及简单动画

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .line1 {
        stroke: black;
        stroke-width: 10px;
        /* stroke-dasharray: 10px; */
        /* stroke-dasharray: 10px 20px;1,2,3,依次取两个值(数组) */
        /* stroke-dasharray: 10px 20px 30px;1,2,3,依次取两个值 */
        /* stroke-dashoffset: 10px;偏移 */
        /* stroke-dashoffset: 200px--->0;可以实现谈满又情空 */
        stroke-dashoffset: 200px;
        animation: move 2s linear infinite alternate-reverse;
      }

      @keyframes move {
        0% {
          stroke-dashoffset: 200px;
        }

        100% {
          stroke-dashoffset: 0px;
        }
      }
    </style>
  </head>

  <body>
    <svg width="500px" height="300px" style="border:1px solid">
      <line x1="100" y1="100" x2="200" y2="100" class="line1"></line>
    </svg>
  </body>
</html>
```

## svg 的 viewbox(比例尺)

```html
<svg
  width="500px"
  height="300px"
  viewbox="0,0,250,150"
  style="border:1px solid"
>
  <!-- viewbox是宽高的一半 -->
  <line x1="100" y1="100" x2="200" y2="100" class="line1"></line>
</svg>
```

总结：SVG 开发中不太用
