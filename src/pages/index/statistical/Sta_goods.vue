<template>
  <div id="Sta_goods">
    <div class="header">
      <span>时间范围</span>
      <div class="block">
        <el-date-picker
          v-model="date"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        ></el-date-picker>
      </div>
      <el-button type="primary">查询</el-button>
    </div>
    <div class="chart">
      <p>图表区域</p>
      <p>图表区域</p>
      <p>图表区域</p>
      <p>图表区域</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: ""
    };
  }
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
</style>