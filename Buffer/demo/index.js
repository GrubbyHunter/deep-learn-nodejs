// let a = new Buffer("show", "UTF-8")
// console.log(a[0]) // 115

let fs = require("fs")
let rs = fs.createReadStream("./Buffer/demo/file.txt")
let data = ""
rs.on("data", chunk => {
  data += chunk
})
rs.on("end", () => {
  console.log(data)
})
