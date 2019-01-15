<template>
  <div class="vote">
    <div class="wrapper">
      <el-card class="box-card">
        <div slot="header"
          class="clearfix">
          <span>卡片名称</span>
        </div>
        <div class="text item">123</div>
      </el-card>
      <el-card class="box-card">
        <div>标题提他他他</div>
      </el-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      voteList: []
    };
  },
  mounted() {
    axios.get("/api/vote/getList").then(res => {
      console.log(res);
      this.voteList = res.data.data;
    });
  }
};
</script>

<style scoped>
.vote {
  background: #221e1e61;
  /* min-height: 100vh; */
}
.wrapper {
  max-width: 750px;
  /* min-height: 100vh; */
  padding: 10px;
  margin: 0 auto;
  background: #ffffff;
  color: #555555;
}
.el-card {
  margin: 10px 0;
}
</style>

