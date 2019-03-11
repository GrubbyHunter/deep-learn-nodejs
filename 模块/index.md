# 模块

> nodejs 遵循的的是 Commonjs 的模块规范，主要通过`require`关键字引入一个模块，`module.exports`或者`exports`关键字导出一个模块，这其中`module.exports`和`exports`默认指向的是内存中的同一个地址，如果`exports`引用被修改了，则无法导出模块，最终导出的模块内容以`module.exports`为准

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

## 模块实现

> 由`路径分析`，`文件定位`和`模块编译`三部分组成  
> 通常系统内部模块例如 fs，path 这种，可以忽略路径分析和文件定位两步，直接在 nodejs 启动时候编译成二进制文件放入内存，这种也是读取最快的。

### 路径分析

> 一般路径分析获取`require`中的字符串，转化为真是的物理路径，如果是直接执行 node xx.js 文件的形式，通常是在当前目录下的 node_modules 文件夹下寻找，如果找不到，则在他上一级目录的 node_modules 文件夹下寻找，类似`javascript`原型链的方式依次向上寻找

### 文件定位

> 文件定位的话，如果路径分析中找不到对应的目录下的文件，但是却返回一个文件夹  
> 这时候这个路径文件夹可以当一个包处理，那么下一步是找文件夹目录下的`package.json`文件，查看文件中`main`属性指向的主文件，如果找不到则查找当前目录下的 index 文件，一次用.js、.json、.node 的后缀进行匹配，所以.json 和.node 后缀的文件，在`require`时候带上扩展名，速度会提升一点点

### 模块编译

> .js 后缀的文件会使用 fs 模块读取文件然后载入  
> .json 后缀的文件使用 JSON.parse 进行解析然后进行载入  
> .node 后缀的文件使用 C++的扩展模块进行编译然后载入  
> 还有个要说明的问题是，编译的时候 nodejs 对 js 文件进行了一次封装

```javascript
// 这里exports, require编译时候封装，通过参数传进来，也杜绝了变量名污染的问题
// 文件名和路径等也在前面定位时候通过fs模块获取到，通过参数传进来
// 这也就是为什么能不引入其他模块，直接使用require和exports这些的原因
(function(exports, require, module, __firname, dirname) {
  //实际文件代码
});
```
