var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_getContractDetail: api_url+'/supplierContract/info', //获取合同人详情
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        contractList: [], // 合同列表
        id: id, // 供应商id
        contractNo: '', // 合同编号
        supplierName: '', // 供应商名称
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
        that.getContractDetail(); //获取合同详情
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
        // 获取合同详情
        getContractDetail(){
            const that = this;
            $.ajax({
                url: config.api_getContractDetail,
                async: true,
                type: 'post',
                data: {
                    id: that.id,
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.contractList = res.result;
                        that.contractNo = that.contractList.contractNo;
                        that.supplierName = that.contractList.supplierName;
                        that.createTime = that.contractList.createTime;
                        that.endTime = that.contractList.endTime;
                        that.remark = that.contractList.remark;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
    }
})
