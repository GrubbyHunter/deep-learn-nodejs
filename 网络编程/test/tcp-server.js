let net = require("net")

let tcpServer = net.createServer(socket => {
  socket.on("data", data => {
    socket.write("tcp 接受数据")
  })

  socket.on("end", data => {
    socket.write("tcp 断开连接")
  })

  console.log("创建一个tcp服务器")
})

tcpServer.listen(8124, () => {
  console.log("localhost:8124 start")
})
