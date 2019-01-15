<template>
  <div class="home">
    <router-link to="/lottery">抽奖展示页面</router-link>
    <router-link to="/lotteryAdmin">抽奖后台页面</router-link>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
