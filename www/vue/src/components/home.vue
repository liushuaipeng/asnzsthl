<template>
  <div class="home">
    <div @click="aaa">123</div>
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
  },
  methods: {
    aaa() {
      console.log("123");
      this.$socket.emit("message", { aaa: 1, bbb: 2 });
    }
  },
  mounted() {
    console.log("-");
    this.$socket.emit("connect");
  },
  sockets: {
    connect() {
      console.log(this.$socket.id);
      this.$socket.emit("init", { url: 123 }, res => {
        console.log(res);
      });
    },
    haha(data) {
      console.log(data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
