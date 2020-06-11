<template>
  <el-container>
    <el-aside width="200px">
      <div class="aside_header">
        <img src="../assets/images/优.png" alt />
        <h1>后台管理中心</h1>
      </div>
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        background-color="#2D3A4B"
        text-color="#fff"
        active-text-color="#3F9BF9"
        router
        unique-opened
      >
        <div v-for="item in roleTree" :key="item.index">
          <el-submenu v-if="item.children" :index="item.index">
            <template slot="title">
              <i :class="item.icls"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="child in item.children"
                :key="child.index"
                :index="child.index"
              >{{child.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-else :index="item.index">
            <i :class="item.icls"></i>
            <span slot="title">{{item.title}}</span>
          </el-menu-item>
        </div>
        <!-- <el-menu-item index="/index/home">
          <i class="el-icon-s-home"></i>
          <span slot="title">后台首页</span>
        </el-menu-item>
        <el-menu-item index="/index/order">
          <i class="el-icon-s-order"></i>
          <span slot="title">订单管理</span>
        </el-menu-item>
        <el-submenu index="/index/goods/goods_list">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/index/goods/goods_list">商品列表</el-menu-item>
            <el-menu-item index="/index/goods/goods_add">商品添加</el-menu-item>
            <el-menu-item index="/index/goods/goods_classify">商品分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="/index/shops">
          <i class="el-icon-s-shop"></i>
          <span slot="title">店铺管理</span>
        </el-menu-item>
        <el-submenu index="/index/account/acc_list">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>账号管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/index/account/acc_add">添加账号</el-menu-item>
            <el-menu-item index="/index/account/acc_list">账号列表</el-menu-item>
            <el-menu-item index="/index/account/acc_pwd">修改密码</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="/index/statistical/sta_goods">
          <template slot="title">
            <i class="el-icon-pie-chart"></i>
            <span>销售统计</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/index/statistical/sta_goods">商品统计</el-menu-item>
            <el-menu-item index="/index/statistical/sta_order">订单统计</el-menu-item>
          </el-menu-item-group>
        </el-submenu>-->
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="item in breadList" :key="item">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="photo">
          <p v-html="loginUser">
            <!-- 欢迎回来，
            <span>{{infoList.account}}</span>-->
          </p>
          <router-link to="/index/Administrator">
            <img id="upImg" :src="infoList.imgUrl" alt />
          </router-link>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { API_USER_ACCINFO, API_CHECK_TOKEN } from "../api/apis";
export default {
  data() {
    return {
      // treeList:树菜单选项卡
      //    index:跳转的hash值
      //    icls:选项卡图标
      //    title:选项卡名称
      //    children:一级选项卡下的二级选项卡数据
      treeList: [
        { index: "/index/home", icls: "el-icon-s-home", title: "后台首页",role:["super","normal"]},
        { index: "/index/order", icls: "el-icon-s-order", title: "订单管理",role:["super","normal"]},
        {
          index: "/index/goods/goods_list",
          icls: "el-icon-s-goods",
          title: "商品管理",
          role:["super"],
          children: [
            {
              index: "/index/goods/goods_list",
              title: "商品列表"
            },
            {
              index: "/index/goods/goods_add",
              title: "商品添加"
            },
            {
              index: "/index/goods/goods_classify",
              title: "商品分类"
            }
          ]
        },
        { index: "/index/shops", icls: "el-icon-s-shop", title: "店铺管理",role:["super","normal"]},
        {
          index: "/index/account//acc_list",
          icls: "el-icon-s-custom",
          title: "账号管理",
          role:["super"],
          children: [
            {
              index: "/index/account/acc_add",
              title: "添加账号"
            },
            {
              index: "/index/account/acc_list",
              title: "账号列表"
            },
            {
              index: "/index/account/acc_pwd",
              title: "修改密码"
            }
          ]
        },
        {
          index: "/index/statistical/sta_goods",
          icls: "el-icon-pie-chart",
          title: "销售统计",
          role:["super"],
          children: [
            {
              index: "/index/statistical/sta_goods",
              title: "商品统计"
            },
            {
              index: "/index/statistical/sta_order",
              title: "订单统计"
            }
          ]
        }
      ],
      breadList: [],
      defaultActive: "",
      infoList: [],
      loginUser: "未登录，请登录！"
    };
  },
  methods: {
    changeRouter(hash) {
      let arr = [];
      switch (hash) {
        case "/index/home":
          arr = ["首页"];
          break;
        case "/index/order":
          arr = ["订单管理"];
          break;
        case "/index/goods/goods_list":
          arr = ["商品管理", "商品列表"];
          break;
        case "/index/goods/goods_add":
          arr = ["商品管理", "商品添加"];
          break;
        case "/index/goods/goods_classify":
          arr = ["商品管理", "商品分类"];
          break;
        case "/index/shops":
          arr = ["店铺管理"];
          break;
        case "/index/account/acc_add":
          arr = ["账号管理", "添加账号"];
          break;
        case "/index/account/acc_list":
          arr = ["账号管理", "账号列表"];
          break;
        case "/index/account/acc_pwd":
          arr = ["账号管理", "修改密码"];
          break;
        case "/index/statistical/sta_goods":
          arr = ["销售统计", "商品统计"];
          break;
        case "/index/statistical/sta_order":
          arr = ["销售统计", "订单统计"];
          break;
      }
      this.breadList = arr;
    }
  },
  computed:{
    roleTree(){
      return this.treeList.filter(i=>i.role.includes(this.role))
    }
  },
  watch: {
    $route: {
      handler: val => {
        window._this.changeRouter(val.path);
      },
      // 深度观察监听
      deep: true
    }
  },
  created() {
    let hash = this.$route.path;
    //根据hash值改变左侧树菜单默认选中
    this.defaultActive = hash;
    //改变面包屑数组
    this.changeRouter(hash);
    //保存这个this
    window._this = this;
    // 获取当前登录账号的id
    this.id = localStorage.getItem("id");
    this.token = localStorage.getItem("token");
    this.acc = localStorage.getItem("acc");
    this.role = localStorage.getItem("role");
    // 验证token是否过期
    API_CHECK_TOKEN(this.token).then(res => {
      // token有效
      if (res.data.code == 0) {
        // 获取账号信息
        API_USER_ACCINFO(this.id).then(res => {
          this.infoList = res.data.accountInfo;
          // 显示用户名
          this.loginUser = `欢迎回来，${this.acc}`;
          // 将账号信息转成字符串存入本地存储
          localStorage.setItem(
            "infoList",
            JSON.stringify(res.data.accountInfo)
          );
        });
        // token无效
      } else {
        // 显示登录链接
        this.loginUser = "<a href='#/' class='login_link'>未登录，请登录！</a>";
      }
    });
  }
};
</script>

<style lang="less" scoped>
@bgc: #2d3a4b;
@viewBgc: #f0f2f5;
.el-container {
  height: 100%;
  .el-aside {
    height: 100%;
    background: @bgc;
    .aside_header {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding-right: 20px;
      height: 60px;
      img {
        width: 35px;
        height: 35px;
        margin-left: 15px;
      }
      h1 {
        font-size: 18px;
        color: white;
      }
    }
    .el-menu {
      border-right: 0;
    }
  }
  .el-header {
    display: flex;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .link {
      color: #afb0b2;
      a {
        text-decoration: none;
        font-size: 14px;
        color: #afb0b2;
        margin-right: 5px;
        &.active,
        &:hover {
          color: black;
          font-weight: bold;
        }
      }
    }
    .photo {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-left: 20px;
      }
    }
  }
  .el-main {
    background: @viewBgc;
  }
}
</style>