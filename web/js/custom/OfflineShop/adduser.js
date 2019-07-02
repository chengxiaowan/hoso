var config = {
    role: localStorage.userRole,
    api_save: api_url + '/shops/addShopsDistributor', //新建店铺品牌负责人
    api_getRole: api_url + '/shops/shopsRoleList', //新建店铺品牌负责人
    shopsId: parameter().id,
}
window.app = new Vue({
    el: "#app",
    data: {
        roleId: config.role,
        name: '',         //姓名
        phone: '',        //电话
        email: '',        //邮箱
        qq: '',
        remark: '',       //备注
        shopsRoleId: "",   //店铺角色
        username: "",
        password: "",

        rolelist: []
    },
    methods: {

        //保存数据
        Save() {
            var that = this;
            if (that.name == "") {
                layer.msg("请输入人员姓名")
            } else if (that.phone == "") {
                layer.msg("请输入手机号")
            } else if (that.shopsRoleId == "") {
                layer.msg("请选择店铺角色")
            } else {

                $.ajax({
                    url: config.api_save,
                    type: "post",
                    async: true,
                    data: {
                        shopsId: config.shopsId,
                        shopsRoleId: that.shopsRoleId,
                        name: that.name,
                        userName: that.username,    //因为不需要 传空
                        mobilePhone: that.phone,
                        password: that.password,    //因为不需要 传空
                        email: that.email,
                        QQ: that.qq,
                        remark: that.remark,
                    },
                    success: function (res) {
                        console.log(res.msg)
                        if (res.error == '00') {
                            var closePage = parent.layer.getFrameIndex(window.name)
                            parent.layer.close(closePage)
                        }else{
                            layer.msg("请检查是否填写信息是否完整")
                        }
                    }
                })
            }
        },

        //获取店铺销售角色
        getRolelist() {
            var that = this;
            $.ajax({
                url: config.api_getRole,
                type: "post",
                async: true,
                data: {
                    shopsId: config.shopsId,
                    pageSize: 50,
                },
                success: res => {
                    if (res.error == "00") {
                        that.rolelist = res.result.list
                    } else {
                        layer.msg('获取角色失败，请联系系统管理员')
                    }
                }

            })
        }

    },
    mounted() {
        var that = this
        that.getRolelist()
        console.log(config.shopsId)
    },
})


