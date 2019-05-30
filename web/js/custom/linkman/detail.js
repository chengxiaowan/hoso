var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_detail: api_url+'/supplierLinkman/info', //获取联系人详情
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        id: id, // 联系人id
        list: [], // 列表
        supplierId: '', // 供应商id
        keywords: '', // 搜索关键词
        name: '', // 供应商名称
        phone: '', // 手机号，多个"/"分隔
        tel: '', // 电话，多个"/"分隔
        mail: '', // 邮箱，多个"/"分隔
        job: '', // 职务
        remark: '', // 备注

        postData: {},
    },
    created: function() {
        const that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function() {
        const that = this;
        that.getDetail();
    },
    methods: {
        /**
         * 载入中方法
         *
         * @param {string} s 是否关闭
         */
        loading: function(s) {
            if(s == "close") layer.close(this.loadingSwitch)
            else this.loadingSwitch = layer.load(3);
        },
        // 获取联系详情
        getDetail(){
            const that = this;
            $.ajax({
                url: config.api_detail,
                async: true,
                type: 'post',
                data: {
                    id: that.id
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.list = res.result;
                        that.name = that.list.name;
                        that.phone = that.list.phone;
                        that.tel = that.list.tel;
                        that.email = that.list.mail;
                        that.job = that.list.job;
                        that.fax = that.list.fax;
                        that.remark = that.list.remark;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },

    }
})



