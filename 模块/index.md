# 模块

> nodejs 遵循的的是 Commonjs 的模块规范，主要通过`require`关键字引入一个模块，`module.exports`或者`exports`关键字导出一个模块，这其中`module.exports`和`exports`默认值想的是内存中的同一个地址，如果`exports`引用被修改了，则无法导出模块，最终导出的模块内容以`module.exports`为准

```javascript
// a.js
let a = 100;
exports = { x: 100 };

// b.js
let a = require("./a");
// {}，这里打印一个空对象，因为exports直接赋值的话改变了引用地址，所以赋值内容没法使用
//如果需要使用的话需改成exports.x = 100
console.log(a);
```

```javascript
// a.js
let a = 100;
exports.x = 100;
module.exports.x = 200;

// b.js
let a = require("./a");
// {x:200}，这里输出200，以module.exports的内容为主
console.log(a);
```
