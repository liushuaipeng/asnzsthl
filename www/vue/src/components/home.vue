<template>
  <div class="home">
    <el-card>
      <el-button type="primary"
        @click="routerGo('/lottery')">
        抽奖页面
      </el-button>
      <el-button type="primary"
        @click="routerGo('/vote')">
        投票页面
      </el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  methods: {
    routerGo(url) {
      this.$router.push(url);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  padding: 20px;
}
</style>
