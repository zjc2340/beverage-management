<template>
  <div id="Sta_order">
    <div class="header">
      <span>时间范围</span>
      <div class="block">
        <el-date-picker
          v-model="mountedDate"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </div>
      <el-button type="primary" @click="query()">查询</el-button>
    </div>
    <div class="chart">
      <div id="myCharts" ref="myCharts"></div>
    </div>
  </div>
</template>
<script>
import { API_ORDER_ORDERTOTAL } from "@/api/apis.js";
export default {
  data() {
    return {
      date: "",
      orderTime:[],
      orderAmount:[],
      mountedDate:["2020-06-01 00:00:00","2020-06-04 23:59:59"]
    };
  },
  methods: {
    query() {
      console.log(JSON.stringify(this.mountedDate));
      this.orderTime = []
      this.orderAmount = []
      API_ORDER_ORDERTOTAL(JSON.stringify(this.mountedDate)).then(res => {
        this.chartData = res.data.data;
        res.data.data.forEach(item=>{
          this.orderTime.push(new Date(item.orderTime).toJSON().substr(0,19).replace("T"," "))
          this.orderAmount.push(item.orderAmount)
        })
        this.drawLine();
      });
    },
    drawLine() {
      var myCharts = this.$echarts.init(this.$refs.myCharts);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["订单金额"]
        },
        xAxis: [
          {
            type: "category",
            data: this.orderTime,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "订单金额",
            axisLabel: {
              formatter: "{value} 元"
            }
          }
        ],
        series: [
          {
            name: "订单金额",
            type: "bar",
            data: this.orderAmount
          }
        ]
      };
      myCharts.setOption(option);
    }
  },
  mounted() {
    console.log(JSON.stringify(this.mountedDate));
    
    API_ORDER_ORDERTOTAL(JSON.stringify(this.mountedDate)).then(res => {
        this.chartData = res.data.data;
        res.data.data.forEach(item=>{
          this.orderTime.push(new Date(item.orderTime).toJSON().substr(0,19).replace("T"," "))
          this.orderAmount.push(item.orderAmount)
        })
        this.drawLine();
      });
    
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .block {
    margin: 0 20px;
  }
}
.chart {
  padding: 20px 0 20px 20px;
  height: 100%;
  background: white;
}
#myCharts {
  width: 100%;
  height: 500px;
}
</style>