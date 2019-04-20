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
