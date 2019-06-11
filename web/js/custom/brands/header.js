var config = {
    role: localStorage.userRole,
    api_save: api_url+'', //获取品牌列表
}
window.app = new Vue({
    el:"#app",
    data:{
       role:config.role,
       name:'',         //姓名
       phone:'',        //电话
       username:'',     //用户名
       password:'',     //密码
       email:'',        //邮箱
       qq:'',
       remark:''        //备注
    },
    methods: {
        Save(){
            var that = this;
            $.ajax({
                url:"",         //暂无接口
                type:post,
                async:true,
                data:{
                    //暂时未确定接口字段
                },
                success:function(){

                }
            })
        }
    },
})