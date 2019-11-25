var config = {
    role: localStorage.userRole,
    api_save: api_url + '/shops/editShopsDistributor', //保存修改店铺品牌负责人信息
    api_getRole: api_url + '/shops/shopsRoleList', //新建店铺品牌负责人
    api_getinfo: api_url + "/shops/editShopsDistributorInfo",    //获取店铺职员信息
    id: parameter().shopsId,
    shopsDistributorId: parameter().id,
    userId: parameter().userId,
    api_phone: api_url + '/shops/findByUserName'
}
console.log(config)
console.log(window.location.href)
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
        isSaler: "0",
        rolelist: [],
        userId: '',
    },
    methods: {

        //保存数据
        Save() {
            var that = this;
            $.ajax({
                url: config.api_save,
                type: "post",
                async: true,
                data: {
                    shopsDistributorId: config.shopsDistributorId,
                    shopsRoleId: that.shopsRoleId,
                    name: that.name,
                    userName: that.phone,    //因为不需要 传空
                    mobilePhone: that.phone,
                    password: "1",    //因为不需要 传空
                    email: that.email,
                    QQ: that.qq,
                    remark: that.remark,
                    userId: that.userId,
                    isSaler: that.isSaler

                },
                success: function (res) {
                    console.log(res)
                    var closePage = parent.layer.getFrameIndex(window.name)
                    parent.layer.close(closePage)
                }
            })
        },

        //获取店铺销售角色
        getRolelist() {
            var that = this;
            $.ajax({
                url: config.api_getRole,
                type: "post",
                async: true,
                data: {
                    shopsId: config.id,
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
        },
        //获取负责人详细信息
        getUserinfo() {
            var that = this;
            $.ajax({
                url: config.api_getinfo,
                type: "post",
                async: true,
                data: {
                    shopsDistributorId: config.shopsDistributorId
                },
                success: res => {
                    that.name = res.result.realName
                    that.phone = res.result.mobilePhone
                    that.email = res.result.email
                    that.qq = res.result.qq
                    that.remark = res.result.remark
                    that.shopsRoleId = res.result.shopsRoleId
                    that.userId = res.result.userId
                    that.isSaler = Number(res.result.isSaler)
                }
            })
        }

    },
    mounted() {
        var that = this
        that.getRolelist()
        that.getUserinfo()
        console.log(config.id)
        console.log(config.shopsDistributorId)

    },
})

//校验手机号是否重复
var phone = document.getElementById("phone")
phone.onblur = function () {
    if (phone.value == "") {
        layer.msg("请输入手机号码")
    } else if (!(/^1[3456789]\d{9}$/.test(phone.value))) {
        layer.msg("您输入的手机号码格式错误，请核对")
    } else {
        $.ajax({
            url: config.api_phone,
            type: "post",
            async: true,
            data: {
                userName: phone.value,
                userId: config.userId
            },
            success: res => {
                if (res.error == "01") {
                    layer.msg("该手机号已被使用，请更换手机号后重试")
                }
            }
        })
    }

}


