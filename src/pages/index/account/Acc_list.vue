<template>
  <el-card class="box-card">
    <div class="list_head">账号列表</div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="账号" width="150">
        <template slot-scope="scope">
          <!-- <span v-if="!scope.row.isSet">{{ scope.row.account }}</span> -->
          {{ scope.row.account }}
          <!-- <el-input type="text" class="account" v-model="scope.row.account" v-else></el-input> -->
        </template>
      </el-table-column>
      <el-table-column label="用户组" width="250">
        <template slot-scope="scope">
          <!-- <span v-if="!scope.row.isSet">{{ scope.row.userGroup }}</span> -->
          {{ scope.row.userGroup }}
          <!-- <el-input type="text" class="userGroup" v-model="scope.row.userGroup" v-else></el-input> -->
        </template>
      </el-table-column>
      <el-table-column prop="ctime" label="创建时间" show-overflow-tooltip>
        <template
          slot-scope="scope"
        >{{new Date(scope.row.ctime).toJSON().substr(0,19).replace("T"," ")}}</template>
      </el-table-column>
      <el-table-column prop="group" label="操作" width="250">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="primary" @click.native.prevent="handleEdit(scope.$index, scope.row)" v-if="!editFlag">编辑</el-button> -->
          <!-- <el-button
            size="mini"
            type="primary"
            v-else
            @click.native.prevent="handleCancel(scope.row)"
          >完成</el-button>-->
          <el-button
            size="mini"
            type="primary"
            @click.native.prevent="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button size="mini" type="danger" @click="Delete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="账号名" :label-width="formLabelWidth">
          <el-input v-model="name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组" :label-width="formLabelWidth">
          <el-select v-model="group" @change="selectGet" placeholder="请选择用户组">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
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
    <div style="margin-top: 20px">
      <el-button type="danger" @click="batchDelete()">批量删除</el-button>
      <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
    </div>
  </el-card>
</template>

<script>
import {
  API_ADD_LIST,
  API_ADD_DEL,
  API_ADD_BATCHDEL,
  API_ADD_EDIT
} from "../../../api/apis.js";
export default {
  data() {
    return {
      name: "",
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
      group: "",
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "100px",
      // editFlag: false,
      total: null,
      pageSize: 5,
      currentPage: 1,
      tableData: [],
      multipleSelection: []
    };
  },

  methods: {
    // 封装获取账号列表
    getlist() {
      API_ADD_LIST(this.currentPage, this.pageSize).then(res => {
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
    // 取消选择
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    // 选择行数
    handleSelectionChange(data) {
      // this.multipleSelection = data;
      // 遍历行数据
      //map()
      // this.ids = `[${data.map(item=>item.id)}]`
      this.ids = data.map(item => item.id);
      console.log(this.ids);
      
      // forEach()
      // let val = data;
      // if (val) {
      //   val.forEach(val => {
      //     this.delData.push(val.id);
      //     this.ids = `[${this.delData}]`;
      //   });
      // }
    },
    // 批量删除
    batchDelete() {
      if(!this.ids || this.ids.length==0){
        this.$message({
          message: '请先勾选要删除的数据',
          type: 'warning'
        });
        return false
      }
      this.$confirm("此操作将永久删除数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        API_ADD_BATCHDEL(JSON.stringify(this.ids)).then(res => {
          if (res.data.code == 0) {
            this.successPrompt(res);
            this.getlist();
          }
        });
      });
      // 发送请求
    },
    // 用户组选择
    selectGet(val) {
      let obj = {};
      obj = this.options.find(item => {
        return item.value === val;
      });
      this.userGroup = obj.label;
    },
    // 编辑
    handleEdit(index, row) {
      this.group = row.userGroup;
      this.name = row.account;
      this.dialogFormVisible = true;
      this.id = row.id;
    },
    // 编辑——取消
    cancel() {
      this.dialogFormVisible = false;
    },
    // 编辑——确定
    confirm() {
      console.log(this.name);
      console.log(this.id);
      API_ADD_EDIT(this.id, this.name, this.userGroup).then(res => {
        if (res.data.code == 0) {
          this.successPrompt(res);
          this.getlist();
        } else {
          this.successPrompt(res);
        }
      });
      this.dialogFormVisible = false;
    },
    // 完成
    handleCancel(row) {
      // this.editFlag = false;
      // row.isSet = false;
      API_ADD_EDIT(row.id, row.account, row.userGroup).then(res => {
        if (res.data.code == 0) {
          this.successPrompt(res);
        } else {
          this.successPrompt(res);
        }
      });
    },
    // 删除
    Delete(id) {
      API_ADD_DEL(id).then(res => {
        if (res.data.code == 0) {
          this.successPrompt(res);
          this.getlist();
        } else {
          this.errorPrompt(res);
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
    }
  },
  created() {
    this.getlist();
  }
};
</script>

<style lang="less" scoped>
.list_head {
  padding-bottom: 10px;
  border-bottom: 1px solid #edeff2;
}
</style>