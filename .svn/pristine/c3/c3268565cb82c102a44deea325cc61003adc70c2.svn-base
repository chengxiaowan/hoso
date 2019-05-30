var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_detail: api_url+'/goodsSkuAttribute/colorEditInfo',// 获取商品颜色详情
    api_edit: api_url+'/goodsSkuAttribute/colorEdit',// 修改颜色
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        id: id, // 颜色id
        list: [], // 颜色列表
        name: '', // 颜色名称
        logo: '', // 颜色图片
        skuSelectCode: '', // 颜色编码
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
                    skuSelectId: that.id
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        that.list = res.result;
                        that.name = that.list.name;
                        that.skuSelectCode = that.list.skuSelectCode;
                        that.skuSelectCode = that.list.skuSelectCode;
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
        // 保存颜色操作 校验颜色名称、颜色是否为空
        confirm(){
            const that = this;
            var name = that.name;
            var logo = that.logo;
            if(name == ""){
                layer.msg("请填写颜色名称");
                return;
            }else{
                that.edit();
            }
        },
        edit(){
            const that = this;
            $.ajax({
                url: config.api_edit,
                async: true,
                type: 'post',
                data: {
                    skuSelectId: that.id,
                    name: that.name,
                    // logoPath: that.logo,
                    imgPath: 1
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        var index=parent.layer.getFrameIndex(window.name);
                        layer.msg('修改成功！');
                        setTimeout(function () {
                            window.parent.location.reload();
                            parent.layer.close(index);
                        }, 1000);
                    } else {
                        layer.msg(res.msg)
                    }
                }
            });
        },
    }
})
