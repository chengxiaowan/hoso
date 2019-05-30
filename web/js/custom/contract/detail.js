var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_detail: api_url+'/supplierContract/info' //获取合同详情
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        id: id, // 合同id
        list: [], // 合同列表
        contractNo: '', // 合同编号
        supplierName: '', // 供应商
        createTime: '', // 合同签订时间
        endTime: '', // 合同到期时间
        remark: '', // 备注
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
        // 获取供应商详情
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
                        that.contractNo = that.list.contractNo;
                        that.supplierName = that.list.supplierName;
                        that.createTime = that.list.createTime;
                        that.endTime = that.list.endTime;
                        that.remark = that.list.remark;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        }
    }
})

