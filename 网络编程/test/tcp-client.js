let net = require("net")
let client = net.connect({ port: 8124 }, function() {
  console.log("服务器已连接")
})
client.on("data", function(data) {
  console.log(data.toString())
  client.end()
})
client.on("end", function() {
  console.log("服务器关闭")
})
