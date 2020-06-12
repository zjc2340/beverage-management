import axios from "axios"
axios.defaults.baseURL = "http://127.0.0.1:5000"
const SERVEIP = "http://127.0.0.1:5000"
// 店铺图片上传接口
export const SERVE_SHOP_UPLOAD = SERVEIP+"/shop/upload"
// 用户头像上传接口
export const SERVE_USERS_UPLOAD = SERVEIP+"/users/avatar_upload"
// 商品图片上传接口
export const SERVE_GOODS_UPLOAD = SERVEIP+"/goods/goods_img_upload"
// 店铺图片路径
export const SERVE_SHOP_IMG = SERVEIP+"/upload/shop/"
// 用户图片路径
export const SERVE_USER_IMG = SERVEIP+"/upload/imgs/acc_img/"
// 商品图片路径
export const SERVE_GOODS_IMG = SERVEIP+"/upload/imgs/goods_img/"

// 一、登录
// account：账号
// password：密码
export const API_LOGIN = (account, password) => axios.post("/users/checkLogin", {account,password})
// 二、添加账号
// account：账号
// password：密码
// userGroup 用户组
export const API_ADD_ACCOUNT = (account, password, userGroup) => axios.post("/users/add", {account,password,userGroup})
// 三、获取账号列表
// currentPage：当前页码
// pageSize：每页条数
export const API_ADD_LIST = (currentPage, pageSize) => axios.get("/users/list", {params: {currentPage,pageSize}})
// 四、删除账号
// id：要删除账号的id
export const API_ADD_DEL = (id) => axios.get("/users/del", {params: {id}})
// 五、批量删除
// ids：要删除数据的id组成的数组
export const API_ADD_BATCHDEL = (ids) => axios.get("/users/batchdel", {params: {ids}})
// 六、修改账号
// id：要修改账号的id
// account：账号
// userGroup：用户组
export const API_ADD_EDIT = (id, account, userGroup) => axios.post("/users/edit", {id,account,userGroup})
// 七、检查旧密码是否正确
// oldPwd：原密码
// id:当前登录账号的id
export const API_USER_CHECKOLDPWD = (oldPwd, id) => axios.get("/users/checkoldpwd", {params: {oldPwd,id}})
// 八、修改密码
// oldPwd：新密码
// id:当前登录账号的id
export const API_USER_EDITPWD = (newPwd, id) => axios.post("/users/editpwd", {newPwd,id})
// 九、获取账号（个人信息）
// id:当前登录账号的id
export const API_USER_ACCINFO = (id)=>axios.get("/users/accountinfo",{params:{id}})
// 十、头像上传
export const API_USER_AVATAR_UPLOAD = (id)=>axios.post("/users/avatar_upload",{id})
// 十一、验证token是否过期
// token：令牌
export const API_CHECK_TOKEN = (token)=>axios.get("/users/checktoken",{params:{token}})
// 十二、添加分类
// cateName：要添加的分类名
// state：分类的开关状态
export const API_GOODS_ADDCATE = (cateName, state) => axios.post("/goods/addcate", {cateName,state})
// 十三、获取分类
// currentPage：当前页
// pageSize：每页显示的数据条数
export const API_GOODS_CATELIST = (currentPage, pageSize) => axios.get("/goods/catelist", {params: {currentPage,pageSize}})
// 十四、删除分类
// id：要删除的分类的id
export const API_GOODS_DELCATE = (id) => axios.get("/goods/delcate", {params: {id}})
// 十五、修改分类
// id：要修改的分类的id
// cateName：修改后的分类名
// state：修改后的分类开关状态
export const API_GOODS_DEITCATE = (id, cateName, state) => axios.post("/goods/editcate", {id,cateName,state})
// 十六、查询所有分类名称
export const API_GOODS_CATEGROIES = () => axios.get("/goods/categories")
// 十七、商品图片上传
export const API_GOODS_GOODS_IMG_UPLOAD = ()=>axios.post("/goods/goods_img_upload")
// 十八、添加商品
// name：商品名称
// category：商品分类
// price：商品价格
// imgUrl：商品图片地址
// goodsDesc：商品描述
export const API_GOODS_ADD = (name,category,price,imgUrl,goodsDesc)=>axios.post("/goods/add",{name,category,price,imgUrl,goodsDesc})
// 十九、获取商品列表
// currentPage：当前页
// pageSize：每页显示的数据条数
export const API_GOODS_LIST = (currentPage, pageSize) => axios.get("/goods/list", {params: {currentPage,pageSize}})
// 二十、删除商品
// id：要删除的商品id
export const API_GOODS_DEL = (id) => axios.get("/goods/del", {params: {id}})
// 二十一、修改商品
// name：商品名称
// category：商品分类
// price：商品价格
// imgUrl：商品图片地址
// goodsDesc：商品描述
// id：商品ID
export const API_GOODS_EDIT = (params)=>axios.post("/goods/edit",params)
// 二十二、获取订单列表
// currentPage：当前页
// pageSize：每页显示的数据条数
// orderNo：订单号
// consignee：收货人
// phone：手机号
// orderState：订单状态
// date：时间范围
export const API_ORDER_LIST = (currentPage,pageSize)=>axios.get("/order/list",{params:{currentPage,pageSize}})
// 二十三、查询
// currentPage：当前页
// pageSize：每页显示的数据条数
// orderNo：订单号
// consignee：收货人
// phone：手机号
// orderState：订单状态
// date：时间范围
export const API_ORDER_SEARCH = (currentPage,pageSize,orderNo,consignee,phone,orderState,date)=>axios.get("/order/search",{params:{currentPage,pageSize,orderNo,consignee,phone,orderState,date}})
// 二十四、获取订单详情
// id：订单id
export const API_ORDER_DETAIL = (id) => axios.get("/order/detail", {params: {id}})
// 二十五、修改订单信息
// id：要修改账号的id
// orderNo：订单号
// orderTime：下单时间
// phone：电话
// consignee：收货人
// deliverAddress：送货地址
// deliveryTime：送达时间
// remarks：备注
// orderAmount：订单金额
// orderState：订单状态
export const API_ORDER_EDIT = (params) => axios.post("/order/edit", params)
// 二十六、获取店铺详情
export const API_SHOP_INFO =()=>axios.get("/shop/info")
// 二十七、店铺图片上传
export const API_SHOP_UPLOAD = ()=>axios.post("/shop/upload")
// 二十八、店铺内容修改
// id：店铺id
// name：店铺名称
// bulletin：店铺公告
// avatar：店铺头像
// deliveryPrice：起送价格
// deliveryTime：送达时间
// description：店铺描述
// score：铺好评率
// sellCount：店铺销量
// supports：活动支持
// date：营业时间
export const API_SHOP_EDIT = (params)=>axios.post("/shop/edit",params)
// 二十九、首页报表统计
export const API_HOME_TOTALDATA = () => axios.get("/order/totaldata")
// 三十、订单报表统计
// date：字符串格式数组
export const API_ORDER_ORDERTOTAL = (date)=>axios.get("/order/ordertotal",{params:{date}})