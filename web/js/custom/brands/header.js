
var config = {
    role: localStorage.userRole,
    api_save: api_url + '/shopsBrand/addShopsBrandOwner', //新建店铺品牌负责人
    // api_phone: api_url + '/shops/findByUserName'   //校验用户名手机
}
window.app = new Vue({
    el: "#app",
    data: {
        // roleId: config.role,
        name: '',         //姓名
        phone: '',        //电话
        email: '',        //邮箱
        qq: '',
        remark: '',        //备注
        // password:"123456"
    },
    methods: {
        Save() {
            var that = this;
            if (that.name == "") {
                layer.msg("请输入负责人姓名")
            } else if (that.phone == "") {
                layer.msg("请输入负责人手机号码")
            } else {

                $.ajax({
                    url: config.api_save,
                    type: "post",
                    async: true,
                    data: {
                        name: that.name,
                        userName: that.phone,
                        mobilePhone: that.phone,
                        password: "123456",
                        email: that.email,
                        qq: that.qq,
                        remark: that.remark,
                        // roleId: "5",
                    },
                    success: function (res) {
                        if(res.error == "00"){

                            var closePage = parent.layer.getFrameIndex(window.name)
                            parent.layer.close(closePage)
                        }else{
                            layer.msg("该手机号码已被使用，请更换后重试")
                        }
                    }
                })
            }
        },
        //手机号校验
        // phone () {
            // var that = this
            // $.ajax({
            //     url: config.api_phone,
            //     type: "post",
            //     async: true,
            //     data: {
            //         userName: that.phone
            //     },
            //     success: res => {
            //         if (res.error == "01") {
            //             layer.msg("该手机号已经使用过了，请更换手机号")
            //         }
            //     }
            // })
        // }
    },
})


//输入框文本计数
var user = document.getElementById("name")
var username = document.getElementById("username")
user.onkeyup = function () {
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



//end 2019年6月12日17:25:29