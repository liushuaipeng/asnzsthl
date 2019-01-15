<template>
  <div class="lottery">
    <div class="title">
      <span v-if="config.state === 0">等待确定奖项</span>
      <span v-if="config.state === 1">{{"奖项:" + config.title + "; 人数:" + config.number + "; 准备抽奖中"}}</span>
      <span v-if="config.state === 2">{{"奖项:" + config.title + "; 人数:" + config.number + "; 抽奖中"}}</span>
      <span
        v-if="config.state === 3"
      >{{"奖项:" + config.title + "; 人数:" + config.number + "; 抽奖结果如下"}}</span>
    </div>
    <div class="name" v-show="config.state === 2 || config.state === 3">
      <div class="name_item" v-for="(item,i) in lotteryingPerson" :key="i">{{item}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "等待中...",
      lotteryingPerson: [],
      setIntervalLottery: null,
      config: {
        state: 0
      }
    };
  },
  methods: {
    startAnimation() {
      this.setIntervalLottery = setInterval(() => {
        var totalPerson = JSON.parse(
          JSON.stringify(this.config.totalPersonInit)
        );
        this.lotteryingPerson = [];
        for (let i = 0; i < this.config.number; i++) {
          var index = Math.floor(Math.random() * (totalPerson.length - i));
          this.lotteryingPerson.push(totalPerson.splice(index, 1)[0]);
        }
      }, 200);
    },
    stopAnimation() {
      clearInterval(this.setIntervalLottery);
    }
  },
  mounted() {
    this.$socket.emit("connect");
  },
  sockets: {
    connect(res) {
      this.$socket.emit("lotteryInit", { url: "lottery" }, config => {
        this.config = config;
        if (config.state === 2) {
          this.startAnimation();
        }
        if (config.state === 3) {
          this.lotteryingPerson = config.result;
        }
      });
    },
    lotterySubmit(config) {
      // 准备抽奖，确定本次抽奖概况
      this.config = config;
      this.title =
        "奖项:" + config.title + "; 人数:" + config.number + "; 准备抽奖中";
    },
    lotteryStart(config) {
      // 开始抽奖
      this.config = config;
      this.startAnimation();
    },
    lotteryStop(config) {
      // 停止抽奖
      this.config = config;
      this.stopAnimation();
      this.lotteryingPerson = JSON.parse(JSON.stringify(config.result));
    },
    lotteryRemove(config) {
      this.config = config;
    }
  }
};
</script>

<style scoped>
.lottery {
  background-image: url("../assets/firstp_bg.jpg");
  background-size: 100% 100%;
  height: 100vh;
  overflow: hidden;
}
.title {
  min-height: 100px;
  font-size: 68px;
  color: #ffe9af;
  text-align: center;
  padding: 30px;
  margin: auto 0;
}
.name {
  padding: 30px 20vw;
  color: #222;
  font-size: 32px;
  text-align: center;
}
.name_item {
  display: inline-block;
  margin-right: 30px;
}
</style>

