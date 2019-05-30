var config = {
    //config里储存和后台连接接口
    role: localStorage.userRole,
};

//初始化一个Vue实例
let vm = new Vue({
    el:"#app",
    data:{
       //存储从后台读取的数据
        role:config.role,
        list:[],        //品牌列表
        keywords:'',    //关键字
    },
})