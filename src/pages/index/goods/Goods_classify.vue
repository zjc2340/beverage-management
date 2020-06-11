<template>
  <el-card class="box-card">
    <div class="classfiy_head">
      <span>商品分类</span>
      <div>
        <el-button size="mini" type="primary" @click="add_classfiy()">添加分类</el-button>
      </div>
      <!-- 添加分类模态框 -->
      <el-dialog title="添加分类" :visible.sync="addDialogFlag">
        <el-form :model="form">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-switch
              v-model="form.enable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="enable()"
            ></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取 消</el-button>
          <el-button type="primary" @click="addConfim(form.name, form.enable)">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改分类模态框 -->
      <el-dialog title="修改分类" :visible.sync="editDialogFlag">
        <el-form :model="form">
          <el-form-item label="分类名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-switch
              v-model="form.enable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="enable()"
            ></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel()">取 消</el-button>
          <el-button type="primary" @click="editConfim(form.name, form.enable)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column label="序号" width="120">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="cateName" label="分类名称" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.cateName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="enable" label="是否启用">
        <template slot-scope="scope">
          <el-switch
            style="display: block"
            v-model="scope.row.state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            disabled
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="group" label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="Edit(scope.$index,scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="Delete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </el-card>
</template>

<script>
import {
  API_GOODS_ADDCATE,
  API_GOODS_CATELIST,
  API_GOODS_DELCATE,
  API_GOODS_DEITCATE
} from "../../../api/apis";
export default {
  data() {
    return {
      form: {
        name: "",
        enable: 1,
        delivery: false,
        type: []
      },
      editDialogFlag: false,
      addDialogFlag: false,
      formLabelWidth: "100px",
      total: null,
      pageSize: 5,
      currentPage: 1,
      // tableData: [],
      newClassify: {
        name: "",
        enable: true
      },
      tableData: []
    };
  },

  methods: {
    // 封装获取分类列表
    getCateList() {
      API_GOODS_CATELIST(this.currentPage, this.pageSize).then(res => {
        let val = res.data.data;
        if (val) {
          val.forEach(val => {
            if (val.state == 1) {
              val.state = true;
            } else {
              val.state = false;
            }
          });
        }
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 封装成功提示
    successPrompt(res) {
      this.$message({
        message: res.data.msg,
        type: "success"
      });
    },
    // 封装错误提示
    errorPrompt(res) {
      this.$message.error(res.data.msg);
    },
    enable() {
      console.log(this.form.enable);
    },
    //   添加分类按钮
    add_classfiy() {
      this.addDialogFlag = true;
    },
    // 添加分类——取消
    cancel() {
      this.addDialogFlag = false;
      this.editDialogFlag = false;
    },
    // 添加分类——确定
    addConfim(name, enable) {
      this.addDialogFlag = false;
      API_GOODS_ADDCATE(name, JSON.stringify(enable)).then(res => {
        // console.log(res);
        if (res.data.code == 0) {
          this.successPrompt(res);
          this.getCateList();
        } else {
          console.log(res.data);
        }
      });
    },
    // 修改分类-保存
    editConfim(name, enable) {
      console.log(name, enable);
      API_GOODS_DEITCATE(this.id, name, JSON.stringify(enable)).then(res => {
        if (res.data.code == 0) {
          this.successPrompt(res);
          this.getCateList();
          this.editDialogFlag = false;
        } else {
          this.errorPrompt(res);
        }
      });
    },
    // 编辑
    Edit(index, row) {
      this.editDialogFlag = true;
      this.form.name = row.cateName;
      this.form.enable = row.state;
      this.id = row.id;
    },
    // 删除
    Delete(id) {
      this.$confirm("确认删除该条数据？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          API_GOODS_DELCATE(id).then(res => {
            if (res.data.code == 0) {
              this.successPrompt(res);
              this.getCateList();
            } else {
              this.errorPrompt(res);
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
      this.getCateList();
    }
  },
  created() {
    this.getCateList();
  }
};
</script>

<style lang="less" scoped>
.classfiy_head {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid #edeff2;
}
</style>
