<template>
  <div id="login_body">
    <el-card class="box-card">
      <h2>优团订餐管理系统</h2>
      <el-input v-model="acc" type="text" placeholder="请输入用户名"></el-input>
      <el-input v-model="pwd" type="password" placeholder="请输入密码" class="pwd"></el-input>
      <el-button @click="loginBtn" type="primary" class="Btn">登录</el-button>
    </el-card>
  </div>
</template>

<script>
import { API_LOGIN } from "../api/apis";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      isreq: true
    };
  },
  methods: {
    loginBtn() {
      if (this.isreq == false) return;

      this.isreq = false;
      API_LOGIN(this.acc, this.pwd).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: "恭喜你，登录成功",
            type: "success"
          })
          this.$router.push('/index/home')
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("acc", this.acc);
          localStorage.setItem("role", res.data.role);
        }else{
          this.$message.error(res.data.msg);
        }
      });
      // this.$router.push('/index/home')
      setTimeout(() => {
        this.isreq = true;
      }, 3000);
    }
  }
};
</script>

<style lang="less" scoped>
@bgc: #2d3a4b;
#login_body {
  height: 100%;
  background: @bgc;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    text-align: center;
    width: 350px;
    h2 {
      color: @bgc;
    }
    .pwd {
      margin: 10px 0 20px 0;
    }
    .Btn {
      width: 100%;
    }
  }
}
</style>