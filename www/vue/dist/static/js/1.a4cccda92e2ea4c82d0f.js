webpackJsonp([1],{YCNw:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("mvHQ"),i=n.n(o),l={data:function(){return{form:{title:"",number:0},config:{state:0}}},methods:{onSubmit:function(){var t=this,e=JSON.parse(i()(this.form));this.$socket.emit("lotteryGoSubmit",e,function(e){t.config=e,console.log(t.config)})},onStart:function(){var t=this;this.$socket.emit("lotteryGoStart","go",function(e){t.config=e})},onStop:function(){var t=this;this.$socket.emit("lotteryGoStop","stop",function(e){t.config=e})},handleRemoveClick:function(t){var e=this;this.$confirm("确定删除ID为"+t+"的奖项吗？").then(function(n){e.$socket.emit("lotteryRemove",t,function(t){e.config=t})}).catch(function(t){})}},mounted:function(){this.$socket.emit("connect")},sockets:{connect:function(t){var e=this;this.$socket.emit("lotteryInit",{url:"lotteryAdmin"},function(t){e.config=t})}}},r={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"lotteryAdmin"},[n("el-card",{staticClass:"box-card"},[n("el-alert",{staticStyle:{margin:"20px 0"},attrs:{type:"warning",closable:!1}},[0===t.config.state?n("span",{attrs:{slot:"title"},slot:"title"},[t._v("请输入奖项名称以及人数")]):t._e(),t._v(" "),1===t.config.state?n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s("当前抽奖奖项: "+t.config.title+"; 抽奖人数: "+t.config.number+"; 开始抽奖请点击抽奖按钮；如需更改请直接下方输入并点击确定即可。"))]):t._e(),t._v(" "),2===t.config.state?n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s("当前抽奖奖项: "+t.config.title+"; 抽奖人数: "+t.config.number+"; 抽奖中，点击停止按钮即可确定本次抽奖人员。"))]):t._e(),t._v(" "),3===t.config.state?n("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s("当前抽奖奖项: "+t.config.title+"; 抽奖人数: "+t.config.number+"; 抽奖完成，抽奖结果如下表。再次抽奖请直接下方输入并点击确定即可。"))]):t._e()]),t._v(" "),n("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.form}},[n("el-form-item",{attrs:{label:"奖项名称"}},[n("el-input",{attrs:{placeholder:"例如：特等奖"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"人数"}},[n("el-input",{attrs:{placeholder:"例如：1"},model:{value:t.form.number,callback:function(e){t.$set(t.form,"number",t._n(e))},expression:"form.number"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary",disabled:!t.form.number||!t.form.title},on:{click:t.onSubmit}},[t._v("确定")])],1)],1),t._v(" "),n("div",{staticStyle:{"margin-bottom":"50px"}},[n("el-button",{attrs:{type:"success",disabled:1!==t.config.state},on:{click:t.onStart}},[t._v("开始抽奖")]),t._v(" "),n("el-button",{attrs:{type:"danger",disabled:2!==t.config.state},on:{click:t.onStop}},[t._v("停止抽奖")])],1),t._v(" "),n("el-table",{staticStyle:{width:"100%"},attrs:{border:"",data:t.config.data,stripe:""}},[n("el-table-column",{attrs:{prop:"id",label:"ID",width:"50"}}),t._v(" "),n("el-table-column",{attrs:{prop:"title",label:"奖项名称",width:"100"}}),t._v(" "),n("el-table-column",{attrs:{prop:"number",label:"人数",width:"100"}}),t._v(" "),n("el-table-column",{attrs:{prop:"result",label:"人员"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.result,function(e,o){return n("el-tag",{key:o,staticStyle:{margin:"0px 10px 0px 0"},attrs:{type:e.indexOf("红")>-1?"danger":""}},[t._v(t._s(e))])})}}])}),t._v(" "),n("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){t.handleRemoveClick(e.row.id)}}},[t._v("删除")])]}}])})],1)],1)],1)},staticRenderFns:[]};var s=n("VU/8")(l,r,!1,function(t){n("tp1L")},"data-v-b71285ce",null);e.default=s.exports},mvHQ:function(t,e,n){t.exports={default:n("qkKv"),__esModule:!0}},qkKv:function(t,e,n){var o=n("FeBl"),i=o.JSON||(o.JSON={stringify:JSON.stringify});t.exports=function(t){return i.stringify.apply(i,arguments)}},tp1L:function(t,e){}});
//# sourceMappingURL=1.a4cccda92e2ea4c82d0f.js.map