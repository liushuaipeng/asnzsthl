# asnzsthl

> 一个抽奖和投票的小应用。后台使用node，前端使用vue+element，socket通信。

## 开发环境

* 在"/"和在"/www/vue"下分别执行npm install
* "/"下执行node server，启动node后台，默认端口3000
* "/www/vue"下执行npm run dev，启动前端开发环境，默认端口8080

## 生产环境
* 在config.js下配置host以及port
* 在"/www/vue"执行npm run build
* 生产环境下只有"/www/vue/dist"的文件有效，"/www/vue"下的其他文件可以删除

## 注意事项
* 切记！！！务必先修改配置文件，然后前端构建npm run build