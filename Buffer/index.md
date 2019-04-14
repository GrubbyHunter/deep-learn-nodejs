# Buffer 对象

> `Buffer`是一个 nodejs 中一种类似数组结构的对象，它的构造函数接收两个参数
> 一个是转换成`Buffer`的字符串，一个是字符串编码
> 它里面的元素是 16 进制的两位数，也就是 0-255 的随机数。

```javascript
let a = new Buffer("show", "UTF-8")
console.log(a[0]) // 115
```

## Buffer 的使用

> `Buffer`主要是和字符串打交道，像`fs.createReadStream`，他的 data 事件里面返回的 chunk 都是 Buffer 对象
> 这里需要注意的是，data 回调函数里面

```javascript
let fs = require("fs")
let rs = fs.createReadStream("./Buffer/demo/file.txt")
let data = ""

rs.on("data", chunk => {
  data += chunk
})
rs.on("end", () => {
  console.log(data)
})
```
