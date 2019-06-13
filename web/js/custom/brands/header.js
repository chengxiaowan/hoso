var config = {
    role: localStorage.userRole,
    api_save: api_url+'/shopsBrand/addShopsBrandUser', //新建店铺品牌负责人
}
window.app = new Vue({
    el:"#app",
    data:{
       roleId:config.role,
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
                url:config.api_save,         
                type:"post",
                async:true,
                data:{
                    name:that.name,
                    userName:that.username,
                    mobilePhone:that.phone,
                    password:that.password,
                    email:that.email,
                    QQ:that.qq,
                    remark:that.remark,
                    roleId:that.roleId
                },
                success:function(res){
                    console.log(res.msg)
                    var closePage = parent.layer.getFrameIndex(window.name)
                    parent.layer.close(closePage)
                }
            })
        },
        dy:function(){
            console.log(this.name)
        }
    },
})


//输入框文本计数
var user = document.getElementById("name")
var username = document.getElementById("username")
user.onkeyup = function(){
    document.getElementById("count1").innerHTML = user.value.length;
}

username.onkeyup = function(){
    document.getElementById("count2").innerHTML = username.value.length;
}

//两次密码是否一致校验提醒
var p1 = document.getElementById("password")
var p2 = document.getElementById("password2")

p2.onblur = function(){
    if(p1.value === p2.value){
        console.log("ok")
    }else{
        layer.tips("请保持两次密码一致",p2)
    }
}



//end 2019年6月12日17:25:29