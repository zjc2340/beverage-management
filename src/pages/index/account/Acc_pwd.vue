<template>
  <el-card class="box-card">
    <div class="pwd_head">修改密码</div>
    <div class="pwd_body">
      <p>
        <span>密码</span>
        <el-input v-model="pwd" type="password" placeholder="请输入原密码" @blur="checkOldPwd()"></el-input>
      </p>
      <p>
        <span>新密码</span>
        <el-input v-model="newPwd" type="password" placeholder="请输入新密码" @keyup="newPwd()"></el-input>
      </p>
      <p>
        <span>确认新密码</span>
        <el-input v-model="confirmPwd" type="password" placeholder="请确认新密码" @blur="dbNewPwd()"></el-input>
      </p>
      <p class="Btn">
        <el-button type="primary" @click="submitForm()" class="sub">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </p>
    </div>
  </el-card>
</template>

<script>
import { API_USER_CHECKOLDPWD, API_USER_EDITPWD } from "../../../api/apis";
export default {
  data() {
    return {
      // oldPwd: "",
      id: null,
      pwd: "",
      newPwd: "",
      confirmPwd: ""
    };
  },
  methods: {
    // 旧密码验证
    checkOldPwd() {
      API_USER_CHECKOLDPWD(this.pwd, this.id).then(res => {
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
    // 确认新密码
    dbNewPwd() {
      if (this.newPwd == this.confirmPwd)
        this.$message({
          message: "确认新密码正确！",
          type: "success"
        });
      else this.$message.error("确认新密码错误");
    },
    // 提交修改密码
    submitForm() {
      if (!(this.pwd && this.newPwd && this.confirmPwd)) return;
      API_USER_EDITPWD(this.newPwd, this.id).then(res => {
        if (res.data.code == 0) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.pwd = "";
          this.newPwd = "";
          this.confirmPwd = "";
          setTimeout(() => {
            this.$router.push('/')
          }, 1500);
        } else {
          this.$message.error(res.data.msg);
        }
      });
      // console.log(1);
    },
    // 重置输入框
    resetForm() {
      this.pwd = "";
      this.newPwd = "";
      this.confirmPwd = "";
    }
  },
  mounted() {
    this.id = sessionStorage.getItem("id");
    // this.oldPwd = sessionStorage.getItem("oldPwd");
    console.log(this.id);
    // console.log(this.oldPwd);
  }
};
</script>

<style lang="less" scoped>
.acc_head {
  padding-bottom: 10px;
  border-bottom: 1px solid #edeff2;
}
.pwd_body {
  p {
    display: flex;
    width: 350px;
    align-items: center;
    span {
      width: 110px;
      display: block;
      margin-right: 10px;
    }
    .sub {
      margin-left: 90px;
    }
  }
}
</style>