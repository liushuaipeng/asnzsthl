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
// 抽奖数据-----------
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

// 投票数据-----------------
var voteList = require("./config.js").voteList;
var voteData = {
    // 0 停止投票
    // 1 正在投票
    state: 0,
    // 投票数据
    data: {},
    voteList: voteList
};
voteList.forEach(item => {
    for (const key in item.data) {
        voteData.data[key] = 0;
    }
})
var voteSetInterval;



socketIo.sockets.on("connection", socket => {
    // 确定本次抽奖概况
    socket.on("lotteryGoSubmit", data => {
        config.state = 1;
        config.title = data.title;
        config.number = data.number;
        socketIo.emit("lotterySubmit", config);
        console.log(`准备抽奖;名称：${config.title};人数:${config.number}`);
    });
    // 开始抽奖
    socket.on("lotteryGoStart", data => {
        config.state = 2;
        socketIo.emit("lotteryStart", config);
        console.log("开始抽奖");
    });
    // 停止抽奖
    socket.on("lotteryGoStop", data => {
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
        console.log(
            `生成id为${config.id}的奖项;名称：${config.title};人数：${
            config.number
            };人员:${config.result.join(",")};未中奖人员`,
            config.totalPersonInit
        );
    });
    // 删除某一项抽奖结果
    socket.on("lotteryGoRemove", id => {
        var self;
        config.data.forEach((item, index) => {
            if (item.id === id) {
                self = JSON.parse(JSON.stringify(item));
                config.data.splice(index, 1);
            }
        });
        // 删除人员重新放到未中奖数组
        config.totalPersonInit = config.totalPersonInit.concat(self.result);
        config.state = 0;
        socketIo.emit("lotteryRemove", config);
        console.log(
            `删除id：${id}的奖项;未中奖人数：${
            config.totalPersonInit.length
            };人员:`,
            config.totalPersonInit
        );
    });
    // 初始化页面
    socket.on("lotteryInit", (data, cb) => {
        cb(config);
    });
    socket.on("voteInit", (data, cb) => {
        cb(voteData);
    });
});


// 页面初始化时获取数据
app.get("/api/vote/getList", (req, res) => {
    res.json({ code: "success", data: voteList });
});
// 提交投票
app.post("/api/vote/submit", (req, res) => {
    if (voteData.state === 0) {
        res.json({ code: "error", data: "投票尚未开始或已截止" });
        return;
    }
    req.body.forEach(item => {
        if (!!item.value) {
            voteData.data[item.value] = voteData.data[item.value] + 1;
        }
    });
    res.json({ code: "success", data: "投票成功" });
    console.log(`ip为${req.ip}投票成功;当前结果`, voteData.data);
});
// 开始投票
app.post("/api/vote/start", (req, res) => {
    if (voteData.state === 1) {
        res.json({ code: "error", data: "已经开始投票，请勿重复点击！" })
    } else {
        voteData.state = 1;
        voteSetInterval = setInterval(() => {
            socketIo.emit('voteChange', voteData);
        }, 1000);
        socketIo.emit('voteTimeGo');
        console.log('开始投票', voteData)
        res.json({ code: "success", data: "开始投票" })
    }
})
// 停止投票
app.post("/api/vote/stop", (req, res) => {
    if (voteData.state === 0) {
        res.json({ code: "error", data: "已经停止投票，请勿重复点击！" })
    } else {
        voteData.state = 0;
        clearInterval(voteSetInterval);
        socketIo.emit('voteTimeStop');
        res.json({ code: "success", data: "停止投票" })
    }
})
server.listen(nodeConfig.port, () => {
    console.log("asnzsthl已启动，端口：" + nodeConfig.port);
});
