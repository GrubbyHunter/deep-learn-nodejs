let EventEmitter = require("events");

let emitter = new EventEmitter();
emitter.on("do-some", data => {
  console.log(`build do-some event ${data}`);
});

emitter.emit("do-some", "Grubby");

let build = callback => {
  emitter.once("do-once", callback);
};

build(() => {
  console.log(11111111);
});
build(() => {
  console.log(22222222);
});

emitter.emit("do-once");
emitter.emit("do-once");
emitter.emit("do-once");
emitter.emit("do-once");
