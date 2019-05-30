var id = parameter().id;
var config = {
    role: localStorage.userRole,
    api_add: api_url+'/goodsSkuAttribute/colorAdd', //新增商品颜色
}
window.app = new Vue({
    el: '#app',
    data: {
        role: config.role,
        list: [], // 商品颜色列表
        id: id,
        name: '', // 商品颜色名称
        logo: '', // 商品颜色图片
    },
    created: function() {
        const that = this;
        document.getElementById("app").classList.remove("hide");
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
        // 保存合同操作 交验合同编号，供应商是否为空
        confirm(){
            const that = this;
            var name = that.name;
            if(name == ""){
                layer.msg("请填写颜色名称");
                return;
            }else{
                that.addColor();
            }
        },
        // 新增颜色
        addColor(){
            const that = this;
            $.ajax({
                url: config.api_add,
                async: true,
                type: 'post',
                data: {
                    goodsId:that.id,
                    name: that.name,
                    imgPath: 1
                },
                success: function(res) {
                    that.loading('close')
                    if(res.error == "00") {
                        var index=parent.layer.getFrameIndex(window.name);
                        layer.msg('商品颜色添加成功！');
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
