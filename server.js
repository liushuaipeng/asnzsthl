var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var http = require("http");

var app = express();
app.use(express.static(path.join(__dirname, "www")));
app.use(bodyParser.urlencoded({ extended: true }));

var server = http.createServer(app);
var socketIo = require("socket.io")(server);
socketIo.sockets.on("connection", socket => {
    console.log("新用户连接成功");
    console.log(socket);
    socket.on("message", data => {
        console.log(data);
        socketIo.emit("haha", data);
    });
    socket.on("init", (data, cb) => {
        console.log(data);
        cb({ url: 321 });
    });
});
server.listen(3000, () => {
    console.log("asnzsthl已启动，端口：3000");
});
