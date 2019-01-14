<template>
  <div class="lotteryAdmin">
    <el-card class="box-card">
      <el-alert style="margin:20px 0;" type="warning" :closable="false">
        <span v-if="config.state === 0" slot="title">请输入奖项名称以及人数</span>
        <span
          v-if="config.state === 1"
          slot="title"
        >{{'当前抽奖奖项: ' + config.title + '; 抽奖人数: ' + config.number + '; 开始抽奖请点击抽奖按钮；如需更改请直接下方输入并点击确定即可。'}}</span>
        <span
          v-if="config.state === 2"
          slot="title"
        >{{'当前抽奖奖项: ' + config.title + '; 抽奖人数: ' + config.number + '; 抽奖中，点击停止按钮即可确定本次抽奖人员。'}}</span>
        <span
          v-if="config.state === 3"
          slot="title"
        >{{'当前抽奖奖项: ' + config.title + '; 抽奖人数: ' + config.number + '; 抽奖完成，抽奖结果如下表。再次抽奖请直接下方输入并点击确定即可。'}}</span>
      </el-alert>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="奖项名称">
          <el-input v-model="form.title" placeholder="例如：特等奖"></el-input>
        </el-form-item>
        <el-form-item label="人数">
          <el-input v-model.number="form.number" placeholder="例如：1"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" :disabled="!form.number || !form.title">确定</el-button>
        </el-form-item>
      </el-form>
      <div style="margin-bottom: 50px;">
        <el-button type="success" :disabled="config.state !== 1" @click="onStart">开始抽奖</el-button>
        <el-button type="danger" :disabled="config.state !== 2" @click="onStop">停止抽奖</el-button>
      </div>
      <el-table border :data="config.data" stripe style="width: 100%">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="title" label="奖项名称" width="100"></el-table-column>
        <el-table-column prop="number" label="人数" width="100"></el-table-column>
        <el-table-column prop="result" label="人员">
          <template slot-scope="scope">
            <el-tag
              style="margin: 0px 10px 0px 0;"
              v-for="(item,i) in scope.row.result"
              :key="i"
              :type="item.indexOf('红') > -1? 'danger' : ''"
            >{{item}}</el-tag>
            <!-- <span>{{scope.row.result.join("；")}}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleRemoveClick(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        title: "",
        number: 0
      },
      config: {
        state: 0
      }
    };
  },
  methods: {
    onSubmit() {
      var data = JSON.parse(JSON.stringify(this.form));
      this.$socket.emit("lotteryGoSubmit", data, config => {
        this.config = config;
        console.log(this.config);
      });
    },
    onStart() {
      this.$socket.emit("lotteryGoStart", "go", config => {
        this.config = config;
      });
    },
    onStop() {
      this.$socket.emit("lotteryGoStop", "stop", config => {
        this.config = config;
      });
    },
    handleRemoveClick(id) {
      this.$confirm("确定删除ID为" + id + "的奖项吗？")
        .then(_ => {
          this.$socket.emit("lotteryRemove", id, config => {
            this.config = config;
          });
        })
        .catch(_ => {});
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
    }
  }
};
</script>
<style scoped>
.lotteryAdmin {
  padding: 50px 15vw;
}
</style>

