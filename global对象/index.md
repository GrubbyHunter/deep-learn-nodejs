# Global 对象

> nodejs 处在全局对象，例如 global、console、process 等，这些是可以在任何模块中使用  
> 不同于 js 中的 window 对象，js 中直接声明全局变量实际上是声明 window 对象的属性 var a = 1 相当于 window.x = 1，而 nodejs 的全局变量不是设置 global 的属性

> setTimeout，clearTimeout，setInterval，clearInterval 这些都是和 javascript 中一样使用。

> 还有`__filename`，`__dirname` 这种，每个模块中都能使用，但是根据当前模块有关
