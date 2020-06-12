<template>
  <el-card class="box-card">
    <div class="list_head">
      <span>商品列表</span>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img :src="props.row.imgUrl" alt />
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{new Date(props.row.ctime).toJSON().substr(0,19).replace("T"," ")}}</span>
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="所属分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="商品图片">
        <template slot-scope="props">
          <img :src="props.row.imgUrl" alt />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button size="mini" type="primary" @click="Edit(props.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="Delete(props.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="收货地址" :visible.sync="editData">
      <el-form :model="newData">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="newData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" :label-width="formLabelWidth">
          <el-select v-model="newData.value" placeholder="请选择商品分类">
            <el-option v-for="item in newData.category" :key="item.index" :value="item.cateName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input-number v-model="newData.price" :min="0" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片" :label-width="formLabelWidth">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
          >
            <img v-if="newData.imgUrl" :src="newData.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="newData.goodsDesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editData = false">取消</el-button>
        <el-button type="primary" @click="alterEdit">修改</el-button>
      </div>
    </el-dialog>
    <div class="block" style="margin-top: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import {
  API_GOODS_LIST,
  API_GOODS_DEL,
  API_GOODS_CATEGROIES,
  API_GOODS_EDIT
} from "../../../api/apis";
export default {
  data() {
    return {
      imgUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      editData: false,
      formLabelWidth: "120px",
      newData: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: "",
        id: "",
        value: ""
      }
    };
  },
  methods: {
    // 获取商品列表
    getList() {
      API_GOODS_LIST(this.currentPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
        this.tableData.forEach((element, index) => {
          this.tableData[index].imgUrl =
          this.imgUrl + this.tableData[index].imgUrl;
        });
      });
    },
    // 编辑
    Edit(row) {
      API_GOODS_CATEGROIES().then(res => {
        this.newData.category = res.data.categories;
      });
      this.editData = true;
      this.newData.id = row.id;
      this.newData.name = row.name;
      this.newData.value = row.category;
      this.newData.price = row.price;
      this.newData.imgUrl = row.imgUrl;
      this.newData.goodsDesc = row.goodsDesc;
    },
    // 修改
    alterEdit(){
      this.editData = false
      API_GOODS_EDIT(this.newData.name,this.newData.value,this.newData.price,this.newImg,this.newData.goodsDesc,this.newData.id).then(res=>{
        if(res.data.code == 0){
          this.getList()
        }
      })
    },
    handleAvatarSuccess(res, file) {
      this.newData.imgUrl = URL.createObjectURL(file.raw);
      this.newImg = res.imgUrl;
      console.log(this.newImg);
    },
    // 删除
    Delete(id) {
      this.$confirm("确认删除该条数据？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          API_GOODS_DEL(id).then(res => {
            if (res.data.code == 0) {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.getList();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
.list_head {
  padding-bottom: 10px;
  border-bottom: 1px solid #edeff2;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-left: 10px;
  margin-bottom: 0;
  width: 40%;
}
img {
  width: 50px;
  height: 50px;
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