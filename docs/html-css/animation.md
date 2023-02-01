# 动画

## 1.transition 过渡动画

```css
div {
  width: 100px;
  height: 100px;
  background-color: red;
  /* transition: transition-property, transition-duration，transition-timing-function,transition-delay; */
  /* transition-property: all; */
  /* 第一个监听属性 */
  /* transition-property: width, height; */
  /* transition-duration: ; */
  /* 第二个时间间隔 */
  /* transition-timing-function:linear ; */
  /* 第三个运动状态 */
  /* transition-delay: ; */
  /* 第四个延迟 */
  transition: width 2s linear 1s;
  /* 总共3s，1s后开始宽度增加，增加2s */
  /* 添加方式
    前两个必须有，后两个默认
    */
}
div:hover {
  width: 200px;
  height: 200px;
}
```

动画 demo

```css
div {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.5;
  width: 100px;
  height: 100px;
  background-color: red;
  transition: all 2s;
}

div:hover {
  opacity: 1;
  top: 100px;
  left: 100px;
  height: 200px;
  width: 200px;
}
```

## 2.cubic-bezier

```css
div {
  width: 100px;
  height: 50px;
  border: 1px solid red;
  border-radius: 10px;
  transition: all 1s cubic-bezier(0.5, -1.5, 0.8, 2); /*代表两个坐标点
    	x:(0,1)
    	y:都可
    */
}
div:hover {
  width: 300px;
}
```

## 3.animation

```css
@keyframes run {
  0% {
    /* 0%相当于from */
    left: 0;
    top: 0;
    /* background-color: red; */
  }
  25% {
    left: 100px;
    top: 0;
    /* background-color: green; */
  }
  50% {
    left: 100px;
    top: 100px;
    /* background-color: blue; */
  }
  75% {
    left: 0;
    top: 100px;
    /* background-color: coral; */
  }
  100% {
    /* 100%相当于to  */
    left: 0;
    top: 0;
  }
}
@keyframes color-change {
  0% {
    background-color: red;
  }
  60% {
    background-color: blue;
  }
  100% {
    background-color: black;
  }
}
div {
  position: relative;
  width: 100px;
  height: 100px;
  background-color: red;
  /* animation: run 4s; */
  /* animation: run 4s, color-change 4s;两个动画同时运行 */
  /* animation: run 4s cubic-bezier(.5,1,1,1);其实是是每一段的运动状态 */
  /* animation: run 4s cubic-bezier(.5, 1, 1, 1) 1s;延迟1s执行动画 */
  /* animation: run 4s cubic-bezier(.5, 1, 1, 1) 1s 2; 执行2次动画 */
  /* animation: run 4s cubic-bezier(.5, 1, 1, 1) 1s infinite; 死循环 */
  /* animation: run 4s cubic-bezier(.5, 1, 1, 1) 1s reverse;倒着走 */
  /* animation: run 4s cubic-bezier(.5, 1, 1, 1) 1s 2 alternate;先证者走，在倒着走，意味着次数>=2（单摆） */
}
```

animation-fill-mode:

forwards: 设置对象状态为动画结束时候的状态

backwards:设置对象状态为动画开始时候第一针的状态

both:设置对象状态为动画结束和开始的状态的综合体

**太阳月亮 demo——文件夹**

## 4.step 跳转动画

```css
@keyframes change-color {
  0% {
    background-color: red;
  }

  25% {
    background-color: green;
  }

  50% {
    background-color: blue;
  }

  75% {
    background-color: black;
  }

  100% {
    background-color: #fff;
  }
}
div {
  width: 100px;
  height: 100px;
  background-color: rgb(247, 20, 247);
  /* animation: change-color 4s steps(1, end); */
  /* 不过度 一步到位 */
  /* animation: change-color 4s steps(2, end); */
  /* 每一段用2步实现，动画更加细腻了 */
  /* animation: change-color 4s steps(1, start); */
  /* start与end 
    	end保留当前帧状态，直到这个动画时间结束    忽略最后一针
    	start保留下一针状态，直到这段动画时间结束   忽略第一针
    */
  /* 要想弥补时间段   想看见最后一针
    	animation: change-color 4s steps(1, end) forwards;
    */
}
```

区别 end 与 start

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

      @keyframes run {
        0% {
          left: 0;
        }

        25% {
          left: 100px;
        }

        50% {
          left: 200px;
        }

        75% {
          left: 300px;
        }

        100% {
          left: 400px;
        }
      }

      .demo1,
      .demo2 {
        position: absolute;
        left: 0;
        background-color: black;
        width: 100px;
        height: 100px;
        color: #fff;
      }

      .demo1 {
        animation: run 4s steps(1, start);
      }

      .demo2 {
        top: 100px;
        /* animation: run 4s steps(1, end); */
        animation: run 4s steps(1, end) forwards;
      }

      /* 
            steps(1,end);===step-end
            steps(1,start);===step-start
            */
    </style>
  </head>

  <body>
    <div class="demo1">start</div>
    <div class="demo2">end</div>
  </body>
</html>
```

打字效果

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

      @keyframes cursor {
        0% {
          border-left-color: rgba(0, 0, 0, 0);
        }

        50% {
          border-left-color: rgba(0, 0, 0, 1);
        }

        100% {
          border-left-color: rgba(0, 0, 0, 0);
        }
      }

      @keyframes cover {
        0% {
          left: 0;
        }

        100% {
          left: 100%;
        }
      }

      div {
        position: relative;
        display: inline-block;
        height: 100px;
        /* background-color: red; */
        font-size: 80px;
        line-height: 100px;
        font-family: monospace;
      }

      div::after {
        content: "";
        position: absolute;
        left: 0;
        top: 10px;
        height: 90px;
        width: 100%;
        background-color: #fff;
        border-left: 2px solid black;
        box-sizing: border-box;
        animation: cursor 1s steps(1, end) infinite, cover 12s steps(12, end);
      }
    </style>
  </head>

  <body>
    <div>sdknajnakjna</div>
  </body>
</html>
```

表盘效果——文件夹

跑马效果

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
      @keyframes run {
        0% {
          background-position: 0 0;
        }

        100% {
          background-position: -2400px 0;
        }
      }
      div {
        width: 200px;
        height: 100px;
        background-image: url(./web/horse.png);
        background-repeat: no-repeat;
        background-position: 0 0;
        animation: run 0.3s steps(12, end) infinite;
      }
    </style>
  </head>

  <body>
    <div class="horse"></div>
  </body>
</html>
```

## 5.rotate3D 变换

> rotate：2d 变换

> rotateX，rotateY，rotateZ：3d 变换

旋转

```css
@keyframes round {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

div {
  position: absolute;
  left: 200px;
  top: 200px;
  width: 200px;
  height: 200px;
  background-image: url(./source/pic6.jpeg);
  background-size: cover;
  transform: rotate(0deg);
  /* transform-origin: center center; */
  /* 圆心给谁设置，参考的就是谁 */
  transform-origin: 0 0;
  animation: round 2s infinite;
}
```

3D 变换

```css
body {
  perspective: 800px;
  transform-style: preserve-3d;
  perspective-origin: 300px 300px;
}

div {
  position: absolute;
  left: 200px;
  top: 200px;
  width: 200px;
  height: 200px;
  background-image: url(./source/pic6.jpeg);
  background-size: cover;
  transform-origin: 0 0;
  /* transform: rotateX(0deg); */
  /* transform: rotateX(0deg) rotateY(0deg); */
  /* 旋转顺序不同，结果不同 */
}
```

> rotate3d()

> transform: rotate3d(x, y, z, angle); **矢量和**作为旋转轴

小练习图片钟摆效果

```css
body {
  perspective: 800px;
  transform-style: preserve-3d;
  perspective-origin: 300px 300px;
}

@keyframes change {
  0% {
    transform: rotateX(-45deg) rotateY(90deg);
  }

  100% {
    transform: rotateX(45deg) rotateY(90deg);
  }
}

div {
  position: absolute;
  left: 200px;
  top: 200px;
  width: 200px;
  height: 200px;
  background-image: url(./source/pic6.jpeg);
  background-size: cover;
  transform-origin: 0 0;
  animation: change 2s cubic-bezier(0.5, 0, 0.5, 1) infinite alternate;
}
```

## 6.scale 伸缩

```css
/* transform: scale(1, 2); 2d x,y轴*/
/* 
    transform: scaleX();
    transform: scaleY();
    transform: scalez();
    transform: scale3d();  就是叠加 
*/
/* scale:
    1.伸缩元素变化坐标轴的刻度 ,translateX,Y验证。伸缩之后，translateX（100）产生的效果是200
    2.设置两次，则第二次在第一次基础上叠加
    3.旋转伸缩在一个轴进行
		4.雁过留声  伸缩过的影响一直保留 
*/
/* transform: scale() rotate();位置讲究  先后scale不一样*/
```

## 7.skew 倾斜

> skew(x, y);

> skewx();

> skewy();

demo

```css
body {
  perspective: 800px;
  transform-style: preserve-3d;
  perspective-origin: 300px 300px;
}

@keyframes skewchange {
  0% {
    transform: skew(45deg, 45deg);
  }

  50% {
    transform: skew(0, 0);
  }

  100% {
    transform: skew(-45deg, -45deg);
  }
}

div {
  position: absolute;
  left: 200px;
  top: 200px;
  width: 200px;
  height: 200px;
  background-image: url(./source/pic6.jpeg);
  background-size: cover;
  transform-origin: center center;
  /* transform: skew(0deg, 0deg); */
  /* 倾斜的不是元素本身，而是坐标轴
    坐标轴倾斜，刻度被拉伸 */
  /* 
        skew(x,y);
        skewx()
        skewy() 
    */
  animation: skewchange 4s cubic-bezier(0, 0, 1, 1) infinite alternate;
}
```

## 8.translate+perspective

> 2d translate(x, y)
> translatex() translatey() translatex() translate3d()

```css
/* transform: translate(100px); */
/* transform: translate3d(100px, 100px 100px); */

/* 
	transform: translatex()
	translatez() 
*/
transform: rotatey(90deg) translatez(100px);
transform: translatez(100px) rotatey(90deg);
```

小应用：calc(50% - 0.5\*宽高),不知道宽高：

```css
left: 50%;
transform: translatex(-50%) 半个身位;
```

关于 translatez（）

```css
body {
  perspective: 800px;
}
div {
  position: absolute;
  left: 200px;
  top: 200px;
  width: 200px;
  height: 200px;
  background-image: url(demo/u.png);
  background-size: cover;
  /*transform: translatez(100px) rotatey(90deg);*/
  /*z没起作用？旋转晚了*/
  transform: rotatey(90deg) translatez(100px);
}
```

demo

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

      :root {
        height: 100%;
      }

      body {
        perspective: 800px;
        height: 100%; //需要有高度才能实现鼠标移动到哪里都能触发事件
      }

      .content1,
      .content2,
      .content3,
      .content4,
      .content5 {
        width: 200px;
        height: 200px;
        background-image: url(./source/pic3.jpeg);
        background-size: cover;
        position: absolute;
        top: 200px;
        transform: rotateY(45deg);
      }

      .content1 {
        left: 200px;
      }

      .content2 {
        left: 400px;
      }

      .content3 {
        left: 600px;
      }

      .content4 {
        left: 800px;
      }

      .content5 {
        left: 1000px;
      }
    </style>
  </head>

  <body>
    <div class="content1"></div>
    <div class="content2"></div>
    <div class="content3"></div>
    <div class="content4"></div>
    <div class="content5"></div>
    <script>
      document.body.onmousemove = function (e) {
        this.style.perspectiveOrigin = "" + e.pageX + "px " + e.pageY + "px";
      };
    </script>
  </body>
</html>
```

与 perspective 类似的一个东西：
transform: perspective(800px) rotateY(45deg);
写在**前面并且元素本身**，眼睛就在 center 不能调
perspective 在父级才有效
景深可以叠加
深入理解 perspevtive

```css
body {
  perspective: 800px; /*移动眼睛*/
  perspective-origin: 300px 300px;
}
div {
  position: absolute;
  left: 200px;
  top: 200px;
  width: 200px;
  height: 200px;
  background-image: url(demo/u.png);
  background-size: cover;
  /*移动物体*/
  /*transform: translatez(100px);*/
  /*快接近800就见不到了，快后脑勺了*/
  transform: translatez(100px);
}
```

深入理解 perspective

![](../public/css/2023-02-01-21-04-28.png)

![](../public/css/2023-02-01-21-04-38.png)

transform-style

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

      body {
        perspective: 800px;
        perspective-origin: 300px 100px;
      }

      .wrapper {
        position: absolute;
        left: 200px;
        top: 200px;
        width: 200px;
        height: 200px;
        background-color: red;
        transform: rotateY(0deg);
        /*父级旋转会带儿子旋转，因为浏览器渲染不了，所以z轴体现不出来，想立体，给父级(不能祖父)加上transform-style: preserve-3d;*/
      }

      .demo {
        width: 200px;
        height: 200px;
        background-image: url(demo/u.png);
        background-size: cover;
        transform: translateZ(100px);
      }
    </style>
  </head>

  <body>
    <div class="wrapper">
      <div class="demo"></div>
    </div>
  </body>
</html>
```

transform-origin

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

      body {
        perspective: 800px;
        perspective-origin: 300px 100px;
        transform-style: preserve-3d;
      }

      @keyframes move {
        0% {
          transform: rotateY(0deg);
        }
        100% {
          transform: rotateY(360deg);
        }
      }
      div {
        position: absolute;
        left: 200px;
        top: 200px;
        width: 200px;
        height: 200px;
        background-image: url(demo/u.png);
        background-size: cover;
        animation: move 2s linear infinite;
        transform-origin: 100px 100px 100px;
        /* 可以设置空间点中心旋转 */
      }
    </style>
  </head>

  <body>
    <div></div>
  </body>
</html>
```

照片墙

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

      :root,
      body {
        height: 100%;
      }

      body {
        perspective: 3000px;
        transform-style: preserve-3d;
        /* 一旦设置了这两个属性当中一条，他就变成了定位的参照物元素，所以这里没高度的话就导致没高度了 */
      }

      @keyframes round {
        /*让父级转    简单*/
        0% {
          transform: translate(-50%, -50%) rotateY(0deg);
        }

        100% {
          transform: translate(-50%, -50%) rotateY(360deg);
        }
      }

      div.wrapper {
        position: absolute;
        left: calc(50%);
        top: calc(50%);
        /* 写了top没生效的重要原因：父级没有高度，因为body，解决就把body上面 height打开 */
        width: 300px;
        height: 300px;
        transform: translate(-50%, -50%);
        transform-style: preserve-3d;
        animation: round 5s linear infinite;
      }

      img {
        position: absolute;
        width: 300px;
        /* backface-visibility: hidden; */
        /* 图片背部 */
      }

      img:nth-of-type(1) {
        transform: rotateY(45deg) translatez(800px);
        /*沿着自己的z轴向外拓*/
      }

      img:nth-of-type(2) {
        transform: rotateY(90deg) translatez(500px);
        /* 可以改变y值，实现层叠 */
      }

      img:nth-of-type(3) {
        transform: rotateY(135deg) translatez(500px);
      }

      img:nth-of-type(4) {
        transform: rotateY(180deg) translatez(500px);
      }

      img:nth-of-type(5) {
        transform: rotateY(225deg) translatez(500px);
      }

      img:nth-of-type(6) {
        transform: rotateY(270deg) translatez(500px);
      }

      img:nth-of-type(7) {
        transform: rotateY(315deg) translatez(500px);
      }

      img:nth-of-type(8) {
        transform: rotateY(360deg) translatez(500px);
      }
    </style>
  </head>

  <body>
    <div class="wrapper">
      <img src="demo/u.png" alt="" />
      <img src="demo/u.png" alt="" />
      <img src="demo/u.png" alt="" />
      <img src="demo/u.png" alt="" />
      <img src="demo/u.png" alt="" />
      <img src="demo/u.png" alt="" />
      <img src="demo/u.png" alt="" />
      <img src="demo/u.png" alt="" />
    </div>
    <script>
      document.body.onmousemove = function (e) {
        this.style.perspectiveOrigin = "" + e.pageX + "px " + e.pageY + "px";
      };
    </script>
  </body>
</html>
```

作业：3D 魔方 知识点是一样的

## 9.matrix

矩阵就是 transform 给咱们选中的计算规则
矩阵函数传的参数是矩阵的前两行

```css
平移// translate
| 1 0 e|			|x|			|x + e|
| 0 1 f|   *  |y| =   |y + f|
| 0 0 1|  		|z|			|1    |
matrix(1,0,0,1,e,f); === translate(x, y);
// scale
| a,0,0 |     | x |      | ax |
| 0,d,0 |  *  | y |   =  | dy |
| 0,0,1 |     | 1 |      | 1  |
matrix(a,0,0,d,0,0); === scale(x, y);
// rotate
matrix(cos(θ),sin(θ),-sin(θ),cos(θ),0,0); === rotate(θ);
| cos(θ),-sin(θ),e |     | x |
| sin(θ),cos(θ) ,f |  *  | y |
| 0     ,0      ,1 |     | 1 |
x1 = cos(θ)x - sin(θ)y + 0
y2 = sin(θ)x + cos(θ)y + 0
matrix(1,tan(θy),tan(θx),1,0,0)


matrix(1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1) 缩放
matrix(x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1) 平移
```

利用矩阵实现镜像：核心是符号取反

```css
div{
    width:200px;
    height:200px;
    background-image:url(source/pic3.jpeg);
    background-size: cover;
    transform:matrix(-1,0,0,1,0,0);
}
|-1,0, 0 |     	| x |      | -x |  x取反，反推第一个矩阵表达式
| 0, 1, 0 |  *  | y |   =  | -y |
| 0, 0, 1 |     | 1 |      | 1  |
```

浏览器渲染过程：

```html
download html download css download js css rules tree(construct) domAPI domTree
cssrulestree cssomAPI 最终cssomTree domtree cssomTree renderTree | | layout布局
---- > paint喷色 (reflow重构) (repaint) 逻辑图（多层矢量图） ----->
实际绘制（栅格化） 不设置就用cpu绘制 google chrome 自动调用 gpu
```
