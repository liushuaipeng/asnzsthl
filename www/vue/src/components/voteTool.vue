<template>
  <div>
    <div>
      <el-button type="primary"
        @click="start">开始投票</el-button>
    </div>
    <div>
      <el-button style="margin-top:20px;"
        type="danger"
        @click="stop">停止投票</el-button>
    </div>
    <div style="margin-top:200px;">
      <el-button style="margin-top:20px;"
        @click="reload">重置</el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  methods: {
    start() {
      axios.post("/api/vote/start").then(res => {
        alert(res.data.data);
      });
    },
    stop() {
      axios.post("/api/vote/stop").then(res => {
        alert(res.data.data);
      });
    },
    reload() {
      axios.post("/api/vote/reload").then(res => {
        alert(res.data.data);
      });
    }
  }
};
</script>
