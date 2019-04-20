# TCP 协议

> tcp 协议是说与网络传输层协议，他通过三次握手使客户端和服务器建立连接，然后可以传输数据

```javascript
// 1、第一步客户端发送SYN码给服务端，告知要发送请求了
// 2、第二步，服务端接收到SYN码之后，将SYN码 +1 并且同一个服务端的ACK码返回给客户端
// 3、第三步，客户端接收到SYN和ACK码之后已经是激活状态了，这时候他需要把ACK码发送给服务端
//     ，告诉服务器自己已经接收到ACK码了，这样服务端接收到ACK码之后也激活了，就进入了连接状态
```

> 使用`nodejs`中的`net` 模块创建一个 tcp 服务器

```javascript
let net = require("net")

let tcpServer = net.createServer(socket => {
  socket.on("data", data => {
    console.log("服务端接收数据：", data)
    socket.write("服务端发送数据数据:", data)
  })

  socket.on("end", data => {
    socket.write("tcp 断开连接")
  })

  console.log("创建一个tcp服务器")
})

tcpServer.listen(8124, () => {
  console.log("localhost:8124 start")
})
```

> 使用`nodejs`中的`net` 模块创建一个 tcp 客户端

```javascript
let net = require("net")
let client = net.connect({ port: 8124 }, function() {
  console.log("服务器已连接")
})

client.write("客户端发送数据：111")

client.on("data", function(data) {
  console.log("客户端接收数据:", data.toString())
  client.end()
})

client.on("end", function() {
  console.log("服务器关闭")
})
```
