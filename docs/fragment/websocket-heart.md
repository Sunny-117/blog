# 面试官：你知道 websocket 的心跳机制吗？

作者在之前的一篇文章写到， [前端如何使用 websocket 发送消息](https://juejin.cn/post/7277835425959886882) ，websocket 是怎么建立连接的呢？如果断开了会怎样？如何一直保持长连接呢？接下来，本篇文章将会带你了解--- WebSocket 心跳机制

## 一、WebSocket 心跳机制

一、WebSocket 心跳机制
前端实现 WebSocket 心跳机制的方式主要有两种：

1. 使用 setInterval 定时发送心跳包。
2. 在前端监听到 WebSocket 的 onclose()事件时，重新创建 WebSocket 连接。

第一种方式会对服务器造成很大的压力，因为即使 WebSocket 连接正常，也要定时发送心跳包，从而消耗服务器资源。第二种方式虽然减轻了服务器的负担，但是在重连时可能会丢失一些数据。

## 二、WebSocket 心跳包机制

WebSocket 心跳包是 WebSocket 协议的保活机制，用于维持长连接。有效的心跳包可以防止长时间不通讯时，WebSocket 自动断开连接。
心跳包是指在一定时间间隔内，WebSocket 发送的空数据包。常见的 WebSocket 心跳包机制如下：

1. 客户端定时向服务器发送心跳数据包，以保持长连接。
2. 服务器定时向客户端发送心跳数据包，以检测客户端连接是否正常。
3. 双向发送心跳数据包。

## 三、WebSocket 心跳机制原理

WebSocket 心跳机制的原理是利用心跳包及时发送和接收数据，保证 WebSocket 长连接不被断开。WebSocket 心跳机制的原理可以用下面的流程来说明：

1. 客户端建立 WebSocket 连接。
2. 客户端向服务器发送心跳数据包，服务器接收并返回一个表示接收到心跳数据包的响应。
3. 当服务器没有及时接收到客户端发送的心跳数据包时，服务器会发送一个关闭连接的请求。
4. 服务器定时向客户端发送心跳数据包，客户端接收并返回一个表示接收到心跳数据包的响应。
5. 当客户端没有及时接收到服务器发送的心跳数据包时，客户端会重新连接 WebSocket

## 四、WebSocket 心跳机制必要吗

WebSocket 心跳机制是必要的，它可以使 WebSocket 连接保持长连接，避免断开连接的情况发生。同时，心跳机制也可以检查 WebSocket 连接的状态，及时处理异常情况。

## 五、WebSocket 心跳机制作用

WebSocket 心跳机制的作用主要有以下几点：

1. 保持 WebSocket 连接不被断开。
2. 检测 WebSocket 连接状态，及时处理异常情况。
3. 减少 WebSocket 连接及服务器资源的消耗。

## 六、WebSocket 重连机制

WebSocket 在发送和接收数据时，可能会因为网络原因、服务器宕机等因素而断开连接，此时需要使用 WebSocket 重连机制进行重新连接。
WebSocket 重连机制可以通过以下几种方式实现：

1. 前端监听 WebSocket 的 onclose()事件，重新创建 WebSocket 连接。
2. 使用 WebSocket 插件或库，例如 Sockjs、Stompjs 等。
3. 使用心跳机制检测 WebSocket 连接状态，自动重连。
4. 使用断线重连插件或库，例如 ReconnectingWebSocket 等。

## 七、WebSocket 的缺点和不足

1. WebSocket 需要浏览器和服务器端都支持该协议。
2. WebSocket 会增加服务器的负担，不适合大规模连接的应用场景。

## 八、关键代码

```js
// 开启心跳
const start = () => {
  clearTimeout(timeoutObj);
  // serverTimeoutObj && clearTimeout(serverTimeoutObj);
  timeoutObj = setTimeout(function () {
    if (websocketRef.current?.readyState === 1) {
      //连接正常
      sendMessage("hello");
    }
  }, timeout);
};
const reset = () => {
  // 重置心跳 清除时间
  clearTimeout(timeoutObj);
  // 重启心跳
  start();
};

ws.onopen = (event) => {
  onOpenRef.current?.(event, ws);
  reconnectTimesRef.current = 0;
  start(); // 开启心跳
  setReadyState(ws.readyState || ReadyState.Open);
};
ws.onmessage = (message: WebSocketEventMap["message"]) => {
  const { data } = message;

  if (data === "收到，hello") {
    reset();
    return;
  }
  if (JSON.parse(data).status === 408) {
    reconnect();
    return;
  }
  onMessageRef.current?.(message, ws);
  setLatestMessage(message);
};
const connect = () => {
  reconnectTimesRef.current = 0;
  connectWs();
};
```

主要思路 ：在建立长连接的时候开启心跳，通过和服务端发送信息，得到服务端给返回的信息，然后重置心跳，清楚时间，再重新开启心跳。如果网络断开的话，会执行方法，重新连接。
