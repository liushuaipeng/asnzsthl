var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var http = require("http");
var nodeConfig = require("./config.js").nodeConfig;

var app = express();
app.use(express.static(path.join(__dirname, "www/vue/dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var server = http.createServer(app);
var socketIo = require("socket.io")(server);
var config = {
    // 本次抽奖的id
    id: 0,
    // 0 表示初始化页面
    // 1 确定抽奖奖项人数，等待抽奖中
    // 2 表示抽奖中
    // 3 停止抽奖，显示抽奖结果
    state: 0,
    // 本次抽奖名称
    title: "",
    // 本次抽奖人数
    number: 0,

    // 本次抽奖结果
    result: [],
    // 未中奖人员
    totalPersonInit: [],
    // 所有抽奖结果
    data: []
};
for (let i = 1; i <= 250; i++) {
    config.totalPersonInit.push("蓝队" + i);
    config.totalPersonInit.push("红队" + i);
}
socketIo.sockets.on("connection", socket => {
    // 确定本次抽奖概况
    socket.on("lotteryGoSubmit", (data, cb) => {
        config.state = 1;
        config.title = data.title;
        config.number = data.number;
        socketIo.emit("lotterySubmit", config);
        cb(config);
    });
    // 开始抽奖
    socket.on("lotteryGoStart", (data, cb) => {
        config.state = 2;
        socketIo.emit("lotteryStart", config);
        cb(config);
    });
    // 停止抽奖
    socket.on("lotteryGoStop", (data, cb) => {
        config.state = 3;
        config.id++;
        config.result = [];
        for (let i = 0; i < config.number; i++) {
            var index = Math.floor(
                Math.random() * (config.totalPersonInit.length - i)
            );
            config.result.push(config.totalPersonInit.splice(index, 1)[0]);
        }
        config.data.push({
            title: config.title,
            number: config.number,
            result: config.result,
            id: config.id
        });
        socketIo.emit("lotteryStop", config);
        cb(config);
    });
    // 删除某一项抽奖结果
    socket.on("lotteryRemove", (id, cb) => {
        var self;
        config.data.forEach((item, index) => {
            if (item.id === id) {
                self = JSON.parse(JSON.stringify(item));
                config.data.splice(index, 1);
            }
        });
        // 删除人员重新放到未中奖数组
        config.totalPersonInit.concat(self.result);
        config.state = 0;
        socketIo.emit("lotteryStart", config);
        cb(config);
    });
    // 初始化页面
    socket.on("lotteryInit", (data, cb) => {
        cb(config);
    });
});

// 投票逻辑
var voteList = require("./config.js").voteList;
var voteData = {
    // 0 停止投票
    // 1 正在投票
    state: 0,
    data: {}
};
// 页面初始化时获取数据
app.get("/api/vote/getList", (req, res) => {
    res.json({ code: "success", data: voteList });
});
// 提交投票
app.post("/api/vote/submit", (req, res) => {
    if (voteData.state === 0) {
        res.json({ code: "error", data: "投票尚未开始" });
        return;
    }
    req.body.forEach(item => {
        if (!!item.value) {
            voteData.data[item.value] = voteData.data[item.value] + 1;
        }
    });
    res.json({ code: "success", data: "投票成功" });
});
server.listen(nodeConfig.port, () => {
    console.log("asnzsthl已启动，端口：" + nodeConfig.port);
});
