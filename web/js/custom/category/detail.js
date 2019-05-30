var id = parameter().id;
var config = {
    role: localStorage.userRole,
    type:parameter().type,
    api_detail: api_url+'/type/info', //获取联系人详情
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        type: config.type,
        id: id, // 商品类目id
        list: [], // 列表
        name: '', // 商品类目名称
        keywords: '', // 搜索关键词
        typeCode: '', //分类编码
        parentName: '', // 父分类名称
        sortNo: '', // 顺序号
        picPath: '', // 图片
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
                    typeId: that.id
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.list = res.result;
                        that.name = that.list.name;
                        that.typeCode = that.list.typeCode;
                        that.parentName = that.list.parentName;
                        that.sortNo = that.list.sortNo;
                        // that.picPath = that.list.picPath;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },

    }
})



