<template>
  <el-card class="box-card">
    <div class="Administrator_head">
      <span>管理员信息</span>
    </div>
    <div class="Administrator_body">
      <p>
        <span>管理员id:</span>
        <span>{{infoList.id}}</span>
      </p>
      <p>
        <span>账号:</span>
        <span>{{infoList.account}}</span>
      </p>
      <p>
        <span>用户组:</span>
        <span>{{infoList.userGroup}}</span>
      </p>
      <p>
        <span>创建时间:</span>
        <span>{{new Date(infoList.ctime).toJSON().substr(0,19).replace("T"," ")}}</span>
      </p>
      <p class="portrait">
        <span>管理员头像:</span>
        <img :src="infoList.imgUrl" alt />
        <el-upload
          class="avatar-uploader"
          :action="imgUpload"
          :data="upload"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </p>
    </div>
  </el-card>
</template>

<script>
import { API_USER_ACCINFO,SERVE_USERS_UPLOAD } from "@/api/apis.js";
export default {
  data() {
    return {
      imgUpload:SERVE_USERS_UPLOAD,
      dialogVisible: false,
      infoList: {},
      imageUrl: "",
      upload: {
        id: 0
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      document.getElementById("upImg").src = this.imageUrl;
      this.id = localStorage.getItem("id");
      // 获取账号信息
      API_USER_ACCINFO(this.id).then(res => {
        this.infoList = res.data.accountInfo;
        // 显示用户名
        // this.loginUser = `欢迎回来，${this.acc}`;
        // 将账号信息转成字符串存入本地存储
        localStorage.setItem("infoList", JSON.stringify(res.data.accountInfo));
        this.imageUrl = ""
      });
    }
  },
  created() {
    this.infoList = JSON.parse(localStorage.getItem("infoList"));
    this.upload.id = this.infoList.id;
  }
};
</script>

<style lang="less" scoped>
.Administrator_head {
  padding-bottom: 10px;
  border-bottom: 1px solid #edeff2;
}
p {
  width: 100%;
  line-height: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #edeff2;
  display: flex;
  > span:first-of-type {
    display: block;
    width: 100px;
  }
  &.portrait {
    display: flex;
    align-items: center;
    border: none;

    > img {
      width: 70px;
      height: 70px;
    }
    .el-button {
      margin-left: 20px;
    }
  }
}
.el-upload--text {
  margin: 0 auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>