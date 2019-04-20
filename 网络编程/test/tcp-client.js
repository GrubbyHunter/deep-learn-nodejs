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
