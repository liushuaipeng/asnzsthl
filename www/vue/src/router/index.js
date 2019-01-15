import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component(resolve) {
        return require(["@/components/home"], resolve);
      }
    },
    {
      path: "/lottery",
      name: "lottery",
      component(resolve) {
        return require(["@/components/lottery"], resolve);
      }
    },
    {
      path: "/lotteryAdmin",
      name: "lotteryAdmin",
      component(resolve) {
        return require(["@/components/lotteryAdmin"], resolve);
      }
    },
    {
      path: "/vote",
      name: "vote",
      component(resolve) {
        return require(["@/components/vote"], resolve);
      }
    },
    {
      path: "/voteAdmin",
      name: "voteAdmin",
      component(resolve) {
        return require(["@/components/voteAdmin"], resolve);
      }
    },
    {
      path: "/voteTool",
      name: "voteTool",
      component(resolve) {
        return require(["@/components/voteTool"], resolve);
      }
    }
  ]
});
