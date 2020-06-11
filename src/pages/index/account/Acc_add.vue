<template>
  <el-card class="box-card">
    <div class="acc_head">添加账号</div>
    <div class="acc_body">
      <p>
        <span>账号</span>
        <el-input v-model="acc" placeholder="请输入账号"></el-input>
      </p>
      <p>
        <span>密码</span>
        <el-input v-model="pwd" type="password" placeholder="请输入密码"></el-input>
      </p>
      <p>
        <span>用户组</span>
        <el-select @change="selectGet" v-model="group" placeholder="请选择用户组">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </p>
      <p class="Btn">
        <el-button type="primary" @click="add()" class="sub">添加</el-button>
        <el-button @click="reset()">重置</el-button>
      </p>
    </div>
  </el-card>
</template>

<script>
import { API_ADD_ACCOUNT } from "../../../api/apis.js";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      options: [
        {
          value: "选项1",
          label: "超级管理员"
        },
        {
          value: "选项2",
          label: "普通管理员"
        }
      ],
      group: ""
    };
  },
  methods: {
    selectGet(val) {
      let obj = {};
      obj = this.options.find(item => {
        return item.value === val;
      });
      this.userGroup = obj.label;
    },
    add() {
      API_ADD_ACCOUNT(this.acc, this.pwd, this.userGroup).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    reset() {
      this.acc = "";
      this.pwd = "";
      this.group = "";
    }
  }
};
</script>

<style lang="less" scoped>
.acc_head {
  padding-bottom: 10px;
  border-bottom: 1px solid #edeff2;
}
.acc_body {
  p {
    display: flex;
    width: 350px;
    align-items: center;
    span {
      width: 60px;
      display: block;
      margin-right: 20px;
    }
    .el-input {
      margin-left: 10px;
    }
    .el-select {
      width: 300px;
    }
    .sub {
      margin-left: 75px;
    }
  }
}
</style>