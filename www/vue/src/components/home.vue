<template>
  <div @click="aaa">
    123
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
  },
  sockets: {
    connect(res) {
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
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
