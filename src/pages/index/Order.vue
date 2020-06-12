<template>
  <div id="order_body">
    <div class="input">
      <div>
        <span>
          订单号
          <el-input v-model="orderNo" placeholder="订单号"></el-input>
        </span>
        <span>
          收货人
          <el-input v-model="consignee" placeholder="收货人"></el-input>
        </span>
        <span>
          手机号
          <el-input v-model="phone" placeholder="手机号"></el-input>
        </span>
        <span>
          订单状态
          <el-select @change="selectGet" v-model="orderState" slot="prepend" placeholder="订单状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
      </div>
      <div class="block">
        <span class="demonstration">选择时间</span>
        <el-date-picker
          v-model="date"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
        <el-button type="primary" class="query" @click="query()">查询</el-button>
      </div>
    </div>
    <!-- 查看订单信息 -->
    <el-dialog title="订单详情" :visible.sync="viewFlag">
      <el-form>
        <el-form-item label="id" :label-width="formLabelWidth">
          <span>{{viewData.id}}</span>
        </el-form-item>
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <span>{{viewData.orderNo}}</span>
        </el-form-item>
        <el-form-item label="下单时间" :label-width="formLabelWidth">
          <span>{{viewData.orderTime}}</span>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <span>{{viewData.phone}}</span>
        </el-form-item>
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <span>{{viewData.consignee}}</span>
        </el-form-item>
        <el-form-item label="送货地址" :label-width="formLabelWidth">
          <span>{{viewData.deliverAddress}}</span>
        </el-form-item>
        <el-form-item label="送达" :label-width="formLabelWidth">
          <span>{{viewData.deliveryTime}}</span>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <span>{{viewData.remarks}}</span>
        </el-form-item>
        <el-form-item label="订单金额" :label-width="formLabelWidth">
          <span>{{viewData.orderAmount}}</span>
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <span>{{viewData.orderState}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="viewFlag = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改订单信息 -->
    <el-dialog title="修改订单" :visible.sync="editFlag">
      <el-form>
        <el-form-item label="id" :label-width="formLabelWidth">
          <span>{{editData.id}}</span>
        </el-form-item>
        <el-form-item label="订单号" :label-width="formLabelWidth">
          <span>{{editData.orderNo}}</span>
        </el-form-item>
        <el-form-item label="下单时间" :label-width="formLabelWidth">
          <!-- <div class="block">
            <el-date-picker v-model="editData.orderTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']" clear-icon width="500"></el-date-picker>
          </div> -->
          <span>{{editData.orderTime}}</span>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="editData.phone"></el-input>
        </el-form-item>
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-input v-model="editData.consignee"></el-input>
        </el-form-item>
        <el-form-item label="送货地址" :label-width="formLabelWidth">
          <el-input v-model="editData.deliverAddress"></el-input>
        </el-form-item>
        <el-form-item label="送达" :label-width="formLabelWidth">
          <div class="block">
            <el-date-picker v-model="editData.deliveryTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss" :default-time="['00:00:00', '23:59:59']" clear-icon></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="editData.remarks"></el-input>
        </el-form-item>
        <el-form-item label="订单金额" :label-width="formLabelWidth">
          <el-input v-model="editData.orderAmount"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-input v-model="editData.orderState"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editFlag = false">取消</el-button>
        <el-button type="primary" @click="editSub()">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" border align="right" style="width: 100%">
      <el-table-column fixed prop="orderNo" label="订单号"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="120">
        <template
          slot-scope="props"
        >{{new Date(props.row.orderTime).toJSON().substr(0,19).replace("T"," ")}}</template>
      </el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="consignee" label="收货人"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="100"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="120">
        <template
          slot-scope="props"
        >{{new Date(props.row.deliveryTime).toJSON().substr(0,19).replace("T"," ")}}</template>
      </el-table-column>
      <el-table-column prop="remarks" label="用户备注"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额"></el-table-column>
      <el-table-column prop="orderState" label="订单状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="view(scope.row.id)" type="text" size="small">查看</el-button>
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {API_ORDER_LIST,API_ORDER_SEARCH,API_ORDER_DETAIL,API_ORDER_EDIT} from "../../api/apis";
export default {
  data() {
    return {
      formLabelWidth: "120px",
      viewFlag: false,
      editFlag: false,
      currentPage: 1,
      pageSize: 5,
      total: null,
      tableData: [],
      options: [
        {
          value: "选项1",
          label: "已受理"
        },
        {
          value: "选项2",
          label: "派送中"
        },
        {
          value: "选项3",
          label: "已完成"
        }
      ],
      viewData: {},
      editData: {},
      group: "",
      orderNo:"",
      consignee:"",
      phone:"",
      orderState:"",
      date:""
    };
  },
  methods: {
    getList() {
      API_ORDER_LIST(this.currentPage,this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    selectGet(val) {
      let obj = {};
      obj = this.options.find(item => {
        return item.value === val;
      });
      this.orderState = obj.label;
    },
    // 查看
    view(id) {
      this.viewFlag = true;
      API_ORDER_DETAIL(id).then(res => {
        this.viewData = res.data.data;
        this.viewData.orderTime = new Date(res.data.data.orderTime).toJSON().substr(0, 19).replace("T", " ");
        this.viewData.deliveryTime = new Date(res.data.data.deliveryTime).toJSON().substr(0, 19).replace("T", " ");
      });
    },
    // 编辑
    edit(row) {
      this.editFlag = true;
      this.editData = row;
      this.editData.orderTime = new Date(row.orderTime).toJSON().substr(0, 19).replace("T", " ");
      this.editData.deliveryTime = new Date(row.deliveryTime).toJSON().substr(0, 19).replace("T", " ");
    },
    // 修改订单-确定
    editSub() {
      
      let newData = {...this.editData}
      API_ORDER_EDIT(newData).then(res=>{
        console.log(res.data);
        
        if(res.data.code == 0) this.getList()
        this.editFlag = false
      })
    },
    // 查询
    query() {
      this.date = JSON.stringify(this.date);
      API_ORDER_SEARCH(this.currentPage,this.pageSize,this.orderNo,this.consignee,this.phone,this.orderState,this.date).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
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
#order_body {
  background: white;
  width: 100%;
  height: 100%;
  .el-table--border {
    border: none;
  }
  .el-select,
  .el-input {
    width: 170px;
    margin: 0 5px;
  }
  .input {
    padding: 20px 0 0 20px;
    margin-bottom: 20px;
    .block {
      margin-top: 15px;
      .demonstration {
        margin-right: 10px;
      }
      .query {
        margin-left: 20px;
      }
    }
  }

  > .block {
    margin: 10px 0 0 10px;
  }
}
</style>
