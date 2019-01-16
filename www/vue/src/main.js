// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueSocketio from "vue-socket.io";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// var nodeConfig = require("./config.js").nodeConfig;
import { nodeConfig } from "../../../config";
Vue.config.productionTip = false;
Vue.use(ElementUI);
var socketurl;
// 开发环境
if (process.env.NODE_ENV === "development") {
  socketurl = nodeConfig.host + ":" + nodeConfig.port + "/";
}
// 生产环境
if (process.env.NODE_ENV === "production") {
  socketurl = location.hostname + ":" + location.port;
}
Vue.use(
  new VueSocketio({
    connection: socketurl
  })
);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
