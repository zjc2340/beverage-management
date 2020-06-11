<template>
  <div id="shops_body">
    <div class="shops_header">
      <span class="title">店铺管理</span>
      <el-button type="primary" v-if="!editFlag" size="small" @click="edit()">修改</el-button>
      <el-button type="success" v-else size="small" @click="save()">保存</el-button>
    </div>
    <div class="shops_details">
      <el-form ref="form" :model="shopsData" label-width="80px" size="medium">
        <el-form-item label="店铺ID">
          <span>{{shopsData.id}}</span>
        </el-form-item>
        <el-form-item label="店铺名称">
          <el-input v-model="shopsData.name" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input type="textarea" v-model="shopsData.bulletin" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="店铺头像" class="img">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/shop/upload"
            :show-file-list="false"
            :on-success="portrait"
          >
            <img v-if="shopsData.avatar" :src="shopsData.avatar" width="150" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片">
          <el-upload
            action="http://127.0.0.1:5000/shop/upload"
            list-type="picture-card"
            :on-success="shopsImg"
            :on-remove="handleRemove"
            :file-list="fileList"
            :disabled="disabled"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input v-model="shopsData.deliveryPrice" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="送达时间">
          <el-input v-model="shopsData.deliveryTime" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="配送描述">
          <el-input v-model="shopsData.description" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分">
          <el-input v-model="shopsData.score" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="shopsData.sellCount" :disabled="disabled"></el-input>
        </el-form-item>
        <el-form-item label="活动">
          <el-checkbox-group v-model="checkList" width="150px" :disabled="disabled">
            <el-checkbox
              v-for="(item,index) in supports"
              :key="index"
              :label="item"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-picker
            is-range
            v-model="shopsData.date"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            :disabled="disabled"
            :default-time="['00:00:00', '23:59:59']"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="起送价格">
          <el-input v-model="shopsData.minPrice" :disabled="disabled"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>

import { API_SHOP_INFO, API_SHOP_EDIT} from "../../api/apis";
export default {
  data() {
    return {
      imgUrl: "http://127.0.0.1:5000/upload/shop/",
      upImg: "",
      disabled: true,
      editFlag: false,
      dialogVisible: false,
      fileList: [],
      checkList: [],
      supports:["单人精彩套餐","VC无限橙果汁全场8折","在线支付满28减5","特价饮品8折抢购"],
      shopsData: {},
      pics:[]
    };
  },
  methods: {
    getList(){
      API_SHOP_INFO().then(res => {
      this.shopsData = res.data.data;
      this.shopsData.avatar = this.imgUrl + this.shopsData.avatar;
      this.checkList = res.data.data.supports
      let listarray = res.data.data.pics;
      listarray.forEach(item => {
        let obj = {
          url: this.imgUrl + item
        };
        this.fileList.push(obj);
      });
    });
    },
    // 修改
    edit() {
      this.disabled = false;
      this.editFlag = true;
    },
    // 完成
    save() {
      let {id,name,bulletin,deliveryPrice,deliveryTime,description,score,sellCount,date} = this.shopsData 
      API_SHOP_EDIT(id,name,bulletin,this.newImg,deliveryPrice,deliveryTime,description,score,sellCount,JSON.stringify(this.checkList),JSON.stringify(this.pics),JSON.stringify(date)).then(res => {
        if (res.data.code == 0) {
          this.disabled = true;
          this.editFlag = false;
          this.getList()
        }
      });
    },
    handleRemove(file, fileList) {
      this.fileArray = []; //初始化我装图片地址的容器，（我需要传给后端的）
      fileList.forEach(item => {
        try {
          this.fileArray.push(item.response.result); //这是还没有上传到服务器的时候，移除某一个图片的
        } catch (e) {
          //当抛出异常时的处理
          this.fileArray.push(item.url); //回显之后，移除某一个图片
        }
      });
    },
    portrait(res, file) {
      this.shopsData.avatar = URL.createObjectURL(file.raw);
      this.newImg = res.imgUrl;
    },
    shopsImg(res, file, fileList) {
      console.log(fileList);
      this.pics.push(res.imgUrl);
      console.log(this.pics);
      
    },

  },
  created() {
    this.getList()
  }
};
</script>
<style lang="less" scoped>
#shops_body {
  background: white;
  .shops_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f0f2f5;
    padding: 10px 20px;
  }
  .shops_details {
    padding: 10px 0 20px 30px;
    height: 100%;
    font-size: 14px;
    .el-checkbox-group {
      width: 300px;
    }
    .el-input,
    .el-textarea {
      width: 300px;
    }
    .el-image {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
}
</style>