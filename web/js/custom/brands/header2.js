var shopsBrandShopsOwnerId = parameter().id;
console.log(shopsBrandShopsOwnerId)
console.log("这是header2")
var config = {
    role: localStorage.userRole,
    api_save: api_url+'/shopsBrand/editShopsBrandShopsOwner', //新建店铺品牌负责人
    api_get: api_url + "/shopsBrand/editShopsBrandShopsOwnerInfo",   //获取负责人信息信息
    api_phone: api_url + '/shops/findByUserName'        //校验手机和用户名
}
window.app = new Vue({
    el:"#app",
    data:{
       roleId:config.role,
       name:'',         //姓名
       phone:'',        //电话
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
                    userName:that.phone,
                    mobilePhone:that.phone,
                    password:"1",
                    name:that.name,
                    email:that.email,
                    QQ:that.qq,
                    remark:that.remark,
                    shopsBrandShopsOwnerId:shopsBrandShopsOwnerId
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
//校验手机号是否重复和正则校验格式
var phone = document.getElementById("phone")
phone.onblur = function(){
    if(!(/^1[3456789]\d{9}$/.test(phone.value))){
        layer.msg("您输入的手机号码格式错误，请核对")
    }else{
        $.ajax({
            url:config.api_phone,
            type:"post",
            async:true,
            data:{
                userName:phone.value
            },
            success:res=>{
                if(res.error == "01"){
                    layer.msg("该手机号已被使用，请更换手机号后重试")
                }
            }
        })
    }

}





