# 异步编程

> nodejs 采用事件驱动的方式来进行异步编程，主要面临几个问题

## 1、异常处理

> 通常的同步语言中，使用 try catch 进行异常捕获，但是在 nodejs 中，由于是异步的，所以事件完成是在 callback 回调函数中进行后续处理，这样的话就很难进行直接的异常捕获，因为执行 try 时候，真正的事件处理还没有返回

## 2、过深的嵌套层级

> 这个就不用多说，特别是多个事件产生依赖关系时候，回调函数一层嵌套一层

## 3、代码阻塞

> nodejs 中没有像传统语言中的 sleep 类似的 api，这样实际上是很难暂停代码执行的

## 4、多线程编程

> javascript 是单线程的，多核的 CPU 很难利用起来

## 关于解决方案

### 使用事件订阅发布模式

> 事件订阅发布也算是一种钩子机制，利用钩子将内部数据导出给外部使用，因为 node 中的很多模块对于用户来说都是黑盒的，用户不需要关系他里面的实现，只要把数据拿出来用就行了

```javascript
// 这里绑定事件和触发事件是分开的，方便扩展
let EventEmitter = require("events");

let emitter = new EventEmitter();
emitter.on("do-some", data => {
  console.log(`build do-some event ${data}`);
});

emitter.emit("do-some", "Grubby");
```

### 事件订阅发布优化

> 可以利用一些 events 模块的一些内部 api 对我们的功能需求进行优化

```javascript
// 最常见的一个例子就是数据库的查询
let select = callback => {
  db.select("sql", result => {
    callback(result);
  });
};
select(() => {
  console.log(1111111);
});

select(() => {
  console.log(2222222);
});
```

> 上面的代码有个明显的问题就是当没有缓存时候，如果一次涌入过多的查询(例如一个人不停地浏览器刷新)，这时候数据库是无法承受的，那么简单的处理是加一个状态锁

```javascript
let status = "ready";
let select = callback => {
  if (status === "ready") {
    status = "pending";

    db.select("sql", result => {
      callback(result);
      status = "ready";
    });
  }
};
```

> 上面代码的问题就是，只有第一个事件能绑定上，后续由于是 pending 的状态，无法绑定上时间，相当于很多人一起请求，只有第一个人拿到了返回的结果  
> 这里最终是使用 events 的 once 方法，once 方法表明绑定的事件只执行一次

```javascript
let status = "ready";
let select = callback => {
  // 这里绑定一次，重复的事件就不会重复绑定，同时所有绑定的事件多次调用也仅仅会执行一次
  emitter.once("select", callback);
  if (status === "ready") {
    status = "pending";

    db.select("sql", result => {
      // 执行完查询再进行依次触发，这里就算emit触发了多次
      // once也会对之前已经触发的事件进行解绑，最终只会执行一次
      emitter.emit("select", result);
      status = "ready";
    });
  }
};
```
