<template>
  <div class="vote">
    <div class="wrapper">
      <el-card class="box-card"
        v-for="(item,i) in voteList"
        :key="i">
        <div slot="header">
          <span>{{item.title}}</span>
        </div>
        <div class="box_item"
          v-for="(s_item,key) in item.data"
          :key="key">
          <el-radio v-model="item.value"
            :label="key"
            border
            size="medium">{{s_item}}</el-radio>
        </div>
      </el-card>
      <div>
        <el-button class="submit_button"
          type="primary"
          @click="submit">投票</el-button>
      </div>

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
  },
  methods: {
    submit() {
      // if(localStorage.getItem('isVote') === "Y") {
      //   alert('已经投过票了，请勿重复投票')
      //   return;
      // }
      if (!confirm("确定投票么？")) {
        return;
      }
      var params = {
        list: JSON.parse(JSON.stringify(this.voteList)),
        isVote: localStorage.getItem("isVote")
      };
      axios.post("/api/vote/submit", params).then(res => {
        if (res.data.code === "success") {
          localStorage.setItem("isVote", res.data.isVote);
        }
        alert(res.data.data);
        // this.voteList = res.data.data;
      });
    }
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
.box_item {
  margin-bottom: 10px;
}
.submit_button {
  width: 100%;
}
</style>

