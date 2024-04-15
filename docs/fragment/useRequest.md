# 使用 react 的 hook 实现一个 useRequest

我们在使用 react 开发前端应用时，不可避免地要进行数据请求，而在数据请求的前后都要执行很多的处理，例如

1. 展示 loading 效果告诉用户后台正在处理请求；
2. 若要写 async-await，每次都要 try-catch 进行包裹；
3. 接口异常时要进行错误处理；

当请求比较多时，每次都要重复这样的操作。这里我们可以利用 react 提供的 hook，自己来封装一个 useRequest 。

## 基础结构

明确 useRequest 的输入和输出。

要输入的数据：

- url：要请求的接口地址；
- data：请求的数据（默认只有 get 方式）；
- config：其他一些配置，可选，如（manual?: boolean; // 是否需要手动触发）；

要返回的数据：

- loading：数据是否在请求中；
- data：接口返回的数据；
- error：接口异常时的错误；

## 具体的实现

### 2.1 不带 config 配置的

```js
const useRequest = (url, data, config) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const request = async () => {
    setLoading(true);
    try {
      const result = await axios({
        url,
        params: data,
        method: "get",
      });
      if (result && result.status >= 200 && result.status <= 304) {
        setResult(result.data);
      } else {
        setError(new Error("get data error in useRequest"));
      }
    } catch (reason) {
      setError(reason);
    }
    setLoading(false);
  };
  useEffect(() => {
    request();
  }, []);

  return {
    loading,
    result,
    error,
  };
};
```

在我们不考虑第三个配置 config 的情况下，这个 useRequest 就已经可以使用了。

```js
const App = () => {
  const { loading, result, error } = useRequest(url);

  return (
    <div>
      <p>loading: {loading}</p>
      <p>{JSON.stringify(result)}</p>
    </div>
  );
};
```

### 2.2 添加取消请求

我们在请求接口过程中，可能接口还没没有返回到数据，组件就已经被销毁了，因此我们还要添加上取消请求的操作，避免操作已经不存在的组件。关于 axios 如何取消请求，您可以查看之前写的一篇文章： [axios 源码系列之如何取消请求](https://www.xiabingbao.com/post/request/axios-cancel-request.html)

```js
const request = useCallback(() => {
  setLoading(true);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  axios({
    url,
    params: data,
    method: "get",
    cancelToken: source.token, // 将token注入到请求中
  })
    .then((result) => {
      setResult(result.data);
      setLoading(false);
    })
    .catch((thrown) => {
      // 只有在非取消的请求时，才调用setError和setLoading
      // 否则会报组件已被卸载还会调用方法的错误
      if (!axios.isCancel(thrown)) {
        setError(thrown);
        setLoading(false);
      }
    });

  return source;
}, [url, data]);

useEffect(() => {
  const source = request();
  return () => source.cancel("Operation canceled by the user.");
}, [request]);
```

### 2.3 带有 config 配置的

然后，接着我们就要考虑把配置加上了，在上面的调用中，只要调用了 useRequest，就会马上触发。但若在符合某种情况下才触发怎办呢（例如用户点击后才产生接口请求）？ 这里我们就需要再加上一个配置。

```js
{
  "manual": false, // 是否需要手动触发，若为false则立刻产生请求，若为true
  "ready": false // 当manual为true时生效，为true时才产生请求
}
```

这里我们就要考虑 useRequest 中触发 reqeust 请求的条件了：

- 没有 config 配置，或者有 config 且 manual 为 false；
- 有 config 配置，且 manual 和 ready 均为 true；

```js
const useRequest = () => {
  // 其他代码保持不变
  useEffect(() => {
    if (!config || !config.manual || (config.manual && config.ready)) {
      const source = request();
      return () => source.cancel("Operation canceled by the user.");
    }
  }, [config]);
};
```

使用方法

```js
const App = () => {
  const [ready, setReady] = useState(false);
  const { loading, result, error } = useRequest(url, null, {
    manual: true,
    ready,
  });

  return (
    <div>
      <p>loading: {loading}</p>
      <p>{JSON.stringify(result)}</p>
      <button onClick={() => setReady(true)}>产生请求</button>
    </div>
  );
};
```

当然，实现手动触发的方式有很多，我在这里是用一个 config.ready 来触发，在 umi 框架中，是对外返回了一个 run 函数，然后执行 run 函数再来触发这个 useRequest 的执行。

```js
const useRequest = () => {
  // 其他代码保持不变，并暂时忽略
  const [ready, setReady] = useState(false);

  const run = (r: boolean) => {
    setReady(r);
  };

  useEffect(() => {
    if (!config || !config.manual || (config.manual && ready)) {
      if (loading) {
        return;
      }
      setLoading(true);
      const source = request();

      return () => {
        setLoading(false);
        setReady(false);
        source.cancel("Operation canceled by the user.");
      };
    }
  }, [config, ready]);
};
```
