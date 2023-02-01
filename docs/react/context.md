# Context 上下文

上下文：Context，表示做某一些事情的环境
React 中的上下文特点：

1. 当某个组件创建了上下文后，上下文中的数据，会被所有后代组件共享
2. 如果某个组件依赖了上下文，会导致该组件不再纯粹（纯粹指的是外部数据仅来源于属性 props）
3. 一般情况下，用于第三方组件（通用组件）

## 旧的 API

> **创建上下文**

只有类组件才可以创建上下文

1. 给类组件书写静态属性 **childContextTypes**，使用该属性对上下文中的数据类型进行约束
2. 添加实例方法 **getChildContext**，该方法返回的对象，即为上下文中的数据，该数据必须满足类型约束，该方法会在每次 render 之后运行。

> **使用上下文中的数据**

要求：如果要使用上下文中的数据，组件必须有一个静态属性 **contextTypes**，该属性描述了需要获取的上下文中的数据类型。

1. 可以在组件的构造函数中，通过第二个参数，获取上下文数据。但是由于构造函数只会运行一次，后面上下文数据改变了，不会更新
2. **从组件的 context 属性中获取**
3. 在函数组件中，通过第二个参数，获取上下文数据。数据并不会流动异常，只是调用了父组件的函数而已
   > **创建上下文只能是类组件，获取上下文可以是类组件或函数组件**

```jsx
import React, { Component } from "react";
import PropTypes from "prop-types";
const types = {
  a: PropTypes.number,
  b: PropTypes.string.isRequired,
};
function ChildA(props, context) {
  // 在函数组件中，通过第二个参数，获取上下文数据
  return (
    <div>
      <h1>ChildA</h1>
      <h2>
        a{context.a} ; b{context.b}
      </h2>
      <ChildB />
    </div>
  );
}
ChildA.contextTypes = types; //前提条件contextTypes

class ChildB extends React.Component {
  static contextTypes = types;
  // 方法2：从组件的context属性中获取
  constructor(props, context) {
    super(props, context);
    console.log(this.context);
  }
  // 如果不写构造函数，会自动运行super
  render() {
    return (
      <p>
        ChildB 来自于上下文的数据 a:{this.context.a}, b:{this.context.b}
      </p>
    );
  }
}
export default class OldContext extends Component {
  /**
   * 约束上下文中数据的类型
   */
  static childContextTypes = types;
  /**
   *
   * @returns 得到上下文数据
   */
  getChildContext() {
    console.log("获取上下文中的数据");
    return {
      a: 123,
      b: "aaa",
    };
  }
  render() {
    return (
      <div>
        <ChildA />
      </div>
    );
  }
}
```

> **上下文的数据变化**

上下文中的数据不可以直接变化，最终都是通过状态改变

```jsx
export default class OldContext extends Component {
  /**
   * 约束上下文中数据的类型
   */
  static childContextTypes = types;
  state = {
    a: 123,
    b: "abc",
  };
  /**
   *
   * @returns 得到上下文数据
   */
  getChildContext() {
    console.log("获取新的上下文");
    return {
      a: this.state.a, //来自状态了
      b: this.state.b,
    };
  }
  render() {
    return (
      <div>
        <ChildA />
        <button
          onClick={() => {
            this.setState({
              //每次改变状态都会重新运行getChildContext。会导致重新渲染
              a: this.state.a + 1,
            });
          }}
        >
          a+1
        </button>
      </div>
    );
  }
}
```

在上下文中加入一个处理函数，**可以用于后代组件更改上下文的数据**

```jsx
import React, { Component } from "react";
import PropTypes from "prop-types";
const types = {
  a: PropTypes.number,
  b: PropTypes.string.isRequired,
  onChangeA: PropTypes.func,
};
function ChildA(props, context) {
  return (
    <div>
      <h1>ChildA</h1>
      <h2>
        a{context.a} ; b{context.b}
      </h2>
      <ChildB />
    </div>
  );
}
ChildA.contextTypes = types; //前提条件contextTypes

class ChildB extends React.Component {
  static contextTypes = types;
  constructor(props, context) {
    super(props, context);
    console.log(this.context);
  }
  render() {
    return (
      <p>
        ChildB 来自于上下文的数据 a:{this.context.a}, b:{this.context.b}
        <button
          onClick={() => {
            this.context.onChangeA(this.context.a + 2);
          }}
        >
          子组件按钮a+2
        </button>
      </p>
    );
  }
}
export default class OldContext extends Component {
  static childContextTypes = types;
  state = {
    a: 123,
    b: "abc",
  };
  getChildContext() {
    return {
      a: this.state.a,
      b: this.state.b,
      onChangeA: (newA) => {
        //这里要用箭头函数，否则报错
        this.setState({
          a: newA,
        });
      },
    };
  }
  render() {
    return (
      <div>
        <ChildA />
        <button
          onClick={() => {
            this.setState({
              a: this.state.a + 1,
            });
          }}
        >
          a+1
        </button>
      </div>
    );
  }
}
```

## 新版 API

旧版 API 存在严重的效率问题，并且容易导致滥用

**创建上下文**

上下文是一个独立于组件的对象，该对象通过 React.createContext(默认值)创建

返回的是一个包含两个属性的对象

1. Provider 属性：生产者。一个组件，该组件会创建一个上下文，该组件有一个 value 属性，通过该属性，可以为其数据赋值
   1. 同一个 Provider，不要用到多个组件中，如果需要在其他组件中使用该数据，应该考虑将数据提升到更高的层次

> 使用类组件获取上下文

```jsx
import React, { Component } from "react";

const ctx = React.createContext(); //里面可以填默认值

// console.log(ctx)

function ChildA(props) {
  return (
    <div>
      <h1>ChildA</h1>
      <ChildB />
    </div>
  );
}

class ChildB extends React.Component {
  static contextType = ctx;
  render() {
    return (
      <div>
        ChildB,来自上下文的数据：a:{this.context.a},b:{this.context.b}
        <button
          onClick={() => {
            this.context.changeA(this.context.a + 2);
          }}
        >
          后代组件的按钮，点击a+2
        </button>
      </div>
    );
  }
}
export default class NewContext extends Component {
  state = {
    a: 0,
    b: "abc",
    changeA: (newA) => {
      this.setState({
        a: newA,
      });
    },
  };
  /* render() {
        const Provider = ctx.Provider;//可以把ctx.Provider直接当组件用<ctx.Provider></ctx.Provider>
        return (
            <Provider value={this.state}>
                <div></div>
            </Provider>
        )
    } */
  render() {
    return (
      <ctx.Provider value={this.state}>
        <div>
          <ChildA />
          <button
            onClick={() => {
              this.setState({
                a: this.state.a + 1,
              });
            }}
          >
            父组件的按钮a+1
          </button>
        </div>
      </ctx.Provider>
    );
  }
}
```

2. Consumer 属性：后续讲解

**使用上下文中的数据**

1. 在类组件中，直接使用 this.context 获取上下文数据
   1. 要求：必须拥有静态属性 contextType , 应赋值为创建的上下文对象
2. 在函数组件中，需要使用 Consumer 来获取上下文数据
   1. Consumer 是一个组件
   2. 它的子节点，是一个函数（它的 props.children 需要传递一个函数）
   3. 不需要写静态属性
      > 使用函数组件获取上下文

```jsx
const ctx = React.createContext();
function ChildA(props) {
  return (
    <div>
      <h1>ChildA</h1>
      <h2>
        {/* 
                写法1
               <ctx.Consumer>
                  这里已经明确使用哪个上下文了，不用写静态属性了
                    {value => <>{value.a},{value.b}</>}
                </ctx.Consumer> */}
        {/* 写法2 */}
        <ctx.Consumer
          children={(value) => (
            <>
              {value.a},{value.b}
            </>
          )}
        ></ctx.Consumer>
      </h2>
      <ChildB />
    </div>
  );
}
```

> 类组件中，也可以通过这个方法获取。比较常用，不需要 contextType 了

```javascript
class ChildB extends Component {
  render() {
    return (
      <ctx.Consumer>
        {(value) => {
          <p>
            来自上下文的数据：{value.a}
            <button onClick={value.changeA(value.a + 2)}>
              后代组件按钮，点击a+2
            </button>
          </p>;
        }}
      </ctx.Consumer>
    );
  }
}
```

> 创建多个，互不干扰

```jsx
import React, { Component } from "react";

const ctx1 = React.createContext();
const ctx2 = React.createContext();

function ChildA(props) {
  return (
    <ctx2.Provider
      value={{
        a: 789,
        c: "hello",
      }}
    >
      <div>
        <h1>ChildA</h1>
        <h2>
          <ctx1.Consumer>
            {(value) => (
              <>
                {value.a}，{value.b}
              </>
            )}
          </ctx1.Consumer>
        </h2>
        <ChildB />
      </div>
    </ctx2.Provider>
  );
}

class ChildB extends React.Component {
  render() {
    return (
      <ctx1.Consumer>
        {(value) => (
          <>
            <p>
              ChildB，来自于上下文的数据：a: {value.a}, b:{value.b}
              <button
                onClick={() => {
                  value.changeA(value.a + 2);
                }}
              >
                后代组件的按钮，点击a+2
              </button>
            </p>
            <p>
              <ctx2.Consumer>
                {(val) => (
                  <>
                    来自于ctx2的数据： a: {val.a}， c:{val.c}
                  </>
                )}
              </ctx2.Consumer>
            </p>
          </>
        )}
      </ctx1.Consumer>
    );
  }
}

export default class NewContext extends Component {
  state = {
    a: 0,
    b: "abc",
    changeA: (newA) => {
      this.setState({
        a: newA,
      });
    },
  };
  render() {
    return (
      <ctx1.Provider value={this.state}>
        <div>
          <ChildA />

          <button
            onClick={() => {
              this.setState({
                a: this.state.a + 1,
              });
            }}
          >
            父组件的按钮，a加1
          </button>
        </div>
      </ctx1.Provider>
    );
  }
}
```

**注意细节**

如果，上下文提供者（Context.Provider）中的 value 属性发生变化(Object\.is 比较)，会导致该上下文提供的所有后代元素全部重新渲染，无论该子元素是否有优化（无论 shouldComponentUpdate 函数返回什么结果）

上下文的应用场景

编写一套组件（有多个组件），这些组件之间需要相互配合才能最终完成功能

比如，我们要开发一套表单组件，使用方式如下

```jsx
render(){
  return (
    <Form onSubmit={datas=>{
        console.log(datas); //获取表单中的所有数据（对象）
        /*
                {
                    loginId:xxxx,
                    loginPwd:xxxx
                }
            */
      }}>
      <div>
        账号： <Form.Input name="loginId" />
      </div>
      <div>
        密码： <Form.Input name="loginPwd" type="password" />
      </div>
      <div>
        <Form.Button>提交</Form.Button>
      </div>
    </Form>
  );
}
```

## **对 React context 的理解**

在 React 中，数据传递一般使用 props 传递数据，维持单向数据流，这样可以让组件之间的关系变得简单且可预测，但是单项数据流在某些场景中并不适用。单纯一对的父子组件传递并无问题，但要是组件之间层层依赖深入，props 就需要层层传递显然，这样做太繁琐了。

Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 props。

可以把 context 当做是特定一个组件树内共享的 store，用来做数据传递。**简单说就是，当你不想在组件树中通过逐层传递 props 或者 state 的方式来传递数据时，可以使用 Context 来实现跨层级的组件数据传递。**

JS 的代码块在执行期间，会创建一个相应的作用域链，这个作用域链记录着运行时 JS 代码块执行期间所能访问的活动对象，包括变量和函数，JS 程序通过作用域链访问到代码块内部或者外部的变量和函数。

假如以 JS 的作用域链作为类比，React 组件提供的 Context 对象其实就好比一个提供给子组件访问的作用域，而 Context 对象的属性可以看成作用域上的活动对象。由于组件 的 Context 由其父节点链上所有组件通 过 getChildContext（）返回的 Context 对象组合而成，所以，组件通过 Context 是可以访问到其父组件链上所有节点组件提供的 Context 的属性。

## **为什么 React 并不推荐优先考虑使用 Context？**

- Context 目前还处于实验阶段，可能会在后面的发行版本中有很大的变化，事实上这种情况已经发生了，所以为了避免给今后升级带来大的影响和麻烦，不建议在 app 中使用 context。
- 尽管不建议在 app 中使用 context，但是独有组件而言，由于影响范围小于 app，如果可以做到高内聚，不破坏组件树之间的依赖关系，可以考虑使用 context
- 对于组件之间的数据通信或者状态管理，有效使用 props 或者 state 解决，然后再考虑使用第三方的成熟库进行解决，以上的方法都不是最佳的方案的时候，在考虑 context。
- context 的更新需要通过 setState()触发，但是这并不是很可靠的，Context 支持跨组件的访问，但是如果中间的子组件通过一些方法不影响更新，比如 shouldComponentUpdate() 返回 false 那么不能保证 Context 的更新一定可以使用 Context 的子组件，因此，Context 的可靠性需要关注
