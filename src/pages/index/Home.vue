<template>
  <div id="home_body">
    <header>
      <div v-for="item in order_details" :key="item.id">
        <img :src="item.src" alt />
        <p>
          <span class="name">{{item.name}}</span>
          <span class="num">{{item.num}}</span>
        </p>
      </div>
    </header>
    <div class="echart_data" id="myCharts" ref="myCharts"></div>
  </div>
</template>

<script>
import { API_HOME_TOTALDATA } from "../../api/apis";
export default {
  data() {
    return {
      order_details: [
        {
          id: 1,
          name: "总订单",
          src: require("../../assets/images/总订单.png"),
          num: "12,400"
        },
        {
          id: 2,
          name: "总销售额",
          src: require("../../assets/images/总销售额.png"),
          num: "2,400"
        },
        {
          id: 3,
          name: "今日订单数",
          src: require("../../assets/images/今日订单.png"),
          num: "102,00"
        },
        {
          id: 4,
          name: "今日销售额",
          src: require("../../assets/images/当日销售额.png"),
          num: "102,40"
        }
      ]
    };
  },
  mounted() {
    API_HOME_TOTALDATA().then(res => {
        let {xData,orderData,amountData,totalOrder,totalAmount,todayOrder,totayAmount} = res.data
        // console.log(this.xData, this.orderData, this.amountData);

        // 存放总订单，总销售额，今日订单，今日销售额的数据
        let titleData = {
          totalOrder: totalOrder,
          totalAmount: totalAmount,
          todayOrder: todayOrder,
          totayAmount: totayAmount
        };
        let arr = [];
        // 获取总订单，总销售额，今日订单，今日销售额的数据放入数组
        Object.keys(titleData).forEach(key => {
          arr.push(titleData[key]);
        });
        // 循环遍历赋值给原对象中的num
        this.order_details.forEach((item, index) => {
          item.num = arr[index];
        });
        var myCharts = this.$echarts.init(this.$refs.myCharts);
        myCharts.showLoading();
        let option = {
          title: {
            text: "数据统计"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["订单", "金额"]
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: xData
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "订单",
              type: "line",
              stack: "总量",
              data: orderData
            },
            {
              name: "金额",
              type: "line",
              stack: "总量",
              data: amountData
            }
          ]
        };
        myCharts.setOption(option);
        myCharts.hideLoading();
      });
  },
};
</script>

<style lang="less" scoped>
header {
  height: 80px;
  display: flex;
  justify-content: space-around;
  div {
    flex: 10%;
    margin-right: 25px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 30px;
    &:last-of-type {
      margin: 0;
    }
    img {
      width: 50px;
      height: 50px;
    }
    p {
      display: flex;
      flex-direction: column;
      text-align: center;
      span {
        &.name {
          color: #dadada;
          margin-bottom: 5px;
        }
        &.num {
          font-weight: bold;
        }
      }
    }
  }
}
.echart_data {
  margin-top: 20px;
  height: 400px;
  width: 100%;
  background: white;
}
</style>