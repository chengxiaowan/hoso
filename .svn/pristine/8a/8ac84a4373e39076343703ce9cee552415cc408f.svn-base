var shopsBrandShopsOwnerId = parameter().id;
console.log(shopsBrandShopsOwnerId)
console.log("这是header2")
var config = {
    role: localStorage.userRole,
    api_save: api_url+'/shopsBrand/editShopsBrandShopsOwner', //新建店铺品牌负责人
    api_get: api_url + "/shopsBrand/editShopsBrandShopsOwnerInfo"   //获取负责人信息信息
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
       remark:'',        //备注
       userID:""
    },
    mounted:function(){
        var that = this
        that.getUserinfo()
    },
    methods: {
        //读取用户信息
        getUserinfo(){
            var that = this
            $.ajax({
                url:config.api_get,
                type:"post",
                async:true,
                data:{
                    shopsBrandShopsOwnerId:shopsBrandShopsOwnerId,
                },
                success:res=>{
                   if(res.error == "00"){
                    console.log(res);
                    that.name = res.result.realName
                    that.username = res.result.userName
                    that.phone = res.result.mobilePhone
                    that.email = res.result.email
                    that.qq = res.result.QQ
                    that.remark = res.result.remark
                    that.userId = res.result.userId
                   }else{
                       layer.msg(res.msg)
                       var closePage = parent.layer.getFrameIndex(window.name)
                       setTimeout(function(){
                           parent.layer.close(closePage)
                       },1000)
                   }
                }
            })
        },

        //保存修改后的数据
        Save(){
            var that = this;
            $.ajax({
                url:config.api_save,         
                type:"post",
                async:true,
                data:{
                    userId:that.userId,
                    userName:that.username,
                    mobilePhone:that.phone,
                    password:that.password,
                    name:that.name,
                    email:that.email,
                    QQ:that.qq,
                    remark:that.remark,
                },
                success:function(res){
                    console.log(res)
                    layer.msg(res.msg)
                    var closePage = parent.layer.getFrameIndex(window.name)
                    setTimeout(function(){
                        parent.layer.close(closePage)
                    },3000)
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



