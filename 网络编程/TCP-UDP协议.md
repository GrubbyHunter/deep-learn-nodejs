## TCP 协议

> tcp 协议是属于网络传输层协议，他通过三次握手使客户端和服务器建立连接，然后可以传输数据

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

## UDP 协议

> udp 协议和 tcp 一样也是属于网络传输层协议。tcp 协议客户端与一个服务的连接一旦建立，如果客户端需要与另一个  
> 服务建立连接，需要重新创建一个套接字去进行连接，而 udp 协议，一个套接字可以和多个服务进行连接  
> 由于是一对多的情况，udp 协议也不关注发出的数据服务时候有收到，所以会存在丢包的情况，所以它主要的应用场  
> 景是少数丢包影响不大传输，比如音频，视频等
