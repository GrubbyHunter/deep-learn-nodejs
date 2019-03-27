# Promise 实现

> 简单实现 promise 内部原理
> Promise 就是一个状态机，他的状态是不可逆的，这里 resolve 和 reject 会分别将他的状态转化为成功和失败  
> 然后执行对应的回调函数
> 注意这里需要用到 setTimeout，因为需要等后面的 then 方法把回调函数收集完之后在执行回调函数队列里面的方法

```javascript
class MyPromise {
  constructor(handleFun) {
    this.callbacks = []
    this.errorHandles = []
    this.state = "PENDING"

    handleFun(this.resolve.bind(this), this.reject.bind(this))
  }

  resolve(data) {
    // 非等待状态表示状态已经被改变，不能再继续改变，因为状态不可逆
    if (this.state != "PENDING") {
      return
    }
    this.state = "SUCCESS"
    this.value = data

    this.callbacks.forEach(function(fn) {
      fn(data)
    })
  }

  reject(error) {
    // 非等待状态表示状态已经被改变，不能再继续改变，因为状态不可逆
    if (this.state != "PENDING") {
      return
    }
    this.state = "FAIL"
    this.value = error

    this.errorHandles.forEach(function(fn) {
      fn(error)
    })
  } 

  then(successFun, failFun) {
    switch (this.state) {
      case "PENDING":
        this.callbacks.push(successFun)
        this.errorHandles.push(failFun)
        break
      case "SUCCESS":
        successFun(this.value)
        break
      case "ERROR":
        failFun(this.value)
        break
    }

    // 返回 this，支持链式调用
    return this
  }
}

let promise1 = new MyPromise((resolve, reject) => {
  resolve(111)
})
promise1.then(data => {
  console.log(data)
})
```
