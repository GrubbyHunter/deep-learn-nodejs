var a = 1;
console.log(a);
global.a = 100;
console.log(__filename); // G:\studyBranch\deep-learn-nodejs\模块\Global对象\test.js
console.log(__dirname); // G:\studyBranch\deep-learn-nodejs\模块\Global对象
console.log(process); // 返回当前进程信息的对象
console.log(global.a); // 100
