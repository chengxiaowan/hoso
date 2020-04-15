config = {
    api_save: api_url + '/memberCustomer/update',
    api_info:api_url + '/memberCustomer/detail'
}

var id = parameter().id;


window.app = new Vue({
    el: "#app",
    data() {
        return {
            //整合表单参数
            name: "",        //客户名称
            linkmanName: "", //联系人姓名
            mobilePhone: "", //联系人手机号码
            address: "",     //地址
            loginName: "",   //登录名
            loginPasswd: "", //登录密码
            remark: "",      //备注

            id: id,          //编辑的条目
        }
    },
    methods: {
        // 保存信息
        drool() {
            let that = this;
            //判断必填
            if (that.name == "") {
                layer.msg("请输入供应商名称")
                return
            }

            if (that.loginName == "") {
                layer.msg("请输入登录账号")
                return
            }

            if (that.loginPasswd == "") {
                layer.msg("请输入登录密码")
            }

            let province, city, area
            //获取信息并切割
            if ($("#city").val() != "") {
                let info = $("#city").val().split("-")
                province = info[0]
                city = info[1]
                area = info[2]
            } else {
                province = ""
                city = ""
                area = ""
            }

            // 传递参数
            let parmars = {
                id: that.id,
                name: that.name,
                linkmanName: that.linkmanName,
                mobilePhone: that.mobilePhone,
                province: province,
                city: city,
                area: area,
                address: that.address,
                loginName: that.loginName,
                loginPasswd: that.loginPasswd,
                remark: that.remark
            }

            console.log(parmars)

            //下边开启ajax发送信息

            $.ajax({
                url: config.api_save,
                type: "post",
                async: true,
                data: parmars,
                success: res => {
                    if (res.error == "00") {
                        layer.msg("修改成功")
                        setTimeout(function () {
                            var closePage = parent.layer.getFrameIndex(window.name)
                            parent.layer.close(closePage)
                        }, 1000)
                    } else {
                        layer.msg(res.msg)
                    }
                }
            })
        },

        //获取详情
        getinfo(){
            let that = this;
            $.ajax({
                url:config.api_info,
                type:"POST",
                data:{
                    id:id
                },
                success:res=>{
                    if(res.error == "00"){
                        that.loginPasswd = res.result.loginPasswd
                    }
                }
            })
        }
    },
    mounted() {
       let info =  JSON.parse(sessionStorage.getItem("supplier"))
       console.log(info)
       //填入参数
       this.name = info.name;
       this.linkmanName = info.linkmanName
       this.mobilePhone = info.mobilePhone,
       this.address = info.address,
       this.loginName = info.loginName,
       this.loginPasswd = info.loginPasswd
       this.remark = info.remark
       let drool = [info.province,info.city,info.area].join("-")
       $("#city").val(drool)

       this.getinfo()



    },
})