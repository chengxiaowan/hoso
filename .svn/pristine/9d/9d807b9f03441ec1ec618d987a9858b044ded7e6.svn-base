var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_detail: api_url+'/brand/info',//查看品牌详情
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        id: id, // 合同id
        list: [], // 品牌列表
        name: '', // 品牌名称
        logo: '', // 品牌logo
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
        // 获取品牌详情
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
                        // that.logo = that.list.logoPath;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        }
    }
})

