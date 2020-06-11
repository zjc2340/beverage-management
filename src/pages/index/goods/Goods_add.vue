<template>
  <el-card class="box-card">
    <div class="add_head">
      <span>商品添加</span>
    </div>
    <div class="add_body">
      <div class="name">
        <span>商品名称</span>
        <el-input v-model="name" placeholder="商品名称"></el-input>
      </div>
      <div class="classify">
        <span>商品分类</span>
        <el-select v-model="value" placeholder="请选择商品分类">
          <el-option v-for="item in category" :key="item.index" :value="item.cateName"></el-option>
        </el-select>
      </div>
      <div class="price">
        <span>商品价格</span>
        <el-input-number v-model="price" :min="0" label="描述文字"></el-input-number>
      </div>
      <div class="img">
        <span>商品图片</span>
        <div class="img_content">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="goodsDesc">
        <span>商品描述</span>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="goodsDesc"></el-input>
      </div>
      <el-button @click="addGoods" type="primary" class="add">添加商品</el-button>
    </div>
  </el-card>
</template>

<script>
import { API_GOODS_ADD, API_GOODS_CATEGROIES } from "@/api/apis";
export default {
  data() {
    return {
      name: "",
      price: "",
      goodsDesc: "",
      imgUrl: "",
      category: [],
      value: "",
      dialogVisible: false
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imgUrl = URL.createObjectURL(file.raw);
      this.newImg = res.imgUrl;
      console.log(this.newImg);
    },
    // 添加商品
    addGoods() {
      API_GOODS_ADD(this.name,this.value,this.price,this.newImg,this.goodsDesc).then(res => {
        if (res.data.code == 0) {
          this.name = ""
          this.value = ""
          this.price = ""
          this.imgUrl = ""
          this.goodsDesc = ""
          this.$message({
            message: res.data.msg,
            type: "success"
          });
        }
      });
    }
  },
  created() {
    API_GOODS_CATEGROIES().then(res => {
      this.category = res.data.categories;
    });
  }
};
</script>

<style lang="less" scoped>
.add_head {
  padding-bottom: 10px;
  border-bottom: 1px solid #edeff2;
}
.add_body {
  > div {
    margin-top: 20px;
    width: 500px;
    display: flex;
    align-items: center;
    span {
      width: 80px;
    }
    .el-input,
    .el-textarea {
      margin-left: 13px;
    }
    img {
      width: 100px;
      height: 100px;
    }
  }
  .add {
    margin: 20px 0 0 80px;
  }
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>