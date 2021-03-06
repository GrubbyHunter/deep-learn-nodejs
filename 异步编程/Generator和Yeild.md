# generator 和 yield

> `generator`是 ES6 新增的一种特殊的函数，使用`*`和普通函数区分，`generator`这个词字面上的意思就是生成器的意思，`generator`函数返回的是一个状态管理器  
> `yield`关键字只能在`generator`函数中使用，他表示一个主线程的暂停，把控制权交给`yield`关键字后面的任务，直到任务返回  
> 状态管理器有一个`next`方法，执行 next 方法，可以运行函数，直到碰到函数里面的`yield`关键字才停止，返回一个对象，value 是 yield 的后面任务的返回值，done 是状态，表示这个`generator`函数是否已经执行完，一般碰到`return`关键字则表明执行完

```javascript
// 一个generator函数
function* myGen() {
  yield 1
  yield 2
  yield 3
  return 100
}
let gen = myGen()
gen.next() // {value: 1, done: false}
gen.next() // {value: 2, done: false}
gen.next() // {value: 3, done: false}
gen.next() // {value: 100, done: true}
```

## 异步控制

> 因为`generator`函数返回的状态管理器只有调用 next 方法时候才会执行函数中的内容，并且就算不停的调用 next 方法，也要必须等待`yield`后面的函数执行完才会执行下一步，这个特性可以非常方便的将异步操作同步化

```javascript
// 一个generator函数
function* myGen() {
  let a = yield new Promise((resolve, reject) => {
    resolve("a.file")
  })
  let b = yield new Promise((resolve, reject) => {
    resolve("b.file")
  })
}
let gen = myGen()
// 需求是读取b文件之前读取a文件
// 这里第一个next返回了一个promise，可以在读取完a之后再接一个then方法，then方法里面调用下一个next来读取b
gen.next().value.then(data => {
  console.log(data)
  gen.next()
})
```

## co 模块

> 上面的`generator`函数有一个问题就是相对于同步方法，他需要外部不停地调用 next 方法来保证`generator`函数内部的执行  
> 有没有一种办法来让`generator`函数自执行呢，这里就提到了我们的 co 模块，co 模块  
> 下面是我自己实现的一个简单的 co 模块

```javascript
/**
 * @param  {generatorFun} generator状态管理器
 */
function* myGen() {
  yield 1
  console.log(1)
  yield 2
  console.log(2)
  yield 3
  console.log(3)
  return 100
}
function run(generatorFun) {
  let it = generatorFun()

  let next = data => {
    return new Promise((resolve, reject) => {
      if (data.done) {
        resolve(next.value)
        return
      }
      // 只要没有完成，就持续递归调用next方法
      next(it.next())
    })
  }

  next(it.next())
}

run(myGen)
```
