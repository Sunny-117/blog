# 拖拽 API

## Drag 被拖拽元素

```html
<div class="a" draggable="true"></div>
<!-- 谷歌，safari可以，火狐，Ie不支持 -->
```

默认值 false

默认值为 true 的标签(默认带有拖拽功能的标签)：a 标签和 img 标签

拖拽生命周期

1. 拖拽开始，拖拽进行中，拖拽结束

2. 组成：被拖拽的物体，目标区域
   拖拽事件

```js
var oDragDiv = document.getElementsByClassName("a")[0];
oDragDiv.ondragstart = function (e) {
  console.log(e);
}; // 按下物体的瞬间不触发事件，只有拖动才会触发开始事件
oDragDiv.ondrag = function (e) {
  //移动事件
  console.log(e);
};
oDragDiv.ondragend = function (e) {
  console.log(e);
};
// 从而得出移动多少点
```

小功能：.a{position:absolute}

```html
<div class="a" draggable="true"></div>
<script>
  var oDragDiv = document.getElementsByClassName("a")[0];
  var beginX = 0;
  var beginY = 0;
  oDragDiv.ondragstart = function (e) {
    beginX = e.clientX;
    beginY = e.clientY;
    console.log(e);
  };
  oDragDiv.ondragend = function (e) {
    var x = e.clientX - beginX;
    var y = e.clientY - beginY;
    oDragDiv.style.left = oDragDiv.offsetLeft + x + "px";
    oDragDiv.style.top = oDragDiv.offsetTop + y + "px";
  };
</script>
```

## Drag 目标元素（目标区域）

```css
.a {
  width: 100px;
  height: 100px;
  background-color: red;
  position: absolute;
}
.target {
  width: 200px;
  height: 200px;
  border: 1px solid;
  position: absolute;
  left: 600px;
}
```

```html
<div class="a" draggable="true"></div>
<div class="target"></div>

<script>
  var oDragDiv = document.getElementsByClassName("a")[0];
  oDragDiv.ondragstart = function (e) {};
  oDragDiv.ondrag = function (e) {
    //只要移动就不停的触发
  };
  oDragDiv.ondragend = function (e) {};
  var oDragTarget = document.getElementsByClassName("target")[0];
  oDragTarget.ondragenter = function (e) {
    //不是元素图形进入就触发的而是拖拽的鼠标进入才触发的
    // console.log(e);
  };
  oDragTarget.ondragover = function (e) {
    //类似于ondrag，只要在区域内移动，就不停的触发
    // console.log(e);
    // ondragover--回到原处 / 执行drop事件
  };
  oDragTarget.ondragleave = function (e) {
    console.log(e);
    // 离开就触发
  };
  oDragTarget.ondrop = function (e) {
    console.log(e);
    // 所有标签元素，当拖拽周期结束时，默认事件是回到原处，要想执行ondrop，必须在ondragover里面加上e.preventDefault();
    // 事件是由行为触发，一个行为可以不只触发一个事件
    // 抬起的时候，有ondragover默认回到原处的事件，只要阻止回到原处，就可以执行drop事件

    // A -> B(阻止) -> C             想阻止c,只能在B上阻止  责任链模式
  };
</script>
```

## 拖拽 demo

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

      .box1 {
        position: absolute;
        width: 150px;
        height: auto;
        border: 1px solid;
        padding-bottom: 10px;
      }

      .box2 {
        position: absolute;
        width: 150px;
        left: 300px;
        height: auto;
        border: 1px solid;
        padding-bottom: 10px;
      }

      li {
        position: relative;
        width: 100px;
        height: 30px;
        background: #abcdef;
        margin: 10px auto 0px auto;
        /* 居中，上下10px */
        list-style: none;
      }
    </style>
  </head>

  <body>
    <div class="box1">
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div class="box2"></div>
    <script>
      var dragDom;
      var liList = document.getElementsByTagName("li");
      for (var i = 0; i < liList.length; i++) {
        liList[i].setAttribute("draggable", true); //赋予class
        liList[i].ondragstart = function (e) {
          console.log(e.target);
          dragDom = e.target;
        };
      }
      var box2 = document.getElementsByClassName("box2")[0];
      box2.ondragover = function (e) {
        e.preventDefault();
      };
      box2.ondrop = function (e) {
        // console.log(dragDom);
        box2.appendChild(dragDom);
        dragDom = null;
      };

      // 拖回去
      var box1 = document.getElementsByClassName("box1")[0];
      box1.ondragover = function (e) {
        e.preventDefault();
      };
      box1.ondrop = function (e) {
        // console.log(dragDom);
        box1.appendChild(dragDom);
        dragDom = null;
      };
    </script>
  </body>
</html>
```

## dataTransfer 补充属性

effectAllowed

```js
oDragDiv.ondragstart = function (e) { e.dataTransfer.effectAllowed =
"link";//指针是什么样子，只能在ondragstart里面设置 } /其他光标：link copy move
copyMove linkMove all
```

dropEffect

```js
oDragTarget.ondrop = function (e) { e.dataTransfer.dropEffect =
"link";//放下时候的效果，只在drop里面设置 }
```

试验不通过？？
