<template>
  <div class="lotteryAdmin">
    <el-card class="box-card">
      <el-alert style="margin:20px 0;"
        type="warning"
        :closable="false">
        <span v-if="config.state === 0"
          slot="title">请输入奖项名称以及人数</span>
        <span v-if="config.state === 1"
          slot="title">{{'当前抽奖奖项: ' + config.title + '; 抽奖人数: ' + config.number + '; 开始抽奖请点击抽奖按钮；如需更改请直接下方输入并点击确定即可。'}}</span>
        <span v-if="config.state === 2"
          slot="title">{{'抽奖中，当前抽奖奖项: ' + config.title + '; 抽奖人数: ' + config.number + '; 点击停止按钮即可确定本次抽奖人员。'}}</span>
        <span v-if="config.state === 3"
          slot="title">{{'抽奖完成，当前抽奖奖项: ' + config.title + '; 抽奖人数: ' + config.number + '; 抽奖结果如下表。再次抽奖请直接下方输入并点击确定即可。'}}</span>
      </el-alert>
      <el-form :inline="true"
        :model="config"
        class="demo-form-inline">
        <el-form-item label="奖项名称">
          <el-select v-model="config.title"
            placeholder="请选择"
            @change="handTitleChange">
            <el-option v-for="(item,index) in titleList"
              :key="index"
              :label="item.title"
              :value="item.title"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人数">
          <el-input v-model.number="config.number"
            placeholder="例如：1"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
            @click="onSubmit"
            :disabled="!config.number || !config.title || config.state===2">确定</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-bottom: 50px;">
        <el-button type="success"
          :disabled="config.state !== 1"
          @click="onStart">开始抽奖</el-button>
        <el-button type="danger"
          :disabled="config.state !== 2"
          @click="onStop">停止抽奖</el-button>
      </div>
      <el-table border
        :data="config.data"
        stripe
        style="width: 100%">
        <el-table-column prop="id"
          label="ID"
          width="50"></el-table-column>
        <el-table-column prop="title"
          label="奖项名称"
          width="100"></el-table-column>
        <el-table-column prop="number"
          label="人数"
          width="100"></el-table-column>
        <el-table-column prop="result"
          label="人员">
          <template slot-scope="scope">
            <el-tag style="margin: 0px 10px 0px 0;"
              v-for="(item,i) in scope.row.result"
              :key="i"
              :type="item.indexOf('红') > -1? 'danger' : ''">{{item}}</el-tag>
            <!-- <span>{{scope.row.result.join("；")}}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleRemoveClick(scope.row.id)"
              type="text"
              size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-card style="margin-top: 30px;">
      <el-alert title="下方按钮请慎重操作！"
        type="error">
      </el-alert>
      <div>
        <ul>
          <li>强制同步：强制同步展示页面状态。例如：由于网络原因，点击开始抽奖或者停止抽奖时，展示页面没有开始动画或者停止动画，可以点此按钮。 </li>
          <li>重置：重置掉目前所有抽奖结果 </li>
        </ul>
      </div>
      <div>
        <el-button @click="syncView">强制同步</el-button>
        <el-button @click="reloadLottery">重置</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      config: {
        state: 0,
        title: "",
        number: 0
      },
      titleList: [
        { title: "特等奖", number: 1 },
        { title: "一等奖", number: 10 },
        { title: "二等奖", number: 20 },
        { title: "三等奖", number: 50 }
      ]
    };
  },
  methods: {
    onSubmit() {
      if (this.config.number > this.config.totalPersonInit.length) {
        alert('该奖项人数已经超过未中奖人数！')
        return
      }
      var data = JSON.parse(JSON.stringify(this.config));
      this.$socket.emit("lotteryGoSubmit", data);
    },
    onStart() {
      this.$socket.emit("lotteryGoStart", "go");
    },
    onStop() {
      this.$socket.emit("lotteryGoStop", "stop");
    },
    handleRemoveClick(id) {
      this.$confirm("确定删除ID为" + id + "的奖项吗？")
        .then(_ => {
          this.$socket.emit("lotteryGoRemove", id);
        })
        .catch(_ => {});
    },
    handTitleChange() {
      // console.log(this.titleData[config.title])
      this.titleList.forEach(item => {
        if (this.config.title === item.title) {
          this.config.number = item.number;
        }
      });
    },
    syncView() {
      // this.$router.push('/lottery')
      this.$socket.emit("lotteryGoSync");
    },
    reloadLottery() {
      this.$socket.emit("reloadGoLottery");
    }
  },
  mounted() {
    this.$socket.emit("connect");
  },
  sockets: {
    connect(res) {
      this.$socket.emit("lotteryInit", { url: "lotteryAdmin" }, config => {
        this.config = config;
      });
    },
    lotterySubmit(config) {
      this.config = config;
    },
    lotteryStart(config) {
      this.config = config;
    },
    lotteryStop(config) {
      this.config = config;
    },
    lotteryRemove(config) {
      this.config = config;
    },
    reloadLottery(config) {
      this.config = config;
    }
  }
};
</script>
<style scoped>
.lotteryAdmin {
  padding: 50px 15vw;
}
</style>

