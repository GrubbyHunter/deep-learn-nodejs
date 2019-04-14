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
> 这里需要注意的是，data 回调函数里面的`data += chunk`实际上是隐式的调用了`toString`方法  
> 这样才能将`Buffer`转换成真正的字符串  
> 这里我们需要注意，一个中文汉字在在默认的`UTF-8`编码下是占 3 个字节的，所以当我们限制`createReadStream`每次只读取 11 个字节的时候是会出现乱码的，因为第四个汉字开始，他的字节被分成了两部分然后进行 toString(),所以会出现乱码

```javascript
let fs = require("fs")
// 每次读取11个字节会出现乱码
let rs = fs.createReadStream("./Buffer/demo/file.txt", { highWaterMark: 11 })
let data = ""
// 这里设置了UTF-8之后，返回的chunk就不是返回的Buffer对象，而是直接返回的字符串，所以就不会乱码了
rs.setEncoding("UTF-8")

rs.on("data", chunk => {
  data += chunk // 相当于 data = data.toString() + chunk.toString()
})
rs.on("end", () => {
  console.log(data)
})
```

>
