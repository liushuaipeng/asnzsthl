<template>
  <div class="voteAdmin">
    <div class="setTimeout">{{time}}秒</div>
    <div class="chart_wrapper">
      <el-card>
        <div id="J_chartBarBox" class="chart-box"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      chartBar: null,
      voteData: {},
      app: {},
      labelOption: {},
      color: ["#a557d9", "#44a275", "#fd5963", "#5970fd", "#fdd869"],
      time: 0,
      timeSetInterval:null
    };
  },
  mounted() {
    this.initChartBar();
    this.$socket.emit("connect");
  },
  activated() {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则可能会出现空白bug
    if (this.chartBar) {
      this.chartBar.resize();
    }
  },
  methods: {
    setData() {
      var option = {
        series: [
          {
            data: []
          }
        ]
      };

      for (const key in this.voteData.data) {
        this.voteData.voteList.forEach(item => {
          if (item.data.hasOwnProperty(key)) {
            option.series[0].data.push({
              name: item.data[key],
              value: this.voteData.data[key],
              itemStyle: {
                color: this.color[item.id]
              }
            });
          }
        });
      }
      this.chartBar.setOption(option);
    },

    initChartBar() {
      var posList = [
        "left",
        "right",
        "top",
        "bottom",
        "inside",
        "insideTop",
        "insideLeft",
        "insideRight",
        "insideBottom",
        "insideTopLeft",
        "insideTopRight",
        "insideBottomLeft",
        "insideBottomRight"
      ];
      this.app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: "left",
            center: "center",
            right: "right"
          }
        },
        verticalAlign: {
          options: {
            top: "top",
            middle: "middle",
            bottom: "bottom"
          }
        },
        position: {
          options: echarts.util.reduce(
            posList,
            function(map, pos) {
              map[pos] = pos;
              return map;
            },
            {}
          )
        }
      };
      this.app.config = {
        rotate: 90,
        align: "left",
        verticalAlign: "middle",
        position: "insideBottom",
        distance: 15,
        onChange: function() {
          var labelOption = {
            normal: {
              rotate: this.app.config.rotate,
              align: this.app.config.align,
              verticalAlign: this.app.config.verticalAlign,
              position: this.app.config.position,
              distance: this.app.config.distance
            }
          };
        }
      };
      this.labelOption = {
        normal: {
          show: true,
          position: this.app.config.position,
          distance: this.app.config.distance,
          align: this.app.config.align,
          verticalAlign: this.app.config.verticalAlign,
          rotate: this.app.config.rotate,
          formatter: "{c}  {b}",
          fontSize: 20,
          rich: {
            name: {
              textBorderColor: "#fff"
            }
          }
        }
      };
      var option = {
        backgroundColor: "#f8f8f8",
        title: {
          text: "投票展示",
          left: "center",
          itemGap: 30,
          textStyle: {
            color: "#666",
            fontSize: 40
          }
        },
        xAxis: {
          type: "category"
        },
        yAxis: {
          type: "value",
          min: 0,
          axisLabel: {
            textStyle: {
              fontSize: 30
            }
          }
        },
        series: [
          {
            data: [],
            type: "bar",
            label: this.labelOption
          }
        ]
      };
      this.chartBar = echarts.init(document.getElementById("J_chartBarBox"));
      this.chartBar.setOption(option);
      window.addEventListener("resize", () => {
        this.chartBar.resize();
      });
    }
  },
  sockets: {
    connect(res) {
      this.$socket.emit("voteInit", { url: "vote" }, data => {
        this.voteData = data;
        this.setData();
      });
    },
    voteChange(data) {
      this.voteData = data;
      this.setData();
    },
    voteTimeGo() {
      this.time = 0;
      this.timeSetInterval = setInterval(() => {
        this.time++;
      }, 1000);
    },
    voteTimeStop(){
      clearInterval(this.timeSetInterval)
    }
  }
};
</script>
<style scoped>
.setTimeout {
  text-align: center;
  height: 15vh;
  line-height: 15vh;
  font-size: 30px;
}
.chart_wrapper {
  padding: 20px;
}
.chart-box {
  width: 100%;
  min-height: 80vh;
}
</style>


