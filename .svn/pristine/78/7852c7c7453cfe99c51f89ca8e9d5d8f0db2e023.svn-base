var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_getLinkman: api_url+'/supplierLinkman/info', //获取供应商联系人详情
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        linkmanList: [], // 联系人列表
        id: id, // 供应商id
        linkmanName: '', // 联系人姓名
        linkmanPhone: '', // 联系人手机
        linkmanTel: '', // 联系人电话
        linkmanEmail: '', // 联系人邮箱
        linkmanFax: '', // 联系人传真
        linkmanJob: '', // 职务
        linkmanRemark: '', // 备注
    },
    created: function() {
        const that = this;
        document.getElementById("app").classList.remove("hide");
    },
    mounted: function() {
        const that = this;
        that.getLinkmanDetail(); // 获取联系人详情
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
        // 获取联系人详情
        getLinkmanDetail(){
            const that = this;
            $.ajax({
                url: config.api_getLinkman,
                async: true,
                type: 'post',
                data: {
                    id: that.id,
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.linkmanList = res.result;
                        that.linkmanName = that.linkmanList.name;
                        that.linkmanPhone = that.linkmanList.phone;
                        that.linkmanTel = that.linkmanList.tel;
                        that.linkmanEmail = that.linkmanList.mail;
                        that.linkmanFax = that.linkmanList.fax;
                        that.linkmanJob = that.linkmanList.job;
                        that.linkmanRemark = that.linkmanList.remark;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
    }
})
