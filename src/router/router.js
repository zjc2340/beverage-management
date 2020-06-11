import Vue from "vue"
import Router from "vue-router"
import Login from "../pages/Login.vue"
import {API_CHECK_TOKEN} from "@/api/apis"
Vue.use(Router)
const router = new Router({
    routes: [{
        path: "/",
        name: "login",
        component: Login
    }, {
        path: "/index",
        name: "index",
        component: () => import('../pages/Index'),
        children: [{
            path: "/index/home",
            name: "home",
            component: () => import('../pages/index/Home.vue'),
            meta:{role:["super","normal"]}
        },{
            path: "/index/order",
            name: "order",
            component: () => import('../pages/index/Order.vue'),
            meta:{role:["super","normal"]}
        },{
            path: "/index/shops",
            name: "shops",
            component: () => import('../pages/index/Shops.vue'),
            meta:{role:["super","normal"]}
        },{
            path: "/index/Administrator",
            name: "Administrator",
            component: () => import('../pages/index/Administrator.vue'),
            meta:{role:["super","normal"]}
        },{
            path: "/index/account/acc_add",
            name: "acc_add",
            component: () => import('../pages/index/account/Acc_add.vue'),
            meta:{role:["super"]}
        },{
            path: "/index/account/acc_list",
            name: "acc_list",
            component: () => import('../pages/index/account/Acc_list.vue'),
            meta:{role:["super"]}
        },{
            path: "/index/account/acc_pwd",
            name: "acc_pwd",
            component: () => import('../pages/index/account/Acc_pwd.vue'),
            meta:{role:["super"]}
        },{
            path: "/index/statistical/sta_goods",
            name: "sta_goods",
            component: () => import('../pages/index/statistical/Sta_goods.vue'),
            meta:{role:["super"]}
        },{
            path: "/index/statistical/sta_order",
            name: "sta_order",
            component: () => import('../pages/index/statistical/Sta_order.vue'),
            meta:{role:["super"]}
        },{
            path: "/index/goods/goods_classify",
            name: "goods_classify",
            component: () => import('../pages/index/goods/Goods_classify.vue'),
            meta:{role:["super"]}
        },{
            path: "/index/goods/goods_list",
            name: "goods_list",
            component: () => import('../pages/index//goods/Goods_list.vue'),
            meta:{role:["super"]}
        },{
            path: "/index/goods/goods_add",
            name: "goods_add",
            component: () => import('../pages/index//goods/Goods_add.vue'),
            meta:{role:["super"]}
        },]
    }]
})
router.beforeEach((to,from,next)=>{
    if(to.path!="/"){
        API_CHECK_TOKEN(localStorage.token).then(res=>{
            if(res.data.code == 0){
                next()
                console.log(from.path);
                // if(to.meta.role.includes(localStorage.role)){
                //     next()
                // }else{
                //     next(from.path)
                // }
            }else{
                next('/')
            }
        })
    }else next()
})
export default router