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
    }
  ]
});
