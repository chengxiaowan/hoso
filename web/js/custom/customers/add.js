config = {
    api_save : api_url + '/memberCustomer/add'
}

window.app = new Vue({
    el:"#app",
    data() {
        return {
            //整合表单参数
            name:"",        //客户名称
            linkmanName:"", //联系人姓名
            mobilePhone:"", //联系人手机号码
            address:"",     //地址
            loginName:"",   //登录名
            loginPasswd:"", //登录密码
            remark:"",      //备注
        }
    },
    methods: {
        // 保存信息
        drool(){
            let that = this;
            //判断必填
            if(that.name == ""){
                layer.msg("请输入供应商名称")
                return
            }

            if(that.loginName == ""){
                layer.msg("请输入登录账号")
                return
            }

            if(that.loginPasswd == ""){
                layer.msg("请输入登录密码")
            }

           let province,city,area
            //获取信息并切割
            if($("#city").val() != ""){
                let info = $("#city").val().split("-")
                province = info[0]
                city = info[1]
                area = info[2]
            }else{
                province = ""
                city = ""
                area = ""
            }

            // 传递参数
            let parmars={
               name:that.name,
               linkmanName:that.linkmanName,
               mobilePhone:that.mobilePhone,
               province:province,
               city:city,
               area:area,
               address:that.address,
               loginName:that.loginName,
               loginPasswd:that.loginPasswd,
               remark:that.remark
            }

            console.log(parmars)

            //下边开启ajax发送信息

            $.ajax({
                url:config.api_save,
                type:"post",
                async:true,
                data:parmars,
                success:res=>{
                    if(res.error == "00"){
                        layer.msg("添加成功")
                        setTimeout(function () {
                            var closePage = parent.layer.getFrameIndex(window.name)
                            parent.layer.close(closePage)
                        }, 1000)
                    }else{
                        layer.msg(res.msg)
                    }
                }
            })
        }
    },
    mounted() {
        
    },
})